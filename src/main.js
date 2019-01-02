const { download } = require('./downloader');
const dumper = require('./dumper');
const Logger = require('./logger');

async function main() {
  try {
    MaxAPI.addHandler('download', async (url) => {
      this.buf = await download(url);
    });
    MaxAPI.addHandler('write', async () => {
      const { buf } = this;
      if (!buf) {
        Logger.error('buffer is not loaded');
        return;
      }
      dumper(buf);
      Logger.log('done');
    });
  } catch (e) {
    Logger.log('caaaatch');
    Logger.log(e);
  }
}

module.exports = main;
