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
    console.log(player.position); // return e.g. {x: 1337, y: 228, z: 70}
});

mp.events.addCommand('respawn', (player) => {
    const spawnPoints = require('../spawn_points.json').SpawnPoints;

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});

mp.events.addCommand('veh', (player, _, vehName) => {
    mp.vehicles.new(mp.joaat(vehName), player.position);
});

mp.events.addCommand('tp', (player, args) => {
    args = args.split(" ");
    const first = parseInt(args[0]);
    const second = parseInt(args[1]);
    const third = parseInt(args[2]);
    const fourth = parseInt(args[2]);

    switch (args.length) {
        case 1:
            player.spawn(mp.players.at(first).position);
            player.outputChatBox("Вы телепортировались к: " + getPlayerNameWithID(mp.players.at(first)));
            break;
        case 2:
            const firstPlayer = mp.players.at(first);
            const secondPlayer = mp.players.at(second);

            mp.players.at(first).spawn(mp.players.at(second).position);
            player.outputChatBox(getPlayerNameWithID(firstPlayer) + " телепортирован к " + getPlayerNameWithID(secondPlayer));
            break;
        case 3:
            const newPos = Vector3Mp;
            newPos.x = first;
            newPos.y = second;
            newPos.z = third;

            player.spawn(newPos);
            player.outputChatBox("Вы телепортировались на координаты: " + newPos.toString());
            break;
        case 4:
            const newPos2 = Vector3Mp;
            newPos2.x = second;
            newPos2.y = third;
            newPos2.z = fourth;

            player.spawn(newPos2);
            player.outputChatBox(getPlayerNameWithID(mp.players.at(first)) + " телепортирован на координаты " + newPos.toString());
            break;
        default:
            player.outputChatBox("Ошибка! Используйте /tp [id] или /tp [id] [id] или /tp [x] [y] [z] или /tp [id] [x] [y] [z]");
    }
});

function getPlayerNameWithID(player) {
    return `${player.name} (${player.id})`;
}
