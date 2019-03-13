const path = require('path');

module.exports = {
  root: true, // So parent files don't get applied
  globals: {
    preval: false, // Used in the documentation
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  extends: ['plugin:import/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['babel', 'mocha'],
  rules: {
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    'import/no-unresolved': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/label-has-for': 'off', // deprecated
    'linebreak-style': 'off', // Doesn't play nicely with Windows

    // Strict, airbnb is using warn
    'no-console': 'warn',
    'no-alert': 'error',
    'react/no-danger': 'error',
    'no-constant-condition': 'error',
    'no-unused-vars': 'off',

    // Strict, airbnb is using off
    'react/no-direct-mutation-state': 'error',
    'react/sort-prop-types': 'off',

    // Airbnb use error
    'no-param-reassign': 'error',
    'no-prototype-builtins': 'error',
    'react/forbid-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-array-index-key': 'warning',

    'jsx-a11y/no-autofocus': 'off', // We are a library, people do what they want.
    'prefer-destructuring': 'off', // Destructuring harm grep potential.
    'consistent-this': ['error', 'self'],
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
      },
    ],
    // airbnb is allowing some edge cases
    'import/no-extraneous-dependencies': 'error', // It would be better to enable this rule.
    'import/namespace': ['error', { allowComputed: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
      },
    ],
    'react/jsx-handler-names': [
      'error',
      {
        // airbnb is disabling this rule
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }], // airbnb is using .jsx
    'mocha/handle-done-callback': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-return-and-callback': 'error',
    'mocha/no-sibling-hooks': 'error',
    'mocha/no-skipped-tests': 'error',
    'mocha/no-top-level-hooks': 'error',
    'mocha/prefer-arrow-callback': 'error',
    'mocha/valid-suite-description': 'error',
  },
};
