mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

mp.events.addCommand('coo', (player) => {
    console.log(player.position) // return e.g. {x: 1337, y: 228, z: 70}
});

let spawnPoints = require('./spawn_points.json').SpawnPoints;

mp.events.addCommand('respawn', (player) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});

mp.events.addCommand('veh', (player, _, vehName) => {
    mp.vehicles.new(mp.joaat(vehName),player.position)
});
