const express = require('express');
const router = express.Router();
const customerController = require('./customer.controller');

/* GET tags. */
router.get('/', customerController.get);

/* GET tag by id. */
router.get('/:id', customerController.getById);

/* POST tag */
router.post('/', customerController.create);

/* PUT tag */
router.put('/:id', customerController.update);

/* DELETE tag */
router.delete('/:id', customerController.remove);

module.exports = router;
