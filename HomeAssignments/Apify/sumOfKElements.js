const myArray = [2, 1, 5, 1, 3, 2];

function sumOfKElements(array, k) {
  if (k > array.length) {
    return null;
  }

  let max = 0;
  let window = 0;
  for (let i = 0; i < k; i++) {
    window = array[i] + window;
  }

  max = window;

  for (let i = k; i < array.length; i++) {
    window = window - array[i - k] + array[i];

    if (window > max) {
      max = window;
    }
  }
  console.log(max);
  return max;
}

sumOfKElements(myArray, 3);
