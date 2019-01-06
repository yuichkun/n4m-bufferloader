require('max-api'); /* eslint-disable-line */
const fs = require('fs');
const path = require('path');
const decode = require('../modules/decode');
const Logger = require('../modules/Logger');
const {
  SAMPLE_LENGTH,
  SAMPLE_RATE,
  DECODING,
  DATA_NOT_BUFFER,
} = require('../constants/status');

describe('decode', () => {
  let spiedLoggerLog;

  beforeAll(() => {
    spiedLoggerLog = jest.spyOn(Logger, 'log');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('decodes mono wav', async () => {
    const TEST_FILE = fs.readFileSync(path.join(__dirname, '/assets/mono.wav'));
    const buf = await decode(TEST_FILE);
    expect(buf.constructor.name).toBe('AudioBuffer');
    expect(spiedLoggerLog.mock.calls[0][0]).toBe(DECODING);
    expect(spiedLoggerLog.mock.calls[1][0]).toBe(SAMPLE_LENGTH);
    expect(typeof spiedLoggerLog.mock.calls[1][1]).toBe('number');
    expect(spiedLoggerLog.mock.calls[2][0]).toBe(SAMPLE_RATE);
    expect(typeof spiedLoggerLog.mock.calls[2][1]).toBe('number');
  });

  it('decodes mp3', async () => {
    const TEST_FILE = fs.readFileSync(
      path.join(__dirname, '/assets/stereo.mp3')
    );
    const buf = await decode(TEST_FILE);
    expect(buf.constructor.name).toBe('AudioBuffer');
    expect(spiedLoggerLog.mock.calls[0][0]).toBe(DECODING);
    expect(spiedLoggerLog.mock.calls[1][0]).toBe(SAMPLE_LENGTH);
    expect(typeof spiedLoggerLog.mock.calls[1][1]).toBe('number');
    expect(spiedLoggerLog.mock.calls[2][0]).toBe(SAMPLE_RATE);
    expect(typeof spiedLoggerLog.mock.calls[2][1]).toBe('number');
  });

  it('decodes stereo wav', async () => {
    const TEST_FILE = fs.readFileSync(
      path.join(__dirname, '/assets/stereo.wav')
    );
    const buf = await decode(TEST_FILE);
    expect(buf.constructor.name).toBe('AudioBuffer');
    expect(spiedLoggerLog.mock.calls[0][0]).toBe(DECODING);
    expect(spiedLoggerLog.mock.calls[1][0]).toBe(SAMPLE_LENGTH);
    expect(typeof spiedLoggerLog.mock.calls[1][1]).toBe('number');
    expect(spiedLoggerLog.mock.calls[2][0]).toBe(SAMPLE_RATE);
    expect(typeof spiedLoggerLog.mock.calls[2][1]).toBe('number');
  });

  it('throws error with invalid files', () => {
    const INVALID_TEST_FILE = fs.readFileSync(
      path.join(__dirname, '/assets/puppy.jpeg')
    );
    expect(decode(INVALID_TEST_FILE)).rejects.toThrow(DATA_NOT_BUFFER);
  });
});
