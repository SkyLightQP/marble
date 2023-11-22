module.exports = {
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier', 'turbo'],
  parser: '@typescript-eslint/parser',
  globals: {
    JSX: true
  },
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
    'import/prefer-default-export': 'off'
  }
};
