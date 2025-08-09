class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
    }
    
    hit(){
        this.hits++
    }
    
    isSunk(){
        if (this.hits >= this.length){
            return true
        }
        return false
    }
}

module.exports = Ship;

// const ship = new Ship(3)
// ship.hit()
// ship.hit()
// console.log(ship.isSunk()) // false
// ship.hit()
// console.log(ship.isSunk()) // true
