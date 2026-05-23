const nextJest = require('next/jest');
const dotenv = require('dotenv');

dotenv.config(dotenv.config({ path: '.env.development' }));

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>'],
};

module.exports = createJestConfig(customJestConfig);