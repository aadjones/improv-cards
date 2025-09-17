module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['tests/**/*.ts', '**/*.test.ts'],
      env: {
        jest: true,
      },
    },
  ],
};
