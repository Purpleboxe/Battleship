/* eslint-disable no-shadow */
const Player = require('./Player');

class Computer extends Player {
  constructor() {
    super();
    this.previousAttacks = [];
    this.berserk = false;
    this.direction = null;
    // Used for getting the attack in previous attacks when a ship was hit (For berserk)
    this.attacks = 1;
    this.look = false;
  }

  makeRandomAttack(enemyGameboard) {
    let row;
    let col;

    if (this.berserk) {
      const previousAttack = this.previousAttacks[this.previousAttacks.length - this.attacks];
      const { row: lastRow, col: lastCol } = previousAttack;

      const directions = [
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 }, // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 }, // Right
      ];

      // If the computer is going in a certain direction, continue that direction
      if (this.direction) {
        const dir = directions.find((d) => d.row === this.direction.row
         && d.col === this.direction.col);
        const newRow = lastRow + dir.row;
        const newCol = lastCol + dir.col;

        // Make sure that direction is valid
        if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10
          && !this.previousAttacks.some((attack) => attack.row === newRow
           && attack.col === newCol)) {
          row = newRow;
          col = newCol;
        } else {
          // Change direction and continue berserk mode
          const validDirections = directions.filter((dir) => {
            const newRow = lastRow + dir.row;
            const newCol = lastCol + dir.col;
            return newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10
              && !this.previousAttacks.some((attack) => attack.row === newRow
               && attack.col === newCol);
          });

          if (validDirections.length > 0) {
            this.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
            row = lastRow + this.direction.row;
            col = lastCol + this.direction.col;
          } else {
            this.direction = null;
            this.berserk = false;
            return this.makeRandomAttack(enemyGameboard);
          }
        }
      } else {
        // If not going in a specific direction, look for a direction
        const validDirections = directions.filter((dir) => {
          const newRow = lastRow + dir.row;
          const newCol = lastCol + dir.col;
          return newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10
            && !this.previousAttacks.some((attack) => attack.row === newRow
             && attack.col === newCol);
        });

        if (validDirections.length > 0) {
          // Pick one of the directions
          this.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
          row = lastRow + this.direction.row;
          col = lastCol + this.direction.col;
          if (enemyGameboard.grid[row][col] === null) {
            this.attacks += 1;
          }
        } else {
          // If no directions, reset and exit berserk
          this.berserk = false;
          this.direction = null;
          return this.makeRandomAttack(enemyGameboard);
        }
      }

      const targetShip = enemyGameboard.grid[row][col];

      if (targetShip === null || targetShip.isSunk()) {
        this.direction = null;
        this.berserk = false;
      }
    } else {
      this.attacks = 1;
      const cheatingProbability = Math.random() < 0.1;

      // Shhhh this is cheating!
      if (cheatingProbability) {
        do {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        // eslint-disable-next-line no-loop-func
        } while (this.previousAttacks.some((attack) => attack.row === row && attack.col === col)
        || enemyGameboard.grid[row][col] === null);
      } else {
        do {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
          // eslint-disable-next-line no-loop-func
        } while (this.previousAttacks.some((attack) => attack.row === row && attack.col === col));
      }

      if (enemyGameboard.grid[row][col] !== null && !enemyGameboard.grid[row][col].isSunk()) {
        this.berserk = true;
      }
    }

    this.previousAttacks.push({ row, col });
    return this.attack(enemyGameboard, row, col);
  }

  placeShipsRandomly() {
    this.shipsToPlace.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
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
    this.berserk = false;
    this.direction = null;
    this.attacks = 1;
  }
}

module.exports = Computer;
