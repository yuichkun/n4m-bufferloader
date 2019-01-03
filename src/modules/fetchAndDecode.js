/* eslint-disable no-underscore-dangle */

const axios = require('axios');
const _decode = require('audio-decode');
const Logger = require('./logger');
const {
  DECODING,
  SAMPLE_LENGTH,
  SAMPLE_RATE,
  DATA_NOT_BUFFER,
  DOWNLOAD_FAILED,
} = require('../constants/status');

const fetch = async url => {
  Logger.log(`downloading audio from ${url}...`);
  try {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    const dataIsBuffer = data instanceof ArrayBuffer || data instanceof Buffer;
    if (!dataIsBuffer) return Promise.reject(new Error(DATA_NOT_BUFFER));
    return data;
  } catch (e) {
    return Promise.reject(new Error(DOWNLOAD_FAILED));
  }
};

// @TODO: add tests for decode.
const decode = async data => {
  Logger.log(DECODING);
  const buf = await _decode(data);
  Logger.log(SAMPLE_LENGTH, buf.length);
  Logger.log(SAMPLE_RATE, buf.sampleRate);
  return buf;
};

const fetchAndDecode = async url => {
  try {
    const data = await fetch(url);
    const buf = await decode(data);
    return buf;
  } catch (e) {
    Logger.error(e);
  }
  return null;
};

module.exports = {
  fetch,
  decode,
  fetchAndDecode,
};
