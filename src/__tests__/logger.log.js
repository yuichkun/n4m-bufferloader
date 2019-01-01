require('../__mocks__/max-api');
const { MaxAPI } = global;
const Logger = require('../logger');

Logger.log = jest.fn(Logger.log);
MaxAPI.post = jest.fn(MaxAPI.post);
console.log = jest.fn(console.log);

describe('logger.log', () => {

  it('ensures max api exsits', () => {
    expect(MaxAPI).not.toBeUndefined();
  });

  describe('Logger.log', () => {
    const MOCK_LOG = ['ch', 2];
    Logger.log(...MOCK_LOG);
    it('loggs all messages to the console', () => {
      expect(console.log.mock.calls[0][0]).toBe('ch');
      expect(console.log.mock.calls[0][1]).toBe(2);
    });
    it('outputs all the messages to Max', () => {
      expect(MaxAPI.post.mock.calls[0][0]).toBe('ch');
      expect(MaxAPI.post.mock.calls[0][1]).toBe(2);
    })
  })
});