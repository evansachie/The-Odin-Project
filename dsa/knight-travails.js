const knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

function isValidPosition(x, y){
    return x >= 0 && x < 8 && y >= 0 && y < 8
}

function getValidMoves(position){
    const [x, y] = position
    const validMoves = []
    
    for (const [dx, dy] of knightMoves){
        const newX = x + dx;
        const newY = y + dy;
        
        if (isValidPosition(newX, newY)){
            validMoves.push([newX, newY])
        }
    }
    
    return validMoves
}


function positionsEqual(post1, post2){
    return post1[0] === post2[0] && post1[1] === post2[1]
}


function knightTravails(start, end){
    if (positionsEqual(start, end)){
        return [start]
    }
    
    const queue = [[start, [start]]];
    const visited = new Set()
    visited.add(start.toString())
    
    while (queue.length > 0){
        const [currentPosition, path] = queue.shift()
        
        const validMoves = getValidMoves(currentPosition);
        
        for (const move of validMoves){
            if (positionsEqual(move, end)){
                return [...path, move] // return the shortest path
            }
            
            if (!visited.has(move.toString())){
                visited.add(move.toString())
                queue.push([move, [...path, move]])
            }
            
        }
    }
    
    return null
}

function knightMovesWithOutput(start, end) {
    const path = knightTravails(start, end);
    const moves = path.length - 1;
    
    console.log(`You made it in ${moves} moves! Here's your path:`);
    path.forEach(position => console.log(`  [${position[0]},${position[1]}]`));
    
    return path;
}

// Test cases
console.log("=== Test Cases ===");
knightMovesWithOutput([0,0], [1,2]);
console.log();
knightMovesWithOutput([0,0], [3,3]);
console.log();
knightMovesWithOutput([3,3], [0,0]);
console.log();
knightMovesWithOutput([0,0], [7,7]);
console.log();
knightMovesWithOutput([0,0], [0,0]);
