function binarySearch(arr, elem) {
  let min = 0;
  let max = arr.length;
  let mid = Math.floor((min + max) / 2);

  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    if (arr[mid] === elem) {
      console.log(mid);
      return mid;
    }
    if (arr[mid] < elem) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  return -1;
}

binarySearch(
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 20, 33, 44, 55, 111,
    2200,
  ],
  44
);
