function areThereDuplicates() {
  // good luck. (supply any arguments you deem necessary.)

  const frequency = {};

  for (let key of arguments) {

    frequency[key] = (frequency[key] || 0) + 1;
    
    if (frequency[key] > 1) {
      console.log("True - Duplicates");

      return true;
    }
  }
  console.log("False - no duplicates");
  return false;
}

areThereDuplicates(1, 2, 3); // false
areThereDuplicates(1, 2, 2); // true
areThereDuplicates("a", "b", "c", "a"); // true

areThereDuplicates("a", "a"); // true
