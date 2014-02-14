var Hapi = require('hapi');
var Primus = require('primus');

var server = Hapi.createServer(8001, {
  files: {
    relativeTo: __dirname
  }
});

server.route({
  method: 'GET',
  path: '/js/angular-primus.js',
  config: {
    handler: function(request, reply) {
      reply.file('./../../build/angular-primus.js');
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  config: {
    handler: function(request, reply) {
      reply.file('./../static/index.html');
    }
  }
});

var primus = new Primus(server.listener, {
  transport: 'engine.io'
});

primus.on('connection', function(spark) {

  spark.write({foo: 'bar'});

  spark.data(function(data) {
    spark.write({value: data.value + 1});
  });
});

server.start();
console.log('Test server is running');
