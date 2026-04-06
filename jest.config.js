module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
