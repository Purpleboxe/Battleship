class Gameboard {
  constructor() {
    // Initialize 10x10 grid
    this.grid = [];

    for (let i = 0; i < 10; i += 1) {
      this.grid.push(Array(10).fill(null));
    }

    this.ships = [];

    this.missedAttacks = [];
  }

  placeShip(ship, row, col) {
    if (this.checkShipPlacement(ship, row, col)) {
      ship.setPosition(row, col);
      for (let i = 0; i < ship.length; i += 1) {
        if (ship.isVertical) {
          this.grid[row + i][col] = ship;
        } else if (!ship.isVertical) {
          this.grid[row][col + i] = ship;
        }
      }
      this.ships.push(ship);
      return true;
    }

    return false;
  }

  checkShipPlacement(ship, row, col) {
    // Checks if the ship is out of bounds
    if (ship.isVertical) {
      if (row + ship.length > 10) {
        return false;
      }
    } else if (!ship.isVertical) {
      if (col + ship.length > 10) {
        return false;
      }
    }

    // Checks if there is a ship in the way
    for (let i = 0; i < ship.length; i += 1) {
      if (ship.isVertical) {
        if (this.grid[row + i][col] !== null) {
          return false;
        }
      } else if (!ship.isVertical) {
        if (this.grid[row][col + i] !== null) {
          return false;
        }
      }
    }

    return true;
  }

  receiveAttack(row, col) {
    // Checks if cell has been hit already
    if (this.grid[row][col] === null
          && this.missedAttacks.some((attack) => attack.row === row && attack.col === col)) {
      return false;
    }

    // Adds missed attack if empty cell
    if (this.grid[row][col] === null) {
      this.missedAttacks.push({ row, col });
      return true;
    }

    // Attacks the ship
    const ship = this.grid[row][col];

    if (!ship.isSunk()) {
      if (this.grid[row][col] !== null) {
        let square;

        if (ship.isVertical === true) {
          square = row - ship.row;
        } else {
          square = col - ship.col;
        }

        const hit = ship.hit(square);

        if (hit) {
          return true;
        }
      }
    }

    return false;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = Gameboard;
