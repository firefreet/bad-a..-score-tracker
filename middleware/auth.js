const jwt = require('jsonwebtoken');
const db = require('../models');
const mongojs = require("mongojs");


const isAuthroizedRoute = async (req, res, next) => {
  try {
    console.log('Authenticating User For Access');
    let value = req.headers.cookie;

    if(!value.includes('user=')) {
      throw new Error ('USER NOT FOUND: NO COOKIE')
    }

    let cookie = value.split('user=').pop().split(';').shift();
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    const userArray = await db.User.find({
      _id: mongojs.ObjectId(decoded.id),
      tokens: cookie             
    });
     
    const user = userArray[0];

    if (!user) {
      throw new Error('USER NOT FOUND: NO RECORD IN DATABASE');
    }

    req.token = cookie;
    req.user = user;
    console.log('success');
    next();  
    
  } catch (err) {
    console.log('ACCESS TO ROUTE DENITED');
  }
};

module.exports = isAuthroizedRoute;