# Linked Lists

## Learning Objectives

- Be able to describe what is a node
- Be able to describe what is a linked list
- Be able to compare and contrast a linked list to an array
- Be able to build a simple linked list using JavaScript
- Be able to describe one real world example of a linked list

## Linked List

A linked list is a linear data structure made up of nodes that point to the next node in a singly linked list.

![](../assets/linked-list-example.png)

It is similar to an array, but there are a few differences. One is chosen over the other depending on the functionality/speed of certain operations for certain tasks. For example, the forward and back buttons on a browser typically have data stored in a [linked list](https://www.geeksforgeeks.org/applications-of-linked-list-data-structure/).

Based on your reading, what are the main differences?

JavaScript has built-in arrays, but there is no linked list. Let's build one.

### Node

First, let's build a node. A node must have some data and a pointer to the next node.

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

We can create a pair of nodes and link them

```js
const firstNode = new Node(1);
const secondNode = new Node(2);
firstNode.next = secondNode;

console.log(firstNode);
```

### Linked List

Much like our `DeckOfCards`, which was a class that interacted with our `Cards` objects and had methods on it for utilizing the cards, our list will follow a similar pattern.

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}
```

So now we can create a new linked list with our `firstNode`

```js
const firstList = new LinkedList(firstNode);
console.log(firstList);
```

Depending on our terminal settings, the output should look more or less like so

![](../assets/log-first-linked-list.png)

### Linked List Methods

There are some common methods that come in handy with linked lists to build out

- search
- size
- clear
- get last
- insert
- delete

Let's quickly create a linked list that has the months in order so we can use it to test our methods

```js
const months = [
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

let previousNode = new Node("Jan");
let list = new LinkedList(previousNode);
for (let i = 0; i < months.length; i++) {
  let currentNode = new Node(months[i]);
  previousNode.next = currentNode;
  previousNode = currentNode;
}
```

### Size

This will tell us how long our linked list is.

Let's write some pseudo code. How would we go about writing a size method for the linked list?

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }
}
```

How do we test this method?

#### Search

This will allow us to search for a matching piece of data.

Let's write some pseudo code. How would we go about writing a search method for the linked list?

<details><summary>search</summary>

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  search(key) {
    let node = this.head;
    while (node !== null && node.data !== key) {
      node = node.next;
    }
    return node;
  }
}
```

How do we test this method?

</details>

#### Clear

This will clear our linked list of all the nodes.

Let's write some pseudo code. How would we go about writing a clear method for the linked list?

<details><summary>clear</summary>

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  clear() {
    this.head = null;
  }
}
```

How do we test this method?

</details>

#### Get Last

This will get the last node of our linked list.

Let's write some pseudo code. How would we go about writing a getLast method for the linked list?

<details><summary>clear</summary>

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  getLast() {
    let node = this.head;
    if (!this.head) return null;
    while (node.next) {
      node = node.next;
    }
    return node;
  }
```

How do we test this method?

</details>

#### Insert

This insert will insert at the head.

Let's write some pseudo code. How would we go about writing an insert method for the linked list?

<details><summary>insert</summary>

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  insert(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
}
```

How do we test this method?

</details>

#### Delete

Let's delete a node with a specific key.

Let's write some pseudo code. How would we go about writing a delete method for the linked list?

- use similar logic to search for the matching key, keep count how many nodes we go through
- store the found node
- loop through up to the previous node of the found node
- set the previous node's next property to be found node's next property

<details><summary>delete</summary>

```js
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  delete(data) {
    let node = this.head;
    let counter = 0;
    while (node.data !== data && node.next) {
      counter++;
      node = node.next;
    }
    let foundNode = node;
    node = this.head;
    for (let i = 1; i < counter; i++) {
      node = node.next;
    }
    node.next = foundNode.next;
  }
}
```

How do we test this method?

It may be hard to see our linked list, we can bring in a `node.js` utility to help us and use its `inspect` method, so we can expand what we see in our `console.log`

```js
const { inspect } = require("util");

list.delete("June");
console.log(inspect(list, { showHidden: true, colors: true, depth: 12 }));
```

</details>

## Bonus

[Doubly-linked list](./README2.md)

## Further Reading
