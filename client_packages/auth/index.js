let authBrowser;
let authCamera;

const coordinates = {
    camera: new mp.Vector3(-3428.083740234375, 952.0526733398438, 9.00314712524414),
    cameraLookAt: {
        X:-3586.22265625, Y: 833.1138305664062, Z: 30.778221130371094
    },
    playerPos: new mp.Vector3(-3425.083740234375, 952.0526733398438, 9.00314712524414),
};


mp.events.add("showLogin", () => {
    showLogin();
});

mp.events.add("login", (email, pass) => {
    mp.events.callRemote("userLogin", email, pass);
});

mp.events.add("registration", (email, pass) => {
    mp.events.callRemote("userRegistration", email, pass);
});

mp.events.add("loginHandler", (response) => {
    switch (response) {
        case "success":
            if (authBrowser) {
                mp.events.callRemote("playerSuccessAuth");
                hideLogin();
            }
            break;
        case "wrong-email":
            if (authBrowser) {
                authBrowser.execute(`$("#login-wrong-email").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("[id=sub]").attr("disabled", false);`);
            }
            break;
        case "wrong-password":
            if (authBrowser) {
                authBrowser.execute(`$("#login-wrong-password").show(); $('#passsword').val("");`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("[id=sub]").attr("disabled", false);`);
            }
            break;
        case "internal-server-error":
            if (authBrowser) {
                authBrowser.execute(`$("#login-server-error").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("[id=sub]").attr("disabled", false);`);
            }
            break;
    }
});

mp.events.add("registrationHandler", (response) => {
    switch (response) {
        case "success":
            if (authBrowser) {
                mp.events.callRemote("playerSuccessAuth");
                hideLogin();
            }
            break;
        case "email-already-exist":
            if (authBrowser) {
                authBrowser.execute(`$("#reg-wrong-email").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("#sub").attr("disabled", false);`);
            }
            break;
        case "internal-server-error":
            if (authBrowser) {
                authBrowser.execute(`$("#reg-server-error").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("#sub").attr("disabled", false);`);
            }
            break;
    }
});

function showLogin() {
    authBrowser = mp.browsers.new("package://auth/index.html");

    authCamera = mp.cameras.new("authCamera", coordinates.camera, new mp.Vector3(0,0,0), 30);
    authCamera.pointAtCoord(coordinates.cameraLookAt.X, coordinates.cameraLookAt.Y, coordinates.cameraLookAt.Z);

    mp.players.local.position = coordinates.playerPos;

    authCamera.setActive(true);

    mp.gui.chat.show(false);
    mp.gui.chat.activate(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.clearTasksImmediately();
    mp.players.local.freezePosition(true);
    authBrowser.active = true;

    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    mp.gui.cursor.show(true, true);
}

function hideLogin() {
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition(false);
    mp.gui.cursor.show(false, false);

    authBrowser.destroy();
    authCamera.destroy(true);

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
}

