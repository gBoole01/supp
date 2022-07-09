module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    project: ['tsconfig.json', 'frontend/tsconfig.json'],
  },
  rules: {
    'import/extensions': ['error', 'never'],
    'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
  },
  overrides: [{
    files: ['./frontend/**'],
    rules: {
      'no-console': 'off'
    }
  }]
}
