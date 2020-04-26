const express = require('express');
const router = new express.Router();
const controller = require('../../controllers/roomController');
const isAuthroizedRoute = require('../../middleware/auth');

router.get('/',controller.getFirstRoom);

// './api/rooms/:id'
router.get('id/:id',controller.getRoom);

// './api/rooms/answer'
router.put('/answer',controller.saveAnswer);

// Matches => /api/rooms/create
router.route('/create') 
  .post(isAuthroizedRoute, controller.createRoom);

// Mathces => /api/rooms/populate
router.route('/populate')
  .get(isAuthroizedRoute, controller.populateRooms);

// router.delete('/answer',controller.deleteAnswer);

module.exports = router;