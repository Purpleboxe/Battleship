/* eslint-disable no-undef */
const Ship = require('../Ship');

describe('Ship', () => {
  test('should create a ship with the correct length', () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
    expect(ship.hits).toEqual([false, false, false, false]);
  });

  test('should tell which specific part of the ship has been hit', () => {
    const ship = new Ship(4);
    ship.hit(2);
    expect(ship.hits).toEqual([false, false, true, false]);
  });

  test('should determine if the ship is sunk', () => {
    const ship = new Ship(4);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.hits).toEqual([true, true, true, true]);
    expect(ship.isSunk()).toBe(true);
  });
});
