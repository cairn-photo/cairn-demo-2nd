import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        atob: 'readonly',
        HTMLElement: 'readonly',
        HTMLScriptElement: 'readonly',
        setTimeout: 'readonly'
      }
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**']
  }
);