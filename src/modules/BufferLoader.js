const fetchAndDecode = require('./fetchAndDecode');
const dumper = require('./dumper');
const Logger = require('./Logger');
const { BUFFER_NOT_LOADED } = require('../constants/status');
const { DOWNLOAD, WRITE } = require('../constants/maxAPIEvents');

class BufferLoader {
  constructor(MaxAPI) {
    global.MaxAPI = MaxAPI;
  }

  listen() {
    MaxAPI.addHandler(DOWNLOAD, async url => {
      await this.fetchAndDecode(url);
      // log here
    });
    MaxAPI.addHandler(WRITE, async () => {
      await this.write();
      // log here
    });
  }

  async fetchAndDecode(url) {
    this.buf = await fetchAndDecode(url);
  }

  async write() {
    const { buf } = this;
    if (!buf) {
      Logger.error(BUFFER_NOT_LOADED);
      return;
    }
    dumper(buf);
  }
}

module.exports = BufferLoader;
