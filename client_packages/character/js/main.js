let character = {
    sex: {
        name: "male",
        gender: 0,
    },
    parents: {
        father: {
            count: 0,
            maxCount: 24,
        },
        mother: {
            count: 0,
            maxCount: 21,
        },
        similarity: {
            value: 0.5,
            range: "#parents_similarity_range",
            valueLabel: "#parents_similarity_value"
        }
    },

    features: {

        nose: {
            width: {
                index: 0,
                range: "#nose_width_range",
                valueLabel: "#nose_width_value",
                value: 0
            },
            height: {
                index: 1,
                range: "#nose_height_range",
                valueLabel: "#nose_height_value",
                value: 0
            },
            length: {
                index: 2,
                range: "#nose_length_range",
                valueLabel: "#nose_length_value",
                value: 0
            },
            bridge: {
                index: 3,
                range: "#nose_bridge_range",
                valueLabel: "#nose_bridge_value",
                value: 0
            },
            tip: {
                index: 4,
                range: "#nose_tip_range",
                valueLabel: "#nose_tip_value",
                value: 0
            },
            bridgeShift: {
                index: 5,
                range: "#nose_bridgeShift_range",
                valueLabel: "#nose_bridgeShift_value",
                value: 0
            }
        },

        brow: {
            height: {
                index: 6,
                range: "#brow_height_range",
                valueLabel: "#brow_height_value",
                value: 0
            },
            width: {
                index: 7,
                range: "#brow_width_range",
                valueLabel: "#brow_width_value",
                value: 0
            }
        },

        cheekbone: {
            height: {
                index: 8,
                range: "#cheekbone_height_range",
                valueLabel: "#cheekbone_height_value",
                value: 0
            },
            width: {
                index: 9,
                range: "#cheekbone_width_range",
                valueLabel: "#cheekbone_width_value",
                value: 0
            }
        },

        cheeks: {
            width: {
                index: 10,
                range: "#cheeks_width_range",
                valueLabel: "#cheeks_width_value",
                value: 0
            }
        },

        eyes: {
            index: 11,
            range: "#eyes_range",
            valueLabel: "#eyes_value",
            colorNumber: 0,
            maxColor: 30,
            value: 0
        },

        lips: {
            index: 12,
            range: "#lips_range",
            valueLabel: "#lips_value",
            value: 0
        },

        jaw: {
            width: {
                index: 13,
                range: "#jaw_width_range",
                valueLabel: "#jaw_width_value",
                value: 0
            },
            height: {
                index: 14,
                range: "#jaw_height_range",
                valueLabel: "#jaw_height_value",
                value: 0
            }
        },

        chin: {
            length: {
                index: 15,
                range: "#chin_length_range",
                valueLabel: "#chin_length_value",
                value: 0
            },
            position: {
                index: 16,
                range: "#chin_position_range",
                valueLabel: "#chin_position_value",
                value: 0
            },
            width: {
                index: 17,
                range: "#chin_width_range",
                valueLabel: "#chin_width_value",
                value: 0
            },
            shape: {
                index: 18,
                range: "#chin_shape_range",
                valueLabel: "#chin_shape_value",
                value: 0
            }
        },

        neck: {
            width: {
                index: 19,
                range: "#neck_width_range",
                valueLabel: "#neck_width_value",
                value: 0
            }
        }

    },

    appearance: {
        blemishes: {
            index: 0,
            maxCount: 23,
            colorNumber: 0,
            count: -1
        },
        facialHair: {
            index: 1,
            maxCount: 28,
            colorNumber: 0,
            maxColor: 255,
            count: -1
        },
        eyebrows: {
            index: 2,
            maxCount: 33,
            colorNumber: 0,
            maxColor: 255,
            count: -1
        },
        ageing: {
            index: 3,
            maxCount: 14,
            colorNumber: 0,
            count: -1
        },
        blush: {
            index: 5,
            maxCount: 6,
            colorNumber: 0,
            maxColor: 255,
            count: -1
        },
        complexion: {
            index: 6,
            maxCount: 11,
            colorNumber: 0,
            count: -1
        },
        sunDamage: {
            index: 7,
            maxCount: 10,
            colorNumber: 0,
            count: -1
        },
        freckles: {
            index: 9,
            maxCount: 17,
            colorNumber: 0,
            count: -1
        },
        chestHair: {
            index: 10,
            maxCount: 16,
            colorNumber: 0,
            maxColor: 255,
            count: -1
        },
    },

    hair: {
        number: 0,
        colorNumber: 0,
        maxColor: 63,
        highlightColor: {
            value: 50,
            range: "#hair_highlightColor_range",
            valueLabel: "#color_count_highlightColor"
        },
        male: {
            maxNumber: 37
        },
        female: {
            maxNumber: 39
        }
    }
};

const fatherNames = ["Ефрем", "Христофор", "Велимир", "Филипп", "Константин", "Динар", "Адольф", "Савва", "Елисей", "Альфред", "Оскар", "Харитон", "Арнольд", "Ким", "Гарри", "Ян", "Сантьяго", "Георгий", "Августин", "Льюис", "Лев", "Герман", "Яков", "Джозеф"];
const motherNames = ["Стелла", "Агата", "Ханна", "Жасмин", "Глория", "Инесса", "Ева", "Алина", "Иоанна", "Анита", "Злата", "София", "Евелина", "Клеопатра", "Эшли", "Бриенна", "Аида", "Натали", "Инга", "Элизабет", "Селена", "Шарлотта"];

const
    MAX_COLORS = 64,
    MAX_EYE_COLORS = 26;

const initCharacter = JSON.parse(JSON.stringify(character));

const CHANGE_GENDER_MESSAGE = "<p>Вы точно хотите поменять пол персонажа?</p> <p>Все данные настройки персонажа будут утеряны,</p><p>их невозможно будет восстановить.</p>";
const SAVE_MESSAGE = "<p>Вы точно хотите продолжить?</p> <p>В дальнейшем можно будет сделать только косметические изменения.</p>";
const RESET_MESSAGE = "<p>Вы точно хотите сбросить все настройки?</p>";

const HOLD_SPEED = 100;

let zoomCount = 1;
let holdInButton = 0;
let currentPage = "parents_page";
let palette;
let showPalette;
let angleCount = 180;
let clickAngle = false;


$(document).ready(function () {
    connectSliders();
    loadColors();
});



$("[id=menu_button-anim]").on("click", function () {
    const page = $(this).attr("page");

    if (currentPage === page) {
        return 1;
    }

    const
        pageNumber = $(this).attr("number"),
        allPages = ".parents_page, .features_page, .appearance_page",
        position = 6.28 * pageNumber;

    currentPage = page;

    $(".content").scrollTop(0);
    $(allPages).hide(200);
    $("." + page).show(200);

    $(".animation").css({"transform": "translate(" + position + "vw)", "transition": "all .20s ease-out"});
});



$('[class=slider]').on('slide', function (e, range) {
    const
        min = $(this).slider("option", "min"),
        max = $(this).slider("option", "max"),
        percent = Math.ceil(((range.value - min) / (max - min)) * 100);

    $(this).parents(".slider-range").css('background' , '-webkit-linear-gradient(left, rgba(211, 22, 73, 1) 0%, rgba(211, 22, 73, 1) ' + percent + '%, rgba(211, 22, 73,0.3) ' + percent + '%)');
});

$('[slider=feature_slider]').on('slide', function (event, range) {
    const
        feature = $(event.target).attr("feature"),
        featureObject = eval("character.features." + feature);

    featureObject.value = parseFloat(range.value);
    mp.trigger("changeFeature", featureObject.index, featureObject.value);
});

$(character.parents.similarity.range).on('slide', function (e, range) {
    character.parents.similarity.value = parseFloat(range.value);
    mp.trigger("changeParents", character.parents.mother.count, character.parents.father.count, character.parents.similarity.value);
});




$("[id=left_arrow_parents]").on("click", function () {
    const
        parent = $(this).attr("parent"),
        names = (parent === "father") ? fatherNames : motherNames,
        parentObject = eval("character.parents." + parent);

    parentObject.count--;

    if (parentObject.count < 0) {
        parentObject.count = parentObject.maxCount;
    }

    $("#parents_count_" + parent).text(names[parentObject.count]);
    mp.trigger("changeParents", character.parents.mother.count, character.parents.father.count, character.parents.similarity.value, character.sex.gender);
});

$("[id=right_arrow_parents]").on("click", function () {
    const
        parent = $(this).attr("parent"),
        names = (parent === "father") ? fatherNames : motherNames,
        parentObject = eval("character.parents." + parent);

    parentObject.count++;

    if (parentObject.count > parentObject.maxCount) {
        parentObject.count = 0;
    }

    $("#parents_count_" + parent).text(names[parentObject.count]);
    mp.trigger("changeParents", character.parents.mother.count, character.parents.father.count, character.parents.similarity.value, character.sex.gender);
});



$(".zoom").on("click", function () {
    zoomCount++;

    if (zoomCount >= 3) {
        zoomCount = 0;
    }

    mp.trigger("changeZoom", zoomCount);
});



$("[id=left_arrow_appearance]").on("click", function () {
    const
        appearance = $(this).attr("appearance"),
        appearanceObject = eval("character.appearance." + appearance);

    appearanceObject.count--;

    if (appearanceObject.count < -1) {
        appearanceObject.count = appearanceObject.maxCount;
    }

    $("#appearance_count_" + appearance).text(appearanceObject.count + 1);
    mp.trigger("changeAppearance", appearanceObject.index, appearanceObject.count, appearanceObject.colorNumber);
});

$("[id=right_arrow_appearance]").on("click", function () {
    const
        appearance = $(this).attr("appearance"),
        appearanceObject = eval("character.appearance." + appearance);

    appearanceObject.count++;

    if (appearanceObject.count > appearanceObject.maxCount) {
        appearanceObject.count = -1;
    }

    $("#appearance_count_" + appearance).text(appearanceObject.count + 1);
    mp.trigger("changeAppearance", appearanceObject.index, appearance.count, appearanceObject.colorNumber);
});



$(character.hair.highlightColor.range).on('slide', function (e, range) {
    character.hair.highlightColor.value = parseInt(range.value);
    mp.trigger("changeColor", -1, -1, "hair", character.hair.colorNumber, character.hair.highlightColor.value);
});



$("#left_arrow_hair").on("click", function () {
    const hair = character.hair;

    hair.number--;

    if (hair.number <= 0) {
        hair.number = eval("hair." + character.sex.name + ".maxNumber");
    }

    $("#hair_number").text(hair.number);
    mp.trigger("changeHair", hair.number, character.sex.gender);
});

$("#right_arrow_hair").on("click", function () {
    const hair = character.hair;

    hair.number++;

    if (hair.number > eval("hair." + character.sex.name + ".maxNumber")) {
        hair.number = 0;
    }

    $("#hair_number").text(hair.number);
    mp.trigger("changeHair", hair.number, character.sex.gender);
});



$('#right_arrow_angle').on('mousedown', function () {
    if(clickAngle === false) {
        holdInButton = setInterval(function () {

            angleCount += 3;
            if (angleCount >= 360) {
                angleCount = 0;
            }

            mp.trigger("changeModelAngle", angleCount);

        }, HOLD_SPEED);
        clickAngle = true;
    }
    else {
        clearInterval(holdInButton);
        clickAngle = false;
    }
}).on('mouseup mouseout', function () {
    clearInterval(holdInButton);
    clickAngle = false;
});

$('#left_arrow_angle').on('mousedown', function () {
    if(clickAngle === false) {
        holdInButton = setInterval(function () {
            if (angleCount <= 0) {
                angleCount = 360;
            }
            angleCount -= 3;

            mp.trigger("changeModelAngle", angleCount);

        }, HOLD_SPEED);
        clickAngle = true;
    }
    else {
        clearInterval(holdInButton);
        clickAngle = false;
    }
}).on('mouseup mouseout', function () {
    clearInterval(holdInButton);
    clickAngle = false;
});



$('#male').on("click", function () {
    const warningText = ".warning .content .text";

    if (character.sex.gender === 0) {
        return 1;
    }

    $(warningText).html(CHANGE_GENDER_MESSAGE);

    $(".warning").fadeIn('slow', 'linear');
    $("#accept_warning").attr("response", "male");
});

$('#female').on("click", function () {
    const warningText = ".warning .content .text";

    if (character.sex.gender === 1) {
        return 1;
    }

    $(warningText).html(CHANGE_GENDER_MESSAGE);

    $(".warning").fadeIn('slow', 'linear');
    $("#accept_warning").attr("response", "female");
});



$("#reject_warning").on("click", function () {

    $(".warning").fadeOut('slow', 'linear');

});

$("#accept_warning").on("click", function () {
    const warning = $(this).attr("response");

    switch (warning) {
        case "female": {
            resetCharacter();
            character.sex.name = "female";
            character.sex.gender = 1;
            zoomCount = 1;
            $("#male").css("background", "rgb(104,104,104)");
            $("#female").css("background", "rgb(211, 22, 73)");
            mp.trigger("changeGenderInClient", character.sex.gender);
            break;
        }
        case "male": {
            resetCharacter();
            character.sex.name = "male";
            character.sex.gender = 0;
            zoomCount = 1;
            $("#female").css("background", "rgb(104,104,104)");
            $("#male").css("background", "rgb(211, 22, 73)");
            mp.trigger("changeGenderInClient", character.sex.gender);
            break;
        }
        case "reset": {
            resetCharacter();
            break;
        }
        case "save": {
            const char = JSON.stringify(character);
            mp.trigger("saveCharacterInClient", char);
            break;
        }
    }

    $(".warning").fadeOut('slow', 'linear');
});



$("#reset_character").on("click", function () {
    const warningText = ".warning .content .text";

    $(warningText).html(RESET_MESSAGE);

    $(".warning").fadeIn('slow', 'linear');
    $("#accept_warning").attr("response", "reset");
});

$("#save_character").on("click", function () {
    const warningText = ".warning .content .text";

    $(warningText).html(SAVE_MESSAGE);

    $(".warning").fadeIn('slow', 'linear');
    $("#accept_warning").attr("response", "save");
});



$('.palette-other, .palette-eyes').on('click', "[id=select_color]", function () {
    const
        paletteColor = palette.attr("color"),
        colorIndex = $(this).attr("color-index"),
        colorObject = eval("character." + paletteColor),
        paletteFor = palette.attr("for");

    colorObject.colorNumber = parseInt(colorIndex);

    $(this).fadeOut('fast', 'linear').fadeIn('fast', 'linear');

    mp.trigger("changeColor", colorObject.index, colorObject.count, paletteFor, colorObject.colorNumber, character.hair.highlightColor.value);
});

$(".clear-area, .cross").on("click", function () {
    if (showPalette !== undefined) {
        $(".color_select-box").hide(200);

        showPalette = undefined;
        $(palette).attr("src", "../images/art-palette-off.svg");

    }
});

$("[id=chose-palette]").on("click", function () {
    const
        palette = $(this).attr("for"),
        imagePaletteOn = "../images/art-palette-on.svg",
        imagePaletteOff = "../images/art-palette-off.svg";

    $(".palette-eyes, .palette-other").hide();

    if (palette === "eyes") {
        $(".palette-eyes").show();
    }
    else {
        $(".palette-other").show();
    }

    $("[id=chose-palette]").attr("src", imagePaletteOff);

    if (showPalette === undefined) {
        $(".color_select-box").show(200);

        showPalette = palette;
        $(this).attr("src", imagePaletteOn);
    }
    else if (showPalette === palette) {
        $(".color_select-box").hide(200);

        showPalette = undefined;
        $(this).attr("src", imagePaletteOff);
    }
    else if (showPalette !== palette) {
        $(".color_select-box").hide().show(200);

        showPalette = palette;
        $(this).attr("src", imagePaletteOn);
    }

});


function resetCharacter() {
    character = JSON.parse(JSON.stringify(initCharacter));

    $("#male").css("background", "rgb(211, 22, 73)");
    $("#female").css("background", "rgb(104,104,104)");
    $("span[clear=true]").text(0);
    $("[class=slider-range]").val(0).css('background', '-webkit-linear-gradient(left, rgba(211, 22, 73, 1) 0%,  rgba(211, 22, 73, 1) 50%, rgba(211, 22, 73,0.3) 50%)');
    $("#parents_count_father").text(fatherNames[0]);
    $("#parents_count_mother").text(motherNames[0]);
    $(character.parents.similarity.range).val(0.5);

    mp.trigger("resetCharacter");
}

function connectSliders() {
    $(character.parents.similarity.range).slider({
        min: 0.0,
        max: 1.0,
        step: 0.01,
        value: 0.5
    });

    $("[slider=feature_slider]").slider({
        min: -1.0,
        max: 1.0,
        step: 0.01,
        value: 0
    });

    $(character.hair.highlightColor.range).slider({
        min: 0,
        max: 100,
        value: 50
    });
}

function loadColors() {
    for (let i = 0; i < MAX_COLORS; i++) {
        $(".palette-other").append("<span id='select_color' color-index='" + i + "' class='color palette_color-" + i + "'></span>");
    }

    for (let i = 0; i < MAX_EYE_COLORS; i++) {
        $(".palette-eyes").append("<span id='select_color' color-index='" + i + "' class='color palette_color-eyes-" + i + "'></span>");
    }
}