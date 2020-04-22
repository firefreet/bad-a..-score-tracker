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
  }
}