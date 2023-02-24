const express = require('express');
const router = express.Router();
const sseController = require('./sse.controller');

router.get('/', sseController.get);

module.exports = router;
