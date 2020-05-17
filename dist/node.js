/*! socklnd-client - v0.1.0 - 2020-05-17 */
class SockLNDClient {
  constructor(_providedSocketIO) {
    this.io = _providedSocketIO;
    this.sails = _providedSocketIO.sails;
    this.sails.autoConnect = false;
    this.io.sails.useCORSRouteToGetCookie = false;
    this.prefix = '/api/v1';
  }

  connect(url, apiKey) {
    const opts = {
      query: 'apikey=' + apiKey
    };
    return enhanceSocket.call(this, io.sails.connect(url, opts));
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }
}


function enhanceSocket(sailsSocket) {
  const socket = sailsSocket;

  socket.subscribe = (event, data, cb) => {
    return sock.post(this.prefix + '/subscribe/' + event, data , cb);
  };



  return socket;
}

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
