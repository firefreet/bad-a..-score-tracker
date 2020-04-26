require("dotenv").config(); //environment variables
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const socketEvents = require('./routes/socket/socket.js');
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/triviodb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  });

// Start the API server
const server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// set up socket.io on the running server 
const io = require('socket.io').listen(server);
// run socket event methods from external module
socketEvents(io).attachEventHandlers();

// create a room if not exists
const db = require('./models');
db.RoomModel.findOneAndUpdate({roomID:"not yo mama's room id..."},{},{upsert:true, setDefaultsOnInsert: true},(err,doc)=>{
  err? console.log('cant create update doc') : console.log(doc)
})
