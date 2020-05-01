const { RoomModel, User } = require('../models');
const { Types: { ObjectId } } = require('mongoose');
// RoomModel.fin

const generateRoomCode = results => {

  const chars = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ';

  let duplicateRoom = true;
  let roomNumber;

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

  return roomNumber;
}

module.exports = {

  createRoom: (req, res) => {
    RoomModel.find({})
      .then(results => {

        const newRoomCode = generateRoomCode(results);

        RoomModel.create({
          roomID: newRoomCode,
          active: true,
          admin: ObjectId(req.user._id)
        })
          .then(({ _id }) => {
            User.findOneAndUpdate(
              { "_id": ObjectId(req.user._id) },
              { $push: { rooms: _id } }, { new: true }
            )
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
              })
              .catch(err => { res.status(400).send('FAILED TO POPULATE ROOMS') })
          })
          .catch(err => { res.status(400).send('FAILED TO FIND AND UPDATE USER') })
      })
      .catch(err => { res.status(400).send('FAILED TO CREATE ROOM') });
  },

  populateRooms: (req, res) => {
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

  getFirstRoom: (req, res) => {
    RoomModel.findOne({}).then(room => {
      res.json(room);
    })
      .catch(err => {
        res.json(err);
      })
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
  getRoomByCode: (req, res) => {
    const code = req.params.code;
    RoomModel.find({ 'roomID': code, 'active': true })
      .then(room => {
        res.json(room);
      })
      .catch(err => {
        res.json(err)
      })
  },
  toggleRoomActive: async (req, res) => {
    let state = req.params.state;
    let id = req.params.id;

    try {
      let updatedRoom = await RoomModel.findByIdAndUpdate(id, { active: state }, { new: true })
    } catch (err) {
      res.status(400).send('COULDNT UPDATE ROOM STATE')
    }
    try {
      let updatedUser = await User.findById(req.user._id).populate('rooms')

      let userObj = {
        _id: updatedUser._id,
        tokens: updatedUser.tokens,
        rooms: updatedUser.rooms,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email
      }

      res.status(200).json(userObj)

    } catch (err) {
      res.status(400).send('COULDNT POPULATE ROOMS');
    }

  },
  toggleCorrect: async (req, res) => {
    let { roomId, userId, questionId, value } = req.query
    value = value === 'true' ? true : false
    try {
      const update = await RoomModel.updateOne({
        '_id': ObjectId(roomId)
      }, {
        $set: {
          'participants.$[i].responses.$[j].correctInd': value
        }
      },
        {
          'arrayFilters': [{
            'i._id': ObjectId(userId)
          }, {
            'j._id': ObjectId(questionId)
          }]
        }
      )
      res.send(update);
    } catch (err) {
      console.log(err)
      res.send(err)
    }

  },

  newQuestion: async (req, res) => {
    const { id, roundNum } = req.params;
    try {
      const update = await RoomModel.findOne(
        { '_id': ObjectId(id) },
        // { $set: { 'rounds.[i]': 5 } },
        // { 'arrayFilters': [{ 'i': roundNum }] }
        async function (err, doc) {
          doc.rounds[roundNum] = doc.rounds[roundNum] + 1
          const update = await RoomModel.updateOne({ '_id': ObjectId(id) }, { $set: { rounds: doc.rounds } });
          err ? console.log(err) : false;
          res.send(doc.rounds[roundNum] + "");
        }
      );
    } catch (err) {
      console.log(err);
    }
  },

  newRound: async (req, res) => {
    try {
      const { id } = req.params;
      await RoomModel.updateOne({ '_id': ObjectId(id) }, { $push: { rounds: 1 } })
      const updated = await RoomModel.findOne({ '_id': ObjectId(id) })
      res.send(updated.rounds);
    }
    catch (err) {
      console.log(err);
    }
  },
  sendBroadcast: (req, res) => {
    // console.log('inside roomController -> sendBroadcast');
    const { _id } = req.params;
    // console.log(req.body);
    const { broadcast } = req.body;
    // console.log(broadcast);

    RoomModel.updateOne({ '_id': ObjectId(_id) }, { $set: { 'broadcast': broadcast } })
      .then(update => {
        res.status(200).send(update);
      })
      .catch(err => {
        console.log('Error on room update inside roomController-> sendBroadcast')
        console.log(err);
        res.send(err);
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
          res.json(update);
        }
      } catch (err) {
        console.log(err);
        res.json(err);
      }
    })
  },
  deleteAnswer: (req,res)=>{
    const {roomId,userId,questionId}= req.query;
    RoomModel.updateOne({'_id': ObjectId(roomId)},
    {
      $pull: {
        'participants.$[i].responses': {'_id': ObjectId(questionId)}
      }
    },
    {'arrayFilters': [
      {'i._id': ObjectId(userId)}
    ]}
    )
    .then(delRes=>{res.status(200).send(delRes)})
    .catch(err=>{
      console.log('Error from deleteAnswer inside roomController');
      console.log(err);
      res.status(409).send(err);
    })
  },
  getGameSummary: async (req, res) => {
    let roomCode = req.params.roomCode;
    let participantNames = await RoomModel.find({ roomID: roomCode }).distinct('name');
    console.log(participantNames);
  }
}