const { fetchAndDecode } = require('./fetchAndDecode');
const dumper = require('./dumper');
const Logger = require('./logger');
const { BUFFER_NOT_LOADED, UNEXPECTED_ERR } = require('../constants/status');
const { DOWNLOAD, WRITE } = require('../constants/maxAPIEvents');

async function main() {
  try {
    MaxAPI.addHandler(DOWNLOAD, async url => {
      this.buf = await fetchAndDecode(url);
    });
    MaxAPI.addHandler(WRITE, async () => {
      const { buf } = this;
      if (!buf) {
        Logger.error(BUFFER_NOT_LOADED);
        return;
      }
      dumper(buf);
    });
  } catch (e) {
    Logger.log(UNEXPECTED_ERR, e);
  }
}

module.exports = main;
