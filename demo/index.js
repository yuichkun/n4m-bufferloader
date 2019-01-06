const MaxAPI = require('max-api'); /* eslint-disable-line */
const BufferLoader = require('../src/modules/BufferLoader');

const bl = new BufferLoader(MaxAPI);
bl.listen();
