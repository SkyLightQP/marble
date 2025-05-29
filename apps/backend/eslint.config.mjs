import custom from '@marble/eslint-config-custom';

export default [
  ...custom,
  {
    ignores: ['src/api/']
  }
];
