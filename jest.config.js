'use strict'

module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.js'],
  testRegex: 'test/.+\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '/test/fixtures/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
}
