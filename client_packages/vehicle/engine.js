const utils = require('utils');

mp.game.vehicle.defaultEngineBehaviour = false;

mp.keys.bind(50, false, function () {
    if (!mp.players.local.isInAnyVehicle(false)) {
        return;
    }
    mp.events.callRemote("engineCar")
});

mp.events.add("vehHandler", (vehicle, engineStatus) => {
    if (engineStatus) {
        disableW(true);
        vehicle.setEngineOn(false, false, engineStatus);
        mp.gui.execute("$('#engine').css('background', 'rgba(0,0,0, 0.6)')");
    } else {
        disableW(false);
        vehicle.setEngineOn(true, false, engineStatus);
        mp.gui.execute("$('#engine').css('background', 'rgb(210, 22, 73)')");
    }
    vehicle.setUndriveable(!engineStatus)
});

// disableW using to avoid character lag with false engine status and W pressed
function disableW(val) {
    utils.disableInternalButton(val, 16, 71);
}