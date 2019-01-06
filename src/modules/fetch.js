const axios = require('axios');
const Logger = require('./Logger');
const { DATA_NOT_BUFFER, DOWNLOAD_FAILED } = require('../constants/status');
const { isBuffer } = require('../utils');

const fetch = async url => {
  Logger.log(`downloading audio from ${url}...`);
  try {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    if (!isBuffer(data)) return Promise.reject(new Error(DATA_NOT_BUFFER));
    return data;
  } catch (e) {
    return Promise.reject(new Error(DOWNLOAD_FAILED));
  }
};

module.exports = fetch;
