const express = require('express');
const router = new express.Router();
const controller = require('../../controllers/roomController');

router.get('/',controller.getFirstRoom);

// './api/rooms/:id'
router.get('/:id',controller.getRoom);

// './api/rooms/answer'
router.put('/answer',controller.saveAnswer);

// router.delete('/answer',controller.deleteAnswer);

router.put('/correct',controller.toggleCorrect);

module.exports = router;