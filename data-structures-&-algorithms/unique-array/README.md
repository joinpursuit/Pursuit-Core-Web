# Unique Array/Hash tables

### Setting intent

Take a moment to compare where you were when you started. Take 3 minutes to write down everything you can remember about you've learned recently. Be ready to share in a group.

## Trivia Questions

- What does passed by reference mean?
- What does passed by value mean?

## Make an Array of Unique Items

Given an array that has duplicate items, write function `unique` that will return a new array with no duplicates.

This time, look up the answer. Try your own search and/or check out these possible answers. Adapt the code to be your own and test it.

- [this resource](https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates)
- [or this one](https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects)
- [or this one](https://ajahne.github.io/blog/javascript/2020/02/04/how-to-remove-duplicates-from-an-array-in-javascript.html)

```js
const animals = [
  "otter",
  "dog",
  "dog",
  "dog",
  "parakeet",
  "woodchuck",
  "cat",
  "tardigrade",
  "dog",
  "cat",
];
```

Now that you've chosen a possible solution and tested it with the test array. Why did you choose the one you chose?

Be ready to discuss your choice as a group.

## Make an array of Unique Objects

Write a function that will allow you to choose a key, and then make a new array of unique objects

```js
const catArt = [
  {
    itemName: "Chewed Plastic Bag",
    designedBy: "Mittens",
    price: 1.1,
  },
  {
    itemName: "Tangled yarn",
    designedBy: "Patches",
    price: 2.02,
  },
  {
    itemName: "Cardboard Box with Chewed Edges",
    designedBy: "Chewy",
    price: "♇♇7",
  },
  {
    itemName: "Fur-Lined Cardboard Box",
    designedBy: "Fluffy",
    price: "♇♇5",
  },
  {
    itemName: "Dug Up Houseplant",
    designedBy: "Tortie",
    price: 4,
  },
  {
    itemName: "Fur-Lined Track Pants",
    designedBy: "Fluffy",
    price: "♇♇5",
  },
  {
    itemName: "Cardboard Box with Chewed Edges",
    designedBy: "Chewy",
    price: "♇♇7",
  },
  {
    itemName: "Fur-Lined Pillowcase",
    designedBy: "Fluffy",
    price: 6,
  },
  {
    itemName: "Fur-Lined Pillowcase",
    designedBy: "Fluffy",
    price: "6",
  },
  {
    itemName: "Cardboard Box with Chewed Edges",
    designedBy: "Chewy",
    price: "♇♇7",
  },
  {
    itemName: "Shredded Newspaper",
    designedBy: "Chips",
    price: 8.8,
  },
  {
    itemName: "Wooden Spoon with Teeth Indentations",
    designedBy: "Mocha",
    price: "91.97",
  },
  {
    itemName: "Distressed Laundry Basket",
    designedBy: "",
    price: 10.1,
  },
];
```

## Further

[Check out other implementations of Data Structures with JavaScript](https://github.com/TheAlgorithms/Javascript) - one thing you'll note is that there are some different approaches to each data structure. We focused on simplicity and similar syntax in order to get fundamentals set. Deepen your understanding by looking at other implementations. Keep googling to see even more implementations and you may even find some implementations as npm packages that are meant for production level code - try to see what other considerations need to be accounted for when it comes to putting this kind of code into a project.

### Lab: Accumulate points on Codewars

Be sure to get enough points to pass the gate, go back and wrap up any unsolved kata.

## Next

If employers do a technical interview that involves a code challenge, the most common platforms are [Leetcode](https://leetcode.com), [Code Signal](https://codesignal.com) an [HackerRank](https://www.hackerrank.com).

It would be prudent to attempt at least one question from each platform. The hiring process is always changing and being updated, different platforms may gain or lose popularity - be sure to keep your finger on the pulse and get practice on the right platform(s).
