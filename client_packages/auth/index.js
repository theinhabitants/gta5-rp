let authBrowser = mp.browsers.new("package://auth/index.html");
mp.gui.chat.show(false); // added to avoid problem with background chat
mp.gui.chat.activate(false); // added to avoid problem with background chat

mp.gui.cursor.show(true, true);

mp.events.add("login", (email, pass) => {
    mp.events.callRemote("userLogin", email, pass);
});

mp.events.add("registration", (email, pass) => {
    mp.events.callRemote("userRegistration", email, pass);
});

mp.events.add("loginHandler", (response, char) => {
    switch (response) {
        case "success":
            if (authBrowser) {
                mp.events.callRemote("playerSuccessAuth");
                setSkin(char);
                authBrowser.destroy();
                mp.gui.cursor.show(false, false);
                mp.gui.chat.show(true);
                mp.gui.chat.activate(true);
            }
            break;
        case "wrong-email":
            if (authBrowser) {
                authBrowser.execute(`$("#wrong-email").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("#sub").attr("disabled", false);`);
            }
            break;
        case "wrong-password":
            if (authBrowser) {
                authBrowser.execute(`$("#wrong-password").show(); $('#passsword').val("");`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("#sub").attr("disabled", false);`);
            }
            break;
        case "internal-server-error":
            if (authBrowser) {
                authBrowser.execute(`$("#server-error").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("#sub").attr("disabled", false);`);
            }
            break;
    }
});

mp.events.add("registrationHandler", (response) => {
    switch (response) {
        case "success":
            if (authBrowser) {
                mp.events.callRemote("playerSuccessAuth");
                //TODO complete registration with char creator etc...
                authBrowser.destroy();
                mp.gui.cursor.show(false, false);
                mp.gui.chat.show(true);
            }
            break;
        case "email-already-exist":
            if (authBrowser) {
                authBrowser.execute(`$("#wrong-email").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("#sub").attr("disabled", false);`);
            }
            break;
        case "internal-server-error":
            if (authBrowser) {
                authBrowser.execute(`$("#server-error").show();`);
                authBrowser.execute(`hide();`);
                authBrowser.execute(`$("#sub").attr("disabled", false);`);
            }
            break;
    }
});

function setSkin(character) {
    //TODO set character skin
}