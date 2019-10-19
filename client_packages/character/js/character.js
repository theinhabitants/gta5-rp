const interface = {
    sex: "male",

    features: {

        nose: {
            width: {
                index: 0,
                range: $("#nose_width_range"),
                valueLabel: $("#nose_width_value"),
                value: 0
            },
            height: {
                index: 1,
                range: $("#nose_height_range"),
                valueLabel: $("#nose_height_value"),
                value: 0
            },
            length: {
                index: 2,
                range: $("#nose_length_range"),
                valueLabel: $("#nose_length_value"),
                value: 0
            },
            bridge: {
                index: 3,
                index: 2,
                range: $("#nose_bridge_range"),
                valueLabel: $("#nose_bridge_value"),
                value: 0
            },
            tip: {
                index: 4,
                range: null,
                valueLabel: null,
                value: 0
            },
            bridgeShift: {
                index: 5,
                range: null,
                valueLabel: null,
                value: 0
            }
        },

        brow: {
            height: {
                index: 6,
                range: null,
                valueLabel: null,
                value: 0
            },
            width: {
                index: 7,
                range: null,
                valueLabel: null,
                value: 0
            }
        },

        cheekbone: {
            height: {
                index: 8,
                range: null,
                valueLabel: null,
                value: 0
            },
            width: {
                index: 9,
                range: null,
                valueLabel: null,
                value: 0
            }
        },

        cheeks: {
            width: {
                index: 10,
                range: null,
                valueLabel: null,
                value: 0
            }
        },

        eyes: {
            index: 11,
            range: null,
            valueLabel: null,
            colorNumber: 0,
            maxColor: 31,
            value: 0
        },

        lips: {
            index: 12,
            range: null,
            valueLabel: null,
            value: 0
        },

        jaw: {
            width: {
                index: 13,
                range: null,
                valueLabel: null,
                value: 0
            },
            height: {
                index: 14,
                range: null,
                valueLabel: null,
                value: 0
            }
        },

        chin: {
            length: {
                index: 15,
                range: null,
                valueLabel: null,
                value: 0
            },
            position: {
                index: 16,
                range: null,
                valueLabel: null,
                value: 0
            },
            width: {
                index: 17,
                range: null,
                valueLabel: null,
                value: 0
            },
            shape: {
                index: 18,
                range: null,
                valueLabel: null,
                value: 0
            }
        },

        neck: {
            width: {
                index: 15,
                range: null,
                valueLabel: null,
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

let appearanceSection = 'blemishes';
let colorSection = "appearance.chestHair";

$(document).on('input change', function (event) {
    if($(event.target).attr("feature") != null) {

        let feature = eval("interface.features." + $(event.target).attr("feature"));

        feature.range.on('input change', function () {
            feature.value = this.value;
            feature.valueLabel.text(this.value);
        });

    }
});

$("#left_arrow_appearance").on("click", function () {
    let appearance = eval("interface.appearance." + appearanceSection);

    appearance.count--;
    if(appearance.count <= 0) {
        appearance.count = appearance.maxCount;
    }
    $("#appearance_count").text(appearance.count);
});

$("#right_arrow_appearance").on("click", function () {
    let appearance = eval("interface.appearance." + appearanceSection);

    appearance.count++;
    if(appearance.count > appearance.maxCount) {
        appearance.count = 0;
    }
    $("#appearance_count").text(appearance.count);
});

$("#left_arrow_color").on("click", function () {
    let color = eval("interface." + colorSection);

    color.colorNumber--;
    if(color.colorNumber <= 0) {
        color.colorNumber = color.maxColor;
    }
    $("#color_count").text(color.colorNumber);
});

$("#right_arrow_color").on("click", function () {
    let color = eval("interface." + colorSection);

    color.colorNumber++;
    if(color.colorNumber > color.maxColor) {
        color.colorNumber = 0;
    }
    $("#color_count").text(color.colorNumber);
});

$("#left_arrow_hair").on("click", function () {
    let hair = interface.hair;

    hair.number--;
    if (hair.number <= 0) {
        hair.number = eval("hair."+ interface.sex +".maxNumber");
    }

    setHair(hair.number);
});

$("#right_arrow_hair").on("click", function () {
    let hair = interface.hair;

    hair.number++;
    if (hair.number > eval("hair."+ interface.sex +".maxNumber")) {
        hair.number = 0;
    }
    setHair(hair.number);
});

$("#male").on("click", function () {
    if(interface.sex == "male") {
        return;
    }
    interface.sex = "male";
    $("#female").prop('checked', false);
    interface.hair.number = 0;
    setHair(interface.hair.number);
});

$("#female").on("click", function () {
    if(interface.sex == "female") {
        return;
    }
    interface.sex = "female";
    $("#male").prop('checked', false);
    interface.hair.number = 0;
    setHair(interface.hair.number);
});


function setHair(number) {
    $("#hair_number").text(number);
    //тригер мп функции\
}





