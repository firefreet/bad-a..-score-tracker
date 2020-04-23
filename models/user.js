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
  
  } catch(err) {
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
  console.log('insde findByCredentialsFunction');
  const userArray = await User.find(
    {
      email: email,
    }
  );

  let user = userArray[0];
  console.log(user);

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  console.log(isMatch);

  if (!isMatch) {
    console.log("Password mismatch");
    throw new Error("Unable to login!");
  }

  return user;
};


module.exports = User;