const db = require('../models');
const bcrypt = require("bcryptjs");
const mailer = require('./mailer');

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

      let newUser = await db.User.create(userData)
        // .then(response => {
          // console.log(newUser.email);
          mailer.sendWelcomeEmail(newUser.email);
        // });
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

      // if an error string is returned instead of a user object:
      if (typeof(user) === 'string') {
        res.send(user);
      } else { // valid user object

        const token = await user.generateAuthToken();
      
        const populatedUser = await db.User.populateRooms(user._id);

        res.status(200).send({ populatedUser, token });
      }
    } catch (err) {
      res.status(400).send('ERROR FROM LOGIN FUNCTION');
    }
  },
  getAuthorizedUser: async function (req, res) {
    try {
      if (req.user) {
        console.log('successfully gathered user data');
        res.status(200).send(req.user);
      } 
    } catch (err) {
      res.status(400).send("USER IS NOT LOGGED IN");
    }
  },
  logOut: async function (req, res) {
    let user = await db.User.findByIdAndUpdate(req.user._id, {tokens: ''}, {new: true})
    req.user=null
    req.token=null
    res.status(200).send('LOGGED OUT');

  },
  sendPassEmail: async (req, res) => {
    // generate random string
    const bufStr = require('crypto').randomBytes(32).toString('hex');

    try {
      // save random bufStr to user in db
      const filter = {email: req.body.email};
      const update = {passResetCode: bufStr};
      const user = await db.User.findOneAndUpdate(filter, update);

      // send password reset email
      mailer.sendPassReset(user._id, user.email, bufStr);
      res.send('Email sent.');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error finding user.');
    }
  },
  resetPass: async (req, res) => {
    const filter = {
      _id: req.body._id,
      passResetCode: req.body.passResetCode
    }
    if (filter.passResetCode === '')
      res.send('No reset code provided.');

    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const update = {
      password: hashedPassword,
      passResetCode: ''
    }

    db.User.findOneAndUpdate(filter, update)
      .then(() => {
        res.send('Password updated');
      })
      .catch(() => {
        res.status(500).send('Uh oh! Something went wrong server side.');
      })
  }
}