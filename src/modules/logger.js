const { MaxAPI } = global;
const { ERR_INDICATOR } = require('../constants/status');
/* eslint-disable no-console */
const Logger = {
  error: e => {
    MaxAPI.post(ERR_INDICATOR);

    // For the sake of keeping Max console clean, show the full error only in the node console.
    console.error(e);
    MaxAPI.post(e.message);
  },
  log: (...args) => {
    console.log(...args);
    MaxAPI.post(...args);
  },
};

module.exports = Logger;
