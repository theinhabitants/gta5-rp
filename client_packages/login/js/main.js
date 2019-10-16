let timeout = false;
const error = get("error");
const success = get("success");
const pass = get("password");
const email = get("email");
function get(id) {
    return document.getElementById(id);
}
function login() {
    function clearTimeout() {
        timeout = false;
    }
    if(timeout) {
        return;
    }
    timeout = true;
    if (pass.value != "" && email.value != "") {
        mp.trigger("cTryLogin", pass.value, email.value);
    };
    pass.value="";
    setTimeout(clearTimeout, 2000);
};
function showError() {
    error.style.display = "block";
    setTimeout(hideError, 2000);
}
function hideError() {
    error.style.display = "none";
}
function showSuccess() {
    success.style.display = "block";
    setTimeout(hideSuccess, 2000);
}
function hideSuccess() {
    success.style.display = "none";
}
function showDefNameError() {
    defNameError.style.display = "block";
    setTimeout(hideDefNameError, 2000);
}
function hideDefNameError() {
    defNameError.style.display = "none";
}