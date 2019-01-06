/* eslint-disable no-console */
const isBuffer = data => {
  const OK =
    data instanceof ArrayBuffer ||
    data instanceof Buffer ||
    data.constructor.name === 'AudioBuffer';
  if (!OK) {
    console.warn(`Feeded data type is ${data.constructor.name}`);
  }
  return OK;
};
module.exports = {
  isBuffer,
};
