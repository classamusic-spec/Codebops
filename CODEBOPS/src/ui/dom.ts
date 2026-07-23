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
  { ch: 'C', color: '#38b6ff' }, { ch: 'o', color: '#7de08a' }, { ch: 'd', color: '#ffd23e' },
  { ch: 'e', color: '#5ee8c7' }, { ch: 'B', color: '#ff5fa2' }, { ch: 'o', color: '#ff9f2e' },
  { ch: 'p', color: '#a06bff' }, { ch: 's', color: '#7de08a' },
];

export function buildLogo(parent: HTMLElement, className: string): HTMLElement {
  const logo = el('div', className, parent);
  logo.setAttribute('aria-label', 'CodeBops');
  LOGO_LETTERS.forEach(({ ch, color }, i) => {
    const s = el('span', undefined, logo, ch);
    s.style.setProperty('--c', color);
    s.style.setProperty('--i', String(i + 1));
  });
  return logo;
}
