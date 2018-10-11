# Array Methods

## Goals 
* Understand how to use array methods.
  * forEach
  * map
  * filter
  * reduce
  * every

## Lesson

# ForEach, Map, Filter, Every, Reduce

### Working with Arrays

The Array is JavaScript's only collection type. Arrays are everywhere and we use them often. Luckily for us, JS already has some built-in array methods like, `map`, `filter`, `every` and `reduce`. In this lesson we are going to learn how to use these methods.

In this lesson we will be transforming array into new arrays. We will first do so using loops and statements. Then we will implement one of the functions, and then use it to solve the same problem without loops. We will also see how to combine `filter`, `map` and `reduce` to solve more complex problems.

### Logging elements using a loop

Given an array of names, we can easily print all of its elements using a loop:

```js
let names = ["Ben", "Elle", "Matt", "Corey", "Joanne"];

for(let i = 0; i < names.length; i++) {
    console.log(names[i]);
}
```

We can also log the elements using the built-in `forEach` array method.  `forEach` takes a callback function as an argument, and calls it for each element in the array.

```js
let names = ["Ben", "Elle", "Matt", "Corey", "Joanne"];

ES5
names.forEach(function(name){
    console.log(name)
})

ES6 
names.forEach(name => {
  console.log(name)
})
```

The `forEach` method lets us specify what we want to happen to each item in the array, but hides how the array is traversed.

If we'd like to keep track of the index we can add a second argument to our forEach callback, often called `i`. 

```js

names.forEach((name, i) => {
  console.log(`My name is ${name} and I am index number ${i}`)
})

```

### Array transformation

To transform one array into another, we apply a function to each item in the array and collect the results into a new array.

Given an array of film objects below, we can transform it into an array of {id, title} pairs using `forEach`:

```js
let films = [
    {
        "id": 70111470,
        "title": "Die Hard",
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
    },
    {
        "id": 654356453,
        "title": "Bad Boys",
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0
    },
    {
        "id": 65432445,
        "title": "The Chamber",
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
    },
    {
        "id": 675465,
        "title": "Fracture",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id: 432534, time: 65876586 }]
    }
],

idAndTitlePairs = [];

films.forEach(film => {
    idAndTitlePairs.push({ id: film.id, title: film.title });
});
```

Most array transformations share two operations in common:

1. The traverse the source array.
2. Add each item's transformed value to a new array.


### Adding methods to the Array type

When we add a property or method to `Array.prototype`, we can then call this method with any array. This is the same as adding a method to the _Array class_

```js
Array.prototype.sayHello = function(){
    return "hello";
}

let arr = [1, 2, 3]
arr.sayHello()
// => "hello"
```
A more realistic example: 

```js
Array.prototype.doubler = function() {
  let output = [];
  this.forEach(num => {
    output.push(num * 2)
  })
  return output
}


let arr = [1,2 ,3]
arr.doubler() 
// => [2, 4, 6]

```

The above is **not**  something we would usually want to do. Extending the basic functionalities of a JavaScript type can lead to unexpected bugs and errors in our code. Even more so when we are working with other programmers, who may not know what functionalities we have added. In todays exercises, we will be re-implementing methods that already exist in javascript arrays.

The **this** in the above function refers to the array that the method will be called upon. That means we can index into  **this** if desired. Let pretend we wanted an array method that returned only the odd values. We could add this method to the Array.prototype like this: 

```js
Array.prototype.odds = function() {
  let output = [];
  this.forEach(num => {
   if(num % 2 !== 0) {  
    output.push(num)
   }
  })
  return output
}


let arr = [1,2 ,3]
arr.odds() 
// => [1, 3]

// OR

Array.prototype.odds = function() {
  let output = [];
  for(let i = 0; i < this.length; i++) {
    if(this[i] % 2 !== 0) {
      output.push(this[i]);
    }
  }
  return output;
}


let arr = [1,2 ,3];
arr.odds();

```

## Map

`Map` takes a transformation function (callback) as an argument, applies it to each element in the source array, and returns the new transformed array.


### Using `map()`

We can now repeat the exercise of collecting {id, title} pairs for each film in the `films` array, but this time we will use the `map` function.

```js
let idAndTitlePairs = films.map(film => {
    return { id: film.id, title: film.title };
};
```

Let's look at another example. Let's say I want to double the values of my array. 

```js
let arr = [1, 2, 3];
arr.map(el => {
 return el * 2;
});


```

### Filtering Arrays

Like transformation, filtering an array is a very common operation. To filter an array we apply a test to each item in the array, and collect the items that _pass_ (comes up as truthy) the test into a new array.

#### Filtering using `forEach`

Let's start by using `forEach()` to loop through the films in the `films` array and, if a `film` has a rating of `5.0`, add it to the `bestFilms` array.

```js
let bestFilms = [];

films.forEach(film => {
    if (film.rating === 5.0) {
        bestFilms.push(film);
    }
})
```

Like `map`, every `filter` operation shares some things in common:

1. Traverses the array.
2. Returns a new array.

#### Filtering using the `filter` method

Like `map`, `filter` also takes in a callback function. Each item in the array will be passed into the callback and tested against a condition. It will then return a new array of the elements that passed the conditional. Let's use filter to get an array of only the odd numbers. 

```js
 let arr = [1, 2, 3, 4, 5]
 arr.filter(el => {
  return el % 2 !== 1
 })
 
 // => [2, 4]

```


### Chaining Method Calls

Since both `filter` and `map` return an array, we can chain these two methods. We can do this to collect the ids of videos that have a rating of 5.0.

```js
let bestFilmIds = films
    .filter(film => {
        return film.rating === 5.0;
    })
    .map(film => {
        return film.id;
    });
```

Let's look at another example. We want only the odds in an array and then we want those values double. 

```js
let arr = [1, 2, 3, 4, 5];
arr.filter(el => el % 2).map(el => el * 2);
// => [ 2, 6, 10 ];
```

## Every

`every` is another JS array method that checks to see if every single element in the array meets a certain condition. Like `forEach`, `map`, and `filter` it also takes in a callback function. Let's check to see if all the values in an array or odd.

```js
let arr = [1, 3, 5];
arr.every( el => {
   return el % 2 !== 0
})
// => true 
```

### Reducing Arrays

Let's say we need to find the largest integer in an array. We can't use `filter`, because it only examines one element item at a time. To find the largest integer we need to compare elements in the array to each other.

One approach is to select an item in the array as the assumed largest number (perhaps the first item), and then compare that value to every other item in the array. Each time we come across a number that is larger than our assumed largest number, we can replace it with the larger value, and continue the process until the entire array is traversed.

#### Using `forEach` to find the largest box art

In this example we use `forEach` to find the largest box art. Each time we compare the current box art with the maximum we've found so far. If the boxart is smaller than the maximum size, we discard it. If it's larger, we save it and set its size as our new maximum. Finally we're left with the largest boxart.

```js
let boxarts = [
        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
        { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
    ];

let currentSize;
let maxSize = -1;
let largestBoxart;

boxarts.forEach(boxart => {
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
let ratings = [2,3,1,4,5];

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

Let's use `reduce` to find the sum of all the numbers in an array. 

```js
 let arr = [1, 2, 3, 4]
 let sum = arr.reduce((acc, el) => {
  return acc + el
})

// => 10

```

If we wanted to find the sum of all the number in an array and have 5 added to that number, we could do this by passing in a second argument to the reduce function. 

```js
 let arr = [1, 2, 3, 4]
 let sum = arr.reduce((acc, el) => {
  return acc + el
}, 5)

// => 15

```
Let's take a look at what's going on in the examples above. 
We've started off by declaring a variable called `arr`. We will call `reduce` on this array. Reduce takes in two arguments: a callback function and an optional initial value. In our first and second example our callback function is the anonymous adding function. That function is taking in two arguments (`acc`, `el`). This is the same as if we'd declared it with a name like: 
```js 
const adder = (num1, num2) => {
 return num1 + num2
}
```
This is essentially the function that we're passing as the first argument into  `reduce`. 

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

### Map -> Reduce

We can also combine map and reduce. In this case map will be first (returning an array), and reduce will be second (returning a single value). For example, we may want to sum the values of the all numbers squared.

```js
let sumOfSquares = numbers
    .map(number => {
        return number * number;
    })
    .reduce((total, number) => {
        return total + number;
    }, 0);
```



## Resources

* [Functional Programming in JavaScript](http://reactivex.io/learnrx/)
* [Eloquent Javascript - Higher Order Functions](http://eloquentjavascript.net/05_higher_order.html)
