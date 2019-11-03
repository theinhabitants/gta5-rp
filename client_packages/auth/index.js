const authBrowser = mp.browsers.new("package://auth/index.html");

let authCamera;
const coordinates = {
    camera: new mp.Vector3(-80.07012939453125, -820.6597900390625, 326.83221435546875),
    cameraLookAt: {
        X: -90.29067993164062, Y: -821.4169311523438, Z: 330.1753234863281
    },
    playerPos: new mp.Vector3(-75.07012939453125, -820.6597900390625, 326.83221435546875),
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
            mp.events.callRemote("playerSuccessAuth");
            hideLoginForm();
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
            mp.events.callRemote("movePlayerToCreationSpace");
            hideLoginForm();
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
    authCamera = mp.cameras.new("authCamera", coordinates.camera, new mp.Vector3(0, 0, 0), 20);
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
    mp.gui.cursor.show(false, false);

    authBrowser.destroy();
    authCamera.destroy(true);

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
}


