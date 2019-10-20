function login() {
    $('.alert').hide();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    mp.trigger("login", email.value, password.value);
}

function registration() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    mp.trigger("registration", email.value, password.value);
}
