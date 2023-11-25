const Ship = require('../Ship');

describe ('Ship', () => {
    it ('should create a ship with the correct length', () => {
        const ship = new Ship(4);
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
    });

    it ('should increase the hits when hit()', () => {
        const ship = new Ship(4);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(3);
    });

    it ('should determine if the ship is sunk', () => {
        const ship = new Ship(4);
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});