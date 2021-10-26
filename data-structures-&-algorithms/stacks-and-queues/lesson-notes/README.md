# Stacks and Queues

## Learning Objectives

- Create a stack, with some basic methods: linked list implementation
- Create a queue, with some basic methods: linked list implementation

**Note**: The algorithms chosen are most similar to those presented in [Cracking the Code Interview](https://www.amazon.com/dp/0984782850/). Please note there can be variations (in naming of properties/methods/variables and approaches) which can be due to some differences in coding languages or just arbitrary decisions ie - a `node` can be referred to as a `node` or possibly an `item` , a `head` can also be referred to as `top`, `data` could be referred to as `keys` etc.).

It is important that if you decide to name something `item` in a data structure, that you use the same naming strategy in that data structure in order to maintain consistency and readability. If you start a new project, you can choose differently, or you can refactor your current code. But be sure to avoid mixing your variable name strategies within a project.

Both stacks and queues could be built using arrays instead of linked lists. It would be worth exploring multiple approaches to deepen your understanding.

## Getting Started

Both our stacks and queues will be singly-linked list made up of nodes

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

We will again use our ordered list of months to help demonstrate and visualize what we are building

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
```

## Stack

Our Stack will follow last-in, first-out. We will create the following methods

- push (adds an item)
- pop (removes an item)
- peek (returns the top item)
- isEmpty (checks if the stack is empty)
- toArray (converts our linked list to an array)

If we were to put our months into the stack, starting with `Jan`, what are our predictions?

- When we add `Feb` after `Jan`, which one is the top of the stack now?
- What will `Jan`'s `next` pointer point to?
- What will `Feb`'s `next` pointer point to?
- What month will be the top of the stack if we pushed every month?
- What month will be removed if we run the method pop?
- What month will be the new top after popping one month?

Write your predictions down. It's really important to know what you are building and test cases set, so that you can check your work as you build.

```js
class Stack {
  constructor(top = null) {
    this.top = top;
  }
  isEmpty() {
    return this.top === null;
  }
  push(data) {
    const newItem = new Node(data);
    newItem.next = this.top;
    this.top = newItem;
  }
}
```

Let's add our months

```js
const stack = new Stack();
console.log(stack.isEmpty());
for (let i = 0; i < months.length; i++) {
  stack.push(months[i]);
}

const { inspect } = require("util");
console.log(stack.isEmpty());
console.log(inspect(stack, { colors: true, depth: 12 }));
```

Look at the questions from before, do are predictions match?

[Docs on inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

```js
class Stack {
  constructor(top = null) {
    this.top = top;
  }
  peek() {
    if (this.top == null) {
      throw new Error("The stack is empty");
    }
    return this.top;
  }
  pop() {
    if (this.top == null) {
      throw new Error("The stack is empty");
    }
    let item = this.top;
    if (item) {
      let newItem = item.next;
      this.top = newItem;
      return item;
    }
  }
}
```

```js
console.log("peek", stack.peek());
const topItem = stack.pop();
console.log("top item", topItem);
console.log("peek after pop", stack.peek());
console.log(inspect(stack, { colors: true, depth: 12 }));
```

### Bonus

Turn the data in the stack into an array. This can be helpful for some challenge problems. Try to see if you can write it yourself first.

<details><summary>To Array</summary>

```js
  toArray() {
    let arr = [];
    let item = this.top;
    while (item) {
      arr.push(item.data);
      item = item.next;
    }
    return arr;
  }
```

Be sure to test it and confirm it works as expected. Does using this method change the stack?

</details>

## Queue

Our queue will follow first-in, first-out. We will create the following methods

- enqueue (adds an item)
- dequeue (removes an item)
- peek (returns the top item)
- isEmpty (checks if the queue is empty)

If we were to put our months into the queue, starting with `Jan`, what are our predictions?

- When we add `Feb` after `Jan`, which one is the first in queue now?
- When we add `Feb` after `Jan`, which one is the last in queue now?
- What will `Jan`'s `next` pointer point to?
- What will `Feb`'s `next` pointer point to?
- What month will be the first of the queue if we pushed every month?
- What month will be the last of the queue if we pushed every month?
- What month will be removed if we run the method pop?
- What month will be the new top after popping one month?

Write your predictions down. It's really important to know what you are building and test cases set, so that you can check your work as you build.

```js
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(data) {
    let newItem = new Node(data);
    if (!this.first) {
      this.first = newItem;
      this.last = newItem;
    } else {
      this.last.next = newItem;
      this.last = newItem;
    }
    return ++this.size;
  }
  isEmpty() {
    return this.first === null;
  }
}
```

Let's add our months:

```js
let queue = new Queue();
console.log(queue.isEmpty());
for (let i = 0; i < months.length; i++) {
  queue.enqueue(months[i]);
}

console.log(inspect(queue, { colors: true, depth: 12 }));
console.log(queue.first);
console.log(queue.last);
console.log(queue.isEmpty());
```

Look at the questions from before, do are predictions match?

```js
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  dequeue() {
    if (this.first == null) {
      throw new Error("The queue is empty");
    }
    const item = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return item.data;
  }
  peek() {
    if (this.first == null) {
      throw new Error("The queue is empty");
    }
    return this.first;
  }
}
```

```js
console.log("peek", queue.peek());
const firstItem = queue.dequeue();
console.log("first item", firstItem);
console.log("peek after dequeue", queue.peek());
console.log(inspect(queue, { colors: true, depth: 12 }));
```

## Further Reading

Stacks and Queues are often implemented using arrays.

Do some reading and try to implement your own using arrays instead of linked lists

[Stack Example](https://www.javascripttutorial.net/javascript-stack/)

[Queue Example](https://www.javascripttutorial.net/javascript-queue/)
