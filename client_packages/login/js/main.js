function login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    mp.trigger("login", email.value, password.value);
}
