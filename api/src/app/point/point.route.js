const express = require('express');
const router = express.Router();
const pointController = require('./point.controller');

/* GET tags. */
router.get('/', pointController.get);

/* GET tag by id. */
router.get('/:id', pointController.getById);

/* POST tag */
router.post('/', pointController.create);

/* PUT tag */
router.put('/:id', pointController.update);

/* DELETE tag */
router.delete('/:id', pointController.remove);

module.exports = router;
