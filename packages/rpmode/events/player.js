auth = require("../auth/auth");
logger = require("../logger/logger");

function playerJoinHandler(player) {
    console.log(player.name + " has joined. ID:" + player.id);
    let str = player.name + " has joined. ID:" + player.id;
    mp.players.broadcast(str);
}

mp.events.add("playerJoin", playerJoinHandler);

function playerQuitHandler(player) {
    auth.removeOnlineUser(player.id);
    logger.log.info("Player: %s disconnected", player.name)
}

mp.events.add("playerQuit", playerQuitHandler);

mp.events.add('playerDeath', (player) => {
    spawnPlayer(player)
});

mp.events.add("playerSuccessAuth", (player) => {
    //spawnPlayer(player)
});

function spawnPlayer(player) {
    const spawnPoints = require('../spawn_points.json').SpawnPoints;

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
}