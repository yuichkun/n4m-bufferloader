require('../__mocks__/max-api');
const { MaxAPI } = global;
const Logger = require('../logger');

Logger.error = jest.fn(Logger.error);
MaxAPI.post = jest.fn(MaxAPI.post);
console.error = jest.fn(console.error);

describe('logger.error', () => {

  it('ensures max api exsits', () => {
    expect(MaxAPI).not.toBeUndefined();
  });

  describe('Logger.error', () => {
    const MOCK_ERR_MSG = 'mock error';
    Logger.error(MOCK_ERR_MSG);

    it('indicates to the user that an error has occured', () => {
      const ERR_INDICATOR = 'An error occured, look in the console to see the details.';
      expect(MaxAPI.post.mock.calls[0][0]).toBe(ERR_INDICATOR);
    });

    it('outputs the same error messages to the console and max console', () => {
      expect(console.error).toHaveBeenCalledWith(MOCK_ERR_MSG);
      expect(MaxAPI.post).toHaveBeenCalledWith(MOCK_ERR_MSG);
    });

  });
});