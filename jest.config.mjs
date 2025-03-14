import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Path to the Next.js app to load next.config.js and .env files in test environment
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/'
  ],
};

// createJestConfig exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig); 