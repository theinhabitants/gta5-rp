const npcName = ["Бомж", "Какой-то тип", "Охранник аэропорта"];

const spawnCoordinates = [
    {
        position: new mp.Vector3(143.87, -1192.43, 29.62),
        positionHeading: 15.66,

        upBed: new mp.Vector3(145.01, -1191.67, 29.41),
        upBedHeading: 1.81
    },
    {
        position: new mp.Vector3(158.96, -1679.12, 30.47),
        positionHeading: 322.27,

        upBed: new mp.Vector3(159.85, -1679.06, 29.77),
        upBedHeading: 310.76
    },
    {
        position: new mp.Vector3(-1063.37, -2545.52, 14.49),
        positionHeading: 239.40,

        upBed: new mp.Vector3(-1063.26, -2546.62, 13.94),
        upBedHeading: 243.12
    }
];

mp.events.add("enterWayInServer", (player, way) => {
    const npcPhrase = [
        [
            "Эй ты, "+ player.name +", подойди ко мне, я хочу тебе кое-что сказать"
        ],
        [
            "Братишка "+ player.name +", ну-ка подойди, нужно перетереть с тобой несколько"
        ],
        [
            "Ну-ка, "+ player.name +", встал оттуда, и подошел ко мне, быстро!"
        ],
    ];

    const thisWay = way - 1;

    player.heading = spawnCoordinates[thisWay].positionHeading;
    player.position = spawnCoordinates[thisWay].position;

    player.dimension = 0;

    player.health = 100;

    player.playAnimation("timetable@tracy@sleep@", "idle_c", 1, 1);

    setTimeout(() => {
        player.position = spawnCoordinates[thisWay].upBed;
        player.heading = spawnCoordinates[thisWay].upBedHeading;
        player.playAnimation('switch@franklin@bed', 'bed_reading_getup_facial', 1, 1);
        setTimeout(() => {
            player.stopAnimation();
            player.call("moveCameraToNPC", [thisWay]);
            player.outputChatBox(npcName[thisWay] + ": " + npcPhrase[thisWay][0]);
        }, 1000);
    }, 5000);
});

mp.events.addCommand('anim', (player, args) => {
    args = args.split(" ");
    const firstID = args[0];
    const secondID = args[1];
    const thirdID = parseInt(args[2]);
    const four = parseInt(args[2]);

    player.playAnimation(firstID, secondID, thirdID, four);
});

mp.events.addCommand('stopanim', (player) => {
    player.stopAnimation();
});

mp.events.addCommand('pos', (player, args) => {
    const thirdID = parseFloat(args[0]);
    const four = parseFloat(args[1]);

    player.position = new mp.Vector3(player.position.x-thirdID, player.position.y-four, player.position.z)
});