class Node {
    constructor(value){
        this.value = value
        this.nextNode = null
    }
}

class LinkedList {
    constructor(){
        this.head = null
        this.length = 0
    }
    
    append(value){
        const newNode = new Node(value)
        
        if (this.head == null){
            this.head = newNode
        } else {
            let curr = this.head
            while (curr.nextNode !== null){
                curr = curr.nextNode
            }
            curr.nextNode = newNode
        }
        this.length++
    }
    
    prepend(value){
        const newNode = new Node(value)
        
        newNode.nextNode = this.head
        this.head = newNode
        this.length++
    }
    
    size(){
        return this.length;
    }
    
    getHead(){
        return this.head;
    }
    
    getTail(){
        let curr = this.head
        
        while(curr.nextNode !== null){
            curr = curr.nextNode
        }
        return curr
    }
    
    at(index){
        let curr = this.head
        let i = 0
        
        if (!this.head) return null;
        if(index >= this.length) return null;
        
        while(i < index){
            i++
            curr = curr.nextNode
        }
        return curr
    }
    
    pop(){
        if (!this.head) return;

        if (!this.head.nextNode) {
          this.head = null;
          this.length--;
          return;
        }
        
        let curr = this.head
        
        while (curr.nextNode.nextNode !== null){
            curr = curr.nextNode        
        }
        curr.nextNode = null
        this.length--;
    }
    
    contains(value){
        let curr = this.head
        
        while (curr !== null){
            if(curr.value === value){
                return true
            } 
            curr = curr.nextNode
        }
        return false
    }
    
    find(value){
        let curr = this.head
        let count = 0
        
        while (curr !== null){
            if(curr.value === value){
                return count
            } 
            curr = curr.nextNode
            count++
        }
        return "Index not found"
    }
    
    toString(){
        let curr = this.head
        let str = ""
        
        while (curr){
            str += `${curr.value} ->`;
            curr = curr.nextNode
        }
        str += 'null'
        return str;
    }
    
    insertAt(value, index){
        if (index < 0 || index > this.length) return "Invalid index";

        if (index == 0){
            this.prepend(value)
        } else {
            let newNode = new Node(value)
            let curr = this.head
            
            for(let i=0; i<index-1; i++){
                curr = curr.nextNode
            }
            
            newNode.nextNode = curr.nextNode
            curr.nextNode = newNode
            this.length++;
        }
    }
    
    removeAt(index){
        if (index < 0 || index >= this.length) return "Invalid index";
        
        if (index == 0){
            this.head = this.head.nextNode
        }
        else if (index == this.length - 1){
            this.pop()
        } else {
            let curr = this.head
        
            for(let i=0; i<index-1; i++){
                curr = curr.nextNode
            }
            curr.nextNode = curr.nextNode.nextNode
        }
        this.length--;
    }
    
}

// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
