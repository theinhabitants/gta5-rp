characterDao = require('../datasources/dao/characterDao');
userDao = require('../datasources/dao/userDao');
auth = require('../auth/auth');
characterData = require('./characterData');


mp.events.add('saveCharacterInServer', async (player, json) => {
    setPlayerSkin(player, json);

    let user = auth.getOnlineUser(player.id);
    let isCharExist = await characterDao.isExist(user.id);

    if (isCharExist) {
        await characterDao.updateSkin(json, user.id);
    } else {
        let name = "test";
        let surname = "test";

        await characterDao.create(name, surname, json, user.id + 123123);
    }
});

mp.events.add("changeGenderInServer", (player, number) => {
    player.model = characterData.freemodeCharacters[number];
    player.position = characterData.creatorPlayerPos;
    player.heading = characterData.creatorPlayerHeading;
    player.call("changeHead", [number]);
    player.changedGender = true;
});

mp.events.addCommand('editskin', async (player) => {
    let user = auth.getOnlineUser(player.id);
    let character = await characterDao.getByUserID(user.id);

    player.preCreatorPos = player.position;
    player.preCreatorHeading = player.heading;
    player.preCreatorDimension = player.dimension;

    for (let i = 0; i < 5; i++) {
        player.setClothes(characterData.creatorClothes[0][i].index, characterData.creatorClothes[0][i].clothes, 0, 2);
    }

    player.position = characterData.creatorPlayerPos;
    player.heading = characterData.creatorPlayerHeading;
    player.dimension = player.id + 1000;
    player.usingCreator = true;
    player.changedGender = false;
    player.call("showEditor", [character.skin]);
});

mp.events.addCommand('setclothes', (player, args) => {
    args = args.split(" ");
    const firstID = parseInt(args[0]);
    const secondID = parseInt(args[1]);
    const thirdID = parseInt(args[2]);

    player.setClothes(firstID, secondID, thirdID, 0);
});

// setPlayerSkin parse json with skin data and set it to player
function setPlayerSkin(player, jsonSkin) {
    let char = JSON.parse(jsonSkin);
    let features = [];
    let value;

    for (let i = 0; i < characterData.featuresName.length; i++) {
        value = eval("char.features." + characterData.featuresName[i] + ".value");
        features.push(value);
    }

    const gender = char.sex.gender === 0;

    player.setCustomization(gender,

        characterData.mothers[char.parents.mother.count],
        characterData.fathers[char.parents.father.count],
        0,

        characterData.mothers[char.parents.mother.count],
        characterData.fathers[char.parents.father.count],
        0,

        char.parents.similarity.value,
        char.parents.similarity.value,
        0.0,

        char.features.eyes.colorNumber,
        char.hair.colorNumber,
        char.hair.highlightColor.value,

        features
    );

    player.setClothes(2, characterData.hairList[char.sex.gender][char.hair.number].ID, 0, 2);

    let item;

    for (let i = 0; i < characterData.appearanceName.length; i++) {
        item = eval("char.appearance." + characterData.appearanceName[i]);
        player.setHeadOverlay(item.index, [item.count, 1, item.colorNumber, 0]);
    }

    for (let i = 0; i < 5; i++) {
        player.setClothes(characterData.creatorClothes[char.sex.gender][i].index, characterData.creatorClothes[char.sex.gender][i].clothes, 0, 2);
    }

    player.dimension = 0;
}

module.exports.setPlayerSkin = setPlayerSkin;