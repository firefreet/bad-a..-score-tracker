const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  active: { type: Boolean },

  roomID: { type: String, default: "" },
 
  admin: { type: String },

  rounds: [{
    numberOfQuestions: { type: Number, default: 1}
  }],

  participants: [{
    name: { type: String },
    responses: [{
      roundNumber: { type: Number},
      questionNumber: { type: Number},
      answer: { type: String},
      points: { type: Number, default: 3},
      wager: { type: Number, default: 1},
      correctInd: { type: Boolean, default: false }
    }]
  }]
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
