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
            break;
        case "fail":
            //print msg that pass is wrong
            if (loginBrowser) {
                //loginBrowser.execute(`$('#email').val("");`);
                loginBrowser.destroy();
            }
            mp.gui.cursor.show(false, false);
            break;
    }
    mp.events.callRemote("playerSuccessAuth");
});