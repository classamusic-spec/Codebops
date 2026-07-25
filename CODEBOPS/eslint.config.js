// @ts-check
/**
 * Lint rules for CodeBops.
 *
 * Deliberately small. TypeScript already catches most of what a linter
 * would, so the rules kept here are the ones the compiler cannot see —
 * chiefly the App Lab's safety boundaries (spec §2, §16): no `eval`, no
 * `new Function`, no `document.write`, and no dynamic code anywhere in a
 * codebase that lets a child build things which then run.
 *
 * `npm run lint` is not wired into a hook. Run it before shipping.
 */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'public/**', 'scripts/**', '*.html'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      globals: {
        window: 'readonly', document: 'readonly', console: 'readonly',
        localStorage: 'readonly', indexedDB: 'readonly', navigator: 'readonly',
        performance: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly',
        setInterval: 'readonly', clearInterval: 'readonly',
        requestAnimationFrame: 'readonly', cancelAnimationFrame: 'readonly',
        HTMLElement: 'readonly', HTMLButtonElement: 'readonly', HTMLImageElement: 'readonly',
        HTMLInputElement: 'readonly', HTMLCanvasElement: 'readonly', Element: 'readonly',
        SVGElement: 'readonly', Event: 'readonly', PointerEvent: 'readonly',
        KeyboardEvent: 'readonly', AudioContext: 'readonly', Image: 'readonly',
        fetch: 'readonly', URL: 'readonly', Blob: 'readonly', process: 'readonly',
      },
    },
    rules: {
      // ---- the safety boundary: no dynamic code, anywhere ----
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      // ---- things the compiler cannot see ----
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // The codebase leans on structural types; an explicit `any` is rare
      // and always deliberate, so it warns rather than fails the run.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // The test runner prints its results, so console is its whole job.
    files: ['test/**/*.ts'],
    rules: { 'no-console': 'off' },
  },
);
