 function playerJoinHandler(player) {
    console.log(player.name + " has joined. ID:" + player.id);
    player.outputChatBox(player.name + " has joined. ID:" + player.id);
  }

  mp.events.add("playerJoin", playerJoinHandler);

 let spawnPoints = require('./admin/spawn_points.json').SpawnPoints;

 mp.events.add('playerDeath', (player) => {
     player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
     player.health = 100;
 });