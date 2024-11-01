module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase']
      }
    ],
    semi: [
      'warn',
      'never'
    ],
    curly: 'warn',
    eqeqeq: 'warn',
    'no-throw-literal': 'warn'
  },
  ignorePatterns: [
    'src/TSSprintf.ts',
    'out',
    'dist',
    '**/*.d.ts'
  ]
}