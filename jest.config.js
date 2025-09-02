module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['<rootDir>/tests/**/*.(ts|tsx|js)', '<rootDir>/**/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/setupTests.ts'],
};
