module.exports = (server) => {
  require('dotenv').config();
  const jwtSecret = process.env.JWT_SECRET;
  const io = require('socket.io')(server);
  const { authorize } = require('@thream/socketio-jwt');
  
  io.sockets.use(
    authorize({
      secret: jwtSecret
    })
  )

  io.sockets.on('connection', async(socket) =>{
      console.log(socket.decodedToken);
  });
}

// module.exports = io;