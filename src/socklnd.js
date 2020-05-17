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
