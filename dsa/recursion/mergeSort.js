function mergeSort(arr){
    console.log("This was printed recursively");

    if (arr.length <=1){
        return arr
    }
    
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    
    const sortedLeft = mergeSort(left)
    const sortedRight = mergeSort(right)
    
    return merge(sortedLeft, sortedRight)
    
    // Helper function to merge two sorted arrays
    function merge(left, right){
        let result = []
        let i = 0
        let j = 0
        
        while (i < left.length && j < right.length ){
            if (left[i] < right[j]){
                result.push(left[i])
                i++
            } else {
                result.push(right[j])
                j++
            }
        }
        
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
}


console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
// Output: [0, 1, 1, 2, 3, 5, 8, 13]

console.log(mergeSort([105, 79, 100, 110]));
// Output: [79, 100, 105, 110]