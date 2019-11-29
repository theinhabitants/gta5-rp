const rotate = [
    {
        action: "rotateY",
        deg: 360,
    },
    {
        action: "rotateY",
        deg: -90
    },
    {
        action: "rotateY",
        deg: 180
    },
    {
        action: "rotateY",
        deg: 90
    },
    {
        action: "rotateX",
        deg: -90
    },
    {
        action: "rotateX",
        deg: 90
    }
];


$("#roll").on("click", function () {
    let
        random,
        current,
        cast = 0,
        timeout;

    const winNumber = getRandomInt(rotate.length - 1) ;

    let maxCasts = getRandomInt(15);

    timeout = setInterval(() => {
        if(cast >= maxCasts) {
            if(winNumber === current) {
                $("#dice").css("transform", rotate[getRandomInt(rotate.length - 1)].action + "(" + rotate[getRandomInt(rotate.length - 1)].deg + "deg)");
            }

            $("#dice").css("transform", rotate[winNumber].action + "(" + rotate[winNumber].deg + "deg)");

            $("#move").animate({
                top : (10 + getRandomInt(7)) + "vw",
                left : getRandomInt(10) + "vw",
                right : getRandomInt(10) + "vw",
                bottom : getRandomInt(7) + "vw"
            }, 400);

            clearInterval(timeout);

            console.log("Win: " + (winNumber + 1));
            return false;
        }

        cast ++;

        random = cast === 1 ? 1 + getRandomInt(rotate.length - 1) : getRandomInt(rotate.length - 1);

        console.log(random);


        while (random === current) {
            random = getRandomInt(rotate.length - 1);;
        }

        current = random;

        $("#move").animate({
             top : (10 + getRandomInt(7)) + "vw",
             left : getRandomInt(10) + "vw",
             right : getRandomInt(10) + "vw",
             bottom : getRandomInt(7) + "vw"
        }, 400);

        $("#dice").css("transform", rotate[random].action + "(" + rotate[random].deg + "deg)");
    }, 1000);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}