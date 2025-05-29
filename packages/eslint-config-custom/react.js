import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import custom from './index.js';

export default [
  ...custom,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    languageOptions: {
      globals: {
        JSX: true,
        Howler: 'readonly',
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    rules: {
      'react/jsx-filename-extension': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-tag-spacing': 'off',
      'react/prop-types': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/require-default-props': 'off',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id']
          }
        }
      ],
      'jsx-a11y/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id']
          }
        }
      ]
    }
  }
];
