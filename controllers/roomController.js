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
    const { roomId, userName, answer, roundNumber, questionNumber } = answerData;
    // check the room for an answer to that question/round by that user
    RoomModel.findOne({ '_id': ObjectId(roomId) }).then(async (data) => {
      try {
        var update = false;
        // get index of the participant in the array
        const index = data.participants.findIndex(element => {
          return element.name === userName
        })
        // if user is not yet listed in the room, add them
        if (index === -1) {
          await RoomModel.updateOne({ '_id': ObjectId(roomId) }, { $push: { participants: { name: userName, responses: [] } } })
          update = await RoomModel.updateOne({ '_id': ObjectId(roomId), 'participants.name': userName }, { $push: { 'participants.$.responses': { 'answer': answer, 'questionNumber': questionNumber, 'roundNumber': roundNumber } } })

        } else {
          // check through their responses to see if this question and round already has an answer
          const prevAnswer = data.participants[index].responses.filter(element => {
            if (element.roundNumber === roundNumber && element.questionNumber === questionNumber) return true
          });
          // if it was not found
          if (prevAnswer.length === 0) {
            // add their answer in
            update = await RoomModel.updateOne({ '_id': ObjectId(roomId), 'participants.name': userName }, { $push: { 'participants.$.responses': { 'answer': answer, 'questionNumber': questionNumber, 'roundNumber': roundNumber } } })
          }
          console.log(update);
          res.json(update);
        }
      } catch (err) {
        console.log(err);
        res.json(err);
      }
    })
  }
}


module.exports = RoomController;