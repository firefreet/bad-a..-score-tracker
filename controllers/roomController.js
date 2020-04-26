const { RoomModel, User } = require('../models');
const { Types: { ObjectId } } = require('mongoose');
RoomModel.fin

module.exports = {

  createRoom: (req, res) => {
    console.log('inside create room function')
    console.log(req.body);
    let room = req.body;
    room.admin = ObjectId(req.user.id);

    RoomModel.create(room)
      .then(( { _id } ) => User.findOneAndUpdate({ 
        "_id": ObjectId(req.user.id) 
      }, {$push: { rooms: _id } }, { new: true }))
        .then(user => {
          User.findById(user._id)
            .populate('rooms')
            .then(user => {
              let userObj = {
                _id: user._id,
                tokens: user.tokens,
                rooms: user.rooms,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
              }
              res.status(200).json(userObj);
            })
            .catch(err => {console.log(err)})
        })
        .catch(err => {res.status(400).json(err);})
  },

  populateRooms: (req, res) => {
    console.log('in populate function');
    User.findById(req.user._id)
      .populate('rooms')
      .then(user => {
        let userObj = {
          _id: user._id,
          tokens: user.tokens,
          rooms: user.rooms,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
        res.status(200).json(userObj);
      })
      .catch(err => {
        res.status(400).json(err);
      })
  },

  getFirstRoom: (req,res)=>{
    RoomModel.findOne({}).then(room=>{
      res.json(room);
    })
    .catch(err=>{
      res.json(err);
    })
  },

  // creates a randomly generated 4 digit room number
  createRoom: (req, res) => {
    // if letters stay lowercase it reduces some confusion
    // also, 0, o, 1, i , and l aren't used due to possible text confusion
    // 4 digit room numbers with 31 possible characters:
    // 31 * 31 * 31 * 31 = 923,521 possible room numbers
    const chars = '23456789abcdefghjkmnpqrstuvwxyz';

    // get all rooms
    RoomModel.find({})
      .then(results => {

        // variable to exit while loop
        let duplicateRoom = true;
        let roomNumber = '';
        while (duplicateRoom) {

          // generate a new 4 digit random room number
          roomNumber = '';
          for (let i = 0; i < 4; i++) {
            const rand = Math.floor(Math.random() * chars.length);
            roomNumber += chars.charAt(rand);
          }

          duplicateRoom = false;
          // loop through all current room numbers to verify
          // that the new room number is unique
          for (let i = 0; i < results.length; i++) {
            if (results[i].roomID === roomNumber) {
              // if the room number happens to exist already,
              // restart the while loop to generate a new number
              duplicateRoom = true;
              console.log('duplicate room found');
              break;
            }
          }
        }
        res.send(roomNumber);
      })
      .catch(err => {
        res.json(err);
      });
  },

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