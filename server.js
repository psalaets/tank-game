var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var createGameLoop = require('./app/game-loop');
var GameLogic = require('./app/game-logic');
var gameLogic = new GameLogic();

var vec2 = require('vec2');

setInterval(function() {
  console.log('firing...')
  gameLogic.shoot(400, 400, vec2(0, -1));
}, 5000)

io.on('connection', function(socket) {
  console.log('client connected');

  socket.on('type', function(type) {
    console.log('socket ' + socket.id + ' is ' + type);

    if (type == 'watcher') {
      socket.join('watchers');
    } else {
      var tank = gameLogic.addTankRandomly();

      socket.on('disconnect', function() {
        gameLogic.removeTank(tank.id);
      });

      if (type == 'driver') {
        socket.on('left-throttle', function(obj) {
          // negate power because phyiscs is y-up but svg is y-down
          tank.setLeftThrottle(-obj.power);
        });

        socket.on('right-throttle', function(obj) {
          // negate power because phyiscs is y-up but svg is y-down
          tank.setRightThrottle(-obj.power);
        });
      } else if (type == 'gunner') {
        socket.on('turret-throttle', function(obj) {
          tank.setTurretThrottle(obj.power);
        });
      }
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