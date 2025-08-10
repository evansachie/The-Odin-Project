import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

describe('Gameboard', () => {
  let board;
  let ship;

  beforeEach(() => {
    board = new Gameboard();
    ship = new Ship(3);
  });

  test('places a ship horizontally at valid position', () => {
    const placed = board.placeShip(ship, [0, 0], 'horizontal');
    expect(placed).toBe(true);

    expect(board.getCell(0, 0).ship).toBe(ship);
    expect(board.getCell(0, 1).ship).toBe(ship);
    expect(board.getCell(0, 2).ship).toBe(ship);
  });

  test('does not place a ship out of bounds horizontally', () => {
    const placed = board.placeShip(ship, [0, 8], 'horizontal'); // would run off board
    expect(placed).toBe(false);
  });

  test('does not place a ship out of bounds vertically', () => {
    const placed = board.placeShip(ship, [8, 0], 'vertical'); // would run off board
    expect(placed).toBe(false);
  });

  test('does not place a ship overlapping another', () => {
    const first = board.placeShip(ship, [0, 0], 'horizontal');
    const secondShip = new Ship(2);
    const second = board.placeShip(secondShip, [0, 1], 'vertical'); // overlaps at (0,1)

    expect(first).toBe(true);
    expect(second).toBe(false);
  });

  test('receiveAttack registers a miss', () => {
    const result = board.receiveAttack([5, 5]);
    expect(result.result).toBe('miss');
    expect(board.getCell(5, 5).isHit).toBe(true);
    expect(board.getMisses()).toContainEqual([5, 5]);
  });

  test('receiveAttack registers a hit and updates ship', () => {
    board.placeShip(ship, [0, 0], 'horizontal');
    const result = board.receiveAttack([0, 0]);
    expect(result.result).toBe('hit');
    expect(ship.hits).toBe(1);
    expect(board.getCell(0, 0).isHit).toBe(true);
  });

  test('receiveAttack returns already if cell was hit before', () => {
    board.placeShip(ship, [0, 0], 'horizontal');
    board.receiveAttack([0, 0]);
    const secondHit = board.receiveAttack([0, 0]);
    expect(secondHit.result).toBe('already');
    expect(ship.hits).toBe(1); // no double counting
  });

  test('allShipsSunk returns true when all ships sunk', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);

    board.placeShip(ship1, [0, 0], 'horizontal');
    board.placeShip(ship2, [1, 0], 'horizontal');

    board.receiveAttack([0, 0]);
    board.receiveAttack([1, 0]);

    expect(board.allShipsSunk()).toBe(true);
  });

  test('allShipsSunk returns false if any ship is still afloat', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);

    board.placeShip(ship1, [0, 0], 'horizontal');
    board.placeShip(ship2, [1, 0], 'horizontal');

    board.receiveAttack([0, 0]); // sink only first ship

    expect(board.allShipsSunk()).toBe(false);
  });
});
