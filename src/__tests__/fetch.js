require('../__mocks__/max-api');
const { fetch } = require('../modules/fetchAndDecode');
const { DOWNLOAD_FAILED, DATA_NOT_BUFFER } = require('../constants/status');

describe('fetch', () => {
  let testData;
  beforeAll(async done => {
    jest.setTimeout(30000);
    const MOCK_SONG_URL = 'http://bbcsfx.acropolis.org.uk/assets/07076042.wav';
    testData = await fetch(MOCK_SONG_URL);
    done();
  });

  it('fetches audio data as an arraybuffer', async () => {
    const testDataIsBuffer =
      testData instanceof ArrayBuffer || testData instanceof Buffer;
    expect(testDataIsBuffer).toBe(true);
  });

  it('logs error when it fails to fetch', async () => {
    const INVALID_URL = 'http://alskdfladsjfadlfj.com';
    expect(fetch(INVALID_URL)).rejects.toThrow(DOWNLOAD_FAILED);
  });

  it('logs error when the fetched data is not buffer', () => {
    const NON_BUFFER_URL = 'http://google.com';
    expect(fetch(NON_BUFFER_URL)).rejects.toThrow(DATA_NOT_BUFFER);
  });
});
