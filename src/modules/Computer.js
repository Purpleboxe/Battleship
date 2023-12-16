const Player = require('./Player');

class Computer extends Player {
  constructor() {
    super();
    this.previousAttacks = [];
  }

  makeRandomAttack(enemyGameboard) {
    let row; let
      col;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    // eslint-disable-next-line no-loop-func
    } while (this.previousAttacks.some((attack) => attack.row === row && attack.col === col));

    this.previousAttacks.push({ row, col });

    this.attack(enemyGameboard, row, col);
  }

  placeShipsRandomly() {
    this.shipsToPlace.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        const isVertical = Math.random() < 0.5;

        // eslint-disable-next-line no-param-reassign
        ship.isVertical = isVertical;
        placed = this.gameboard.placeShip(ship, row, col);
      }
    });
  }

  reset() {
    super.reset();
    this.previousAttacks = [];
  }
}

module.exports = Computer;
