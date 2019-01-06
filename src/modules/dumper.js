const Logger = require('./Logger');
const { DONE } = require('../constants/status');

const UNIT_SIZE = 255;

const dumper = async buf => {
  const { numberOfChannels } = buf;
  if (numberOfChannels < 1) {
    Logger.error(
      new Error('This audio track does not have more than 1 channels')
    );
    return;
  }
  for (let i = 0; i < numberOfChannels; i += 1) {
    Logger.log('ch', i + 1);
    const channel = Array.from(buf.getChannelData(0));

    /* eslint-disable no-await-in-loop */
    let index = 0;
    while (index < channel.length) {
      const chunk = channel.slice(index, index + UNIT_SIZE);
      await MaxAPI.outlet(chunk);
      index += UNIT_SIZE;
    }
  }
  Logger.log(DONE);
};

module.exports = dumper;
