/**
 * The package ships a declaration for the engine but the character files
 * are plain data, so this maps mixy.js onto the Character type the engine
 * already exports. Sits beside the vendored file rather than editing it,
 * so updating the package stays a clean re-copy.
 */
import type { Character } from '../codebops-rig.js';

declare const mixy: Character;
export default mixy;
