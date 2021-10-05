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

It is similar to an array, but there are a few differences

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

## Further Reading
