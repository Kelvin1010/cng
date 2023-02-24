const _uploadService = require('./upload.service');

async function upload(req, res, next) {
  try {
    res.json(await _uploadService.upload(req.file.path));
  } catch (err) {
    console.error(`Error while creating issues`, err.message);
    next(err);
  }
}

module.exports = {
  upload
};
