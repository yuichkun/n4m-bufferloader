require('max-api'); /* eslint-disable-line */

const { MaxAPI } = global;
const Logger = require('../modules/Logger');

describe('Logger.log', () => {
  let spiedMaxAPIPost;
  let spiedConsoleLog;

  beforeAll(() => {
    spiedMaxAPIPost = jest.spyOn(MaxAPI, 'post');
    spiedConsoleLog = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ensures max api exsits', () => {
    expect(MaxAPI).not.toBeUndefined();
  });

  it('logs with status header', () => {
    const MOCK_LOG = ['ch', 2];
    Logger.log(...MOCK_LOG);
    expect(spiedConsoleLog.mock.calls[0][0]).toBe('ch');
    expect(spiedConsoleLog.mock.calls[0][1]).toBe(2);
    expect(spiedMaxAPIPost.mock.calls[0][0]).toBe('ch');
    expect(spiedMaxAPIPost.mock.calls[0][1]).toBe(2);
  });

  it('logs a single argument', () => {
    const MOCK_LOG = 'This is a single line mock log';
    Logger.log(MOCK_LOG);
    expect(spiedConsoleLog.mock.calls[0][0]).toBe(MOCK_LOG);
  });
});
