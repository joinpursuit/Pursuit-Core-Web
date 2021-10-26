# Hash Tables

## Learning Objectives

- Review `hash`, `objects` and associated vocabulary
- Gain a basic understanding of the fundamentals of hash tables

## Definitions

### Hash

Hash usually refers to a function (or the result of a function) that converts one value to another.

For example, if one were to encrypt a password, the resulting encrypted password may be called a hash. Encrypted passwords use complicated algorithms to convert a string into a complex sequence that can only be decoded with the hash function again. Hackers can only guess the password and through brute force, they may be able to get the right password, especially if the number of guesses is low.

A very simple encryption is the Caesar Cipher. It shifts letters over by a certain amount

Single letter shift

```
a => b
b => c
```

Therefore `hello, world` becomes `Ifmmp, xpsme`

Shift by 13

```
a => n
b => o
```

Therefore `hello, world` becomes `Uryyb, jbeyq`

[Try it yourself](https://cryptii.com/pipes/caesar-cipher)

Here is something closer to what you may see if you are working on authentication/password encryption in your coding. This is the result of a hashing function called [`bcrypt`](https://en.wikipedia.org/wiki/Bcrypt)

```js
const password = "password1234";

let hashedPassword = encrypt(password);

console.log(hashedPassword);
// $2a$04$QQkIacYPfQLVbfja6sGgzuKwwp4KjMjjpfWh4G49yJbZVDucfY0XG
```

[Try it yourself](https://www.devglan.com/online-tools/bcrypt-hash-generator)

Hashing functions used in production are very complex and sophisticated. They are usually written by people who dedicate their careers to this kind of work. We only have to know how to use them.

### Hash Table and Associated Terms

Across compting languages, there can be different name for the same (or very similar things). For example, we learned earlier that in the language Python, what us JavaScript folks call an `array` is often referred to as a `list` in Python.

Let's look at some more similar, yet sometimes different, terminology

- Associative arrays: similar to JavaScript `object`, or Python `dictionary`, or `hash` in Ruby. These are made up of key-value pairs.
- JavaScript `map` - (map the data structure, not the array method) - similar to JavaScript object, with a few key details that are different (see below)
- Hash Map, Hash Table - both are quite similar to each other and can be interchanged sometimes when people are describing them. They are both built-in to some languages (like Java) and have some performance differences depending on what the goal of the code is.

To tie this back to JavaScript - a JavaScript object is a type of associative array. We can use JavaScript to implement hash maps/hash tables. JavaScript has a built in `Map` object that allows one to use some special features that a regular JavaScript object does not have.

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

Can we find things even faster? What if we could find things in constant `O(1)` time?

If we were to think about the kinds of algorithms we built with code to look through an English dictionary for a specific word:

- A linked list is like starting on the first page and going through each page until we find the word
- A binary search is like we started in the middle, determined if our word was higher or lower in the alphabet and then kept choosing the middle point, until we found our word
- A hash table is like if we had some wall space and we could put the first page of each letter on the wall scan them. Then, if we don't find the word on the first page, we can then go to the next page behind it, until we find our word.

With a hash table, even though the worst case scenario could be `O(N)` it usually isn't. Because it is so unusual to end up with the worst case scenario - this is a time where the average Big O calculation is used to describe it instead of the worst case scenario.

One further detail about the analogy of the physical dictionary on the wall: Our dictionary has many more words that start with the letter `s` than the letter `x`. That means that the lookup time for `s` would end up being much longer with our system. Since we want to look things up as fast as possible we can consider that we don't have to limit ourselves to just 26 pages (one for each letter): We could possibly do 100 pages on the wall and still be able to scan them quickly. However, we would need a more complex system to break up the dictionary. This is where we would use something like a hash function - it would help distribute the data more evenly within our 100 pages with a bit more complicated of a system for distributing the data.

[Hash tables are used for things like database indexing, caches and sets](https://en.wikipedia.org/wiki/Hash_table) - again, with where we are in our coding journey we don't have to build out the functionality of a cache, we just need to know how and where to use the code that someone else has built for us.

Bonus - [What is a cache?](https://www.businessinsider.com/what-is-cache)

To build a hash table, we start with an array, which would represent our pages on the wall.

## Build a Hash Table

An important thing to note is that our array size in our hash table is usually pre-set. While JavaScript does not require a pre-determined size of an array, for hash tables, you do have a set size.

Just like our dictionary on the wall - we don't want the number of pages on the wall to be too small or else the search time would take too long. We also don't want to make it too big, since at some point it takes up so much space, we may end up with a lot of unnecessary blank space on the wall and it no longer becomes useful.

Our hash table with have two properties

- A table, which will store the data, we will limit it to 127 'buckets'
  - The table will have three properties
  - The index
  - an array of size two that stores the `key` and `value`
- A size that keeps track of how much data we have in our hash table.

We will write a very simple hash function to just mock the process of converting a string to another value.

It will take the character code of the letters and concatenate it into one long string.

Remember that `A` has a character code of `65`, Z has a character code of `90`. `a` has a character code of `97` and `z` has a character code of `122`. We will then use the modulo operator to make sure our values stay within the bounds of our array size.

[Reference table](http://sticksandstones.kstrom.com/appen.html)

[Video on character codes](https://www.youtube.com/watch?v=MijmeoH9LT4)

Hash table:

```js
class HashTable {
  constructor() {
    this.table = new Array(127);
    this.size = 0;
  }
  _hash() {
    let hash = 0;
    for (let char of key) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }
}
```

Mock hash function (remember, production code would use something far more sophisticated - this is to help visualize/understand the process).

```js
class HashTable {
  constructor() {
    this.table = new Array(127);
    this.size = 0;
  }
  hash() {
    let hash = 0;
    for (let char of key) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }
}
```

Let's test out this function

```js
const hashTable = new HashTable();

console.log(hashTable.hash("a"));
console.log(hashTable.hash("b"));
console.log(hashTable.hash("z"));
console.log(hashTable.hash("Zugzwang"));
```

What does starting the name of a function or property with a `_` inside of a class mean?

## Further Reading
