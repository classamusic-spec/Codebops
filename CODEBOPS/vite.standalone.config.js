import { defineConfig } from 'vite';

/**
 * The build behind codebops-playable.html.
 *
 * The normal build code-splits: the character rig and its two character
 * files are ~128KB that only load when a mascot is actually mounted. That
 * is right for the web, and wrong for a single file opened from a USB
 * stick — a dynamic import has nowhere to fetch from on file://, so the
 * mascots would silently never appear.
 *
 * So the standalone build folds every chunk back into one module. It goes
 * to its own directory to keep dist/ as the real, split build.
 */
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    outDir: 'dist-standalone',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1400,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
