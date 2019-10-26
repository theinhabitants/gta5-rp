$("#form").on("submit", function () {
    $("#sub").attr("disabled", true);
    $(".alert").hide();
    const email = $("#email").val();
    const password = $("#password").val();

    mp.trigger("login", email, password);
    return false;
});

let isPass = true;
$('#hide').on('click', function () {
    if (isPass) {
        $('#password')[0].type = 'text';
        $('#hide')[0].src = 'img/show.png';
        isPass = false;
    } else {
        $('#password')[0].type = 'password';
        $('#hide')[0].src = 'img/hide.png';
        isPass = true;
    }
});

