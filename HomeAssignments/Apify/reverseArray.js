const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function reverseArray(arr) {
    let left = 0;
    let right = myArray.length - 1;

  while(left < right){
    [myArray[left], myArray[right]] = [myArray[right], myArray[left]];
    left ++;
    right --;
  }
  console.log(arr)
  return arr;
}
reverseArray(myArray);
