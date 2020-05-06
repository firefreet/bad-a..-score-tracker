const jwt = require('jsonwebtoken');
const db = require('../models');
const mongojs = require("mongojs");


const isAuthroizedRoute = async (req, res, next) => {
  try {
    let value = req.headers.cookie;
    if(!value) {
      throw new Error ('USER NOT FOUND: NO COOKIE')
    }
    let cookie = value.split('user=').pop().split(';').shift();
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    const userArray = await db.User.find({
      "_id": mongojs.ObjectId(decoded.id),
      "tokens": cookie             
    });
     
    const user = userArray[0];

    if (!user) {
      throw new Error('USER NOT FOUND: NO RECORD IN DATABASE');
    }

    const populatedUser = await db.User.populateRooms(user._id);

    let updatedUser = {
      _id: populatedUser._id,
      tokens: populatedUser.tokens,
      rooms: populatedUser.rooms,
      firstName: populatedUser.firstName,
      lastName: populatedUser.lastName,
      email: populatedUser.email
    }

    req.token = cookie;
    req.user = updatedUser;
    console.log('successfully Authenticated User For Access');
    next();  
    
  } catch (err) {
    console.log('ACCESS TO ROUTE DENITED');
    res.status(404).send('Error from Auth');
  }
};

module.exports = isAuthroizedRoute;