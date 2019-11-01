mp.gui.execute("window.location = 'package://chat/index.html'");

const buttons = require('tools/buttons');

mp.events.add("disableEsc", function () {
    buttons.disableButton(true, 13, 200);
    setTimeout(() => buttons.disableButton(false, 13, 200), 200);
});


