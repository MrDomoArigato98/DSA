/*
- Store frst element as smallest value
- Compare to next items in array, until you find a smaller number
- If smaller is found, make it the new minimum and continue until end of array
- If min is not the initial value, swap the values - else this means the array is sorted
- Repeat
*/

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (i !== min) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

const testArray = [1, -2, 6, 8, 11, 2, 55, 2];

console.log(selectionSort(testArray));

