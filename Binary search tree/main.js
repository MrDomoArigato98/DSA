import { Node } from "./bst.js";
import { Tree } from "./bst.js";





// // console.log(tree.find(0));
// // tree.deleteItem(67);
// 

// tree.postOrder((node) => console.log(node.data));

// 1. Create a binary search tree from an array of random numbers < 100
const array = [];
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max+1);

  return Math.floor(Math.random() * (max - min)) + min;
};

for (let i = 0; i != 100; i++) {
    array.push(getRandomInteger(1, 100))
}

const tree = new Tree(array);
tree.prettyPrint(tree.root);

// 2. Check if the tree is balanced
console.log(tree.isBalanced());
console.log("=======")
console.log("Priting out elements in LevelOrder")
// 3. Print out all elements in levelOrder
console.log(tree.levelOrder((node) => console.log(node.data)))

console.log("Priting out elements in PreOrder")
// 3. Print out all elements in preOrder
console.log(tree.preOrder((node) => console.log(node.data)))

console.log("Priting out elements in LevelOrder")
// 3. Print out all elements in postOrder
console.log(tree.postOrder((node) => console.log(node.data)))

console.log("Priting out elements in LevelOrder")
// 3. Print out all elements inOrder
console.log(tree.inOrder((node) => console.log(node.data)))

// 4. Unbalance the tree by adding several numbers > 100.
console.log("Inserting 500,600,700,800.")
tree.insert(500)
tree.insert(600)
tree.insert(700)
tree.insert(800)
console.log("Is the tree balanced?:")
console.log(tree.isBalanced());

// 5. Balance the tree by calling rebalance.
console.log("Rebalancing . . .")
tree.rebalance()
console.log("Is the tree balanced now?:")
console.log(tree.isBalanced());


console.log("Priting out elements in LevelOrder")
// 3. Print out all elements in levelOrder
console.log(tree.levelOrder((node) => console.log(node.data)))

console.log("Priting out elements in PreOrder")
// 3. Print out all elements in preOrder
console.log(tree.preOrder((node) => console.log(node.data)))

console.log("Priting out elements in LevelOrder")
// 3. Print out all elements in postOrder
console.log(tree.postOrder((node) => console.log(node.data)))

console.log("Priting out elements in LevelOrder")
// 3. Print out all elements inOrder
console.log(tree.inOrder((node) => console.log(node.data)))