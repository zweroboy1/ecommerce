/** @type {import ('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  rootDir: './src/__tests__',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
