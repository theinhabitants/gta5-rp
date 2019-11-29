let fuel = 95;
let alertsType = [
    {
      smile: "smile_good",
      outlineColor: "#5ECDD9"
    },
    {
        smile: "smile_bad",
        outlineColor: "#D21649"
    },
    {
        smile: "smile_middle",
        outlineColor: "#F2B845"
    },
];

$('.progressbar-fuel').on('click', function () {
    const
        min = 0,
        max = 200,
        percent = Math.ceil(((fuel - min) / (max - min)) * 100);

    $(this).css('background' , '-webkit-linear-gradient(left, rgba(211, 22, 73, 1) 0%, rgba(211, 22, 73, 1) ' + percent + '%, #ffffff ' + percent + '%)');

    $(".percent-fuel").css({
        'background':'-webkit-linear-gradient(left, #ffffff 0%, #ffffff ' + percent + '%, rgba(211, 22, 73, 1) ' + percent + '%)',
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent"
    });

    // $(".count").css("color", "#ffffff");
    // $(".percent").css("color", "rgba(211, 22, 73, 1)");
});

function showAlert(type, message) {
    $(".message").text(message);
    $(".smile").css({
        "background": "url('images/"+ alertsType[type - 1].smile +".svg') no-repeat",
        "background-size": "contain"
    });
    $(".outline").css("stroke", alertsType[type - 1].outlineColor);


    $('.alert-box').show();

    $('.alert-box').animate({
        bottom: "4vw"
    }, 600, function () {
        $('#anim')[0].beginElement();

        setTimeout(() => {
            $(this).animate({
                bottom: "-4vw"
            }, 200, function () {
                $(this).hide();
            });
        }, 5000);
    });
}