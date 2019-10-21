let interface = {
    sex: "male",
    parents: {
        father: {
            count: 0,
            maxCount: 24
        },
        mother: {
            count: 0,
            maxCount: 22
        },
        similarity: {
            value: 0,
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
            count: 0
        },
        facialHair: {
            index: 1,
            maxCount: 28,
            colorNumber: 0,
            maxColor: 255,
            count: 0
        },
        eyebrows: {
            index: 2,
            maxCount: 33,
            colorNumber: 0,
            maxColor: 255,
            count: 0
        },
        ageing: {
            index: 3,
            maxCount: 14,
            count: 0
        },
        blush: {
            index: 5,
            maxCount: 6,
            colorNumber: 0,
            maxColor: 255,
            count: 0
        },
        complexion: {
            index: 6,
            maxCount: 11,
            count: 0
        },
        sunDamage: {
            index: 7,
            maxCount: 10,
            count: 0
        },
        freckles: {
            index: 9,
            maxCount: 17,
            count: 0
        },
        chestHair: {
            index: 10,
            maxCount: 16,
            colorNumber: 0,
            maxColor: 255,
            count: 0
        }
    },

    hair: {
        number: 0,
        colorNumber: 0,
        maxColor: 63,
        male: {
            maxNumber: 37
        },
        female: {
            maxNumber: 39
        }
    }
}

const initInterface = JSON.parse(JSON.stringify(interface));

$(document).on('input change', function (event) {
    if ($(event.target).attr("feature") != null) {

        let feature = eval("interface.features." + $(event.target).attr("feature"));

        $(feature.range).on('input change', function () {
            feature.value = this.value;
            $(feature.valueLabel).text((this.value * 100).toFixed(0));
           // mp.trigger("featureHandler", feature.index, feature.value);
        });

    }
});

$(interface.parents.similarity.range).on('input change', function () {
    interface.parents.similarity.value = this.value;
    $(interface.parents.similarity.valueLabel).text((this.value * 100).toFixed(0));
});

$("[id=left_arrow_parents]").on("click", function () {
    let parent = eval("interface.parents." + $(this).attr("parent"));

    parent.count--;
    if (parent.count <= 0) {
        parent.count = parent.maxCount;
    }
    $("#parents_count_" + $(this).attr("parent")).text(parent.count);
});

$("[id=right_arrow_parents]").on("click", function () {
    let parent = eval("interface.parents." + $(this).attr("parent"));

    parent.count++;
    if (parent.count > parent.maxCount) {
        parent.count = 0;
    }
    $("#parents_count_" + $(this).attr("parent")).text(parent.count);
});

$("[id=left_arrow_appearance]").on("click", function () {
    let appearance = eval("interface.appearance." + $(this).attr("appearance"));

    appearance.count--;
    if (appearance.count <= 0) {
        appearance.count = appearance.maxCount;
    }
    $("#appearance_count_" + $(this).attr("appearance")).text(appearance.count);
});

$("[id=right_arrow_appearance]").on("click", function () {
    let appearance = eval("interface.appearance." + $(this).attr("appearance"));

    appearance.count++;
    if (appearance.count > appearance.maxCount) {
        appearance.count = 0;
    }
    $("#appearance_count_" + $(this).attr("appearance")).text(appearance.count);
});

$("[id=left_arrow_color]").on("click", function () {
    let color = eval("interface." + $(this).attr("color"));

    color.colorNumber--;
    if (color.colorNumber <= 0) {
        color.colorNumber = color.maxColor;
    }
    $("#color_count_" + $(this).attr("for")).text(color.colorNumber);
});

$("[id=right_arrow_color]").on("click", function () {
    let color = eval("interface." + $(this).attr("color"));

    color.colorNumber++;
    if (color.colorNumber > color.maxColor) {
        color.colorNumber = 0;
    }
    $("#color_count_"  + $(this).attr("for")).text(color.colorNumber);
});

$("#left_arrow_hair").on("click", function () {
    let hair = interface.hair;

    hair.number--;
    if (hair.number <= 0) {
        hair.number = eval("hair." + interface.sex + ".maxNumber");
    }

    setHair(hair.number);
});

$("#right_arrow_hair").on("click", function () {
    let hair = interface.hair;

    hair.number++;
    if (hair.number > eval("hair." + interface.sex + ".maxNumber")) {
        hair.number = 0;
    }
    setHair(hair.number);
});

$("#male").on("click", function () {
    if (interface.sex === "male") {
        return;
    }
    resetCharacter();
    interface.sex = "male";
    $("#female").prop('checked', false);
    $("#male").prop('checked', true);
    setHair(interface.hair.number);
});

$("#female").on("click", function () {
    if (interface.sex === "female") {
        return;
    }
    resetCharacter();
    interface.sex = "female";
    $("#male").prop('checked', false);
    $("#female").prop('checked', true);
    setHair(interface.hair.number);
});

$("#reset_character").on("click", function () {
    resetCharacter();
});

function setHair(number) {
    $("#hair_number").text(number);
    //тригер мп функции\
}

resetCharacter = function () {
    interface = JSON.parse(JSON.stringify(initInterface));

    $("#female").prop('checked', false);
    $("#male").prop('checked', true);
    $("label[clear=true]").text(0);
    $("input[type=range]").val(0);
}




