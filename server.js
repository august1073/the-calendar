var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
  port: 4000
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.start(function () {
  console.log('Server runnign @: ', server.info.uri);
});
