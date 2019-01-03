/* eslint-disable no-console */
require('../__mocks__/max-api');
const { ERR_INDICATOR } = require('../constants/status');

const { MaxAPI } = global;
const Logger = require('../modules/logger');

Logger.error = jest.fn(Logger.error);
MaxAPI.post = jest.fn(MaxAPI.post);
console.error = jest.fn(console.error);

describe('logger.error', () => {
  const MOCK_ERR_MSG = 'mock error';
  let MOCK_ERR;
  const MaxAPIPostCalls = MaxAPI.post.mock.calls;
  const LoggerErrorCalls = Logger.error.mock.calls;
  beforeAll(() => {
    MOCK_ERR = new Error(MOCK_ERR_MSG);
    Logger.error(MOCK_ERR);
  });
  it('ensures max api exsits', () => {
    expect(MaxAPI).not.toBeUndefined();
  });

  it('indicates to the user that an error has occured', () => {
    expect(MaxAPIPostCalls[0][0]).toBe(ERR_INDICATOR);
  });

  it('outputs the full Error object to the Node console', () => {
    const incomingError = LoggerErrorCalls[0][0];
    expect(incomingError).toEqual(MOCK_ERR);
  });

  it('outputs only the message part of the error to the Max console', () => {
    expect(MaxAPIPostCalls[1][0]).toBe(MOCK_ERR_MSG);
  });
});
