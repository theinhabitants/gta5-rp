function disableInternalButton(val, groupId, buttonId){
    if(val) {
        mp.events.add('render', () => {
            mp.game.controls.disableControlAction(groupId, buttonId, true);
        });
    }
    else {
        mp.events.add('render', () => {
            mp.game.controls.enableControlAction(groupId, buttonId, true);
        });
    }
}

function fadeScreen(afterFade, time){
    mp.game.cam.doScreenFadeOut(time);
    setTimeout(() =>{
        mp.game.cam.doScreenFadeIn(time);
        afterFade();
    }, time);
}

function moveCamera(vectorCamFrom, fov, lookAtX, lootAtY, lootAtZ, vectorCamTo, fovTo, lookAtXto, lootAtYto, lootAtZto, destroy, time) {
    const camFrom = mp.cameras.new("camFrom", vectorCamFrom, new mp.Vector3(0, 0, 0), fov);
    const camTo = mp.cameras.new("camTo", vectorCamTo, new mp.Vector3(0, 0, 0), fovTo);

    camFrom.pointAtCoord(lookAtX, lootAtY, lootAtZ);
    camTo.pointAtCoord(lookAtXto, lootAtYto, lootAtZto);

    camTo.setActiveWithInterp(camFrom.handle, time, 0, 0);

    if(destroy) {
        setTimeout(() => {
            camTo.setActive(false);
            camFrom.destroy(true);
            camTo.destroy(true);

        }, time + 100);
    }
}


exports = {
    disableInternalButton: disableInternalButton,
    fadeScreen:fadeScreen,
    moveCamera:moveCamera
};
