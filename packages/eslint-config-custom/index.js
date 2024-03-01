module.exports = {
  plugins: ['@typescript-eslint'],
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'turbo'],
  parser: '@typescript-eslint/parser',
  globals: {
    JSX: true
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'api/', 'lib/'],
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
