const path = require('path');
const express = require('express');
const router = express.Router();
const _uploadController = require('./upload.controller');

const { ensureDirectoryExistence } = require('../utils/file.util');

ensureDirectoryExistence('uploads');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // You could rename the file name
    // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    const ext = path.extname(file.originalname);
    cb(null, file.originalname.replace(ext, '') + '-' + Date.now() + ext)

    // You could use the original name
    // cb(null, file.originalname)
  }
});

var _upload = multer({ storage: storage })
/* POST issue */
router.post('/', _upload.single('file'), _uploadController.upload);

module.exports = router;
