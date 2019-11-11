const authBrowser = mp.browsers.new("package://auth/index.html");
const utils = require('utils');

let authCamera;
const coordinates = {
    camera: new mp.Vector3(-3419.60888671875, 967.689453125, 13.597350120544434),
    cameraLookAt: {
        X: -3270.4150390625, Y: 966.8079833984375, Z: 7.3521647453308105
    },
    playerPos: new mp.Vector3(-3419.66, 967.70, 12.95),
};

mp.events.add("showLogin", showLoginForm);

mp.events.add("login", (email, pass) => {
    mp.events.callRemote("userLogin", email, pass);
});

mp.events.add("registration", (email, pass) => {
    mp.events.callRemote("userRegistration", email, pass);
});

mp.events.add("loginHandler", (response) => {
    if (!authBrowser) return;

    switch (response) {
        case "success":
            authBrowser.destroy();
            mp.gui.cursor.show(false, false);
            utils.fadeScreen(() => {
                mp.events.callRemote("playerSuccessAuth");
                hideLoginForm();
            }, 1000);
            break;
        case "wrong-email":
            authBrowser.execute(`$("#login-wrong-email").show();`);
            authBrowser.execute(`hide();`);
            authBrowser.execute(`$("[id=sub]").attr("disabled", false);`);
            break;
        case "wrong-password":
            authBrowser.execute(`$("#login-wrong-password").show(); $('#passsword').val("");`);
            authBrowser.execute(`hide();`);
            authBrowser.execute(`$("[id=sub]").attr("disabled", false);`);
            break;
        case "internal-server-error":
            authBrowser.execute(`$("#login-server-error").show();`);
            authBrowser.execute(`hide();`);
            authBrowser.execute(`$("[id=sub]").attr("disabled", false);`);
            break;
    }
});

mp.events.add("registrationHandler", (response) => {
    if (!authBrowser) return;
    switch (response) {
        case "success":
            authBrowser.destroy();
            mp.gui.cursor.show(false, false);
            utils.fadeScreen(() => {
                hideLoginForm();
                mp.events.callRemote("movePlayerToCreationSpace");
            }, 1000);
            break;
        case "email-already-exist":
            authBrowser.execute(`$("#reg-wrong-email").show();`);
            authBrowser.execute(`hide();`);
            authBrowser.execute(`$("#sub").attr("disabled", false);`);
            break;
        case "internal-server-error":
            authBrowser.execute(`$("#reg-server-error").show();`);
            authBrowser.execute(`hide();`);
            authBrowser.execute(`$("#sub").attr("disabled", false);`);
            break;
    }
});

function showLoginForm() {
    authCamera = mp.cameras.new("authCamera", coordinates.camera, new mp.Vector3(0, 0, 0), 40);
    authCamera.pointAtCoord(coordinates.cameraLookAt.X, coordinates.cameraLookAt.Y, coordinates.cameraLookAt.Z);

    mp.players.local.position = coordinates.playerPos;

    authCamera.setActive(true);

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);

    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.clearTasksImmediately();
    mp.players.local.freezePosition(true);
    authBrowser.active = true;

    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    mp.gui.cursor.show(true, true);
}

function hideLoginForm() {
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition(false);

    authCamera.destroy(true);

    mp.game.cam.renderScriptCams(false, false, 0, true, false);

    mp.events.call("createPeds");
}



