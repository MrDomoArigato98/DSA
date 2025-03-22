function knightMoves(start = [], destination = []) {
  //Push the first element to the beginning of the queue;
  const queue = [];
  queue.push(start);

  const visited = new Map();
  visited.set(start.toString(), null);

  while (queue.length) {
    let index = queue.shift(); // Pop the first element from the queue
    const neighbours = calculateNeighbours(index); // Calculates the list of possible neighbours from the index
    console.log(index);

    if (index[0] === destination[0] && index[1] === destination[1]) {
      //If they match, we have to backtrack the number of steps
      return backtrack(visited, destination);
    }

    for (let neighbour of neighbours) {
      //For each neighbour of the index
      if (!visited.has(neighbour.toString())) {
        visited.set(neighbour.toString(), index); //Set the Key to the string of [x,y] coordinates, and the value to it's parent
        queue.push(neighbour);
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

function backtrack(visited, destination) {
  const path = [];
  let current = destination;

  while (current) {
    path.push(current); //Add the path to current. This begins with the destination.
    current = visited.get(current.toString()); //Set current, to the value of it's parent. The map contains contains [Child x,y : parent x,y]
  }
  return path.reverse(); //Return the reverse of the list, as we're backtracking from the destination.
}

// Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another
// by outputting all squares the knight will stop on along the way.
// Start at 0,0 wants to move to 1,2 so the answer to this one is == [[0,0], [1,2]]

console.table(knightMoves([0,0], [7,7]));
