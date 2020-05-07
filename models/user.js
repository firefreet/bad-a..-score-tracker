const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First is Required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last is Required"],
  },
  email: {
    type: String,
    unique: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    }
  ],
  password: {
    type: String,
    trim: true,
    required: true,
  },
  passResetCode: {
    type: String
  },
  tokens: {
    type: String,
    default: null,
  },
  userCreated: {
    type: Date,
    default: Date.now //takes a function or a value
  }
});

const User = mongoose.model("User", UserSchema);

///////////////////////////
// PROTOTYPE FUNCIONS
///////////////////////////

User.prototype.generateAuthToken = async function () {

  try {
    const user = this;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.tokens = token;
    await user.save();

    return user.tokens;

  } catch (err) {
    console.log(err);
    return err;
  }

};

User.prototype.toJSON = function () {
  const userArray = this;
  const userObject = { ...userArray };

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

User.findByCredentials = async (email, password) => {

  const userArray = await User.find(
    {
      email: email,
    }
  );

  let user = userArray[0];

  if (!user) {
    return 'Email address not found.';
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return 'Incorrect password.';
  }

  return user;
};

User.populateRooms = async(id) => {
  let user = await User.findById(id)
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
    return userObj;
  });
  return user;
}



module.exports = User;