let interface = {
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
    },

    settings: {
        angleCount: 180
    }
}

const fatherNames = ["Ефрем", "Христофор", "Велимир", "Филипп", "Константин", "Динар", "Адольф", "Савва", "Елисей", "Альфред", "Оскар", "Харитон", "Арнольд", "Ким", "Гарри", "Ян", "Сантьяго", "Георгий", "Августин", "Льюис", "Лев", "Герман", "Яков", "Джозеф"];
const motherNames = ["Стелла", "Агата", "Ханна", "Жасмин", "Глория", "Инесса", "Ева", "Алина", "Иоанна", "Анита", "Злата", "София", "Евелина", "Клеопатра", "Эшли", "Бриенна", "Аида", "Натали", "Инга", "Элизабет", "Селена", "Шарлотта"];

const initInterface = JSON.parse(JSON.stringify(interface));
let scopeCount = 1;

const CHANGE_GENDER_MESSAGE = "<p>Вы точно хотите поменять пол персонажа?</p> <p>Все данные настройки персонажа будут утеряны,</p><p>их невозможно будет восстановить.</p>";
const SAVE_MESSAGE = "<p>Вы точно хотите продолжить?</p> <p>В дальнейшем можно будет сделать только косметические изменения.</p>";
const RESET_MESSAGE = "<p>Вы точно хотите сбросить все настройки?</p>";

const HOLD_SPEED = 100;
let holdInButton = 0;
let currentPage = "parents_page";
let palette;
let showPalette;

$(document).ready(function () {
    for(let i = 0; i < 64; i ++) {
        $(".palette-other").append("<span id='select_color' color-index='"+ i +"' class='color palette_color-" + i + "'></span>");
    }
    for(let i = 0; i < 26; i ++) {
        $(".palette-eyes").append("<span id='select_color' color-index='"+ i +"' class='color palette_color-eyes-" + i + "'></span>");
    }
});

$("[id=menu_button-anim]").on("click", function () {
    if(currentPage === $(this).attr("page")) {
        return 1;
    }
    const position = 6.28 * $(this).attr("number");

    currentPage = $(this).attr("page");
    $(".parents_page, .features_page, .appearance_page").hide(200);
    $("." + $(this).attr("page")).show(200);
    $(".animation").css({"transform": "translate(" + position + "vw)", "transition": "all .20s ease-out"});
});

$('input[type="range"]').on('input', function () {
    const percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);
    $(this).css('background', '-webkit-linear-gradient(left, rgba(211, 22, 73, 1) 0%, rgba(211, 22, 73, 1) ' + percent + '%, rgba(211, 22, 73,0.3) ' + percent + '%)');
});

$(document).on('input change', function (event) {
    if ($(event.target).attr("feature") != null) {

        let feature = eval("interface.features." + $(event.target).attr("feature"));

        $(feature.range).on('input change', function () {
            feature.value = this.value;
            $(feature.valueLabel).text(feature.value);
            mp.trigger("featureHandler", feature.index, feature.value);
        });

    }
});

$(interface.parents.similarity.range).on('input change', function () {
    interface.parents.similarity.value = this.value;
    $(interface.parents.similarity.valueLabel).text(interface.parents.similarity.value);
    mp.trigger("parentsHandler", interface.parents.mother.count, interface.parents.father.count, interface.parents.similarity.value,);
});

$("[id=left_arrow_parents]").on("click", function () {
    let parent = eval("interface.parents." + $(this).attr("parent"));

    const names = ($(this).attr("parent") === "father") ? fatherNames : motherNames;

    parent.count--;
    if (parent.count < 0) {
        parent.count = parent.maxCount;
    }
    $("#parents_count_" + $(this).attr("parent")).text(names[parent.count]);
    mp.trigger("parentsHandler", interface.parents.mother.count, interface.parents.father.count, interface.parents.similarity.value, interface.sex.gender);
});

$("[id=right_arrow_parents]").on("click", function () {
    let parent = eval("interface.parents." + $(this).attr("parent"));

    const names = ($(this).attr("parent") === "father") ? fatherNames : motherNames;

    parent.count++;
    if (parent.count > parent.maxCount) {
        parent.count = 0;
    }

    $("#parents_count_" + $(this).attr("parent")).text(names[parent.count]);
    mp.trigger("parentsHandler", interface.parents.mother.count, interface.parents.father.count, interface.parents.similarity.value, interface.sex.gender);
});

$(".zoom").on("click", function () {
    scopeCount++;
    if (scopeCount >= 3) {
        scopeCount = 0;
    }
    mp.trigger("scopeHandler", scopeCount);
});

$("[id=left_arrow_appearance]").on("click", function () {
    let appearance = eval("interface.appearance." + $(this).attr("appearance"));

    appearance.count--;
    if (appearance.count < -1) {
        appearance.count = appearance.maxCount;
    }
    $("#appearance_count_" + $(this).attr("appearance")).text(appearance.count + 1);
    mp.trigger("appearanceHandler", appearance.index, appearance.count, appearance.colorNumber);
});

$("[id=right_arrow_appearance]").on("click", function () {
    let appearance = eval("interface.appearance." + $(this).attr("appearance"));

    appearance.count++;
    if (appearance.count > appearance.maxCount) {
        appearance.count = -1;
    }
    $("#appearance_count_" + $(this).attr("appearance")).text(appearance.count + 1);
    mp.trigger("appearanceHandler", appearance.index, appearance.count, appearance.colorNumber);
});

$(interface.hair.highlightColor.range).on('input change', function () {
    interface.hair.highlightColor.value = this.value;
    $(interface.hair.highlightColor.valueLabel).text(interface.hair.highlightColor.value);
    mp.trigger("colorHandler", -1, -1, "hair", interface.hair.colorNumber, interface.hair.highlightColor.value);
});

$("#left_arrow_hair").on("click", function () {
    let hair = interface.hair;

    hair.number--;
    if (hair.number <= 0) {
        hair.number = eval("hair." + interface.sex.name + ".maxNumber");
    }

    $("#hair_number").text(hair.number);
    mp.trigger("hairHandler", hair.number, interface.sex.gender);
});

$("#right_arrow_hair").on("click", function () {
    let hair = interface.hair;

    hair.number++;
    if (hair.number > eval("hair." + interface.sex.name + ".maxNumber")) {
        hair.number = 0;
    }
    $("#hair_number").text(hair.number);
    mp.trigger("hairHandler", hair.number, interface.sex.gender);
});

$('#right_arrow_angle').on('mousedown', function () {
    holdInButton = setInterval(function () {

        interface.settings.angleCount += 3;
        if (interface.settings.angleCount >= 360) {
            interface.settings.angleCount = 0;
        }
        $("#angle_text").text(interface.settings.angleCount + "°");
        mp.trigger("angleHandler", interface.settings.angleCount);

    }, HOLD_SPEED);
}).on('mouseup', function () {
    clearInterval(holdInButton);
}).on('mouseout', function () {
    clearInterval(holdInButton);
});

$('#left_arrow_angle').on('mousedown', function () {
    holdInButton = setInterval(function () {
        if (interface.settings.angleCount <= 0) {
            interface.settings.angleCount = 360;
        }
        interface.settings.angleCount -= 3;
        $("#angle_text").text(interface.settings.angleCount + "°");
        mp.trigger("angleHandler", interface.settings.angleCount);

    }, HOLD_SPEED);
}).on('mouseup', function () {
    clearInterval(holdInButton);
}).on('mouseout', function () {
    clearInterval(holdInButton);
});

$("#male").on("click", function () {
    if (interface.sex.gender === 0) {
        return 1;
    }
    $(".warning .content .text").html(CHANGE_GENDER_MESSAGE);
    $(".warning").fadeIn('slow', 'linear');
    $("#accept_warning").attr("response", "male");
});

$("#female").on("click", function () {
    if (interface.sex.gender === 1) {
        return 1;
    }
    $(".warning .content .text").html(CHANGE_GENDER_MESSAGE);
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
            interface.sex.name = "female";
            interface.sex.gender = 1;
            scopeCount = 1;
            $("#male").css("background", "rgb(104,104,104)");
            $("#female").css("background", "rgb(211, 22, 73)");
            mp.trigger("genderHandler", interface.sex.gender);
            break;
        }
        case "male": {
            resetCharacter();
            interface.sex.name = "male";
            interface.sex.gender = 0;
            scopeCount = 1;
            $("#female").css("background", "rgb(104,104,104)");
            $("#male").css("background", "rgb(211, 22, 73)");
            mp.trigger("genderHandler", interface.sex.gender);
            break;
        }
        case "reset": {
            resetCharacter();
            break;
        }
        case "save": {
            mp.trigger("saveHandler", JSON.stringify(interface));
            break;
        }
    }

    $(".warning").fadeOut('slow', 'linear');
});

$("#reset_character").on("click", function () {
    $(".warning .content .text").html(RESET_MESSAGE);
    $(".warning").fadeIn('slow', 'linear');
    $("#accept_warning").attr("response", "reset");
});

$("#save_character").on("click", function () {
    $(".warning .content .text").html(SAVE_MESSAGE);
    $(".warning").fadeIn('slow', 'linear');
    $("#accept_warning").attr("response", "save");
});


resetCharacter = function () {
    interface = JSON.parse(JSON.stringify(initInterface));

    $("#male").css("background", "rgb(211, 22, 73)");
    $("#female").css("background", "rgb(104,104,104)");
    $("span[clear=true]").text(0);
    $("#angle_text").text(180 + "°");
    $("input[type=range]").val(0);
    $("#parents_count_father").text(fatherNames[0]);
    $("#parents_count_mother").text(motherNames[0]);
    $(interface.parents.similarity.range).val(0.5);
    $("input[type=range]").css('background', '-webkit-linear-gradient(left, rgba(211, 22, 73, 1) 0%,  rgba(211, 22, 73, 1) 50%, rgba(211, 22, 73,0.3) 50%)');

    mp.trigger("resetHandler");
}

$("[id=chose-palette]").on("click", function () {
    $(".palette-eyes, .palette-other").hide();
    if($(this).attr("for") === "eyes") {
        $(".palette-eyes").show();
    }
    else {
        $(".palette-other").show();
    }

    palette = $(this);

    $("[id=chose-palette]").attr("src", "style/images/art-palette-off.svg");

    if(showPalette === undefined) {
        $(".color_select-box").show(200);
        showPalette = palette.attr("for");
        $(this).attr("src", "style/images/art-palette-on.svg");
    }
    else if(showPalette === palette.attr("for")) {
        $(".color_select-box").hide(200);
        showPalette = undefined;
        $(this).attr("src", "style/images/art-palette-off.svg");
    }
    else if(showPalette !== palette.attr("for")) {
        $(".color_select-box").hide().show(200);
        showPalette = palette.attr("for");
        $(this).attr("src", "style/images/art-palette-on.svg");
    }

});


$('.palette-other, .palette-eyes').on('click', "[id=select_color]", function() {
    let color = eval("interface." + palette.attr("color"));
    color.colorNumber = $(this).attr("color-index");
    $(this).fadeOut('fast', 'linear').fadeIn('fast', 'linear');
    mp.trigger("colorHandler", color.index, color.count, palette.attr("for"), color.colorNumber, interface.hair.highlightColor.value);
});




