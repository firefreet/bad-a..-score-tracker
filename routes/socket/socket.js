module.exports = function (io) {
  return {
    attachEventHandlers: function () {
      console.log('is this running?');
      io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('chat message', (msg) => {
          console.log('message: ' + msg)
        });

        socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    }
  }
}
