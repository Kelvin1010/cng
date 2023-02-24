const express = require('express');
const router = express.Router();
const roleController = require('./role.controller');

/* GET members. */
router.get('/', roleController.get);

/* GET member by id. */
router.get('/:id', roleController.getById);

/* POST member */
router.post('/', roleController.create);

/* PUT member */
router.put('/:id', roleController.update);

/* DELETE member */
router.delete('/:id', roleController.remove);

module.exports = router;
