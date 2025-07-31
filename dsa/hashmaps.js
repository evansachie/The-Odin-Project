class HashMap{
    constructor(loadFactor = 0.75, InitialCapacity = 16){
        this.loadFactor = loadFactor
        this.capacity = InitialCapacity
        this.size = 0
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
    
    _hash(key){
        let hashcode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashcode = (primeNumber * hashcode + key.charCodeAt(i)) % this.capacity;
            // When size / capacity > loadFactor: the hashmap needs to resize
        }
        
        return hashcode
    }
    
    set(key, value) {
        const index = this._hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; // Update value
                return;
            }
        }

        bucket.push([key, value]); // Insert new key-value pair
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this._resize();
        }
    }

    _resize(){
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (let bucket of oldBuckets) {
            for (let [key, value] of bucket) {
                this.set(key, value); // Rehash and insert into new buckets
            }
        }
    }

    
    get(key){
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let [k, v] of bucket){
            if (k == key) return v
        }

        return null;
    }
    
    has(key){
        return this.get(key) !== null;
    }
    
    remove(key){
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++){
            if (bucket[i][0] === key){
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false
    }
    
    length(){
        return this.size;
    }
    
    clear(){
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }
    
    keys(){
        const keys = []

        for (const bucket of this.buckets){
            for (const [key] of bucket){
                keys.push(key)
            }
        }

        return keys
    }
    
    values(){
        const values = [];

        for (const bucket of this.buckets){
            for (const [, value] of bucket)
                values.push(value)
        }
        return values
    
    }   
    
    entries(){
        const entries = []

        for (const bucket of this.buckets){
            for (const [k, v] of bucket){
                entries.push([k, v])
            }
        }

        return entries
    }

    print(){
        console.log(this.entries());
    }

}

const test = new HashMap()
 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')
 test.print()

console.log(test)
