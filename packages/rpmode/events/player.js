const auth = require("../auth/auth");
const logger = require("../logger/logger");

function playerQuitHandler(player) {
    auth.removeOnlineUser(player.id);
    logger.log.info("Player: %s disconnected", player.name)
}

mp.events.add("playerQuit", playerQuitHandler);

mp.events.add('playerDeath', (player) => {
    spawnPlayer(player)
});

mp.events.add("playerSuccessAuth", (player) => {
    spawnPlayer(player);
});

function spawnPlayer(player) {
    const spawnPoints = require('../spawn_points.json').SpawnPoints;

    player.dimension = 0;

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);

    player.heading = 180;

    player.health = 100;
}

