const Logger = require('./Logger');
const fetch = require('./fetch');
const decode = require('./decode');

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

module.exports = fetchAndDecode;
