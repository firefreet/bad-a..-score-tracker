const { RoomModel } = require('../models');
const { Types: { ObjectId } } = require('mongoose');
RoomModel.fin

RoomController = {

  getRoom: (req, res) => {
    const id = req.params.id;
    RoomModel.find({ "_id": ObjectId(id) })
      .then(room => {
        res.json(room);
      })
      .catch(err => {
        res.json(err);
      })
  },

  saveAnswer: (req, res) => {
    const answerData = req.body;
    console.log(answerData);
    const { roomId, userName, answer, roundNumber, questionNumber } = answerData;
    // check the room for an answer to that question/round by that user
    RoomModel.find({ '_id': ObjectId(roomId), 'participants.name': userName, 'participants.responses.roundNumber': roundNumber, 'participants.responses.questionNumber': questionNumber  }).then((data)=>{
      // if it is not found
      if(data.length === 0) {
        // add their answer in
        RoomModel.updateOne({ '_id': ObjectId(roomId), 'participants.name': userName }, { $push: { 'participants.$.responses': { 'answer': answer, 'questionNumber': questionNumber, 'roundNumber': roundNumber } } })
        .then(update => {
          console.log(update);
          res.json(update);
        })
        .catch(err => {
          console.log(err);
          res.json(err);
        })  
      }
    }).catch(err => {
      console.log(err);
      res.json(err);
    })
  }
}


module.exports = RoomController;