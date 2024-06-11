// This jest file unlike setup doesn't run code and is only for deciding settings and such that the tests will use like what files to include, how to transform them or even what environment to use

export default {
    // This is used for determining how the modules should be transformed before being loaded to the test environment, typically used with bable to add support for node environments, since we use typescript we must input this to ensure they are compiled from ts to js
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    // We use this to specify scripts/modules to run just before the tests are run, we are using it here to add scripts to make running tests on DOM elements with react easier 
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    // Here we are declaring what environment to use, jsdom is a javascript implementation of many web standards as well as DOM/HTML standards which allows us to render components
    testEnvironment: 'jsdom',
    // This part is our way of telling jest to treat certain extensions as es modules, for us that is all our tsx files
    extensionsToTreatAsEsm: ['.tsx'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    }
};  