const express = require('express');
const router = express.Router();
const requestController = require('./request.controller');

/* GET tags. */
router.get('/', requestController.get);

/* GET tag by id. */
router.get('/:id', requestController.getById);

/* POST tag */
router.post('/', requestController.create);

/* PUT tag */
router.put('/:id', requestController.update);

/* DELETE tag */
router.delete('/:id', requestController.remove);

module.exports = router;
