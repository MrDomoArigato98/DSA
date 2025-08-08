function bubbleSort(arr) {
  let noSwap = true;
  for (let i = arr.length; i > 0; i--) {
    noSwap = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwap = false;
      }
    }
    if (noSwap) break;
  }
  console.log(arr);
  return arr;
}

bubbleSort([1, 6, 9, 2, 4, 66, 7, 22, 1, 6, 2, 5, 0, 1, 23, 5, 66]);

bubbleSort([9, 1, 2, 3, 4, 5, 6, 7]);
