 function playerJoinHandler(player) {
    console.log(player.name + " connected.");
  }

  mp.events.add("playerJoin", playerJoinHandler);

 let spawnPoints = require('./spawn_points.json').SpawnPoints;

 mp.events.add('playerDeath', (player) => {
     player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
     player.health = 100;
 });