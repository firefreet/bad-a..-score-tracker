const express = require('express');
const router = new express.Router();
const controller = require('../../controllers/roomController');
const isAuthorized = require('../../middleware/auth');

router.get('/',controller.getFirstRoom);

// './api/rooms/:id'
router.get('/id/:id',controller.getRoom);

// './api/rooms/:id/question
router.put('/:id/:roundNum/question',controller.newQuestion);

router.put('/:id/round',controller.newRound);

// './api/rooms/answer'
router.put('/answer',controller.saveAnswer);

// Matches => /api/rooms/create
router.route('/create') 
  .post(isAuthorized, controller.createRoom);

// Mathces => /api/rooms/populate
router.route('/populate')
  .get(isAuthorized, controller.populateRooms);

// router.delete('/answer',controller.deleteAnswer);

router.put('/correct',controller.toggleCorrect);

// './api/rooms/create'
router.put('/create', controller.createRoom);

module.exports = router;