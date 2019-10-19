function playerAuthHandler(player) {
    console.log(player.name + " has joined. ID:" + player.id);
    player.outputChatBox(player.name + " has joined. ID:" + player.id);
    player.spawn(false);
    //spawnPlayer(player)
}

mp.events.add("playerJoin", playerJoinHandler);

mp.events.add('playerDeath', (player) => {
    spawnPlayer(player)
});

function spawnPlayer(player) {
    const spawnPoints = require('./spawn_points.json').SpawnPoints;

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
}