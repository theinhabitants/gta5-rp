let characterUI;

const hairList = [
    // male
    [
        {ID: 0, Name: "Close Shave", Collection: "mpbeach_overlays", Overlay: "FM_Hair_Fuzz"},
        {ID: 1, Name: "Buzzcut", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_001"},
        {ID: 2, Name: "Faux Hawk", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_002"},
        {ID: 3, Name: "Hipster", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_003"},
        {ID: 4, Name: "Side Parting", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_004"},
        {ID: 5, Name: "Shorter Cut", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_005"},
        {ID: 6, Name: "Biker", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_006"},
        {ID: 7, Name: "Ponytail", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_007"},
        {ID: 8, Name: "Cornrows", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_008"},
        {ID: 9, Name: "Slicked", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_009"},
        {ID: 10, Name: "Short Brushed", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_013"},
        {ID: 11, Name: "Spikey", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_002"},
        {ID: 12, Name: "Caesar", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_011"},
        {ID: 13, Name: "Chopped", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_012"},
        {ID: 14, Name: "Dreads", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_014"},
        {ID: 15, Name: "Long Hair", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_015"},
        {ID: 16, Name: "Shaggy Curls", Collection: "multiplayer_overlays", Overlay: "NGBea_M_Hair_000"},
        {ID: 17, Name: "Surfer Dude", Collection: "multiplayer_overlays", Overlay: "NGBea_M_Hair_001"},
        {ID: 18, Name: "Short Side Part", Collection: "multiplayer_overlays", Overlay: "NGBus_M_Hair_000"},
        {ID: 19, Name: "High Slicked Sides", Collection: "multiplayer_overlays", Overlay: "NGBus_M_Hair_001"},
        {ID: 20, Name: "Long Slicked", Collection: "multiplayer_overlays", Overlay: "NGHip_M_Hair_000"},
        {ID: 21, Name: "Hipster Youth", Collection: "multiplayer_overlays", Overlay: "NGHip_M_Hair_001"},
        {ID: 22, Name: "Mullet", Collection: "multiplayer_overlays", Overlay: "NGInd_M_Hair_000"},
        {ID: 24, Name: "Classic Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_000"},
        {ID: 25, Name: "Palm Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_001"},
        {ID: 26, Name: "Lightning Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_002"},
        {ID: 27, Name: "Whipped Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_003"},
        {ID: 28, Name: "Zig Zag Cornrows", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_004"},
        {ID: 29, Name: "Snail Cornrows", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_005"},
        {ID: 30, Name: "Hightop", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_006"},
        {ID: 31, Name: "Loose Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_000_M"},
        {ID: 32, Name: "Undercut Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_001_M"},
        {ID: 33, Name: "Undercut Swept Side", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_002_M"},
        {ID: 34, Name: "Spiked Mohawk", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_003_M"},
        {ID: 35, Name: "Mod", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_004_M"},
        {ID: 36, Name: "Layered Mod", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_005_M"},
        {ID: 72, Name: "Flattop", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_M_000_M"},
        {ID: 73, Name: "Military Buzzcut", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_M_001_M"}
    ],
    // female
    [
        {ID: 0, Name: "Close Shave", Collection: "mpbeach_overlays", Overlay: "FM_Hair_Fuzz"},
        {ID: 1, Name: "Short", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_001"},
        {ID: 2, Name: "Layered Bob", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_002"},
        {ID: 3, Name: "Pigtails", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_003"},
        {ID: 4, Name: "Ponytail", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_004"},
        {ID: 5, Name: "Braided Mohawk", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_005"},
        {ID: 6, Name: "Braids", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_006"},
        {ID: 7, Name: "Bob", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_007"},
        {ID: 8, Name: "Faux Hawk", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_008"},
        {ID: 9, Name: "French Twist", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_009"},
        {ID: 10, Name: "Long Bob", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_010"},
        {ID: 11, Name: "Loose Tied", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_011"},
        {ID: 12, Name: "Pixie", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_012"},
        {ID: 13, Name: "Shaved Bangs", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_013"},
        {ID: 14, Name: "Top Knot", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_014"},
        {ID: 15, Name: "Wavy Bob", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_015"},
        {ID: 16, Name: "Messy Bun", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_000"},
        {ID: 17, Name: "Pin Up Girl", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_001"},
        {ID: 18, Name: "Tight Bun", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_007"},
        {ID: 19, Name: "Twisted Bob", Collection: "multiplayer_overlays", Overlay: "NGBus_F_Hair_000"},
        {ID: 20, Name: "Flapper Bob", Collection: "multiplayer_overlays", Overlay: "NGBus_F_Hair_001"},
        {ID: 21, Name: "Big Bangs", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_001"},
        {ID: 22, Name: "Braided Top Knot", Collection: "multiplayer_overlays", Overlay: "NGHip_F_Hair_000"},
        {ID: 23, Name: "Mullet", Collection: "multiplayer_overlays", Overlay: "NGInd_F_Hair_000"},
        {ID: 25, Name: "Pinched Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_000"},
        {ID: 26, Name: "Leaf Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_001"},
        {ID: 27, Name: "Zig Zag Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_002"},
        {ID: 28, Name: "Pigtail Bangs", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_003"},
        {ID: 29, Name: "Wave Braids", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_003"},
        {ID: 30, Name: "Coil Braids", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_004"},
        {ID: 31, Name: "Rolled Quiff", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_006"},
        {ID: 32, Name: "Loose Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_000_F"},
        {ID: 33, Name: "Undercut Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_001_F"},
        {ID: 34, Name: "Undercut Swept Side", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_002_F"},
        {ID: 35, Name: "Spiked Mohawk", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_003_F"},
        {ID: 36, Name: "Bandana and Braid", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_003"},
        {ID: 37, Name: "Layered Mod", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_006_F"},
        {ID: 38, Name: "Skinbyrd", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_004_F"},
        {ID: 76, Name: "Neat Bun", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_F_000_F"},
        {ID: 77, Name: "Short Bob", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_F_001_F"}
    ]
];

const fathers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 42, 43, 44];
const mothers = [21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45];

let currentPlayer = mp.players.local;

let playerCamera;

const creatorClothes = [
    [{index: 3, clothes: 15}, {index: 11, clothes: 15}, {index: 8, clothes: 15}, {index: 4, clothes: 14}, {
        index: 6,
        clothes: 5
    }],
    [{index: 3, clothes: 15}, {index: 11, clothes: 18}, {index: 8, clothes: 17}, {index: 4, clothes: 17}, {
        index: 6,
        clothes: 5
    }]
];

const cameraCoords = [
    {
        camera: new mp.Vector3(402.8664, -997.5515, -98.5),
        X: 402.8664,
        Y: -996.4108,
        Z: -98.5,
        fov: 100
    },
    {
        camera: new mp.Vector3(402.8664, -997.5515, -98.5),
        X: 402.8664,
        Y: -996.4108,
        Z: -98.5,
        fov: 50
    },
    {
        camera: new mp.Vector3(402.85, -996.8515, -98.31),
        X: 402.900,
        Y: -993.761,
        Z: -98.38,
        fov: 40
    }
];

const DEFAULT_SIMILARITY = 0.5;


mp.events.add('showCreator', () => {
    showEditor();
});

mp.events.add('showEditor', (skinJSON) => {
    showEditor();
    characterUI.execute("character = " + skinJSON);
});

mp.events.add('changeHair', (number, gender) => {
    currentPlayer.setComponentVariation(2, hairList[gender][number].ID, 0, 2);
});

mp.events.add('changeZoom', (index) => {
    setCamera("creatorCamera", cameraCoords[index].camera, cameraCoords[index].X, cameraCoords[index].Y, cameraCoords[index].Z, cameraCoords[index].fov);
});

mp.events.add('changeModelAngle', (angle) => {
    currentPlayer.setHeading(angle);
});

mp.events.add('changeFeature', (index, value) => {
    currentPlayer.setFaceFeature(index, value);
});

mp.events.add('resetCharacter', () => {
    setCamera("creatorCamera", cameraCoords[1].camera, cameraCoords[1].X, cameraCoords[1].Y, cameraCoords[1].Z, cameraCoords[1].fov);

    mp.events.callRemote("changeGenderInServer", 0);
});

mp.events.add("changeColor", (index, count, name, color, highlightColor) => {
    switch (name) {
        case "eyes": {
            currentPlayer.setEyeColor(color);
            break;
        }
        case "hair": {
            currentPlayer.setHairColor(color, highlightColor);
            break;
        }
        default: {
            currentPlayer.setHeadOverlay(index, count, 1, color, 0);
            break;
        }

    }
});

mp.events.add("changeAppearance", (index, count, color) => {
    currentPlayer.setHeadOverlay(index, count, 1, color, 0); //ДОРОБИТИ ОПАСИТИ
});

mp.events.add("saveCharacterInClient", (json) => {
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    currentPlayer.freezePosition(false);
    mp.gui.cursor.show(false, false);

    mp.events.callRemote("saveCharacterInServer", json);

    characterUI.destroy();

    mp.game.cam.renderScriptCams(false, false, 0, true, false);

});

mp.events.add("changeParents", (mother, father, similarity) => {
    currentPlayer.setHeadBlendData(mothers[mother], fathers[father], 0,
        mothers[mother], fathers[father], 0, similarity, similarity, 0.0, false);
});


mp.events.add("changeGenderInClient", (number) => {
    setCamera("creatorCamera", cameraCoords[1].camera, cameraCoords[1].X, cameraCoords[1].Y, cameraCoords[1].Z, cameraCoords[1].fov);

    mp.events.callRemote("changeGenderInServer", number);
});

mp.events.add("changeHead", (gender) => {
    const similarityTo = (gender === 0) ? 0 : 100;

    currentPlayer.setHeadBlendData(fathers[0], mothers[0], 0, fathers[0], mothers[0], 0,
        similarityTo, similarityTo, 0.0, false);

    for (let i = 0; i < 5; i++) {
        currentPlayer.setComponentVariation(creatorClothes[gender][i].index, creatorClothes[gender][i].clothes, 0, 2);
    }
});


function setCamera(name, vector, X, Y, Z, fov) {
    playerCamera.destroy(true);
    playerCamera = mp.cameras.new(name, vector, new mp.Vector3(0, 0, 0), fov);
    playerCamera.pointAtCoord(X, Y, Z);
}

function showEditor() {
    characterUI = mp.browsers.new("package://character/index.html");

    playerCamera = mp.cameras.new("creatorCamera", cameraCoords[1].camera, new mp.Vector3(0, 0, 0), cameraCoords[1].fov);
    playerCamera.pointAtCoord(cameraCoords[1].X, cameraCoords[1].Y, cameraCoords[1].Z);

    playerCamera.setActive(true);

    //mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.clearTasksImmediately();
    mp.players.local.freezePosition(true);
    characterUI.active = true;

    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    mp.gui.cursor.show(true, true);

    currentPlayer.setHeadBlendData(mothers[0], fathers[0], 0, mothers[0], fathers[0], 0, DEFAULT_SIMILARITY, DEFAULT_SIMILARITY, 0.0, false);
}