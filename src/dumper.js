const Logger = require('./logger');
const UNIT_SIZE = 255;

const dumper =  async () => {
  const { numberOfChannels } = buf;
  if (numberOfChannels < 1) {
    Logger.error('This audio track does not have more than 1 channels');
    return;
  }
  for (let i = 0; i < numberOfChannels; i++) {
    Logger.log('ch', i+1);
    const channel = Array.from(buf.getChannelData(0));
    let index = 0;
    while (index < channel.length) {
      const chunk = channel.slice(index, index + UNIT_SIZE);
      await MaxAPI.outlet(chunk);
      index += UNIT_SIZE;
    }
  }
};

module.exports = dumper;