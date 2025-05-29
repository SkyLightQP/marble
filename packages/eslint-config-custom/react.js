import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import custom from './index.js';

export default [
  ...custom,
  react.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        JSX: true
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
