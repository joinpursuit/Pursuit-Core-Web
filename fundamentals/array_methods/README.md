[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Array Methods

## Standards

FSW.1.a, FSW.1.b

## Learning Objectives

- Understand how to use common array methods.
  - forEach
  - map
  - filter
  - every
  - sort
  - reduce
- Gain familiarity with callbacks.

## Prerequisites 
 * Loops 
 * Arrays 

___

## Background

Functions can take in many different types of data as an argument, including the type 'function'. That's right, in JavaScript a function can actually be passed another function as an argument. This other function that is passed in as the argument is often referred to as a **_callback_**.
Using a function that takes in a callback and a an array is something that is needed very frequently. The array is the thing you want to change or use, and the callback is **how** you want it to be changed or used.Because it's so common, JavaScript has some built in Array methods that let us use callbacks directly. We'll review some of the most common of these methods today.

##  ForEach

ForEach is a method on Arrays that iterates over the array and applies a callback to each element.

```js
let names = ["Ben", "Elle", "Matt", "Corey", "Joanne"];

ES5;
names.forEach(function (name) {
  console.log(name);
});

ES6;
names.forEach((name) => {
  console.log(name);
});
```
ForEach can also take in named functions like so: 
```js
const printName = (name) => console.log(name);

names.forEach(printName);

```

This however is slightly less common. Typically forEach is passed an anonymous function. 

Each of the above `forEach` methods will produce the same result as the code below.

```js
let names = ["Ben", "Elle", "Matt", "Corey", "Joanne"];

for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}
```

Given that these produce the same result, why would we want to use a `forEach` method?

<details><summary>Solution</summary>

- It saves time by not having to write the for loop out ourselves
- It is more _expressive_. By looking at the method name used `forEach`, anyone reading your code knows that you want to do something with each element in an array. Someone would have to read the whole for loop to make sure that you aren't only using every other element or starting at i = 4.

</details>

<p>

The callback that we pass into the `forEach` method has a first mandatory argument that represents the element in the array that we are looking at. It accepts another optional argument which tracks the `index` that we are looking at.

```js
names.forEach((name, i) => {
  console.log(`My name is ${name} and I am index number ${i}`);
});
```

**Note**: you CANNOT return out of a forEach loop and forEach will always evaluate to undefined. We use forEach for it's _side effects_ only. 

### Array transformation

To transform one array into another, we apply a function to each item in the array and collect the results into a new array.

Given an array of film objects below, we can transform it into an array of {id, title} pairs using `forEach`:

```js
let films = [
    {
      id: 70111470,
      title: "Die Hard",
      boxart: "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 4.0,
    },
    {
      id: 654356453,
      title: "Bad Boys",
      boxart: "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 5.0,
    },
    {
      id: 65432445,
      title: "The Chamber",
      boxart: "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 4.0,
      bookmark: [],
    },
    {
      id: 675465,
      title: "Fracture",
      boxart: "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 5.0,
      bookmark: [{ id: 432534, time: 65876586 }],
    },
  ],
  idAndTitlePairs = [];

films.forEach((film) => {
  idAndTitlePairs.push({ id: film.id, title: film.title });
});
```

Most array transformations share two operations in common:

1. They traverse the source array.
2. Add each item's transformed value to a new array.

## Map

`Map` takes a transformation function (callback) as an argument, applies it to each element in the source array, and returns the new transformed array.

### Using `map()`

We can now repeat the exercise of collecting {id, title} pairs for each film in the `films` array, but this time we will use the `map` function.

```js
let idAndTitlePairs = films.map(film => {
    return { id: film.id, title: film.title };
    });
```

Let's look at another example. Let's say I want to double the values of my array.

```js
let arr = [1, 2, 3];

let doubled = arr.map((el) => {
  return el * 2;
});

console.log(doubled) // => [2, 4, 6]
```

Similar to forEach, map's callback will also automatically be passed a second argument of the index. 

Remember map is the array method, and the argument that map takes in is a function (callback). This is why it should have a return. The return inside of map belongs to the anonymous function. 

Just like for forEach map can also take in named functions. 

```js
    const tripleNum = (num) => num * 3; 

    let arr = [1, 2, 3];
    let tripledArray = arr.map(tripleNum);

```

**Note**: Calling array.map will evaluate to a new array where every element in the new array is the returned result from passing the original element into the callback function. 

Do NOT use map for side effects. 

## Filter

### Filtering Arrays

Like transformation, filtering an array is a very common operation. To filter an array we apply a test to each item in the array, and collect the items that _pass_ (comes up as truthy) the test into a new array.

#### Filtering using `forEach`

Let's start by using `forEach()` to loop through the films in the `films` array and, if a `film` has a rating of `5.0`, add it to the `bestFilms` array.

```js
let bestFilms = [];

films.forEach((film) => {
  if (film.rating === 5.0) {
    bestFilms.push(film);
  }
});
```

Like `map`, every `filter` operation shares some things in common:

1. Traverses the array.
2. Returns a new array.

#### Filtering using the `filter` method

Like `map`, `filter` also takes in a callback function. Each item in the array will be passed into the callback and tested against a condition. It will then return a new array of the elements that passed the conditional. Let's use filter to get an array of only the even numbers.

```js
let arr = [1, 2, 3, 4, 5];
arr.filter((el) => {
  return el % 2 === 0;
});

// => [2, 4]
```

**Note**: Just like with map and forEach, the callback that filter takes in will also be automatically passed an optional index argument.

The filter method's callback also needs to return something, otherwise all values would be falsy by default (because it'd return undefined) and it would evaluate to an empty array. 

Remember: filter returns a new array but the elements in the array will only be elements that had a truthy return from it's callback. 

Filter should not be used for side effects. 

#### Chaining Method Calls

Since both `filter` and `map` return an array, we can chain these two methods. We can do this to collect the ids of videos that have a rating of 5.0.

```js
let bestFilmIds = films
  .filter((film) => {
    return film.rating === 5.0;
  })
  .map((film) => {
    return film.id;
  });
```

Let's look at another example. We want only the odds in an array and then we want those values double.

```js
let arr = [1, 2, 3, 4, 5];
let oddsDoubled = arr.filter((el) => el % 2 === 1).map((el) => el * 2);

console.log(oddsDoubled)// => [ 2, 6, 10 ];
```

## Every

`every` is another JS array method that checks to see if every single element in the array meets a certain condition. Like `forEach`, `map`, and `filter` it also takes in a callback function. Let's check to see if all the values in an array or odd.

```js
let arr = [1, 3, 5];
console.log(
    arr.every((el) => {
        return el % 2 === 1;
    });
)
// => true
```
Every evaluates to a Boolean. 

**Note**: Just like with map, forEach, and filter, the callback that `every` takes in will also be automatically passed an optional index argument.

The `every` method's callback also needs to return something, otherwise all values would be falsy by default (because it'd return undefined) and it would evaluate to false. 

## Sort 

Sorting an array can sometimes be an extremely helpful tool. There are a lot of great sorting algorithms out there but today we're just going to use the built in method `sort`. The time complexity of sorting is O(n * log(n)) n referring to the length of the array. Don't worry if that doesn't mean anything to you yet, but it is a good factoid to remember. 

Sort does NOT return a new array. It returns the ORIGINAL array now sorted. In other words it _mutates_ the array. This is important to remember because sort will actually change your data. You don't need to capture its return value in a variable because the original variable that points to the array will be updated. This is different than the other methods mentioned earlier in this lesson. 

By default, `sort` will sort alphabetically. 
Example: 
```js
let alph = ["c", "d", "b", "a"];
alph.sort();
console.log(alph) //=> [ 'a', 'b', 'c', 'd' ]
```
This is a good "gotchya!" for when we want to sort by other properties. Observe: 

```js
let nums = [11, 1, 2];
nums.sort();
console.log(nums) // => [ 1, 11, 2 ]
```
Notice the problem? The default sort puts 11 in front of 2. Because alphabetically speaking 11 is in front of 2. 

The takeaway: When we want to sort by something non alphabetical we need to pass sort a callback compare function. That compareFunction requires two arguments and will allow sort return an array based on the return value of those compared elements.

Let's say the compareFunction takes arguments a and b. 
If the compareFunction returns less than 0, sort puts a first. 
If the compareFunction returns greater than 0, sort puts b first. 
If the compareFunction returns 0, neither elements position is changed. 

Using the logic above we can sort numbers like so: 
```js
let nums = [11, 1, 2];
nums.sort((a, b) => {
    return a - b;
});
console.log(nums) // => [ 1, 2, 11 ]
```
For further instruction on [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## Summary 
We can use array methods to help make our code cleaner and more descriptive. 

Use `forEach` when you want to iterate through an array but won't need to break or return out of the loop. `forEach` will always evaluate to `undefined`. 

Use `map` to get a new array with each element having been acted on by the callback. Array will always be same length but element values will most likely change. 

Use `filter` to get a new array of original values but with a different length. The only elements that remain will be the ones where the callback returned truthy. 

Use `every` to return a boolean that checks if every element passes some rule. 

Use `sort` to sort an array. Pass a callback that compares two elements and returns either less than 0,0, or greater than 0 to determine the order. `sort` returns the original array after it's been mutated. 

## Resources

- [Functional Programming in JavaScript](http://reactivex.io/learnrx/)
- [Eloquent Javascript - Higher Order Functions](http://eloquentjavascript.net/05_higher_order.html)

## Extra content

## Reduce

Reduce is the most powerful of all the array methods and can be made to anything that the other array methods do. However, it is also the most complex / confusing. 

Things to note: 
* Reduce takes in a callback function and an optional initialValue. 
* The callback function takes in 2 main arguments and one optional argument. The 2 main arguments are the accumulator and the current element. The optional argument is the index. 

```js 
arr.reduce((accumulator, element, [index]) => {}, [initialValue])

// the arguments in [brackets] are optional. 
```

* Reduce will evaluate to whatever the accumulator is after the last iteration. 
* For the first iteration the accumulator will either be the value of initialValue and element will be the first element. OR if no initialValue is provided, the accumulator will start as the first element in the array, and the element will start as the second element in the array. 

* With each additional iteration the accumulator will be what ever was returned from the previous iteration. 

That's everything you really need to know about reduce to be successful with it. Let's take a look at some simple examples. 

Summing all the numbers in an array:

```js
let arr = [1, 2, 3, 4];
let sum = arr.reduce((acc, el) => {
  return acc + el;
});

console.log(sum) // => 10
```
In this example we did not pass reduce the optional initialValue argument. This means that acc started as 1 and el started as 2. 
```js
// acc = 1    el = 2    return 1 + 2 -> 3 our next acc
// acc = 3    el = 3    return 3 + 3 -> 6
// acc = 6    el = 4    return 8 + 3 -> 10
```


If we wanted to find the sum of all the number in an array and have 5 added to that number, we could do this by passing in the second argument (initialValue) to the reduce function.

```js
let arr = [1, 2, 3, 4];
let sum = arr.reduce((acc, el) => {
  return acc + el;
}, 5);

console.log(sum)// => 15
```

Let's take a look at what's going on in the examples above.
We've started off by declaring a variable called `arr`. We will call `reduce` on this array. Reduce takes in two arguments: a callback function and an optional initial value. In our first and second example our callback function is the anonymous adding function. That function is taking in two arguments (`acc`, `el`). This is the same as if we'd declared it with a name like:

```js
const adder = (num1, num2) => {
  return num1 + num2;
};
```

This is essentially the function that we're passing as the first argument into `reduce`.

The second argument that we're passing into `reduce` is optional. This argument will become the staring point for the accumulator. In the first example we've decided NOT to pass in a second argument. Because of this, the accumulator is defaulted to the first element in our array (1).

Reduce will then iterate through the array and continuously reassign the value of the accumulator to the result of our callback being called with the accumulator and the current element as arguments.

In our first example the iteration will begin on the second element (2) of the array because the first element has already been used as the accumulator.
`acc = adder(1, 2)`
The accumulator will now have the value of 3.
We then called the callback function (`adder`) with the next element (3) in the array and reassign the accumlator's value to that output.
`acc = adder(3, 3)`
The accumulator will now have the value of 6.
We then called the callback function (`adder`) with the next element (4) in the array and reassign the accumlator's value to that output.
`acc = adder(6, 4)`

Because we have finished iterating over our array, the accumulator (10) is returned.

Our second example works in the same way as our first but instead we are passing in a 5 as the second argument in `reduce`. This will result in the accumulator starting off with a value of 5. Because we've passed in a starting accumulator value, we will also iterate the array starting with first element.

```js
// acc = 5    currEl = 1    return 5 + 1 -> 6
// acc = 6    currEl = 2    return 6 + 2 -> 8
// acc = 8    currEl = 3    return 8 + 3 -> 11
// acc = 11   currEl = 4    return 11 + 4 -> 15
```


Use cases: 

Let's say we need to find the largest integer in an array. We can't use `filter`, because it only examines one element item at a time. To find the largest integer we need to compare elements in the array to each other.

One approach is to select an item in the array as the assumed largest number (perhaps the first item), and then compare that value to every other item in the array. Each time we come across a number that is larger than our assumed largest number, we can replace it with the larger value, and continue the process until the entire array is traversed.

#### Using `forEach` to find the largest box art

In this example we use `forEach` to find the largest box art. Each time we compare the current box art with the maximum we've found so far. If the boxart is smaller than the maximum size, we discard it. If it's larger, we save it and set its size as our new maximum. Finally we're left with the largest boxart.

```js
let boxarts = [
  {
    width: 200,
    height: 200,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
  },
  {
    width: 150,
    height: 200,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg",
  },
  {
    width: 300,
    height: 200,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
  },
  {
    width: 425,
    height: 150,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg",
  },
];

let currentSize;
let maxSize = -1;
let largestBoxart;

boxarts.forEach((boxart) => {
  currentSize = boxart.width * boxart.height;
  if (currentSize > maxSize) {
    largestBoxart = boxart;
    maxSize = currentSize;
  }
});

return largestBoxart;
```

Let's use the reduce function to find the largest value in an array of numbers.

```js
let ratings = [2, 3, 1, 4, 5];

let largest = ratings.reduce((acc, currentEl) => {
  if (acc > currentEl) {
    return acc;
  } else {
    return currentEl;
  }
});
```

Now let's try using `reduce()` to find the largest box art in the array.

```js
let boxarts = [
        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
        { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
    ];

let largestBoxart = boxarts.reduce((acc,curr) => {
        if (acc.width * acc.height > curr.width * curr.height) {
            return acc;
        } else {
            return curr;
        })
```

### Map -> Reduce

We can also combine map and reduce. In this case map will be first (returning an array), and reduce will be second (returning a single value). For example, we may want to sum the values of the all numbers squared.

```js
let numbers = [1, 2, 3, 4, 5]
let sumOfSquares = numbers
  .map((number) => {
    return number * number;
  })
  .reduce((total, number) => {
    return total + number;
  }, 0);

console.log(sumOfSquares) //=> 55
```
Of course this could also be written as a single reduce method like so: 
```js
let numbers = [1, 2, 3, 4, 5]
let sumOfSquares = numbers
  .reduce((total, number) => {
    return total + (number * number);
  }, 0);

console.log(sumOfSquares) // => 55
```