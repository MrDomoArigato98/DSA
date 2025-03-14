class HashMap {
  constructor(capacity = 16) {
    this.loadFactor = 0.75;
    this.capacity = capacity;
    this.threshold = Math.floor(this.capacity * this.loadFactor);
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.threshold = Math.floor(this.capacity * this.loadFactor);
    this.buckets = new Array(this.capacity);
    this.size = 0;
    console.log("Resizing");

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let index = 0; index < key.length; index++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(index);
    }
    return hashCode % this.capacity;
  }

  set(key, value) {
    const hash = this.hash(key);

    if (!this.buckets[hash]) {
      this.buckets[hash] = [];
    }

    const bucket = this.buckets[hash];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;
    if (this.size > this.threshold) {
      this.resize();
    }
  }
  length() {
    return this.size;
  }
  clear() {
    this.buckets = new Array(this.capacity);
  }

  get(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    if (!bucket) {
      return undefined;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        return bucket[i][1];
      }
      i++;
      return null;
    }
  }
  remove(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];
    if (!bucket) {
      return undefined;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  keys() {
    let allkeys = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [key, _] of bucket) {
          allkeys.push(key);
        }
      }
    }
    return allkeys;
  }

  values() {
    let allValues = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [_, value] of bucket) {
          allValues.push(value);
        }
      }
    }
    return allValues;
  }
  entries() {
    let allEntries = [];
    let index = 0;
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [key, value] of bucket) {
          allEntries[index] = [key, value];
          index++;
        }
      }
    }
    return allEntries;
  }

  has(key) {
    let hash = this.hash(key);
    let bucket = this.buckets[hash];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        return true;
      }
    }
    return false;
  }
}

const test = new HashMap();

// test.set("grape", "black");
// console.log(test.remove("grape"));

test.set("peach", "pink");
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");

console.log(test.size);
console.log(test.keys());
console.log(test.values());
console.log(test.size);
test.set("moon", "silver");
test.set("hat", "red");
console.log(test.keys());
console.log(test.values());
console.log(test.size);

console.log(test.remove("hat"));
console.log(test.size);

console.log(test.has("kite"));
