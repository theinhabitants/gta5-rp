let fuel = 95;

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