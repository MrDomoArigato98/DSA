function naiveStringSearch(str, substr) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === substr[0]) {
      for (let j = 1; j < substr.length; j++) {
        if (substr[j] !== str[i + j]) {
          break;
        }
        if(j==2){
            counter++;
        }
      }
    }
  }
  return counter;
}

console.log(naiveStringSearch("wowomgzomgomomomg", "omg"))
