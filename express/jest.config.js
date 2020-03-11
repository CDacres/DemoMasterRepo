
const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testRegex: TEST_REGEX,
  testPathIgnorePatterns: [
    '<rootDir>/.next/', '<rootDir>/node_modules/'
  ],
  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'jsx'
  ]
};
