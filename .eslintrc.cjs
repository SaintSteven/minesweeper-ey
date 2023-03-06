module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      version: '18.2.0'
    }
  },
  rules: {
    indent: [
      'error',
      2,
      { SwitchCase: 1 }
    ],
    quotes: [
      'error',
      'single'
    ]
  },
  globals: {
    describe: 'readonly',
    it: 'readonly'
  }
}
