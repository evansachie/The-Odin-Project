class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const cleanedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(cleanedArray);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));

    return node;
  }

  insert(value, root = this.root) {
    if (!root) return new Node(value);

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (!root) return null;

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      // Node found
      if (!root.left && !root.right) return null;        // No children
      if (!root.left) return root.right;                 // One child (right)
      if (!root.right) return root.left;                 // One child (left)

      // Two children: find inorder successor (smallest in right subtree)
      let min = root.right;
      while (min.left) min = min.left;

      root.data = min.data;
      root.right = this.deleteItem(min.data, root.right);
    }

    return root;
  }

  find(value, root = this.root) {
    if (!root) return null;

    if (value === root.data) return root;
    if (value < root.data) return this.find(value, root.left);
    return this.find(value, root.right);
  }

  levelOrder(callback) {
    const queue = [this.root];

    while (queue.length) {
      const current = queue.shift();
      if (callback) callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrder(callback, root = this.root) {
    if (!root) return;
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (!root) return;
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!root) return;
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, depthLevel = 0) {
    if (!current) return -1;
    if (current === node) return depthLevel;

    if (node.data < current.data) {
      return this.depth(node, current.left, depthLevel + 1);
    } else {
      return this.depth(node, current.right, depthLevel + 1);
    }
  }

  isBalanced(root = this.root) {
    if (!root) return true;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    const balanced =
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right);

    return balanced;
  }

  rebalance() {
    const result = [];
    this.inOrder((node) => result.push(node.data));
    this.root = this.buildTree(result);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}


const myTree = new Tree([7, 4, 9, 1, 6, 14, 10]);

console.log("Initial Tree:");
myTree.prettyPrint();

console.log("\nBalanced?", myTree.isBalanced());

myTree.insert(15);
myTree.insert(20);
myTree.insert(25);

console.log("\nAfter Inserting Unbalancing Values:");
myTree.prettyPrint();
console.log("Balanced?", myTree.isBalanced());

console.log("\nRebalancing Tree...");
myTree.rebalance();
myTree.prettyPrint();
console.log("Balanced?", myTree.isBalanced());
