/* eslint-disable prefer-destructuring */
const Gameboard = require('./Gameboard');
const Ship = require('./Ship');

class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.shipsToPlace = [new Ship(4, false), new Ship(3, false),
      new Ship(3, false), new Ship(2, false), new Ship(2, false),
      new Ship(2, false), new Ship(1, false), new Ship(1, false),
      new Ship(1, false), new Ship(1, false)];
    this.currentShip = this.shipsToPlace[0];
  }

  nextShipToPlace() {
    this.shipsToPlace.shift();
    this.currentShip = this.shipsToPlace[0];
  }

  // eslint-disable-next-line class-methods-use-this
  attack(enemyGameboard, row, col) {
    return enemyGameboard.receiveAttack(row, col);
  }

  reset() {
    this.gameboard = new Gameboard();
  }
}

module.exports = Player;
