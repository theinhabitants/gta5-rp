const Player = require("./Player");

class PlayerBuilder {
    constructor() {}

    setName(name) {
        this.name = name;
        return this;
    }

    setSurname(surname) {
        this.surname = surname;
        return this;
    }

    setLevel(level) {
        this.level = level;
        return this;
    }

    setExperience(experience) {
        this.experience = experience;
        return this;
    }

    setMoney(money) {
        this.money = money;
        return this;
    }

    setNumber(number) {
        this.number = number;
        return this;
    }

    setBankMoney (bankMoney) {
        this.bankMoney = bankMoney;
        return this;
    }

    setHome(home) {
        this.home = home;
        return this;
    }

    setCar(car) {
        this.car = car;
        return this;
    }

    build() {
        return new Player(this);
    }
}

module.exports = PlayerBuilder;