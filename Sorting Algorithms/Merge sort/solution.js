function merge(arr1, arr2) {
  let res = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }
  if (i === arr1.length) {
    res.push(...arr2.slice(j, arr2.length));
  }

  if (j === arr2.length) {
    res.push(...arr1.slice(i, arr1.length));
  }
  return res;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle, arr.length));

  return merge(left, right);
}

console.log(mergeSort([1, 2,999,10000,2,-1,-50,-49, 1, 2, 3, 5, 5, 1, 2, 3, 3, 5, 6, 7, 8, 9, 10]));
