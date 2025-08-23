import Player from './player.js';
import Ship from './ship.js';

export default class GameController {
    constructor(){
        this.human = new Player(false);
        this.computer = new Player(true);
        this.current = 'human';
        this.gameOver = false;
        this.onUpdate = () => {};
    }
    
    setUpdateCallback(fn){
        this.onUpdate = fn || (() => {});
    }
    
    setupDefaultShips() {
        const lengths = [5, 4, 3, 3, 2];
        
        lengths.forEach((len, i) => {
            const ship = new Ship(len);
            const row = i * 2;

            this.human.board.placeShip(ship, [row, 0], 'horizontal');
        });
        
        lengths.forEach((len, i) => {
            const ship = new Ship(len);
            const row = i * 2;
            
            this.computer.board.placeShip(ship, [row, 4], 'horizontal');
        });
        
        this.onUpdate({type: 'init'});
    }
    
    playerAttack(coord){
        if(this.gameOver) return null;
        if(this.current !== 'human') return null;
        
        const result = this.human.attack(this.computer.board, coord);

        let message = '';
        if (result.result === 'hit') {
            message = `You hit at (${coord[0]}, ${coord[1]})`;
            if (result.shipSunk) {
                message += ` and sunk a ship!`;
            }
        } else if (result.result === 'miss') {
            message = `You missed at (${coord[0]}, ${coord[1]})`;
        } else {
            message = `You already attacked (${coord[0]}, ${coord[1]}). Choose another.`;
        }
        
        this.onUpdate({type: 'attack', by: 'human', coord, result, message});
        
        if(result.result === 'already'){
            return result;
        }
        
        if(this.computer.board.allShipsSunk()){
            this.gameOver = true;
            this.onUpdate({type: 'gameOver', winner: 'human'});
            return result;
        }
        
        this.current = 'computer';
        setTimeout(() => this._computerTurn(), 500);
        
        return result;
    }
    
    _computerTurn(){
        if(this.gameOver) return;
        
        const result = this.computer.randomAttack(this.human.board);
        
        const last = Array.from(this.computer.previousMoves).slice(-1)[0];
        const [r, c] = last.split(',').map(Number);
        const coord = [r, c];

        let message = '';
        if (result.result === 'hit') {
            message = `Computer hit your ship at (${coord[0]}, ${coord[1]})`;
            if (result.shipSunk) {
                message += ` and sunk it!`;
            }
        } else {
            message = `Computer missed at (${coord[0]}, ${coord[1]})`;
        }
        
        this.onUpdate({type: 'attack', by: 'computer', coord, result, message});
        
        if(this.human.board.allShipsSunk()) {
            this.gameOver = true;
            this.onUpdate({ type: 'gameOver', winner: 'computer' });
            return;
        }
        
        this.current = 'human';
    }
    
    restart(){
        this.human = new Player(false);
        this.computer = new Player(true);
        this.current = 'human';
        this.gameOver = false;
        this.setupDefaultShips();
        this.onUpdate({type: 'restart'});
    }
}