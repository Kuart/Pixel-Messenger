module.exports = {
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'max-len': [2, 120],
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'comma-dangle': 'off',
    indent: 'off',
    'implicit-arrow-linebreak': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  env: { browser: true, node: true },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js'],
      },
      extensions: ['.ts', '.js'],
    },
  },
};
