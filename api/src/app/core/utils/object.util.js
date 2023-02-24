function deepCopy(obj) {
  const jsonStr = JSON.stringify(obj);
  return JSON.parse(jsonStr);
}

module.exports = {
  deepCopy,
};