let moveFirstCamera,
    moveSecondCamera;

function disableWeaponWheelStats() {
    mp.events.add('render', () => {
        if (mp.game.ui.showWeaponWheel) {
            mp.game.ui.hideHudComponentThisFrame(20);
        }
    });
}

function disableInternalButton(val, groupId, buttonId) {
    mp.events.add('render', () => {
        if (val) {
            mp.game.controls.disableControlAction(groupId, buttonId, true);
        } else {
            mp.game.controls.enableControlAction(groupId, buttonId, true);
        }
    });
}

function fadeScreen(afterFade, time) {
    mp.game.cam.doScreenFadeOut(time);
    setTimeout(() => {
        mp.game.cam.doScreenFadeIn(time);
        afterFade();
    }, time);
}

function moveCamera(vectorCamFrom, fov, lookAtX, lootAtY, lootAtZ, vectorCamTo, fovTo, lookAtXto, lootAtYto, lootAtZto, destroy, time) {
    moveFirstCamera = mp.cameras.new("camFrom", vectorCamFrom, new mp.Vector3(0, 0, 0), fov);
    moveSecondCamera = mp.cameras.new("camTo", vectorCamTo, new mp.Vector3(0, 0, 0), fovTo);

    moveFirstCamera.pointAtCoord(lookAtX, lootAtY, lootAtZ);
    moveSecondCamera.pointAtCoord(lookAtXto, lootAtYto, lootAtZto);

    moveSecondCamera.setActiveWithInterp(moveFirstCamera.handle, time, 0, 0);

    if (destroy) {
        setTimeout(() => {
            moveSecondCamera.setActive(false);
            moveFirstCamera.destroy(true);
            moveSecondCamera.destroy(true);

        }, time + 100);
    }
}


function getFirstCamera() {
    return moveFirstCamera;
}

function getSecondCamera() {
    return moveSecondCamera;
}


function displayClientHud(val) {
    if (val) {
        mp.gui.execute("$('#hud').show();");
    } else {
        mp.gui.execute("$('#hud').hide();");
    }
}

exports = {
    disableInternalButton: disableInternalButton,
    fadeScreen: fadeScreen,
    moveCamera: moveCamera,
    getFirstCamera: getFirstCamera,
    getSecondCamera: getSecondCamera,
    displayClientHud: displayClientHud,
    disableWeaponWheelStats: disableWeaponWheelStats
};

