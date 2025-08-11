import Player from '../src/player.js';
import Ship from '../src/ship.js';
import Gameboard from '../src/gameboard.js';

describe('Player', () => {
  let human;
  let computer;
  let opponentBoard;

  beforeEach(() => {
    human = new Player(false);
    computer = new Player(true);
    opponentBoard = new Gameboard();
  });

  test('human player can attack opponent board', () => {
    const ship = new Ship(1);
    opponentBoard.placeShip(ship, [0, 0], 'horizontal');

    const result = human.attack(opponentBoard, [0, 0]);

    expect(result.result).toBe('hit');
    expect(ship.hits).toBe(1);
  });

  test('computer player can make a random attack', () => {
    const result = computer.randomAttack(opponentBoard);

    expect(['hit', 'miss', 'already']).toContain(result.result);
    expect(computer.previousMoves.size).toBe(1);
  });

  test('computer does not repeat a move', () => {
    // Fill board except one cell to force the loop
    for (let r = 0; r < opponentBoard.size; r++) {
      for (let c = 0; c < opponentBoard.size; c++) {
        computer.previousMoves.add(`${r},${c}`);
      }
    }
    // Remove one coordinate from previousMoves to make it the only valid one
    computer.previousMoves.delete(`0,0`);

    const result = computer.randomAttack(opponentBoard);

    expect(result).toBeDefined();
    expect(computer.previousMoves.has('0,0')).toBe(true);
  });

  test('randomAttack throws if called on human player', () => {
    expect(() => human.randomAttack(opponentBoard)).toThrow(
      'Only computer player can generate a random attack'
    );
  });
});
