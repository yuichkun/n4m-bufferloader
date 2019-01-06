require('max-api'); /* eslint-disable-line */

const { MaxAPI } = global;
const Logger = require('../modules/Logger');
const { ERR_INDICATOR } = require('../constants/status');

describe('Logger.error', () => {
  const MOCK_ERR_MSG = 'mock error';
  let MOCK_ERR;
  let spiedConsoleError;
  let spiedMaxAPIPost;

  beforeAll(() => {
    MOCK_ERR = new Error(MOCK_ERR_MSG);
    spiedConsoleError = jest.spyOn(console, 'error');
    spiedMaxAPIPost = jest.spyOn(MaxAPI, 'post');
  });

  beforeEach(() => {
    Logger.error(MOCK_ERR);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ensures max api exsits', () => {
    expect(MaxAPI).not.toBeUndefined();
  });

  it('outputs the full Error object to the Node console', () => {
    expect(spiedConsoleError.mock.calls[0][0]).toEqual(MOCK_ERR);
  });

  it('outputs only the message part of the error to the Max console', () => {
    expect(spiedMaxAPIPost.mock.calls[0][0]).toBe(ERR_INDICATOR);
    expect(spiedMaxAPIPost.mock.calls[1][0]).toBe(MOCK_ERR_MSG);
  });
});
