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


exports = {
    disableInternalButton: disableInternalButton,
    fadeScreen:fadeScreen
};
