import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
    // Avoid delete+recreate races on synced mounts; clean manually before build.
    emptyOutDir: false,
  },
});
