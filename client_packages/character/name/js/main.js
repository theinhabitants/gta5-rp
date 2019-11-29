$("#formRegister").on('submit', function () {
    $("[id=sub]").attr("disabled", true);
    $(".alert").hide();


    const name = $("#name").val();
    const surname = $("#surname").val();

    mp.trigger("saveName", name, surname);
    return false;
});

hide = _.debounce(function () {
    $(".alert").hide();
}, 3000);
