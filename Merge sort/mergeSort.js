function merge(leftArray, rightArray) {
  const results = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      results.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      results.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }
  

  return results
    .concat(leftArray.slice(leftIndex))
    .concat(rightArray.slice(rightIndex));
}

function mergeSort(unsortedArray) {
  if (unsortedArray.length === 1) {
    return unsortedArray;
  }

  const middle = Math.floor(unsortedArray.length / 2);
  const leftArray = mergeSort(unsortedArray.slice(0, middle));
  const rightArray = mergeSort(unsortedArray.slice(middle));

  return merge(leftArray, rightArray);
}

const array = [0,2,4,6,7,1,2,1,7,8,9,4,2,1,3,5,7,8,9,0]

console.log(mergeSort(array))