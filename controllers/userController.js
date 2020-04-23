const db = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongojs = require("mongojs");


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
      res.status(200).send({ user, token });
    } catch (err) {
      res.status(400).send('ERROR FROM LOGIN FUNCTION');
    }
  },
  isAuthenticated: async function (req, res) {
    try {
      console.log('in isauthenticaed function')
      var value = '; ' + req.headers.cookie;
      var cookie = JSON.parse(value.split('; user=').pop().split(';').shift());
      const decoded = jwt.verify(cookie.tokens, process.env.JWT_SECRET);

      res.status(200).send(true);

    } catch (err) {
      res.status(400).send("USER IS NOT LOGGED IN");
    }
  }
}