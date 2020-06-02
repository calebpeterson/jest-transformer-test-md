const isEmpty = (array) => !array || array.length === 0;

const last = (array) =>
  array && array.length > 0 ? array[array.length - 1] : undefined;

module.exports = {
  isEmpty,
  last,
};
