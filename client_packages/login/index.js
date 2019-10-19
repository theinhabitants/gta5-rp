let loginBrowser = mp.browsers.new("package://login/login.html");
mp.gui.cursor.show(true, true);

mp.events.add("login", (email, pass) => {
    mp.events.callRemote("userLogin", email, pass);
});

mp.events.add("loginHandler", (response) => {
    switch (response) {
        case "success":
            if (loginBrowser) {
                loginBrowser.active = false;
            }
            mp.gui.cursor.show(false, false);
            mp.events.callRemote("playerSuccessAuth");
            break;
        case "wrong-email":
            if (loginBrowser) {
                loginBrowser.execute(`$("#wrong-email").show();`);
            }
            break;
        case "wrong-password":
            if (loginBrowser) {
                loginBrowser.execute(`$("#wrong-password").show(); $('#passsword').val("");`);
            }
            break;
    }
});