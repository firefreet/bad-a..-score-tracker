const express = require('express');
const router = new express.Router();
const controller = require('../../controllers/roomController');

router.get('/:id',controller.getRoom);

router.put('/answer',controller.saveAnswer);

// router.delete('/answer',controller.deleteAnswer);

module.exports = router;