mp.gui.execute("window.location = 'package://chat/index.html'");


mp.events.add("disableEsc", (val) => {
    if (val) {
        mp.keys.bind(27, false, function () {
            return 0;
        });
    } else {
        mp.keys.unbind(27, false, function () {
        });
    }
});


mp.keys.bind(27, false, function () {

});

function disable(val) {
    mp.gui.execute("disable();");
}

exports.disable = disable;