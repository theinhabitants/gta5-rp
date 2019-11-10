const utils = require('utils');

let choseWayUI,
    choseWayCamera;

const camCoordinates = [
    {
        camera: new mp.Vector3(-1040.2899169921875, -1076.11279296875, 4.646230697631836),
        cameraLookAt:
            {
                X: -1126.150390625, Y: -1128.623779296875, Z: 0.5439004898071289
            },
        playerPos: new mp.Vector3(-1035.2899169921875, -1076.11279296875, 4.646230697631836)
    },
    [
        {
            camera: new mp.Vector3(159.8542022705078, -1191.487060546875, 30.023195266723633),
            cameraLookAt:
                {
                    X: 145.94801330566406, Y: -1192.3316650390625, Z: 29.648967742919922
                }
        },
        {
            camera: new mp.Vector3(156.4993896484375, -1196.9022216796875, 29.943256378173828),
            cameraLookAt:
                {
                    X: 156.37179565429688, Y: -1198.23681640625, Z: 29.84620475769043
                }
        }
    ]
];

mp.events.add("enterWayInClient", (way) => {
    choseWayUI.destroy();
    mp.gui.cursor.show(false, false);
    utils.fadeScreen(() => {
        mp.events.callRemote("enterWayInServer", way);
        hideChoseWayUI();
    }, 5000);
});

mp.events.add("gotoChoseWayInClient", () => {
    showChoseWayUI();
});

mp.events.add("moveCameraToNPC", () => {
    const moveFirstCamera = mp.cameras.new('moveCamera', camCoordinates[1][0].camera, new mp.Vector3(0, 0, 0), 40);
    const moveSecondCamera = mp.cameras.new('moveCamera', camCoordinates[1][1].camera, new mp.Vector3(0, 0, 0), 40);

    moveFirstCamera.pointAtCoord(camCoordinates[1][0].cameraLookAt.X, camCoordinates[1][0].cameraLookAt.Y, camCoordinates[1][0].cameraLookAt.Z);
    moveSecondCamera.pointAtCoord(camCoordinates[1][1].cameraLookAt.X, camCoordinates[1][1].cameraLookAt.Y, camCoordinates[1][1].cameraLookAt.Z);

    moveSecondCamera.setActiveWithInterp(moveFirstCamera.handle, 2000, 0, 0);


    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    setTimeout(() => {
        moveSecondCamera.setActive(false);
        moveSecondCamera.destroy(true);
        moveFirstCamera.destroy(true);

        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }, 3000);
});

function showChoseWayUI() {
    choseWayUI = mp.browsers.new("package://choseway/index.html");

    choseWayCamera = mp.cameras.new("authCamera", camCoordinates[0].camera, new mp.Vector3(0, 0, 0), 20);
    choseWayCamera.pointAtCoord(camCoordinates[0].cameraLookAt.X, camCoordinates[0].cameraLookAt.Y, camCoordinates[0].cameraLookAt.Z);

    mp.players.local.position = camCoordinates[0].playerPos;

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

