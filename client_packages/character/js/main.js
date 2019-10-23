let interface = {
    sex: {
        name: "male",
        gender: 0,
    },
    parents: {
        father: {
            count: 0,
            maxCount: 23
        },
        mother: {
            count: 0,
            maxCount: 22
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
            maxColor: 31,
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
        }
    },

    hair: {
        number: 0,
        colorNumber: 0,
        maxColor: 63,
        highlightColor: {
            value: 0,
            range: "#hair_highlightColor_range"  ,
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

const initInterface = JSON.parse(JSON.stringify(interface));
let scopeCount = 1;

const HOLD_SPEED = 100;
let holdInButton = 0;

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
    mp.trigger("parentsHandler", interface.parents.mother.count, interface.parents.father.count, interface.parents.similarity.value);
});

$("[id=left_arrow_parents]").on("click", function () {
    let parent = eval("interface.parents." + $(this).attr("parent"));

    parent.count--;
    if (parent.count < 0) {
        parent.count = parent.maxCount;
    }
    $("#parents_count_" + $(this).attr("parent")).text(parent.count);
    mp.trigger("parentsHandler", interface.parents.mother.count, interface.parents.father.count, interface.parents.similarity.value);
});

$("[id=right_arrow_parents]").on("click", function () {
    let parent = eval("interface.parents." + $(this).attr("parent"));

    parent.count++;
    if (parent.count > parent.maxCount) {
        parent.count = 0;
    }

    $("#parents_count_" + $(this).attr("parent")).text(parent.count);
    mp.trigger("parentsHandler", interface.parents.mother.count, interface.parents.father.count, interface.parents.similarity.value);
});

$("#scope").on("click", function () {
    scopeCount++;
    if(scopeCount >= 3) {
        scopeCount = 0;
    }
    mp.trigger("scopeHandler", scopeCount, interface.sex.gender);
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

$("[id=left_arrow_color]").on("click", function () {
    let color = eval("interface." + $(this).attr("color"));

    color.colorNumber--;
    if (color.colorNumber < 0) {
        color.colorNumber = color.maxColor;
    }
    $("#color_count_" + $(this).attr("for")).text(color.colorNumber);
    mp.trigger("colorHandler", color.index, color.count, $(this).attr("for"), color.colorNumber, interface.hair.highlightColor.value);
});

$("[id=right_arrow_color]").on("click", function () {
    let color = eval("interface." + $(this).attr("color"));

    color.colorNumber++;
    if (color.colorNumber > color.maxColor) {
        color.colorNumber = 0;
    }
    $("#color_count_"  + $(this).attr("for")).text(color.colorNumber);
    mp.trigger("colorHandler", color.index, color.count, $(this).attr("for"), color.colorNumber, interface.hair.highlightColor.value);
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

$('#right_arrow_angle').on('mousedown',function() {
    holdInButton = setInterval(function() {

        interface.settings.angleCount += 3;
        if(interface.settings.angleCount >= 360) {
            interface.settings.angleCount = 0;
        }
        $("#angle_text").text(interface.settings.angleCount + "°");
        mp.trigger("angleHandler", interface.settings.angleCount);

    }, HOLD_SPEED);
}).on('mouseup',function() {
    clearInterval(holdInButton);
}).on('mouseout',function() {
    clearInterval(holdInButton);
});

$('#left_arrow_angle').on('mousedown',function() {
    holdInButton = setInterval(function() {
        if(interface.settings.angleCount <= 0) {
            interface.settings.angleCount = 360;
        }
        interface.settings.angleCount -= 3;
        $("#angle_text").text(interface.settings.angleCount + "°");
        mp.trigger("angleHandler", interface.settings.angleCount);

    }, HOLD_SPEED);
}).on('mouseup',function() {
    clearInterval(holdInButton);
}).on('mouseout',function() {
    clearInterval(holdInButton);
});

$("#male").on("click", function () {
    if(interface.sex.gender === 0) {
        return 1;
    }
    $(".warning_message").fadeIn('slow','linear');
    $(".warning_message h4").text("Вы точно хотите поменять пол персонажа? Все данные настройки будут утеряны!");
    $("#male").prop('checked', false);
    $("#accept_warning").attr("response", "male");
});

$("#female").on("click", function () {
    if(interface.sex.gender === 1) {
        return 1;
    }
    $(".warning_message").fadeIn('slow','linear');
    $(".warning_message h4").text("Вы точно хотите поменять пол персонажа? Все данные настройки будут утеряны!");
    $("#female").prop('checked', false);
    $("#accept_warning").attr("response", "female");
});

$("#reject_warning").on("click", function () {
    $(".warning_message").fadeOut('slow','linear');
});

$("#accept_warning").on("click", function () {
    const warning = $(this).attr("response");

    switch (warning) {
        case "female":{
            resetCharacter();
            interface.sex.name = "female";
            interface.sex.gender = 1;
            scopeCount = 1;
            $("#female").prop('checked', true);
            $("#male").prop('checked', false);
            mp.trigger("genderHandler", interface.sex.gender);
            break;
        }
        case "male": {
            resetCharacter();
            interface.sex.name = "male";
            interface.sex.gender = 0;
            scopeCount = 1;
            $("#male").prop('checked', true);
            $("#female").prop('checked', false);
            mp.trigger("genderHandler", interface.sex.gender);
            break;
        }
        case "reset": {
            resetCharacter();
            break;
        }
        case "save": {
            console.log(JSON.stringify(interface));
            mp.trigger("saveHandler", JSON.stringify(interface));
            break;
        }
    }

    $(".warning_message").fadeOut('slow','linear');
});

$("#reset_character").on("click", function () {
    $(".warning_message").show(500);
    $(".warning_message h4").text("Вы точно хотите сбросить все настройки?");
    $("#accept_warning").attr("response", "reset");
});

$("#save_character").on("click", function () {
    $(".warning_message").show(500);
    $(".warning_message h4").text("Вы точно хотите продолжить? В дальнейшем можно будет сделать только косметические изменения.");
    $("#accept_warning").attr("response", "save");
});



resetCharacter = function () {
    interface = JSON.parse(JSON.stringify(initInterface));

    $("#female").prop('checked', false);
    $("#male").prop('checked', true);
    $("label[clear=true]").text(0);
    $("#angle_text").text(180 + "°");
    $("input[type=range]").val(0);
    $(interface.parents.similarity.range).val(0.5);

    mp.trigger("resetHandler");
}





