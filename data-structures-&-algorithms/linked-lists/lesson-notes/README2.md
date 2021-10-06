# Doubly Linked List

This is bonus material, please only begin to study this when you have built a good understanding of singly linked lists.

[Visualization](Then try a [doubly linked list](https://csvistool.com/DoublyLinkedList))

## Learning Objectives

- build a doubly linked list
- compare and contrast to a singly linked list
- be able to determine whether a method needs to be updated for a doubly linked list

## Node

The node is very similar to the node found in a singly linked list. It has an additional pointer to point to the previous (`prev`) node.

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
```

We can create a pair of nodes and link them

```js
const firstNode = new Node(1);
const secondNode = new Node(2);
firstNode.next = secondNode;
secondNode.prev = firstNode;

console.log(firstNode);
```

Our console should look similar to this

![](../assets/log-doubly-linked-list.png)

Since the first node points to the second node and the second node points back to the first one; this is a circular reference. Node uses `<ref *1>` and `[Circular *1]`

We can create a simpler circular reference for demonstration purposes

```js
const circularRef = {};
circularRef.circularRef = circularRef;

console.log(circularRef);
```

### Linked List

Our Doubly Linked List has the same foundation

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}
```

Let's use an insert method to insert our months, so that January is the the head and December is the tail.

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
  insert(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    if (this.head) {
      this.head.prev = newNode;
    }
    this.head = newNode;
    newNode.prev = null;
  }
}
```

Since we are only adding to the front of the list, we must insert December first.

```js
const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let list = new LinkedList();
months.reverse();
for (let i = 0; i < months.length; i++) {
  list.insert(months[i]);
}
```

Here is our search method. Do we need to update it?

```js
  search(key) {
    let node = this.head;
    while (node !== null && node.data !== key) {
      node = node.next;
    }
    return node;
  }
```

Now let's create a delete method that deletes a specific node

```js
  delete(data) {
    const node = this.search(data);

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
  }
```
