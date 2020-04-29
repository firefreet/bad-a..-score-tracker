const db = require('../models');
const bcrypt = require("bcryptjs");


module.exports = {
  register: async function (req, res) {
    try {
      let hashedPassword = await bcrypt.hash(req.body.password, 8);

      let userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      }

      let newUser = await db.User.create(userData);
      let token = await newUser.generateAuthToken();
      res.status(200).send({user: newUser, token});

    } catch (e) {
      res.status(400).send('ERROR FROM REGISTER FUNCTION');
    }
  },
  login: async function (req, res) {
    try {
      const user = await db.User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
    
      const populatedUser = await db.User.populateRooms(user._id);

      res.status(200).send({ populatedUser, token });
    } catch (err) {
      res.status(400).send('ERROR FROM LOGIN FUNCTION');
    }
  },
  getAuthorizedUser: async function (req, res) {
    try {
      if (req.user) {
        console.log('successfully gathered');
        res.status(200).send(req.user);
      } 
    } catch (err) {
      res.status(400).send("USER IS NOT LOGGED IN");
    }
  },
  logOut: async function (req, res) {
    let user = await db.User.findByIdAndUpdate(req.user._id, {tokens: ''}, {new: true})
    console.log(user);
    req.user=null
    req.token=null
    res.status(200).send('LOGGED OUT');

  }
}