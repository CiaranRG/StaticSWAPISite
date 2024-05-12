// This jest file is used to initalize things like test libraries and run code before the test starts

import fetchMock from 'jest-fetch-mock';

// Enabling fetchMocking globally so that all our tests use the mock instead of the actual api
fetchMock.enableMocks();

// We are telling it to reset the state of fetchMock before each test so we have a clean slate for each test
beforeEach(() => {
    fetch.resetMocks();
});