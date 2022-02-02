# Arrays and Callbacks

## Learning Objectives

- Review array basics
- Review array methods that take callbacks
- Review reference types

## Naming Conventions

Arrays are a `list` (in some programming languages an array is called a list) of items or a collection of items. Therefore, the name of the array should be descriptive and pluralized

- items
- numbers
- words
- products

When you are iterating over an array and selecting a single item, the single item should have a singular matching variable name

- item
- number
- word
- product

**GOOD**

Notice the clarity of understanding what is being iterated. It can be read out loud and reads almost like a sentence.

```js
for (let review of reviews)
```

**BAD**

Notice the lack of clarity of what is being iterated. Reading this out loud does not help clarify what is happening (or supposed to be happening).

```js
for (let r of review)

for (let item of reviews)

for (let z of y)
```

## Array iteration

There are a few ways to iterate over an array

```js
const nums = [1, 2, 3, 4, 5];
```

We can use a while loop:

```js
let i = 0;
while (i < nums.length) {
  console.log(nums[i]);
  i++;
}
```

We can use a for loop. The for loop is just like our while loop, however it has a `control panel` that on one line: Initiates a counter (the variable `i`) at a certain value, sets the end condition `i < nums.length` and how to increment the loop `i++`. This tends to be more readable and more maintainable than a while loop.

```js
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}
```

The `for` loop, is very flexible, you can increment (`i++`), decrement (`i--`) , skip by a certain amount (`i+=3`), go back a step in the loop, if needed (we saw this with disemvowel trolls).

But if your goal is to iterate over each item, you can use a `for of` loop for easier readability.

In this control panel, you name a variable and this will represent each item in the loop, one at a time, then `of`, which is a keyword, and finally the variable/array/string that you want to loop over

```js
for (let num of nums) {
  console.log(num);
}
```

We have two other ways to iterate over arrays. Both are array methods: `.forEach` and `.map`. The difference is that `.forEach` only iterates and does not return a value and `.map` iterates and returns a new array.

Let's take a look at both so we can compare and contrast the two methods.

```js
nums.forEach();
```

Here we are calling the function. It will iterate over each item, but we want it to do more. `.forEach()` is un opinionated about what you do. You can multiply by 10, you can change the numbers to strings, or anything you can think of. But how do we tell `.forEach()` what we want to do?

We will write a function inside:

```js
nums.forEach(() => {});
```

We will name the item to be iterated. Usually arrays are plural : `numbers`, `geese`, `words` and if you are iterating over one at a time the variable is named `number`, `goose`, `word`.

```js
nums.forEach((num) => {});
```

Let's multiple each number by 10

```js
nums.forEach((num) => {
  console.log(num * 10);
});
```

What if we would want to store these values in a new array.

```js
const numsMulipliedByTen = nums.forEach((num) => {
  console.log(num * 10);
});

console.log(numsMultipliedByTen);
```

We get undefined. Let's be sure to return a value:

```js
const numsMulipliedByTen = nums.forEach((num) => {
  return num * 10;
});

console.log(numsMultipliedByTen);
```

Still undefined. This is because, by definition `.forEach` does NOT return a new array. Let's use `.map` instead.

```js
const numsMulipliedByTen = nums.map((num) => {
  return num * 10;
});

console.log(numsMultipliedByTen);
```

This is a very short function. It is just one line of code. With arrow functions, if our function is just one line of code, we can skip the curly braces and the keyword `return`

```js
const numsMulipliedByTen = nums.map((num) => num * 10);

console.log(numsMultipliedByTen);
```

Sometimes, you may see a function written like so (this syntax is a bit older):

```js
nums.forEach(function (num) {
  console.log(num.toString() + 12);
});
```

Notice, we passed an `anonymous` function. It is a function without a name. We cannot reference it elsewhere. It only exists inside this `.map`. If we are only using this function once, it is fine to keep it anonymous. However, if you have a function you are using over and over, it may be better to pass it in.

```js
const numToString = (num) => num.toString();
const numsStringified = nums.map(numToString);

console.log(numsStringified);
```

What we ar working with are a higher order functions and callbacks.

- The higher order function is `.map`. It means it takes another function as an argument
- The callback is `numToString`. It is the function that goes in as an argument inside the higher order function.

MDN [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - be sure to check out the docs. Both of these methods have additional paremeters- the second will be the index position (if you need it),and the third can be an array. Although these are optional, they can come in to be very handy.

## Other Useful Array Methods

These methods can be quite useful, so they are worth practicing and studying.

- every
- filter
- find
- findIndex
- some
- sort [Note: sorting algorithms 2 goes into more detail on this method](https://github.com/joinpursuit/Pursuit-Core-Web/tree/master/data-structures-%26-algorithms/sorting-algorithms-2)
- reduce[Note bonus self-guided lesson available](https://github.com/joinpursuit/m6-array-reduce)

Rate your comfort with using higher order functions/array methods with callbacks out of 5.

Taking the time to practice using these methods will help you hone your skills and gain a better understanding of higher order functions and callbacks. So then you can focus tackling larger problems with greater ease. Gaining mastery with these will help you solve Codewars problems faster and show elegance and good understanding in code interviews and can help you write cleaner, more maintainable code.

## Find the Index in an Array

Without using the `.indexOf` array method, write your own `findIndex` function.

The function should take an array and the string or number that is to be found.

If the item is found, it should return the index position. If no matching item is found it should return -1. If there are multiple matches, only the first index positions should be returned.

For example with the following array: `findIndex(letters, 'a')` should return 0. `findIndex(letters, 2)` should return -1.

```js
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "a",
];
```

- Do we understand all the words in stating this problem?

- What are we asked to show?

- Restate the problem in your own words

- Is there enough information to find a solution?
- we don't know if it should be case sensitive or not. On an interview, you would ask this clarifying question. Let's just do case sensitive searches.

- What is our plan?
  - loop over the array
    - What kind of loop should we use?
    - Are there some loops that are better than others?
- compare whether the current item matches the one we are looking for
- if it is a match, return the index position
- if we have looped through all the items and there is no match, return `-1`

Let's think of some test cases:

- `a` - should return 0
- `f` - should return 5
- `5` - should return -1

Getting started:

```js
const findIndex = (arr, item) => {
  return [arr, item];
};

console.log(findIndex(letters, "a"));
```

After testing the above, let's write a little more code to test:

```js
const findIndex = (arr, item) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  //   return [arr, item];
};

console.log(findIndex(letters, "a"));
```

Sometimes, it is a good idea to console.log what your `if` statement will evaluate before writing it. Also, if your conditional statements don't work as expected, take the time to console log what you are evaluating.

```js
const findIndex = (arr, item) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i], arr[i] === item);
  }
  //   return [arr, item];
};

console.log(findIndex(letters, "a"));
```

That is working as expected! Let's swap the log for an `if` statement

```js
const findIndex = (arr, item) => {
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i], arr[i] === item)) {
      return i;
    }
  }
  return -1;
};

console.log(findIndex(letters, "a"));
console.log(findIndex(letters, "f"));
console.log(findIndex(letters, 5));
```

## Use .indexOf

```js
console.log(letters.indexOf("a"));
console.log(letters.indexOf("f"));
console.log(letters.indexOf(5));
```

#### Thought question

If we had called our function `indexOf` would it have caused a problem? Why or why not?

## Loop the Loop

Given a 2 dimensional array that is always made up of the same number of items in the outer and inner arrays, find the greatest sum - whether it is across, up/down.

Test case:

```js
const arr = [
  [10, 20, 30],
  [40, 50, 60],
  [70, -80, 90],
];
```

The plan

- sum the numbers of each row and compare them.
- sum the numbers of each column and compare them.
- compare all the sums and return the greatest sum

```js
const greatestSum = (arr) => {
  return arr;
};

console.log(greatestSum(arr));
```

Rows

```js
const greatestSum = (arr) => {
  for (let x = 0; x < arr.length; x++) {
    console.log(arr[x]);
  }
};

console.log(greatestSum(arr));
```

How do we access each number in a row? If we are not sure, we can do something simpler and just try to access the first number

```js
const greatestSum = (arr) => {
  for (let x = 0; x < arr.length; x++) {
    console.log(arr[x][0]);
  }
};
```

To increment the second number, we need to write a second loop

```js
const greatestSum = (arr) => {
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr.length; y++) {
      console.log(arr[x][y]);
    }
  }
};
```

We are going to add each row and store each total in an array.

Then we are going to find the maximum value

The first row should be 10 + 20 + 30 = 60
The second row should be 40 + 50 + 60 = 150
The third row should be 70 + -80 + 90 = 80

```js
const greatestSum = (arr) => {
  const sums = [];
  for (let x = 0; x < arr.length; x++) {
    let sumR = 0;
    for (let y = 0; y < arr.length; y++) {
      sumR += arr[x][y];
    }
    sums.push(sumR);
  }
  return sums;
};
```

Now, we need to sum the columns

The first column should be 10 + 40 + 70 = 120
The second column should be 20 + 50 + -80 = -10
The third column should be 30 + 60 + 90 = 180

Note - the third column is the greatest sum. By having a small an simple test case (as opposed to an array that is 20 x 20), we are able to calculate by hand what the expected results should be.

```js
const greatestSum = (arr) => {
  const sums = [];
  for (let x = 0; x < arr.length; x++) {
    let sumR = 0;
    let sumC = 0;
    for (let y = 0; y < arr.length; y++) {
      sumR += arr[x][y];
      sumC += arr[y][x];
    }
    sums.push(sumR);
    sums.push(sumC);
  }
  return sums;
};
```

Finally, let's get the maximum value

```js
const greatestSum = (arr) => {
  const sums = [];
  for (let x = 0; x < arr.length; x++) {
    let sumR = 0;
    let sumC = 0;
    for (let y = 0; y < arr.length; y++) {
      sumR += arr[x][y];
      sumC += arr[y][x];
    }
    sums.push(sumR);
    sums.push(sumC);
  }
  return Math.max(...sums);
};
```

## Array are Passed By Reference

Arrays and objects are passed by reference. This is a handy thing to know, and may explain a reason for certain bugs in your code when working with arrays. It will also become more relevant when we move into the topics of other data structures.

[Arrays are passed by reference](./arrays-passed-by-reference.md)

## Further Reading

[Pursuit Reference Types](https://github.com/joinpursuit/8-0-technical-curriculum/tree/main/01-fundamentals/reference-types)

Eloquent JavaScript

[Chapter 4: Data Structures: Objects and Arrays](https://eloquentjavascript.net/04_data.html)

## Reduce 

[Self-guided lesson and lab](https://github.com/joinpursuit/m6-array-reduce)
