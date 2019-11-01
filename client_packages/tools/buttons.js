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

exports = {
    disableInternalButton: disableInternalButton
};