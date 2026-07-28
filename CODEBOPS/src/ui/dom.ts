/** Tiny DOM helper to keep UI modules focused. */

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  parent?: HTMLElement,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  if (parent) parent.appendChild(node);
  return node;
}

export const LOGO_LETTERS: ReadonlyArray<{ ch: string; color: string }> = [
  { ch: 'C', color: '#ffffff' }, { ch: 'o', color: '#ffffff' }, { ch: 'd', color: '#ffffff' },
  { ch: 'e', color: '#ffffff' }, { ch: 'B', color: '#ff9f2e' }, { ch: 'o', color: '#38b6ff' },
  { ch: 'p', color: '#a06bff' }, { ch: 's', color: '#8cd41f' },
];

