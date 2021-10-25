# Hash Tables

## Learning Objectives

- Review `hash` and associated vocabulary
- Gain a basic understanding of the fundamentals of hash tables

## Definitions

- Hash - is a function (or the result of a function) that converts one value to another.

For example, if one were to encrypt a password, the resulting encrypted password may be called a hash.

```js
const password = "password1234";

let hashedPassword = encrypt(password);

console.log(hashedPassword);
// xDc92oorq2PlovyZzZZz
```

Across compting languages, there can be different name for the same (or very similar things). For example, we learned earlier that in the language Python, what us JavaScript folks call an `array` is often referred to as a `list` in Python.

Let's look at some more similar, yet sometimes different, terminology

- Associative arrays: similar to JavaScript `object`, or Python `dictionary`, or `hash` in Ruby
- JavaScript `map` - (map the data structure, not the array method) - similar to JavaScript object, with a few key details that are different (see below)
- Hash Map, Hash Table - both are quite similar to each other and can be interchanged sometimes when people are describing them. They are both built-in to Java and have some performance differences depending on what the goal of the code is.

To tie this back to JavaScript - a JavaScript object is an associative array. We can use JavaScript to implement hash maps/hash tables. JavaScript has a built in `Map` object that allows one to use some special features that a regular JavaScript object does not have.

When you are on an interview or talking to others, be sure to ask clarifying questions to be sure you are talking about the same thing.

## Hash Tables

When we searched a linked list we had `O(n)`

```js
  search(key) {
    let node = this.head;
    while (node !== null && node.data !== key) {
      node = node.next;
    }
    return node;
  }
```

When we learned about binary search trees, we learned that we could find things at `O(log n)`

Can we find things even faster? What if we

## Further Reading
