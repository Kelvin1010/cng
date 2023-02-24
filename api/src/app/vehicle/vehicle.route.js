const express = require('express');
const router = express.Router();
const vehicleController = require('./vehicle.controller');

/* GET tags. */
router.get('/', vehicleController.get);

/* GET tag by id. */
router.get('/:id', vehicleController.getById);

/* POST tag */
router.post('/', vehicleController.create);

/* PUT tag */
router.put('/:id', vehicleController.update);

/* DELETE tag */
router.delete('/:id', vehicleController.remove);

module.exports = router;
