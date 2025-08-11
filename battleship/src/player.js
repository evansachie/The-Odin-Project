import Gameboard from './gameboard.js'

export default class Player {
    constructor(isComputer = false, boardSize = 10){
        this.board = new Gameboard(boardSize)
        this.isComputer = isComputer
        this.previousMoves = new Set()
    }
    
    attack(opponentBoard, coord){
        return opponentBoard.receiveAttack(coord)
    }
    
    randomAttack(opponentBoard){
        if (!this.isComputer){
            throw new Error("Only computer player can generate a random attack")
        }
        
        let coord
        
        do {
            const row = Math.floor(Math.random() * opponentBoard.size);
            const col = Math.floor(Math.random() * opponentBoard.size);
            coord = `${row},${col}`
        } while (this.previousMoves.has(coord))
        
        this.previousMoves.add(coord);
        
        const [r, c] = coord.split(',').map(Number);
        return this.attack(opponentBoard, [r, c]);
    }
}
