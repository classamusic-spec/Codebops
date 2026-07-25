/**
 * The package ships a declaration for the engine but the character files
 * are plain data, so this maps zip.js onto the Character type the engine
 * already exports. Sits beside the vendored file rather than editing it,
 * so updating the package stays a clean re-copy.
 */
import type { Character } from '../codebops-rig.js';

declare const zip: Character;
export default zip;
