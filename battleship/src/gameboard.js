// src/gameboard.js
export default class Gameboard {
  constructor(size = 10) {
    this.size = size;

    // grid[row][col] -> { ship: Ship|null, isHit: boolean }
    this.grid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ ship: null, isHit: false }))
    );

    // keep track of placed ships and their coordinates for rendering/testing
    // each entry: { ship: Ship, positions: [[r,c], ...] }
    this.placedShips = [];

    // list of coordinates for missed attacks
    this.missedAttacks = [];
  }

  inBounds(row, col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  // Check whether the ship can be placed at startCoord with the given direction
  // startCoord: [row, col], direction: 'horizontal' or 'vertical'
  canPlaceShip(ship, startCoord, direction = 'horizontal') {
    const [row, col] = startCoord;
    const length = ship.length;

    for (let i = 0; i < length; i++) {
      const r = row + (direction === 'vertical' ? i : 0);
      const c = col + (direction === 'horizontal' ? i : 0);

      if (!this.inBounds(r, c)) return false;          // out of bounds
      if (this.grid[r][c].ship !== null) return false; // overlap with another ship
    }

    return true;
  }

  // Place a ship on the board.
  // Returns true if placed successfully, false otherwise.
  // startCoord: [row, col], direction: 'horizontal' | 'vertical'
  placeShip(ship, startCoord, direction = 'horizontal') {
    if (!ship || typeof ship.length !== 'number') {
      throw new Error('placeShip: invalid ship object (must have length)');
    }

    const [row, col] = startCoord;
    if (!this.inBounds(row, col)) return false;
    if (!['horizontal', 'vertical'].includes(direction)) {
      throw new Error('placeShip: direction must be "horizontal" or "vertical"');
    }

    if (!this.canPlaceShip(ship, startCoord, direction)) return false;

    const positions = [];
    for (let i = 0; i < ship.length; i++) {
      const r = row + (direction === 'vertical' ? i : 0);
      const c = col + (direction === 'horizontal' ? i : 0);
      this.grid[r][c].ship = ship;
      positions.push([r, c]);
    }

    this.placedShips.push({ ship, positions });
    return true;
  }

  // Receive an attack at coordinate [row, col].
  // Returns an object describing the result:
  // { result: 'hit'|'miss'|'already', shipSunk: boolean|null, ship: Ship|null }
  receiveAttack(coord) {
    const [row, col] = coord;
    if (!this.inBounds(row, col)) {
      throw new Error('receiveAttack: coordinate out of bounds');
    }

    const cell = this.grid[row][col];

    if (cell.isHit) {
      return { result: 'already', shipSunk: null, ship: cell.ship };
    }

    cell.isHit = true;

    if (cell.ship) {
      // Only call ship.hit() once per cell hit because we guard with isHit above.
      cell.ship.hit();
      const sunk = cell.ship.isSunk();
      return { result: 'hit', shipSunk: sunk, ship: cell.ship };
    } else {
      this.missedAttacks.push([row, col]);
      return { result: 'miss', shipSunk: null, ship: null };
    }
  }

  // Return true if all placed ships are sunk.
  allShipsSunk() {
    if (this.placedShips.length === 0) return false; // no ships placed yet
    return this.placedShips.every((p) => p.ship.isSunk());
  }

  getCell(row, col) {
    if (!this.inBounds(row, col)) return null;
    return this.grid[row][col];
  }

  getMisses() {
    return this.missedAttacks.slice();
  }

  getPlacedShips() {
    return this.placedShips.map(p => ({ ship: p.ship, positions: p.positions.map(pos => [...pos]) }));
  }
}
