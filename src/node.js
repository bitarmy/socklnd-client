const socketIOClient = require('socket.io-client'),
      sailsIOClient = require('sails.io.js');

class SockLNDClientWrapper extends SockLNDClient {
  constructor(io) {
    if (io === undefined) {
      io = sailsIOClient(socketIOClient);
    }
    super(io);
  }
}

module.exports = SockLNDClientWrapper;
