var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var createGameLoop = require('./app/game-loop');
var GameLogic = require('./app/game-logic');
var gameLogic = new GameLogic();

io.on('connection', function(socket) {
  console.log('client connected');

  socket.on('type', function(type) {
    console.log('socket ' + socket.id + ' is ' + type);

    if (type == 'driver') {
      var tank = gameLogic.addTank(500, 500);

      socket.on('disconnect', function() {
        gameLogic.removeTank(tank.id);
      });

      socket.on('left-throttle', function(obj) {
        // negate power because phyiscs is y-up but svg is y-down
        tank.leftThrottle(-obj.power);
      });

      socket.on('right-throttle', function(obj) {
        // negate power because phyiscs is y-up but svg is y-down
        tank.rightThrottle(-obj.power);
      });
    } else if (type == 'watcher') {
      socket.join('watchers');
    }
  });
});

var gameLoop = createGameLoop(function(delta) {
  gameLogic.update(delta);

  var state = gameLogic.getState();
  io.to('watchers').emit('state-update', state);
}, 30);

gameLoop.start();

app.use(express.static('./build'));

var port = process.env.PORT || 4000;
http.listen(port, function() {
  console.log('server listening on port ' + port);
});