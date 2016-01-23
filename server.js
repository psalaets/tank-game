var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var createGameLoop = require('./app/game-loop');
var GameLogic = require('./app/game-logic');
var TankMappings = require('./app/tank-mappings');

var leaveCommand = require('./app/commands').leave;
var gameLogic = new GameLogic();
var tankMappings = new TankMappings();

function processCommand(command, socket) {
  var type = command.type;
  var data = command.data;
  var playerId = socket.id;

  console.log('===============');
  console.log('type:     ' + type);
  console.log('playerId: ' + playerId);
  console.log(data);

  switch (type) {
    case 'join':
      if (data.role == 'watcher') {
        socket.join('watchers');
      } else if (data.role == 'gunner') {
        var tankId = tankMappings.findGunnerlessTank();
        if (!tankId) {
          var tank = gameLogic.addTankRandomly();
          tankId = tank.id;
        }

        tankMappings.assignGunner(playerId, tankId);
      } else if (data.role == 'driver') {
        var tankId = tankMappings.findDriverlessTank();
        if (!tankId) {
          var tank = gameLogic.addTankRandomly();
          tankId = tank.id;
        }

        tankMappings.assignDriver(playerId, tankId);
      }
      break;
    case 'leave':
      tankMappings.removePlayer(playerId);

      var emptyTankId;
      while (emptyTankId = tankMappings.findEmptyTank()) {
        tankMappings.unregisterTank(emptyTankId);
        gameLogic.removeTank(emptyTankId);
      }

      break;
    case 'turret-throttle':
      if (tankMappings.isGunner(playerId)) {
        var tank = gameLogic.getTank(tankMappings.findTankOf(playerId));
        tank.setTurretThrottle(data.power);
      }

      break;
    case 'start-firing':
      if (tankMappings.isGunner(playerId)) {
        var tank = gameLogic.getTank(tankMappings.findTankOf(playerId));
        tank.startFiring();
      }

      break;
    case 'stop-firing':
      if (tankMappings.isGunner(playerId)) {
        var tank = gameLogic.getTank(tankMappings.findTankOf(playerId));
        tank.stopFiring();
      }

      break;
    case 'left-throttle':
      if (tankMappings.isDriver(playerId)) {
        var tank = gameLogic.getTank(tankMappings.findTankOf(playerId));
        // negate power because physics is y-up but svg is y-down
        tank.setLeftThrottle(-data.power);
      }

      break;
    case 'right-throttle':
      if (tankMappings.isDriver(playerId)) {
        var tank = gameLogic.getTank(tankMappings.findTankOf(playerId));
        // negate power because physics is y-up but svg is y-down
        tank.setRightThrottle(-data.power);
      }

      break;
  }
}

io.on('connection', function(socket) {
  console.log('socket.io: client connected');

  socket.on('command', function(command) {
    processCommand(command, socket);
  });

  socket.on('disconnect', function() {
    processCommand(leaveCommand(), socket);
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