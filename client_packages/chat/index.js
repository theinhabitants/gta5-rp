mp.gui.execute("window.location = 'package://chat/index.html'");

const tools = require('tools/buttons');

mp.events.add("disableEsc", function () {
    tools.disableInternalButton(true, 13, 200);
    setTimeout(() => tools.disableInternalButton(false, 13, 200), 200);
});


