/**
 * A tiny async key–value store with three backends, chosen at runtime:
 *
 *   IndexedDB  — the real one. Room for projects AND thumbnails.
 *   localStorage — the fallback. Works from file:// where IndexedDB is
 *                  often unavailable, which is exactly how the standalone
 *                  codebops-playable.html runs.
 *   memory     — last resort, so a private-mode browser still plays; the
 *                session just does not persist, and `durable` says so.
 *
 * The App Lab needs more room than the ~5 MB localStorage budget the rest
 * of the save system lives in, but it must never be the reason the game
 * fails to open. Hence: probe, degrade, and tell the caller which backend
 * it got so the UI can be honest about saving.
 */

export type StoreBackend = 'indexeddb' | 'localstorage' | 'memory';

export interface KeyValueStore {
  readonly backend: StoreBackend;
  /** False for the memory backend: nothing survives a reload. */
  readonly durable: boolean;
  get<T>(key: string): Promise<T | null>;
  put<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  keys(): Promise<string[]>;
  clear(): Promise<void>;
}

// ---------------------------------------------------------------------
// IndexedDB
// ---------------------------------------------------------------------

function openDatabase(name: string, storeName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(name, 1);
    } catch (e) {
      reject(e);
      return;
    }
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('indexeddb blocked'));
  });
}

function idbRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

class IndexedDbStore implements KeyValueStore {
  readonly backend: StoreBackend = 'indexeddb';
  readonly durable = true;

  constructor(private readonly db: IDBDatabase, private readonly storeName: string) {}

  private tx(mode: IDBTransactionMode): IDBObjectStore {
    return this.db.transaction(this.storeName, mode).objectStore(this.storeName);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await idbRequest<unknown>(this.tx('readonly').get(key));
    return (value ?? null) as T | null;
  }

  async put<T>(key: string, value: T): Promise<void> {
    await idbRequest(this.tx('readwrite').put(value as unknown as never, key));
  }

  async remove(key: string): Promise<void> {
    await idbRequest(this.tx('readwrite').delete(key));
  }

  async keys(): Promise<string[]> {
    const all = await idbRequest<IDBValidKey[]>(this.tx('readonly').getAllKeys());
    return all.map(String);
  }

  async clear(): Promise<void> {
    await idbRequest(this.tx('readwrite').clear());
  }
}

// ---------------------------------------------------------------------
// localStorage
// ---------------------------------------------------------------------

class LocalStorageStore implements KeyValueStore {
  readonly backend: StoreBackend = 'localstorage';
  readonly durable = true;

  constructor(private readonly prefix: string) {}

  private full(key: string): string { return `${this.prefix}${key}`; }

  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = localStorage.getItem(this.full(key));
      return raw === null ? null : (JSON.parse(raw) as T);
    } catch {
      return null;
    }
  }

  async put<T>(key: string, value: T): Promise<void> {
    // A quota failure is a real outcome the caller must be able to see.
    localStorage.setItem(this.full(key), JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    try { localStorage.removeItem(this.full(key)); } catch { /* nothing to do */ }
  }

  async keys(): Promise<string[]> {
    const out: string[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(this.prefix)) out.push(k.slice(this.prefix.length));
      }
    } catch { /* nothing to do */ }
    return out;
  }

  async clear(): Promise<void> {
    for (const k of await this.keys()) await this.remove(k);
  }
}

// ---------------------------------------------------------------------
// memory
// ---------------------------------------------------------------------

export class MemoryStore implements KeyValueStore {
  readonly backend: StoreBackend = 'memory';
  readonly durable = false;
  private readonly map = new Map<string, string>();

  async get<T>(key: string): Promise<T | null> {
    const raw = this.map.get(key);
    return raw === undefined ? null : (JSON.parse(raw) as T);
  }

  async put<T>(key: string, value: T): Promise<void> {
    this.map.set(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> { this.map.delete(key); }
  async keys(): Promise<string[]> { return [...this.map.keys()]; }
  async clear(): Promise<void> { this.map.clear(); }
}

// ---------------------------------------------------------------------
// Backend selection
// ---------------------------------------------------------------------

/**
 * Open the best store available. Never throws: the worst case is an
 * in-memory store, and `backend`/`durable` tell the caller what happened.
 */
export async function openKeyValueStore(
  databaseName: string, storeName: string, localStoragePrefix: string,
): Promise<KeyValueStore> {
  if (typeof indexedDB !== 'undefined') {
    try {
      const db = await openDatabase(databaseName, storeName);
      const store = new IndexedDbStore(db, storeName);
      // Prove it actually works before committing to it — Safari private
      // mode and some file:// contexts open a database that then refuses
      // every write.
      await store.put('__probe', 1);
      await store.remove('__probe');
      return store;
    } catch {
      // fall through
    }
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const store = new LocalStorageStore(localStoragePrefix);
      await store.put('__probe', 1);
      await store.remove('__probe');
      return store;
    }
  } catch {
    // fall through
  }
  return new MemoryStore();
}
