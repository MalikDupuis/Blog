/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],

  testMatch: ['**/+(*.)+(spec).+(ts)'],

  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  collectCoverageFrom: [
  'src/app/**/*.ts',
  '!src/app/**/*.spec.ts',
  '!src/app/**/app.config*.ts',    
  '!src/app/**/app.routes*.ts',     
  '!src/main.ts',
  '!src/environments/**'
],


  // Facultatif : force Jest à échouer si couverture trop faible
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
