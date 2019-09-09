# Callbacks

## Standards
FSW.1.b

## Objectives
* Understand what callback functions are and why we use them
* Write functions that use callbacks

## Keywords

* Callback
* Functions as values
* Functions as input to other functions

## Lesson

## Function Syntax Review

We've learned that many different types of data that can be stored in variables -- for example, numbers, strings, arrays and objects.

In JavaScript, functions can be stored in variables just like other data types.

So far, we have declared functions using this syntax:

```js
// ES5
function add(num1, num2){
  return num1 + num2;
}

//ES6
const add = (num1, num2) => {
  return num1 + num2
}
```

We've also seen functions declared without giving them a name (an _anonymous function_):

```js
function(num1, num2) {
  return num1 + num2;
}
```

This isn't very useful if we'd like to invoke the function later on, so we could also store this function in a variable:

```js
const add = function(num1, num2) {
  return num1 + num2;
}
```
And now we can invoke it like we would any function: `add(1,2) //=> 3`.

In JavaScript, a function is actually a type of object.  Among other things, this means that we can use functions in similar ways to how we can use objects.  For example, we can log functions that we've created.


What is the difference between the two code blocks below?

```js
console.log(add(1,2))
```

```js
console.log(add)
```


<details>
<summary>Solution</summary>

The first line will log `3` to the console.  The second line will log something like `[Function: add]` to the console.  We aren't calling the function, so we are logging the function itself.

</details>


## Callback Functions - Basics

We see above that we can log functions that we've created.  We can also pass functions as arguments to other functions. A function that is passed as an argument to another function is called a **callback function**, or a **callback**.

Let's create a simple function `caller` that calls whatever function it is given as an argument:

```js
function caller(callback) {
  callback()
}

function sayHello() {
  console.log("Hello!")
}

function sayGoodbye() {
  console.log("Goodbye!")
}

caller(sayHello)
// "Hello!"
caller(sayGoodbye)
// "Goodbye!"
```


We invoke `caller` with `sayHello` passed in as a variable.  

What would happen if we tried to run the code below?

```js
caller(sayHello())
```

<details>
<summary>Solution</summary>

"Hello!" will be logged to the console, and an error will occur.  

`sayHello()` will log out "Hello!" to the console, then return `undefined`

We then invoke caller and pass in `undefined`.  Because `undefined` is not a function, trying to invoke it with `()` will cause an error.

</details>


## Callback Functions - Additional Instructions

While the example above is interesting, it doesn't do anything more than call a function we give it.  We can use callbacks in more powerful ways to change the behavior of functions.

### Example: Combining

A common function that we want to write is one that combines two numbers.  We've written functions that add, subtract, multiply, divide and average two numbers.  Using callbacks, we can write a single function that will be able to do all of those things.

This function will need three arguments:

1. The first number
2. The second number
3. Instructions about how to combine the two numbers

These "instructions" are the callback.

```js
function combine(arg1, arg2, combiningCallback) {
  return combiningCallback(ar1, arg2)
}

function add(num1, num2) {
  return num1 + num2;
}

combine(2, 4, add)
// => 6
```

The function `combine` takes two arguments and a function (the callback), and invokes the callback with the provided arguments.

Now that we have our `combine` method, we can pass it different callbacks to combine the two numbers differently


```js
function multiply(num1, num2) {
  return num1 * num2
}

combine(2, 4, multiply)

// => 8
```

### Example: forEach

Callbacks give additional instructions about how a function should execute.  Let's look at another example.  Here, we will write a function which does something to every element in an array.  The "something" will be defined by the callback.

```js
function forEachElem(arr, callback) {
  // iterate through the array
  for (let i = 0; i < arr.length; i++) {
    // invoke our callback on each item of the array
    callback(arr[i]);
  }
}

function logValue(num) {
  console.log(num)
}

const logTriple = function(num) {
  console.log(num * 3);
}

function logDollarFormattedNum(num) {
  console.log("$" + num)
}

let arr = [1, 2, 3];

forEachElem(arr, logValue);
// will log: 1, 2, 3

forEachElem(arr, logTriple);
// will log: 3, 6, 9

forEachElem(arr, logDollarFormattedNum)
// will log: $1, $2, $3
```

### Example: setInterval

Let's examine a built-in function `setInterval`, which is available on the browser window. This function takes as arguments:

1. a callback
2. a time interval (in milliseconds)

`setInterval` will call the callback every `n` milliseconds, as defined by the second argument. To see it in action, let's log `hello` every second:

```js
function sayHello() {
  console.log('hello')
}

setInterval(sayHello, 1000)
```

## Anonymous Callback Functions

In all the above examples, we created functions for each of the callbacks, but only called them once.

When a function is needed only as a callback, it is common to define it on the spot and not give it a name.  These are called **anonymous functions**.  Let's use an anonymous function instead of `sayHello`:

```js
function sayHello() {
  console.log('hello')
}

setInterval(sayHello, 1000)

setInterval(function(){
  console.log('hello')
}, 1000)
```

Both calls to `setInterval` above will produce the same result.  


## ES6 Syntax for Callbacks

The new ES6 syntax makes writing callbacks more concise.  All of the following examples will produce the same result:

```js
forEachElem(arr, function(num) {
  console.log(num);
})

forEachElem([1,2,3,4], (num) => {
  console.log(num)
})

forEachElem([1,2,3,4], (num) => { console.log(num) })
```


## Map

So far, our callbacks have only been logging information to the console.  We can also write functions where the console changes the return value.

Let's write a function that takes an array and a callback, and returns an array with each value changed by the callback

```
// Input: [1,2,3,4], (num) => { return num * 3 }

// Output: [3,6,9,12]
```

```js
function mapValues(arr, callback) {
  let mappedArr = []
  for (let element of arr) {
    mappedArr.push(callback(element))
  }
  return mappedArr
}
```

### Exercise:

Given the array of users below, use `mapValues` to return an array of only their email addresses.

```js
let users = [
  {
    name: "Oziel",
    email: "Oziel@pursuit.org",
    userId: 24601
  },
  {
    name: "Senka",
    email: "Senka@pursuit.org",
    userId: 38217
  },
  {
    name: "Erika",
    email: "Erika@pursuit.org",
    userId: 18104
  },
  {
    name: "Evan",
    email: "Evan@pursuit.org",
    userId: 78293
  }
]
```


<details>
<summary>Solution</summary>

```js
const names = mapValues(users, user => user.name)
```

</details>
