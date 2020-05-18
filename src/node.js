const socketIOClient = require('socket.io-client'),
      sailsIOClient = require('sails.io.js');

class SockLNDClientWrapper extends SockLNDClient {
  constructor (enhancedIO) {
    if (enhancedIO === undefined) {
      enhancedIO = sailsIOClient(socketIOClient);
    }
    super(enhancedIO);
  };
}

module.exports = SockLNDClientWrapper;
