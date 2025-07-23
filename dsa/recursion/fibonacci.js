// Iterative Fibonacci function
// Returns an array of the first n Fibonacci numbers

function fibs(n){
    if (n < 1){
        return []
    }

    if (n == 2){
        return [0, 1]
    } 
    
    if (n == 1){
        return [0]
    }

    let arr = [0, 1]

    for(i=2; i<n; i++){
        a = arr[arr.length -2]
        b = arr[arr.length -1]
        arr.push(a + b)
    }

    return arr
}

// Recursive Fibonacci function
// Returns an array of the first n Fibonacci numbers

function fibsRec(n){
    if (n == 1) return [0]
    if (n == 2) return [0, 1]
    
    const prev = fibsRec(n - 1)
    const next = prev[prev.length - 1] + prev[prev.length - 2]
    
    return [...prev, next]
}

// Example usage
console.log(fibs(8))
console.log(fibsRec(8))
