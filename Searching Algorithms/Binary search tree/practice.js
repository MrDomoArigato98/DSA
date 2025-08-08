const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array = []) {
    array = array.sort((a, b) => a - b);
    array = [...new Set(array)];
    console.log(array);
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const middle = Math.floor(array.length / 2);

    let root = new Node(array[middle]);

    root.left = this.buildTree(array.slice(0, middle));
    root.right = this.buildTree(array.slice(middle + 1));

    return root;
  }

  insert(value) {
    const newNode = new Node(value);
    let current = this.root;
    if (current === null) {
      return newNode;
    }

    let parent;
    while (current != null) {
      parent = current;
      if (value > current.data) {
        current = current.right;
      } else if (value < current.data) {
        current = current.left;
      } else {
        return this.current;
      }
    }
    if (value > parent.data) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    return this.root;
  }

  deleteItem(value) {
    let current = this.root;
    let parent = null; // Parent node of the node we're looking to delete

    //Traverse the tree to find the node we're looking for
    while (current !== null && current.data !== value) {
      parent = current;
      if (value > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    //If no value found
    if (current === null) {
      return this.root;
    }

    //1. If node we're deleting has no children
    if (current.right === null && current.left === null) {
      //Check on which side of the parent, the node we're deleting is.
      if ((parent.right = current)) {
        parent.right = null;
      } else {
        parent.left = null;
      }
    }

    // 2. If node we're deleting has one child only.
    // Get the L/R Child node.
    // Check on which side of the parent the node we're deleting is
    // Move the child up to take it's spot. (This removes the node we're looking for)
    if (current.right === null || current.right === null) {
      let child;
      if (current.left == null) {
        child = current.right;
      } else {
        child = current.left;
      }
      if (parent.right === current) {
        parent.right = child;
      } else {
        parent.left = child;
      }
    }

    //3. If node we're deleting has two children
    // Get both children.
    // Find the in-order successor. Traverse left on the right subtree to find the smallest node to take it's place

    if (current.right !== null && current.left !== null) {
      let successor; //This takes the place of the node we're deleting
      let parentOfSuccessor = null; // This node is the parent to the above child, so we can remove the pointer to it.

      successor = current.right; //Set it to the right node. Now we are going to traverse left

      while (successor.left !== null) {
        parentOfSuccessor = successor;
        successor = successor.left;
      }

      if (parentOfSuccessor !== null) {
        // This checks that the successor is not the immediate right child of current
        // We're moving the right node of the successor upwards. So it takes it's spot, as we're moving the successor elsewhere in the tree.
        parentOfSuccessor.left = successor.right;
      } else {
        current.right = successor.right;
      }
      current.data = successor.data;
    }
  }
  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value > current.data) {
        current = current.right;
      } else if (value < current.data) {
        current = current.left;
      } else {
        return current;
      }
    }
  }

  height(node) {
    //Base condition
    if (node === null) {
      return -1;
    }

    let leftHeight = this.height(node.left); //Compute the height of the left subtree
    let rightHeight = this.height(node.right); // Compute the height of the right subtree

    return Math.max(leftHeight, rightHeight) + 1; //Take the maximum of the left and right subtree heights
  }

  depth(node) {
    if (node === null) {
      return -1;
    }

    let current = this.root;
    let depth = 0;

    while (current != null) {
      if (node.data === current.data) {
        return depth;
      }

      if (node.data > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
      depth++;
    }
    return -1;
  }

  isBalanced() {
    if (this.root == null) {
      return true;
    }
    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      if (Math.abs(leftHeight, rightHeight) > 1) {
        return false;
      }

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
    return true;
  }

  levelOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback function required");
    }
    let queue = [this.root];

    while (queue.length) {
      const node = queue.shift(); //Gets the first element FIFO.
      callback(node);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  preOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback function required");
    }
    let stack = [this.root];

    while (stack.length) {
      console.table(stack);
      let currentNode = stack.pop();
      callback(currentNode);

      if (currentNode.right) {
        stack.push(currentNode.right);
      }

      if (currentNode.left) {
        stack.push(currentNode.left);
      }
    }
  }

  inOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback function required");
    }
    let current = this.root;
    let stack = [];

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current); //Put the current node in the stack
        current = current.left; // Keep traversing left until we're at the leftmost leaf node
      }

      // Once we're at the leftmost leaf node, we go up(pop), callback on the node, and right(current.right).
      // Starting from the top of the stack
      current = stack.pop();
      callback(current);
      current = current.right;
    }
  }
  rebalance() {
    const array = [];
    this.inOrder((node) => {
      array.push(node.data);
    });
    this.root = this.buildTree(array);
  }
  postOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback function required");
    }

    let stack = [this.root];
    let reverseStack = [];

    while (stack.length) {
      let currentNode = stack.pop();
      reverseStack.push(currentNode);

      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
    while (reverseStack.length) {
      callback(reverseStack.pop());
    }
  }
}
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

console.log(tree.find(2));
prettyPrint(tree.root);

tree.postOrder((node) => console.log(node));
