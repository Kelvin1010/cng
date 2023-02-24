const express = require('express');
const router = express.Router();
const driverController = require('./driver.controller');

/* GET tags. */
router.get('/', driverController.get);

/* GET tag by id. */
router.get('/:id', driverController.getById);

/* POST tag */
router.post('/', driverController.create);

/* PUT tag */
router.put('/:id', driverController.update);

/* DELETE tag */
router.delete('/:id', driverController.remove);

module.exports = router;
