/**
 * Fetch an SVG file as text, once.
 *
 * All that is left of the old inline-SVG pipeline. The characters are the
 * rig's now; the logo is still a flat drawing that wants to be inlined so
 * its gradients can inherit the page's colours.
 */
const cache = new Map<string, Promise<string>>();

/**
 * The exported art uses generic `.cls-0`, `.cls-1`, … class names with
 * per-file colours. Inlining two such files into ONE document would let
 * their <style> blocks collide, and the last one loaded would repaint the
 * other. Scope each file's classes to itself before it goes in.
 */
function scopeSvgClasses(text: string, url: string): string {
  if (!text.includes('.cls-')) return text;
  const tag = `s${Math.abs([...url].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7)).toString(36)}`;
  return text
    .replace(/\.cls-(\d+)/g, (_m, n) => `.${tag}-cls${n}`)
    .replace(/class="([^"]*)"/g, (_m, list: string) =>
      `class="${list.split(/\s+/).map((c) => (/^cls-\d+$/.test(c) ? `${tag}-cls${c.slice(4)}` : c)).join(' ')}"`);
}

export function loadSvg(url: string): Promise<string> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`[CodeBops] Failed to load ${url}`);
      return r.text();
    }).then((text) => scopeSvgClasses(text, url));
    cache.set(url, p);
  }
  return p;
}
