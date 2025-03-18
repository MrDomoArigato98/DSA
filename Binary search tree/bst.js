class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array = []) {
    array = array.sort(function (a, b) {
      return a - b;
    });

    array = [...new Set(array)];
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const mid = Math.floor(array.length / 2);

    let root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value) {
    const newNode = new Node(value);
    let current = this.root;

    if (current === null) {
      return newNode;
    }

    let parent = null;

    while (current !== null) {
      parent = current;
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else return this.current;
    }

    if (parent.data < value) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    return this.root;
  }

  deleteItem(value) {
    let current = this.root;
    let parent = null;

    while (current !== null && current.data !== value) {
      parent = current; //Points to the parent of the value to be deleted
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current === null) {
      // If the value isn't found in the tree
      return this.root;
    }

    // If node has one child.
    // 1. Must get the child of the node I'm deleting.
    // 2. Move it up to take it's place
    // 3. Point the parent to the replacement
    if (current.left === null || current.right === null) {
      let child = null;

      if (current.left === null) {
        console.log(`Key ${value} has one child on the right. Moving child up`);
        child = current.right;
      } else {
        console.log(`Key ${value} has one child on the left. Moving child up`);
        child = current.left;
      }
      if (current === parent.left) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }

    //If node has no children. Just remove the leaf.
    //1. Check if current is parent's left or right, and set it to null
    if (current.left === null && current.right === null) {
      console.log(`Key ${value} is a leaf node. Removing.`);
      if (current === parent.left) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    //If node has two children.
    //1. Need to find an in-order successor. Traverse LEFT in the right subtree to find the smallest node.
    if (current.left !== null && current.right !== null) {
      console.log(`Key ${value} has two child nodes.`);
      let parentOfSuccessor = null;
      let successor = current.right;

      while (successor.left !== null) {
        //As long as there are nodes to the left, there's a smaller value for the successor.
        parentOfSuccessor = successor; //Set the parent
        successor = successor.left; //Keep traversing left
      }
      console.log(parentOfSuccessor);
      console.log(successor);

      if (parentOfSuccessor !== null) {
        //This means that the successor is not the immediate right child of current. (The while loop went through and traversed)
        parentOfSuccessor.left = successor.right;
      } else {
        current.right = successor.right;
      }
      current.data = successor.data;
    }
  }

  levelOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback is required");
    }
    let queue = [this.root];

    while (queue.length) {
      let currentNode = queue.shift(); //Gets the first node from the queue FIFO.
      callback(currentNode);

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
    }
  }

  inOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback is required");
    }

    let stack = [];
    let current = this.root;

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current); // Push the value of the node to the stack
        current = current.left; //Go completely to the left side
      }
      console.table(stack)
      //At this point current is equal to NULL as you're at the bottom left
      //Take the element from the top of the stack
      current = stack.pop();
      callback(current);
      current = current.right;
    }
  }
  preOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback is required");
    }

    let stack = [this.root];

    while (stack.length) {
      let currentNode = stack.pop(); //Get the last element from the stack. LIFO
      callback(currentNode);

      if (currentNode.right) {
        stack.push(currentNode.right);
      }
      if (currentNode.left) {
        stack.push(currentNode.left);
      }
    }
  }
  find(value) {
    let current = this.root;
    while (current !== null) {
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return current;
      }
    }

    return null;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);

// console.log(tree.find(0));
// tree.deleteItem(67);
tree.prettyPrint(tree.root);

tree.inOrder((node) => console.log(node.data));
