const jwt = require('jsonwebtoken');
const db = require('../models');
const mongojs = require("mongojs");


function getCookie(req, name) {
  var value = '; ' + req.headers.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return JSON.parse(parts.pop().split(';').shift());
  }
}

const isAuthenticated = async (req, res, next) => {
  try {
    let userToken = getCookie(req, 'user').token;
    console.log(userToken);
    // const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    const userArray = await db.User.find({
      where: {
        _id: mongojs.ObjectId(decoded.id),
        tokens: userToken
      }
    });

    const user = userArray[0];
    
    if (!user) {
      throw new Error('USER NOT FOUND');
    }

    req.token = userToken;
    req.user = user;
    next();
  } catch (err) {
    console.log('error redirecting home');
    console.log(err);
    res.redirect(`/login?message=${err}`);
    // res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = isAuthenticated;