const npcName = ["Жук", "Стивен", "Игого"];

mp.events.add("enterWayInServer", (player) => {
    const npcPhrase = [
        [
            "Эй ты, "+ player.name +", подойди ко мне, нужно перетереть с тобой несколько"
        ],
    ];

    player.heading = 12.25;
    player.position = new mp.Vector3(160.58, -1191.600, 29.76);

    player.dimension = 0;

    player.health = 100;

    player.playAnimation('mp_bedmid', 'f_sleep_l_loop_bighouse', 1, 1);

    setTimeout(() => {
        player.position = new mp.Vector3(159.88, -1191.31, 29.37);
        player.heading = 102.17;
        player.playAnimation('switch@franklin@bed', 'bed_reading_getup_facial', 1, 1);
        setTimeout(() => {
            player.stopAnimation();
            player.call("moveCameraToNPC");
            player.outputChatBox(npcName[0] + ": " + npcPhrase[0][0]);
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