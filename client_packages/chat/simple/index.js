mp.gui.execute("window.location = 'package://chat/simple/index.html'");

const utils = require('utils');

mp.events.add("disableEsc", function () {
    utils.disableInternalButton(true, 13, 200);
    setTimeout(() => utils.disableInternalButton(false, 13, 200), 200);
});


