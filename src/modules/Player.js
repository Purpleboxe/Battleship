const Gameboard = require('./Gameboard');

class Player {
    constructor () {
        this.gameboard = new Gameboard();
    }

    attack (enemyGameboard, row, col) {
        return enemyGameboard.receiveAttack(row, col);
    }
}

class Computer extends Player {
    constructor () {
        super();
        this.previousAttacks = [];
    }

    makeRandomAttack (enemyGameboard) {
        let row, col;

        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while (this.previousAttacks.some(attack => attack.row === row && attack.col === col));

        this.previousAttacks.push({row, col});

        this.attack(enemyGameboard, row, col);
    }
}

module.exports = {Player, Computer};