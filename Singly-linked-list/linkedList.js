export class LinkedList {
  constructor() {
    this.head;
    this.tail;
    this.length = 0;
  }
  append(value) {
    const newNode = new Node(value);
    
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }
    let currentTail = this.tail; //Get current tail to append
    currentTail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  tailFn() {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  prepend(value) {
    if (this.length == 0) {
      this.append(value);
    } else {
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }
  }

  size() {
    return this.length;
  }

  at(index) {
    let currentNode = this.head;
    let counter = 0;

    while (currentNode.value != null && counter < index) {
      currentNode = currentNode.next;
      if (!currentNode) {
        return null;
      }
      counter++;
    }
    return currentNode;
  }
  toString() {
    let currentNode = this.head;
    let word = "";
    try {
      while (currentNode.next) {
        word += `( ${currentNode.value} ) -> `;
        currentNode = currentNode.next;
      }
      if(currentNode.value){
        word += `( ${currentNode.value} ) -> `
      }
      word += "null";
      return word;
    } catch (error) {
      return "Out of bounds";
    }
  }

  contains(value) {
    let currentNode = this.head;

    while (currentNode.next != null) {
      if (currentNode.value == value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    if (currentNode.value == value) return true; // Checking the last element, considering the while loop is at the tail now and the tail has next == null
    return false;
  }
  pop() {
    if (!this.length) {
      return null;
    }
    let currentNode = this.head;

    let secondLastNode;

    while (currentNode.next) {
      secondLastNode = currentNode;
      currentNode = currentNode.next;
    }
    secondLastNode.next = null;
    this.tail = secondLastNode;
    this.length--;
  }

  find(value) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode.next) {
      if (currentNode.value == value) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }
    if (currentNode.value == value) {
      return index;
    }
    return false;
  }

  removeAt(index) {
    let currentNode = this.head;
    let previousNode = this.head;
    let counter = 0;

    if (index == 0) {
      this.head = currentNode.next;
      this.length--;
    } else {
      while (currentNode.next != null && counter < index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        counter++;
      }
      previousNode.next = currentNode.next;
      this.length--;
    }
  }
  insertAt(value, index) {
    if (index == 0) {
      this.prepend(value);
    } else {
      const newNode = new Node(value);
      let currentNode = this.head;
    
      let previousNode;
      let counter = 0;

      while (currentNode.next != null && counter < index) {

        previousNode = currentNode;
        currentNode = currentNode.next;

        counter++;
      }
      previousNode.next = newNode;
      newNode.next = currentNode;
      this.length++;
    }
  }
}

export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
