    function areThereDuplicates() {
      let collection = {}
      for (let val in arguments) {
        const key = arguments[val]
        collection[key] = (collection[key] || 0) + 1
      }
      for (let key in collection) {
        if (collection[key] > 1) return true
      }
      return false;
    }

areThereDuplicates(1, 2, 3); // false
areThereDuplicates(1, 2, 2); // true
areThereDuplicates("a", "b", "c", "a"); // true

areThereDuplicates("a", "a"); // true
