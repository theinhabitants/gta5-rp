let interface;

const fathers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44];
const mothers = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45];

let currentPlayer = mp.players.local;

let playerCamera;
const cameraCoords = {
    camera: new mp.Vector3(402.8664, -997.5515, -98.5),
    cameraLookAt: {
        X: 402.8664,
        Y: -996.4108,
        Z: -98.5
    }
};

const smoothValue = 1;


mp.events.add('showCreator', () => {
    interface = mp.browsers.new("package://character/index.html");
    playerCamera = mp.cameras.new("creatorCamera", cameraCoords.camera, new mp.Vector3(0, 0, 0), 45);
    playerCamera.pointAtCoord(cameraCoords.cameraLookAt.X, cameraCoords.cameraLookAt.Y, cameraCoords.cameraLookAt.Z);
    playerCamera.setActive(true);

    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.clearTasksImmediately();
    mp.players.local.freezePosition(true);

    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    mp.gui.cursor.show(true, true);

});

mp.events.add('hairHandler', (number, gender) => {
    mp.events.callRemote("hairHandlerServer", number, gender);
});

mp.events.add('featureHandler', (index, value) => {
    currentPlayer.setFaceFeature(index, value * smoothValue);
});

mp.events.add('resetHandler', () => {
    mp.events.callRemote("genderHandlerServer", 0);
});

mp.events.add("colorHandler", (index, count, name, color, highlightColor) => {
    switch(name){
        case "eyes": {
            currentPlayer.setEyeColor(color);
            break;
        }
        case "hair": {
            currentPlayer.setHairColor(color, parseInt(highlightColor));
            break;
        }
        default: {
            currentPlayer.setHeadOverlay(index, count, 1, color, 0);
            break;
        }

    }
});

mp.events.add("appearanceHandler", (index, count, color) => {
    currentPlayer.setHeadOverlay(index, count, 1, color, 0); //ДОРОБИТИ ОПАСИТИ
});

mp.events.add("parentsHandler", (mother, father, similarity) => {
    currentPlayer.setHeadBlendData(mothers[mother], fathers[father], 0,
        mothers[mother], fathers[father], 0,
        similarity * smoothValue, similarity * smoothValue, 0.0, false );
});


mp.events.add("genderHandler", (number) => {

    mp.events.callRemote("genderHandlerServer", number);
    const similarityTo = (number === 0) ? 0 : 100;

    setTimeout(() => {
        currentPlayer.setHeadBlendData(fathers[0], mothers[0], 0, fathers[0], mothers[0],0,
            similarityTo, similarityTo, 0.0, false);
    }, 200);
});





