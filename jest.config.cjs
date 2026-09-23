module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx'],
  // Jest ignores package.json "browser" fields, so without this it loads
  // styled-components' server build, which never injects createGlobalStyle CSS.
  moduleNameMapper: {
    '^styled-components$': '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/test/**',
    '!src/**/index.js',
  ],
};
