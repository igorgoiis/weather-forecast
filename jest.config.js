// eslint-disable-next-line no-undef
module.exports = {
  preset: 'jest-expo',

  testPathIgnorePatterns: ['/node_modules', '/android/', '/ios/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest-setup.js'
  ],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/**/*.spec.tsx'],
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    // eslint-disable-next-line no-undef
    '^axios$': require.resolve('axios')
  }
};
