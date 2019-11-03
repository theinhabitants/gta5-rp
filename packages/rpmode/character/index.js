const characterDao = require('../datasources/dao/characterDao');
const auth = require('../auth/auth');
const characterData = require('./characterData');
require('./commands');

mp.events.add('saveCharacterInServer', async (player, json) => {
    applyCharacterSkin(player, json);

    let user = auth.getOnlineUser(player.id);
    let isCharExist = await characterDao.isExist(user.id);

    if (isCharExist) {
        await characterDao.updateSkin(json, user.id);
        player.position = player.preCreatorPos;
        player.heading = player.preCreatorHeading;
        player.dimension = player.preCreatorDimension;
    } else {
        let name = "test2" + user.id;
        let surname = "test2" + user.id;

        await characterDao.create(name, surname, json, user.id);

        mp.events.call("playerSuccessAuth", player);
    }
});

mp.events.add("changeGenderInServer", (player, number) => {
    player.model = characterData.freemodeCharacters[number];
    player.position = characterData.creatorPlayerPos;
    player.heading = characterData.creatorPlayerHeading;
    player.call("changeHead", [number]);
    player.changedGender = true;
});

mp.events.add("movePlayerToCreationSpace", (player) => {
    player.model = characterData.freemodeCharacters[0];

    movePlayerToCreationSpace(player);

    player.call("showCharacterCreator");
});

mp.events.addCommand('editskin', async (player) => {
    let user = auth.getOnlineUser(player.id);
    let character = await characterDao.getByUserID(user.id);

    movePlayerToCreationSpace(player);

    player.call("showCharacterCreator", [character.skin]);
});

mp.events.addCommand('setclothes', (player, args) => {
    args = args.split(" ");
    const firstID = parseInt(args[0]);
    const secondID = parseInt(args[1]);
    const thirdID = parseInt(args[2]);

    player.setClothes(firstID, secondID, thirdID, 0);
});

function applyCharacterSkin(player, jsonSkin) {
    let characterSkin = JSON.parse(jsonSkin);
    let features = [];
    let value;

    for (let i = 0; i < characterData.featuresName.length; i++) {
        value = eval("characterSkin.features." + characterData.featuresName[i] + ".value");
        features.push(value);
    }

    const gender = characterSkin.sex.gender === 0;

    player.setCustomization(gender,

        characterData.mothers[characterSkin.parents.mother.count],
        characterData.fathers[characterSkin.parents.father.count],
        0,

        characterData.mothers[characterSkin.parents.mother.count],
        characterData.fathers[characterSkin.parents.father.count],
        0,

        characterSkin.parents.similarity.value,
        characterSkin.parents.similarity.value,
        0.0,

        characterSkin.features.eyes.colorNumber,
        characterSkin.hair.colorNumber,
        characterSkin.hair.highlightColor.value,

        features
    );

    player.setClothes(2, characterData.hairList[characterSkin.sex.gender][characterSkin.hair.number].ID, 0, 2);

    let item;

    for (let i = 0; i < characterData.appearanceName.length; i++) {
        item = eval("characterSkin.appearance." + characterData.appearanceName[i]);
        player.setHeadOverlay(item.index, [item.count, 1, item.colorNumber, 0]);
    }

    for (let i = 0; i < 5; i++) {
        player.setClothes(characterData.creatorClothes[characterSkin.sex.gender][i].index, characterData.creatorClothes[characterSkin.sex.gender][i].clothes, 0, 2);
    }
}

function movePlayerToCreationSpace(player) {
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
}

module.exports.applyCharacterSkin = applyCharacterSkin;