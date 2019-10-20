global.sessionPlayer = null;

class Player {
    constructor(builder) {
        this.name = builder.name;
        this.surname = builder.surname;
        this.level = builder.level;
        this.experience = builder.experience;
        this.money = builder.money;
        this.phone_number = builder.phone_number;
        this.bank = builder.bank;
        this.home = builder.home;
        this.car = builder.car;
    }

    toString() {
        console.log(`Player name: ${this.name}, surname: ${this.surname}`);
    }
}

module.exports = Player;