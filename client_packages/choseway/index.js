const utils = require('utils');

let choseWayUI,
    choseWayCamera;
let peds = new Array();
let questBlip;

const camCoordinates = {
    camera: new mp.Vector3(-3579.320556640625, 970.0040893554688, 44.14125061035156),
    cameraLookAt:
        {
            X: -3096.736328125, Y: 960.1061401367188, Z: 37.44977951049805
        },
    playerPos: new mp.Vector3(-3579.37, 970.00, 43.45)
};

const camToNpc = [
    [
        {
            camera: new mp.Vector3(145.021240234375, -1191.6187744140625, 30.045047760009766),
            cameraLookAt:
                {
                    X: 153.74949645996094, Y: -1215.362548828125, Z: 28.459598541259766
                }
        },
        {
            camera: new mp.Vector3(156.4993896484375, -1196.9022216796875, 29.943256378173828),
            cameraLookAt:
                {
                    X: 156.37179565429688, Y: -1198.23681640625, Z: 29.84620475769043
                }
        }
    ],
    [
        {
            camera: new mp.Vector3(160.0187225341797, -1679.1689453125, 30.42255210876465),
            cameraLookAt:
                {
                    X: 169.2148895263672, Y: -1667.0655517578125, Z: 29.692781448364258
                }
        },
        {
            camera: new mp.Vector3(147.03707885742188, -1674.4176025390625, 30.258699417114258),
            cameraLookAt:
                {
                    X: 146.2138671875, Y: -1673.4696044921875, Z: 30.101646423339844
                }
        }
    ],
    [
        {
            camera: new mp.Vector3(-1063.21826171875, -2546.65869140625, 14.594318389892578),
            cameraLookAt:
                {
                    X: -1049.4259033203125, Y: -2555.573486328125, Z: 12.818119049072266
                }
        },
        {
            camera: new mp.Vector3(-1067.568115234375, -2557.302734375, 14.407938957214355),
            cameraLookAt:
                {
                    X: -1068.1131591796875, Y: -2558.263916015625, Z: 14.269336700439453
                }
        }
    ]
];

const npcCoordinates = [
    {
        modelHash: 0xEF154C47,
        position: new mp.Vector3(156.43, -1198.48, 29.30),
        heading: 352.37
    },
    {
        modelHash: 0x9D0087A8,
        position: new mp.Vector3(146.04, -1673.29, 29.58),
        heading: 218.95
    },
    {
        modelHash: 0x1880ED06,
        position: new mp.Vector3(-1068.22, -2558.49, 13.81),
        heading: 327.49
    }
];


mp.events.add("enterWayInClient", (way) => {
    choseWayUI.destroy();
    mp.gui.cursor.show(false, false);
    utils.fadeScreen(() => {
        mp.events.callRemote("enterWayInServer", way);
        hideChoseWayUI();
    }, 3000);
});

mp.events.add("gotoChoseWayInClient", () => {
    showChoseWayUI();
});

mp.events.add("moveCameraToNPC", (way) => {
    const moveFirstCamera = mp.cameras.new('moveCamera', camToNpc[way][0].camera, new mp.Vector3(0, 0, 0), 40);
    const moveSecondCamera = mp.cameras.new('moveCamera', camToNpc[way][1].camera, new mp.Vector3(0, 0, 0), 40);

    moveFirstCamera.pointAtCoord(camToNpc[way][0].cameraLookAt.X, camToNpc[way][0].cameraLookAt.Y, camToNpc[way][0].cameraLookAt.Z);
    moveSecondCamera.pointAtCoord(camToNpc[way][1].cameraLookAt.X, camToNpc[way][1].cameraLookAt.Y, camToNpc[way][1].cameraLookAt.Z);

    moveSecondCamera.setActiveWithInterp(moveFirstCamera.handle, 2000, 0, 0);


    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    mp.game.streaming.requestAnimDict("anim@mp_player_intupperwave");

    peds[way].taskPlayAnim("anim@mp_player_intupperwave", "idle_a", 8.0, 1.0, 5000, 1, 1.0, false, false, false);

    questBlip = mp.blips.new(66, npcCoordinates[way].position);

    setTimeout(() => {
        moveSecondCamera.setActive(false);
        moveFirstCamera.setActiveWithInterp(moveSecondCamera.handle, 2000, 0, 0);
        setTimeout(() => {
            moveFirstCamera.setActive(false);
            moveSecondCamera.destroy(true);
            moveFirstCamera.destroy(true);

            mp.game.cam.renderScriptCams(false, false, 0, true, false);
        }, 2100);
    }, 3000);
});

mp.events.add("createPeds", () => {
    for (let i = 0; i < npcCoordinates.length; i++) {
        const ped = mp.peds.new(npcCoordinates[i].modelHash, npcCoordinates[i].position, npcCoordinates[i].heading, 0);
        peds.push(ped);
    }
});

function showChoseWayUI() {
    choseWayUI = mp.browsers.new("package://choseway/index.html");

    choseWayCamera = mp.cameras.new("choseWayCam", camCoordinates.camera, new mp.Vector3(0, 0, 0), 40);
    choseWayCamera.pointAtCoord(camCoordinates.cameraLookAt.X, camCoordinates.cameraLookAt.Y, camCoordinates.cameraLookAt.Z);

    mp.players.local.position = camCoordinates.playerPos;

    choseWayCamera.setActive(true);

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.clearTasksImmediately();
    mp.players.local.freezePosition(true);

    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    mp.gui.cursor.show(true, true);
}

function hideChoseWayUI() {
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition(false);

    choseWayCamera.destroy(true);

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
}

