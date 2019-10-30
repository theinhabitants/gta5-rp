characterDao = require('../datasources/dao/characterDao');
userDao = require('../datasources/dao/userDao');
auth = require('../auth/auth');

const hairList = [
    // male
    [
        {ID: 0, Name: "Close Shave", Collection: "mpbeach_overlays", Overlay: "FM_Hair_Fuzz"},
        {ID: 1, Name: "Buzzcut", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_001"},
        {ID: 2, Name: "Faux Hawk", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_002"},
        {ID: 3, Name: "Hipster", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_003"},
        {ID: 4, Name: "Side Parting", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_004"},
        {ID: 5, Name: "Shorter Cut", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_005"},
        {ID: 6, Name: "Biker", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_006"},
        {ID: 7, Name: "Ponytail", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_007"},
        {ID: 8, Name: "Cornrows", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_008"},
        {ID: 9, Name: "Slicked", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_009"},
        {ID: 10, Name: "Short Brushed", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_013"},
        {ID: 11, Name: "Spikey", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_002"},
        {ID: 12, Name: "Caesar", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_011"},
        {ID: 13, Name: "Chopped", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_012"},
        {ID: 14, Name: "Dreads", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_014"},
        {ID: 15, Name: "Long Hair", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_015"},
        {ID: 16, Name: "Shaggy Curls", Collection: "multiplayer_overlays", Overlay: "NGBea_M_Hair_000"},
        {ID: 17, Name: "Surfer Dude", Collection: "multiplayer_overlays", Overlay: "NGBea_M_Hair_001"},
        {ID: 18, Name: "Short Side Part", Collection: "multiplayer_overlays", Overlay: "NGBus_M_Hair_000"},
        {ID: 19, Name: "High Slicked Sides", Collection: "multiplayer_overlays", Overlay: "NGBus_M_Hair_001"},
        {ID: 20, Name: "Long Slicked", Collection: "multiplayer_overlays", Overlay: "NGHip_M_Hair_000"},
        {ID: 21, Name: "Hipster Youth", Collection: "multiplayer_overlays", Overlay: "NGHip_M_Hair_001"},
        {ID: 22, Name: "Mullet", Collection: "multiplayer_overlays", Overlay: "NGInd_M_Hair_000"},
        {ID: 24, Name: "Classic Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_000"},
        {ID: 25, Name: "Palm Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_001"},
        {ID: 26, Name: "Lightning Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_002"},
        {ID: 27, Name: "Whipped Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_003"},
        {ID: 28, Name: "Zig Zag Cornrows", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_004"},
        {ID: 29, Name: "Snail Cornrows", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_005"},
        {ID: 30, Name: "Hightop", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_006"},
        {ID: 31, Name: "Loose Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_000_M"},
        {ID: 32, Name: "Undercut Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_001_M"},
        {ID: 33, Name: "Undercut Swept Side", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_002_M"},
        {ID: 34, Name: "Spiked Mohawk", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_003_M"},
        {ID: 35, Name: "Mod", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_004_M"},
        {ID: 36, Name: "Layered Mod", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_005_M"},
        {ID: 72, Name: "Flattop", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_M_000_M"},
        {ID: 73, Name: "Military Buzzcut", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_M_001_M"}
    ],
    // female
    [
        {ID: 0, Name: "Close Shave", Collection: "mpbeach_overlays", Overlay: "FM_Hair_Fuzz"},
        {ID: 1, Name: "Short", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_001"},
        {ID: 2, Name: "Layered Bob", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_002"},
        {ID: 3, Name: "Pigtails", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_003"},
        {ID: 4, Name: "Ponytail", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_004"},
        {ID: 5, Name: "Braided Mohawk", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_005"},
        {ID: 6, Name: "Braids", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_006"},
        {ID: 7, Name: "Bob", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_007"},
        {ID: 8, Name: "Faux Hawk", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_008"},
        {ID: 9, Name: "French Twist", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_009"},
        {ID: 10, Name: "Long Bob", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_010"},
        {ID: 11, Name: "Loose Tied", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_011"},
        {ID: 12, Name: "Pixie", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_012"},
        {ID: 13, Name: "Shaved Bangs", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_013"},
        {ID: 14, Name: "Top Knot", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_014"},
        {ID: 15, Name: "Wavy Bob", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_015"},
        {ID: 16, Name: "Messy Bun", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_000"},
        {ID: 17, Name: "Pin Up Girl", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_001"},
        {ID: 18, Name: "Tight Bun", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_007"},
        {ID: 19, Name: "Twisted Bob", Collection: "multiplayer_overlays", Overlay: "NGBus_F_Hair_000"},
        {ID: 20, Name: "Flapper Bob", Collection: "multiplayer_overlays", Overlay: "NGBus_F_Hair_001"},
        {ID: 21, Name: "Big Bangs", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_001"},
        {ID: 22, Name: "Braided Top Knot", Collection: "multiplayer_overlays", Overlay: "NGHip_F_Hair_000"},
        {ID: 23, Name: "Mullet", Collection: "multiplayer_overlays", Overlay: "NGInd_F_Hair_000"},
        {ID: 25, Name: "Pinched Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_000"},
        {ID: 26, Name: "Leaf Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_001"},
        {ID: 27, Name: "Zig Zag Cornrows", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_002"},
        {ID: 28, Name: "Pigtail Bangs", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_003"},
        {ID: 29, Name: "Wave Braids", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_003"},
        {ID: 30, Name: "Coil Braids", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_004"},
        {ID: 31, Name: "Rolled Quiff", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_006"},
        {ID: 32, Name: "Loose Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_000_F"},
        {ID: 33, Name: "Undercut Swept Back", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_001_F"},
        {ID: 34, Name: "Undercut Swept Side", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_002_F"},
        {ID: 35, Name: "Spiked Mohawk", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_003_F"},
        {ID: 36, Name: "Bandana and Braid", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_003"},
        {ID: 37, Name: "Layered Mod", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_006_F"},
        {ID: 38, Name: "Skinbyrd", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_004_F"},
        {ID: 76, Name: "Neat Bun", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_F_000_F"},
        {ID: 77, Name: "Short Bob", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_F_001_F"}
    ]
];

const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];

const fathers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 42, 43, 44];
const mothers = [21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45];

const creatorPlayerPos = new mp.Vector3(402.8664, -996.4108, -99.00027);
const creatorPlayerHeading = 180;

const creatorClothes = [
    [{index: 3, clothes: 15}, {index: 11, clothes: 15}, {index: 8, clothes: 15}, {index: 4, clothes: 14}, {
        index: 6,
        clothes: 5
    }],
    [{index: 3, clothes: 15}, {index: 11, clothes: 18}, {index: 8, clothes: 17}, {index: 4, clothes: 17}, {
        index: 6,
        clothes: 5
    }]
];

const appearanceName = ["blemishes", "facialHair", "eyebrows", "ageing", "blush", "complexion", "sunDamage", "freckles", "chestHair"];

const featuresName = ["nose.width", "nose.height", "nose.length", "nose.bridge", "nose.tip", "nose.bridgeShift",
    "brow.height", "brow.width", "cheekbone.height", "cheekbone.width", "cheeks.width", "eyes",
    "lips", "jaw.width", "jaw.height", "chin.length", "chin.position", "chin.width", "chin.shape", "neck.width"];

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
    player.model = freemodeCharacters[number];
    player.position = creatorPlayerPos;
    player.heading = creatorPlayerHeading;
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
        player.setClothes(creatorClothes[0][i].index, creatorClothes[0][i].clothes, 0, 2);
    }

    player.position = creatorPlayerPos;
    player.heading = creatorPlayerHeading;
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

    for (let i = 0; i < featuresName.length; i++) {
        value = eval("char.features." + featuresName[i] + ".value");
        features.push(value);
        console.log(value);
    }

    const gender = char.sex.gender === 0;

    player.setCustomization(gender,

        mothers[char.parents.mother.count],
        fathers[char.parents.father.count],
        0,

        mothers[char.parents.mother.count],
        fathers[char.parents.father.count],
        0,

        char.parents.similarity.value,
        char.parents.similarity.value,
        0.0,

        char.features.eyes.colorNumber,
        char.hair.colorNumber,
        char.hair.highlightColor.value,

        features
    );

    player.setClothes(2, hairList[char.sex.gender][char.hair.number].ID, 0, 2);

    let item;

    for (let i = 0; i < appearanceName.length; i++) {
        item = eval("char.appearance." + appearanceName[i]);
        player.setHeadOverlay(item.index, [item.count, 1, item.colorNumber, 0]);
    }

    for (let i = 0; i < 5; i++) {
        player.setClothes(creatorClothes[char.sex.gender][i].index, creatorClothes[char.sex.gender][i].clothes, 0, 2);
    }

    player.dimension = 0;
}

module.exports.setPlayerSkin = setPlayerSkin;