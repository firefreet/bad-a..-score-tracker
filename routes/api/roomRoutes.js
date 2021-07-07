const express = require('express');
const router = new express.Router();
const controller = require('../../controllers/roomController');
const isAuthorized = require('../../middleware/auth');

router.get('/',controller.getFirstRoom);

// './api/rooms/code/:code
router.route('/code/:code')
  .get(controller.getRoomByCode);

// './api/rooms/active/:code
router.route('/active/:code')
  .get(controller.getActiveRoom);

// './api/rooms/:id/question
router.put('/:id/:roundNum/question',controller.newQuestion);

router.put('/:id/round',controller.newRound);

// './api/rooms/answer'
router.put('/answer',controller.saveAnswer);

// /api/room/:_id/broadcast
router.put('/:_id/broadcast',controller.sendBroadcast);

// Matches => /api/rooms/create
router.route('/create') 
  .post(isAuthorized, controller.createRoom);

// Mathces => /api/rooms/populate
router.route('/populate')
  .get(isAuthorized, controller.populateRooms);

// Mathces => /api/rooms/active/:state/:id
router.route('/active/:state/:id')
  .put(isAuthorized, controller.toggleRoomActive);

// Matches => /api/rooms/answer
router.delete('/answer',controller.deleteAnswer);

// Matches => /api/rooms/points
router.put('/points', controller.editPoints);

router.put('/correct',controller.toggleCorrect);

// './api/rooms/create'
router.put('/create', controller.createRoom);

// Mathces /api/rooms/roomCode/summary
router.route('/:roomCode/summary')
  .get(controller.getGameSummary);

module.exports = router;