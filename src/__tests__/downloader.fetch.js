require('../__mocks__/max-api');
const { fetch } = require('../downloader');

describe('downloader', async () => {
  const MOCK_SONG_URL = 'http://bbcsfx.acropolis.org.uk/assets/07076042.wav';

  it('fetches audio data as an arraybuffer', async () => {
    const data = await fetch(MOCK_SONG_URL);
    expect(data instanceof ArrayBuffer).toBe(true);
  });
});
