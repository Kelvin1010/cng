async function upload(filepath) {
  return {
    success: filepath ? true : false,
    payload: filepath,
  };
}

module.exports = {
  upload
};
