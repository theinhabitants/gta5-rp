// const playerModel = require("../../../datasources/model/Player");

function getPlayerEmail() {
    return document.getElementsByClassName("email-input_login")[0].value;
}

function getPlayerPassword() {
    return document.getElementsByClassName("password-input_login")[0].value;   
}

function login() {
    alert(getPlayerEmail());
}