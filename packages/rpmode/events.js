function playerJoinHandler(player) {
    console.log(player.name + " has joined. ID:" + player.id);
    let str = player.name + " has joined. ID:" + player.id;
    mp.players.broadcast(str);
}

mp.events.add("playerJoin", playerJoinHandler);

mp.events.add('playerDeath', (player) => {
    const spawnPoints = require('./admin/spawn_points.json').SpawnPoints;

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});
