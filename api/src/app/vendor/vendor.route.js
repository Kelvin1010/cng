const express = require('express');
const router = express.Router();
const vendorController = require('./vendor.controller');

/* GET tags. */
router.get('/', vendorController.get);

/* GET tag by id. */
router.get('/:id', vendorController.getById);

/* POST tag */
router.post('/', vendorController.create);

/* PUT tag */
router.put('/:id', vendorController.update);

/* DELETE tag */
router.delete('/:id', vendorController.remove);

module.exports = router;
