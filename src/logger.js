const { MaxAPI } = global;
/* eslint-disable no-console */
const Logger = {
  error: (e) => {
    MaxAPI.post('An error occured, look in the console to see the details.');
    console.error(e);
    MaxAPI.post(e);
  },
  log: (...args) => {
    console.log(...args);
    MaxAPI.post(...args);
  },
};

module.exports = Logger;
