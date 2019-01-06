/* eslint-disable no-underscore-dangle */
const _decode = require('audio-decode');
const Logger = require('./Logger');
const {
  DECODING,
  SAMPLE_LENGTH,
  SAMPLE_RATE,
  DATA_NOT_BUFFER,
} = require('../constants/status');

const decode = async data => {
  Logger.log(DECODING);
  let buf;
  try {
    buf = await _decode(data);
    Logger.log(SAMPLE_LENGTH, buf.length);
    Logger.log(SAMPLE_RATE, buf.sampleRate);
  } catch (e) {
    return Promise.reject(new Error(DATA_NOT_BUFFER));
  }
  return buf;
};

module.exports = decode;
