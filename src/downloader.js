const axios = require('axios');
const decode = require('audio-decode');
const Logger = require('./logger');

const fetch = async (url) => {
  Logger.log(`downloading audio from ${url}...`);
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  return data; 
};

const download = async (url) => {
  try {
    const data = await fetch(url);
    Logger.log(`decoding audio`);
    const buf = await decode(data);
    Logger.log('sampleLength', buf.length);
    Logger.log('sampleRate', buf.sampleRate);
    return buf;
  } catch (e) {
    Logger.error(e);
  }
  return null;
}

module.exports = {
  download,
  fetch
};