import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import turbo from 'eslint-config-turbo/flat';
import path from 'path';
import tsEslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const compat = new FlatCompat({
  baseDirectory: dirName
});

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...compat.extends('airbnb'),
  prettier,
  ...turbo,
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'api/', 'lib/']
  },
  {
    rules: {
      'arrow-body-style': 'off',
      'jsx-quotes': 'off',
      'comma-dangle': 'off',
      'object-curly-newline': 'off',
      'linebreak-style': 'off',
      'no-useless-constructor': 'off',
      'class-methods-use-this': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
];
