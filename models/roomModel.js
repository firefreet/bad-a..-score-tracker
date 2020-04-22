const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  active: { type: Boolean },
  roomID: { type: String, default: "" },
  admin: { type: String },
  currentRound: { type: Number },
  currentQuestionNumber: { type: Number },
  participants: [
    {
      name: { type: String },
      responses: [
        {
          roundNumber: { type: Number },
          questionNumber: { type: Number },
          answer: { type: String },
          points: { type: String },
          wager: { type: Boolean, default: false },
          correctInd: { type: Boolean, default: false }
        }
      ]
    }
  ]
})

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;