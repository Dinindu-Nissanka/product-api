export default {
  clearMocks: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['**/*.test.ts'],
};
