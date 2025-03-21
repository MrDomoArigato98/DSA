function knightMoves(start = [], destination = []) {
  //Push the first element to the beginning of the queue;
  const queue = [];

  queue.push(start);
  console.table(queue);

  const visited = new Set();

  while (queue.length) {
    let index = queue.pop(); // Pop the first element from the queue
    visited.add(index); // Add the index to the visited set

    const neighbours = calculateNeighbours(index); // Calculates the list of possible neighbours from the index
    console.log("Neighbours are:");
    console.table(neighbours); // List out the neighbours

    for (let neighbour of neighbours) {
      //For each possible neighbour
      if (neighbour[0] == destination[0] && neighbour[1] == destination[1]) {
        // Check if neighbour matches destination
        return visited; // Not sure what to return here, the visited set? Probably
      }
    }
  }
}

function calculateNeighbours(index = []) {
  // Start off with [0,0]

  let move1 = [index[0] + 2, index[1] + 1];
  let move2 = [index[0] + 2, index[1] - 1];

  let move3 = [index[0] + 1, index[1] + 2];
  let move4 = [index[0] + 1, index[1] - 2];

  let move5 = [index[0] - 2, index[1] + 1];
  let move6 = [index[0] - 2, index[1] - 1];

  let move7 = [index[0] - 1, index[1] + 2];
  let move8 = [index[0] - 1, index[1] - 2];

  const listOfMoves = [move1, move2, move3, move4, move5, move6, move7, move8];
  const validMoves = [];

  for (let move of listOfMoves) {
    if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
      validMoves.push(move);
    }
  }

  return validMoves;
}
// Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another
// by outputting all squares the knight will stop on along the way.
// Start at 0,0 wants to move to 1,2 so the answer to this one is == [[0,0], [1,2]]
let a = knightMoves([3, 2], [7, 7]);

console.log("Here's the end:");
console.table(a);
