# Callbacks

## Goals
* Understand what callback functions are and why we use them
* Write your own callback function
* Begin to understand asynchronous programming

## Terms

* Callback
* Functions as values
* Functions as input to other functions
* Asynchronous programming

## Lesson

### Syntax for Declaring Functions

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
And now we can invoke it like we would any function: `add(1,2) //=> 3`. Really all functions are variables, it's just more clearly shown in this example, so we can treat `add` like we would any variable, but with slightly different results:
```js
console.log(add)
// calling console.log on add will return:
//  ƒ (num1, num2) {
//    return num1 + num2;
//  }
// undefined
```

Just like if we'd passed in a variable that held a string, console.log is merely printing to the screen what the variable holds. In this case the variable is holding a function, so that's what is printed.

### Callback Functions

As demonstrated above, a variable can hold a function just like any other data type (e.g. array, integer, string).

Similarly, as is the case with other variables, we can pass a functions as an argument to other functions. A function that is passed as an argument to another function is called a **callback function**, or just **callback**.

Let's create a simple function `caller` that calls whatever function it is given as an argument:

```js
function caller(callback) {
  return callback()
}

function sayHello() {
  return "Hello!"
}

function sayGoodbye() {
  return "Goodbye!"
}

caller(sayHello)
// => "Hello!"
caller(sayGoodbye)
// => "Goodbye!"
```

We invoke `caller` with `sayHello` passed in as a variable. `sayHello` without the parentheses acts like a variable while `sayHello()` would invoke the function and return `Hello!`. The same is true when we invoke `caller` with `sayGoodbye`. If you tried to pass `caller` something that was _not_ a function, it would return an error.

Now for a more advanced callback that accepts two numbers and a function:
```js
function caller(arg1, arg2, callback){
  callback(arg1, arg2)
}

function add(num1, num2){
  return num1 + num2;
}

caller(2, 4, add)
// => 6
```

The function `caller` takes two arguments and a function (the callback), and invokes the callback with the provided arguments.
Basically when we invoke `caller` with 2, 4, and add it becomes:
```js
caller(2, 4, add) {
  add(2, 4){
    return 2 + 4;
  }
}
```

`arg1` is replaced with 2 and `arg2` is replaced with 4. `callback` is replaced with our `add` function, which gets invoked _inside_ our `caller` function. When `add` gets invoked by `caller`, `num1` is replaced with 2 and `num2` is replaced with 4 in the `add` function. Then we have 2 + 4 returned to us by the `add` function. This is why 6 is the result of invoking `caller(2, 4, add)`.

Let's try this again but with a function we'll call `product` that will instead return the _product_ of the two arguments when multiplied together:
```js
function caller(arg1, arg2, callback){
  callback(arg1, arg2)
}

function product(num1, num2){
  return num1 * num2;
}

caller(2, 4, product)
// => 8
```

Those examples are nice but let's try something more useful. The function `forEachElem` below takes an array and a callback function as arguments, and call the callback function for each element of the array.

```js
function forEachElem(arr, callback) {
  // iterate through the array
  for (let i = 0; i < arr.length; i++) {
    // invoke our callback on each item of the array
    callback(arr[i]);
  }
}

function logDouble(num) {
  console.log(num * 2);
}

function logTriple(num) {
  console.log(num * 3);
}

let arr = [1, 2, 3];

forEachElem(arr, logDouble);
// will log: 2, 4, 6

forEachElem(arr, logTriple);
// will log: 3, 6, 9
```

We pass to the `forEachElem` function:
1. an array of numbers
2. a function `logDouble` that takes a number as an argument and logs its value times two or `logTriple` that takes a number as an argument and logs its value times three.

The `forEachElem` functions invokes the callback (in this case, `logDouble` or `logTriple`) on each element of the array. This displays the doubled or tripled value of each element.

### Anonymous Callbacks

When a function is needed only as a callback, it is common to just define it on the spot and not give it a name (i.e. create it as an **anonymous function**).

```js
forEachElem(arr, function(num) {
  console.log(num * 2);
})
```

The code above works the same as the earlier code. The function definition looks the same as when we define a function using the `const` keyword. The only difference is instead of storing the function into a variable, we are immediately passing it as an argument. **Remember, a function in JavaScript is a value, just like a string or an integer.**


### setInterval

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

Or with an anonymous function:

```js
setInterval(function(){
  console.log('hello')
}, 1000)
```

