# SockLND-client
Client for SockLND server

[![NPM version](https://badge.fury.io/js/socklnd-client.svg)](http://badge.fury.io/js/socklnd-client) &nbsp; &nbsp;

JavaScript SDK for communicating w/ SockLND via sockets from Node.js or the browser.
It's a Wrapper for Sails.io and Socket.io with straighforward funcionality with the SockLND API.


## For Node.js

> **Why would I use this from a Node script?**
>
> Most commonly, this SDK is useful on the backend when writing tests.  However, any time you'd want to use a WebSocket or Socket.io client from Node to talk to a SockLND server, you can use this module to allow for the ordinary usage you're familiar with in the browser-- namely using the socket interpreter to simulate HTTP over WebSockets.

### Installation

```sh
$ npm install socklnd-client --save
```

### Basic Usage

```js
const SockLNDClient = require('socklnd-client');

const socklnd = new SockLNDClient();
const apikey = 'user_22b312c731ea62671674a4a2164c434e';

let socket = socklnd.connect('http://localhost:1337/', apikey);

socket.subscribe('payment', {
  paymentHash: 'SOME_PAYMENT_HASH'
});

socket.on('payment', function (invoice) {
  console.dir('Invoice payed!');
  console.dir(invoice);
});
```

========================================


## For the browser

The `socklnd.js` and `socklnd.min.js` files can be found in `dist` directory or be generated with `grunt build`.  You can just use the following script and use a hosted CDN.


```html
  </body>

  <!-- Import SDK from CDN -->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/socklnd-client@0.5.1/dist/socklnd-client.min.js"></script>

  <!-- Example usage -->
  <script type="text/javascript">
    const apikey = 'user_22b312c731ea62671674a4a2164c434e'; // Use your api key generated by socklnd-server
    // Global variale socklnd
    let socket = socklnd.connect('http://localhost:1337/', apikey); // Change host for your server
    
    socket.subscribe('payment', {
      paymentHash: 'SOME_PAYMENT_HASH' // Payment hash for the invoice to wait for
    });

    socket.on('payment', function (invoice) {
      console.dir('Invoice payed!');
      console.dir(invoice);
    });
  </script>
</html>
```


========================================

## Advanced usage

The `socklnd` global object contains `sails` and `io` properties. You can use them to extend functionality and access updated features.

###### `autoConnect` has been disabled by default

###### Change the `transports` used to connect to the server

In some cases you may want to change the transorts that the socket client uses to connect to the server, and vice versa.  For instance, some server environments--*notably Heroku*--do not support "sticky load balancing", causing the "polling" transport to fail.  In these cases, you should first [change the transports listed in the `config/sockets.js` file](http://sailsjs.com/documentation/reference/sails-config/sails-config-sockets#?advanced-configuration) in your Sails app.  Then change the transports in the client by setting `io.sails.transports`:

```html
<script type="text/javascript" src="/dependencies/sails.io.js"></script>
<script type="text/javascript">
  io.sails.transports = ['websocket'];
</script>
```

###### Muting console.log messages

Sails.io.js console.log messages are automatically muted in production environments.  You can set the environment manually via `io.sails.environment`:

```html
<script type="text/javascript" src="/dependencies/sails.io.js"></script>
<script type="text/javascript">
  io.sails.environment = 'production';
</script>
```

If not specified manually, socklnd.js will assume the `development` environment unless it is loaded from a URL that ends in `*.min.js` or `#production`, e.g. `production.min.js` or `scripts.js#production`.
