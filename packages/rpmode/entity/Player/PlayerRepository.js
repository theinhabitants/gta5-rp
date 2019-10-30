const PlayerBuilder = require("./PlayerBuilder");

class PlayerRepository {
    constructor() {
        this.builder = new PlayerBuilder();
    }

    createSessionPlayer(playerFromDb) {
        return this.builder
            .setName()
            .setSurname()
            .setLevel()
            .setExperience()
            .setMoney()
            .setNumber()
            .setBankMoney()
            .setHome()
            .setCar()
            .build();
    }

    removeSessionPlayer() {
        if(sessionPlayer != null) {
            sessionPlayer = null;
        }
    }
}

module.exports = new PlayerRepository();