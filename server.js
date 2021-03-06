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

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function(err) {
  if (err) {
    throw err; //something bad happened loading the plugin
  }

  server.start(function() {
    console.log('Server running @: ', server.info.uri);
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
