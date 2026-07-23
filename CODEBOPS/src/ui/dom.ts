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

/** Blue play-button "o" (the o in "Code"), like the reference logo. */
const PLAY_O_SVG = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="#38b6ff" stroke="#0d1437" stroke-width="7"/><circle cx="32" cy="26" r="18" fill="#5fc9ff" opacity=".55"/><path d="M26 21 L46 32 L26 43 Z" fill="#ffffff"/></svg>`;

/** Mini Zip face "o" (the o in "Bops"), like the reference logo. */
const ZIP_O_SVG = `<svg viewBox="0 0 72 76" aria-hidden="true">
<g stroke="#0d1437" stroke-width="4" stroke-linejoin="round">
<ellipse cx="22" cy="12" rx="8" ry="15" fill="#2f8ef0" transform="rotate(-24 22 12)"/>
<ellipse cx="50" cy="12" rx="8" ry="15" fill="#2f8ef0" transform="rotate(24 50 12)"/>
<path d="M 30,12 C 26,4 30,-2 38,-4 C 36,2 40,5 45,4 C 44,10 39,14 34,15 Z" fill="#ffd23e" stroke-width="3"/>
<ellipse cx="36" cy="42" rx="30" ry="28" fill="#2f8ef0"/>
</g>
<path d="M 36,36 C 32,28 24,26 17,29 C 10,32 7,40 8,48 C 10,60 22,66 36,66 C 50,66 62,60 64,48 C 65,40 62,32 55,29 C 48,26 40,28 36,36 Z" fill="#aadcff"/>
<circle cx="25" cy="42" r="9" fill="#0d1437"/><circle cx="47" cy="42" r="9" fill="#0d1437"/>
<circle cx="22.5" cy="39" r="3" fill="#fff"/><circle cx="44.5" cy="39" r="3" fill="#fff"/>
<path d="M 28,54 Q 36,62 44,54" fill="none" stroke="#0d1437" stroke-width="3.5" stroke-linecap="round"/>
</svg>`;

/**
 * CodeBops logo: chunky white "Code", candy "Bops" — with a play-button
 * first "o" and Zip's face as the second "o", matching the key art.
 */
export function buildLogo(parent: HTMLElement, className: string): HTMLElement {
  const logo = el('div', className, parent);
  logo.setAttribute('role', 'img');
  logo.setAttribute('aria-label', 'CodeBops');
  LOGO_LETTERS.forEach(({ ch, color }, i) => {
    const s = el('span', undefined, logo);
    s.style.setProperty('--c', color);
    s.style.setProperty('--i', String(i + 1));
    if (i === 1) {
      s.classList.add('logo-glyph', 'logo-play');
      s.innerHTML = PLAY_O_SVG;
    } else if (i === 5) {
      s.classList.add('logo-glyph', 'logo-zip');
      s.innerHTML = ZIP_O_SVG;
    } else {
      s.textContent = ch;
    }
  });
  return logo;
}
