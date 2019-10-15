// const playerModel = require("../../../datasources/model/Player");

function getPlayerEmail() {
    return document.getElementsByClassName("email-input_login")[0].value;
}

function getPlayerPassword() {
    return document.getElementsByClassName("password-input_login")[0].value;   
}

function login(email, password) {
    let creds; //From SQL query
    if((email !== null && email === creds[0])
    && (password !== null && password === creds[1])) {
        mp.gui.chat.push("You are successfully login to the server!");
    } else {
        mp.events.add("playerQuit", (player) => {
            mp.gui.chat.push("You were!");
        });
        throw "Wrong credentials!";
    }
}