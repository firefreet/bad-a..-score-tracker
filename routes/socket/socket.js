module.exports = function (io) {
  return {
    attachEventHandlers: function () {
      io.on('connection', (socket) => {
        // console.log('a user connected');
        socket.on('chat message', (msg) => {
          console.log('message: ' + msg)
        });

        socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
        });

        socket.on('new update',(content)=>{
          io.emit('new update',content);
        })

        socket.on('disconnect', () => {
          // console.log('user disconnected');
        });
      });
    }
  }
}
