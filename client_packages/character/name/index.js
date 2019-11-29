let enterNameBrowser;
const utils = require('utils');

const coordinates = [
    {
        camera: new mp.Vector3(-3377.39990234375, 968.8628540039062, 17.524507522583008),
        cameraLookAt: {
            X: -3419.73974609375, Y: 966.1765747070312, Z: 9.758538246154785
        },
    },
    {
        camera: new mp.Vector3(-3418.92919921875, 967.5399780273438, 12.58523178100586),
        cameraLookAt: {
            X: -3219.710693359375, Y: 964.2979125976562, Z: 15.748759269714355
        }
    }
];


mp.events.add("gotoEnterName", () => {
    enterNameBrowser = mp.browsers.new("package://character/name/index.html");
});

mp.events.add("saveName", (firstName, secondName) => {
    mp.events.callRemote("userSaveName", firstName, secondName);
});

mp.events.add("saveNameHandler", (response, firstName, secondName) => {
    if (!enterNameBrowser) return;
    switch (response) {
        case "success":
            enterNameBrowser.destroy();

            mp.events.callRemote("movePlayerToCreationSpace");

            mp.events.callRemote("userSendName", firstName, secondName);

            mp.game.graphics.transitionFromBlurred(2000);

            utils.moveCamera(coordinates[0].camera, 40, coordinates[0].cameraLookAt.X, coordinates[0].cameraLookAt.Y,
                coordinates[0].cameraLookAt.Z, coordinates[1].camera, 50, coordinates[1].cameraLookAt.X, coordinates[1].cameraLookAt.Y,
                coordinates[1].cameraLookAt.Z, false, 2000);
            break;
        case "name-already-exist":
            enterNameBrowser.execute(`$("#name-already-exist").show();`);
            enterNameBrowser.execute(`hide();`);
            enterNameBrowser.execute(`$("#sub").attr("disabled", false);`);
            break;
        case "internal-server-error":
            enterNameBrowser.execute(`$("#name-server-error").show();`);
            enterNameBrowser.execute(`hide();`);
            enterNameBrowser.execute(`$("#sub").attr("disabled", false);`);
            break;
    }
});




