/* eslint-disable no-undef */
const Gameboard = require('../Gameboard');
const Ship = require('../Ship');

describe('Gameboard', () => {
  test('placing a ship vertically', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3, true);

    const placedSuccessfully = gameboard.placeShip(ship, 2, 4);

    expect(placedSuccessfully).toBe(true);
    expect(gameboard.ships.length).toBe(1);
    expect(ship.row).toBe(2);
    expect(ship.col).toBe(4);
    expect(gameboard.grid[2][4]).toBe(ship);
    expect(gameboard.grid[3][4]).toBe(ship);
    expect(gameboard.grid[4][4]).toBe(ship);
  });

  test('placing a ship horizontally', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3, false);

    const placedSuccessfully = gameboard.placeShip(ship, 2, 4);

    expect(placedSuccessfully).toBe(true);
    expect(gameboard.ships.length).toBe(1);
    expect(ship.row).toBe(2);
    expect(ship.col).toBe(4);
    expect(gameboard.grid[2][4]).toBe(ship);
    expect(gameboard.grid[2][5]).toBe(ship);
    expect(gameboard.grid[2][6]).toBe(ship);
  });

  test('receiving a successful attack', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3, true);

    gameboard.placeShip(ship, 2, 4);

    gameboard.receiveAttack(3, 4);

    expect(ship.hits).toEqual([false, true, false]);
  });

  test('receiving a missed attack', () => {
    const gameboard = new Gameboard();

    gameboard.receiveAttack(3, 4);

    expect(gameboard.missedAttacks).toEqual([{ row: 3, col: 4 }]);
  });

  test('checking if all ships are sunk', () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(2, true);
    const ship2 = new Ship(3, false);

    gameboard.placeShip(ship1, 0, 0);
    gameboard.placeShip(ship2, 5, 5);
    gameboard.placeShip(ship2, 6, 7);

    // Attack ships until they are sunk
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(5, 6);
    gameboard.receiveAttack(5, 7);
    gameboard.receiveAttack(6, 7);
    gameboard.receiveAttack(6, 8);
    gameboard.receiveAttack(6, 9);
    gameboard.receiveAttack(8, 9);

    expect(gameboard.missedAttacks).toEqual([{ row: 8, col: 9 }]);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
