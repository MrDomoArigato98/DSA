# Implementations of common Data Structures and Algorithms

1. [Singly Linked List](https://github.com/MrDomoArigato98/DSA/tree/main/Singly-linked-list)

Functionality:
- **append(value**) adds a new node containing value to the end of the list
- **insertAt(value, index)** that inserts a new node with the provided value at the given index
- **removeAt(index)** that removes the node at the given index
- **prepend(value)** adds a new node containing value to the start of the list
- **length** returns the total number of nodes in the list
- **head** returns the first node in the list
- **tail** returns the last node in the list
- **at(index)** returns the node at the given index
- **pop()** removes the last element from the list
- **contains(value)** returns true if the passed in value is in the list and otherwise returns false.
- **find(value)** returns the index of the node containing value, or null if not found.
- **toString()** represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null

```
/ example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.prepend("first");
console.log(list.toString())

etc . .
```
