$('.alert').hide();

let isPass = true;

$('#hideReg').on('click', function () {
    if (isPass) {
        $('#passwordRegister')[0].type = 'text';
        $('#hideReg')[0].src = 'img/show.png';
        isPass = false;
    } else {
        $('#passwordRegister')[0].type = 'password';
        $('#hideReg')[0].src = 'img/hide.png';
        isPass = true;
    }
});

let password = $("#passwordRegister");
let confirm_password = $("#passwordRegisterRepeat");

let validatePassword = function () {
    if (password[0].value != confirm_password[0].value) {
        confirm_password[0].setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password[0].setCustomValidity('');
    }
};

password.on('change', validatePassword);
confirm_password.keyup(validatePassword);

$("#formRegister").on('submit', function () {
    $("#sub").attr("disabled", true);
    $(".alert").hide();


    const email = $("#emailRegister").val();
    const password = $("#passwordRegister").val();

    mp.trigger("registration", email, password);
    return false;
});

hide = _.debounce(function () {
    $(".alert").hide();
}, 3000);
