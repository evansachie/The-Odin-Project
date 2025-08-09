import Ship from '../src/ship.js';

test('Ship creation', () => {
    const ship = new Ship(4);
    
    ship.hit()
    ship.hit()
    ship.hit()

    expect(ship.isSunk()).toBe(false);

    ship.hit()
    expect(ship.isSunk()).toBe(true);

});
