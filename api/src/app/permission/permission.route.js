const express = require('express');
const router = express.Router();
const roleController = require('./permission.controller');

/* GET members. */
router.get('/', roleController.getAll);

/* GET member by id. */
router.get('/:id', roleController.getById);

module.exports = router;
