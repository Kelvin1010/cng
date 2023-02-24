const express = require('express');
const router = express.Router();
const distanceController = require('./distance.controller');

/* GET tags. */
router.get('/', distanceController.get);

/* GET tag by id. */
router.get('/:id', distanceController.getById);

/* POST tag */
router.post('/', distanceController.create);

/* PUT tag */
router.put('/:id', distanceController.update);

/* DELETE tag */
router.delete('/:id', distanceController.remove);

module.exports = router;
