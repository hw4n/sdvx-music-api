module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'no-console': ['error', { allow: ['log'] }],
  },
};
