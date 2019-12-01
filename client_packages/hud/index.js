mp.gui.execute("window.location = 'package://hud/index.html'");

const utils = require('utils');

const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    month = ["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];


let isPress = false,
    speedometerTimer,
    refreshHudTimer;


mp.events.add("testAlert", (type, message) => {
    utils.showAlert(type, message);
});

mp.events.add("displayNavigationBlock", (player) => {
    let date = new Date(),
        fixHours = timeWithNull(date.getHours()),
        fixMinute = timeWithNull(date.getMinutes());

    mp.gui.execute("$('#name').text('" + player.name + " (" + player.id + ")');" +
        "$('#time').text('" + fixHours + ":" + fixMinute + "');" +
        "$('#date').text('" + days[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + "');" +
        "$('#nav-block').show();");


    refreshHudTimer = setInterval(() => {
        date = new Date();
        fixHours = timeWithNull(date.getHours());
        fixMinute = timeWithNull(date.getMinutes());

        mp.gui.execute("$('#time').text('" + fixHours + ":" + fixMinute + "');");
    }, 10000);
});

function timeWithNull(time) {
    return time > 9 ? time : '0' + time;
}

mp.events.add("showSpeedometer", (vehicle, engineStatus) => {
    vehicle.setEngineOn(engineStatus, true, !engineStatus);
    if (engineStatus) {
        mp.gui.execute("$('#engine').css('background', 'rgb(210, 22, 73)')");
    } else {
        mp.gui.execute("$('#engine').css('background', 'rgba(0,0,0, 0.6)')");
    }

    mp.gui.execute("$('#speedometer').show();");

    speedometerTimer = setInterval(() => {
        mp.gui.execute("$('#speed').text(" + (vehicle.getSpeed() * 3.6).toFixed(0) + ")");
    }, 200);
});

mp.events.add("playerLeaveVehicle", () => {
    clearInterval(speedometerTimer);
    utils.disableInternalButton(false, 16, 71);
    mp.gui.execute("$('#speedometer').hide()");
});

mp.events.add("disableEsc", function () {
    utils.disableInternalButton(true, 13, 200);
    setTimeout(() => utils.disableInternalButton(false, 13, 200), 200);
});

mp.keys.bind(116, false, function () {
    if (!isPress) {
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        utils.displayClientHud(false);
        isPress = true;
    } else {
        mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        utils.displayClientHud(true);
        isPress = false;
    }
});

