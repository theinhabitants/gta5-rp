$("#form").on("submit", function () {
    $("[id=sub]").fadeOut(50).fadeIn(50);
    $("[id=sub]").attr("disabled", true);
    $(".alert").hide();
    const email = $("#email").val();
    const password = $("#password").val();

    mp.trigger("login", email, password);
    return false;
});

let isPass = true;
$("[id=hide]").on('click', function () {
    if (isPass) {
        $('#passwordRegister')[0].type = 'text';
        $('#password')[0].type = 'text';
        $(".password").removeClass("show-pass").addClass("show-pass");
        isPass = false;
    } else {
        $('#passwordRegister')[0].type = 'password';
        $('#password')[0].type = 'password';
        $(".password").removeClass("show-pass").addClass("hide-pass");
        isPass = true;
    }
});

let password = $("#passwordRegister");
let confirm_password = $("#passwordRegisterRepeat");

let validatePassword = function () {
    if (password[0].value != confirm_password[0].value) {
        confirm_password[0].setCustomValidity("Пароли не совпадают!");
    } else {
        confirm_password[0].setCustomValidity('');
    }
};

password.on('change', validatePassword);
confirm_password.keyup(validatePassword);

$("#formRegister").on('submit', function () {
    $("[id=sub]").fadeOut(50).fadeIn(50);
    $("[id=sub]").attr("disabled", true);
    $(".alert").hide();


    const email = $("#emailRegister").val();
    const password = $("#passwordRegister").val();

    mp.trigger("registration", email, password);
    return false;
});

hide = _.debounce(function () {
    $(".alert").hide();
}, 3000);

$("#to-login").on('click', function () {
    $(".registration").hide(300);
    $(".authorization").show(300);
});

$("#to-register").on('click', function () {
    $(".authorization").hide(300);
    $(".registration").show(300);
});