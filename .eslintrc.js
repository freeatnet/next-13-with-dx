module.exports = {
  extends: ['next', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      // Override based on eslint-config-next's *.ts?(x) override, but adds config required for type-dependent rules
      // see https://github.com/vercel/next.js/blob/v12.2.5/packages/eslint-config-next/index.js#L93
      // also see https://typescript-eslint.io/docs/linting/type-linting
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
      rules: {
        // Select rules from 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // for max pain, enable the whole lot.
        '@typescript-eslint/no-unnecessary-condition': 'error',
        // Next up, we'll enable:
        // '@typescript-eslint/no-floating-promises': 'error',
        // '@typescript-eslint/no-misused-promises': 'error',
        // '@typescript-eslint/restrict-plus-operands': 'error',
        // '@typescript-eslint/restrict-template-expressions': 'error',
        // '@typescript-eslint/no-unsafe-assignment': 'error',
      },
    },
    {
      // disable the rule for `*.tsx` files to avoid typing every React component (for now)
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'react/jsx-curly-brace-presence': 'warn',
  },
};
