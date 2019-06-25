# Functions & Scope

## Standards
LF.5, LF.5.a, LF.5.b

## Objectives
* Know how to declare and write a function
* Know some of the key differences between ES5 and ES6 syntax
* Have an understanding of scope.

## Keywords

* Function Definition
* Function Call
* *Function Expression* syntax
* *Function Declaration* syntax
* Global variable scope
* Local variable scope (function scope)

## Lesson

We use functions to store code that we want to re-use.
Let's pretend we have two arrays: array1 = [1, 2, 3, 4, 5] and array2 = [11, 12, 13, 14, 15]. In previous lessons if we wanted to
log to the console all the elements in the first array and then all the elements in the second array
we would have to write code that looked something like:
```js
let array1 = [1, 2, 3, 4, 5]

for(let i = 0; i < array1.length; i++) {
  console.log(array1[i]
}

let array2 = [11, 12, 13, 14, 15]

for(let i = 0; i < array1.length; i++) {
  console.log(array1[i]
}

```

This doesn't look too bad, but what if we were given another 5 arrays, 10 arrays?
Pretty soon we would be writing a lot of the same loop.
What about if we didn't know what was going to be in the array? How would we write that?
In programming we like to keep out code **DRY**. This stands for Don't Repeat Yourself.
So instead of writing a bunch of loops each time, we can write one function that will loop through any array. That way,
whenever we are given a new array that we want to log it elements to the console, we can just call our function
instead of re-writing the same loop.

![functions](./assets/function_composition.png)

 * The above syntax is called **function expression**.
The word `function` tells JS that we are **declaring** a function. Just like const lets JS know we are about to declare a variable.

 * squareNumber is the **name** of the function. Not all functions need a name. Some functions are anonymous and don't have a name. But for now, we will be dealing with functions that do have name.

* Inside the parenthesis are **parameters** which are used to define a function. When we call a function we replace parameters with **arguments**. Arguments are the real values that are passed into a function. Often the words parameters, and arguments are used interchangeably. Also, some functions don't require any arguments. For example:

```js
  function sayHello() {
    return "Hello"
  }

  console.log(sayHello())

```

* The opening curly brace, { , indicates the start of the function. The closing curly brace, } , indicates the end of the function.

* Between the braces, is the code that makes up the function. **return** is the result (what we get back) after we've called the function. If there is no __return__ statement, the function will return `undefined`. Once something is __returned__ from a function, the function has ended. This means, that even if there is code after the return statement, it will not be reached.
The code `sayHello()` will then be replaced by the value that was returned by the function. As far as `console.log` is concerned, what is being passed to it is the value `"Hello"`. It knows nothing about `sayHello`.


There are a couple different ways to __declare__ a function. The first way is to simple write `function` like this:

```js
function printArray(arr) {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```
This is a function called printArray written in ES5 syntax. It takes in one __argument__ (the array), and then loops through it.
Now if we wanted to print our arrays as before we could call the function and pass it the array like this:

``` js
  let array1 = [1, 2, 3, 4, 5];
  let array2 = [11, 12, 13, 14, 15];

  printArray(array1);
  printArray(array2);
```
See how much prettier that is?

To write that same function in ES6 is just a little bit different. First we declare the function like a variable that won't change using the const declaration.
We then state the name of our function and assign it to our arguments, a fat-arrow, and then curly braces. Like this:

```js
  const printArray = (arr) => {
    for(let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
  }

  // HEY HEY HEY it's Fat Arrow!

```
_NOTE:_ If you wanted to return everything inside of your function, you could do this by using parenthesis instead of curly brackets. This works only with fat arrow functions and is called an implicit return. You probably won't use this much for awhile, but it is worth remembering. An example of this would be this function.

```js
const double = (num) => (
    num + num
)

double(6) // => 12
```
See that I don't have to use `return`? If I had written any other code above what I wanted returned, the code would have errored out. For now, write your functions with curly brackets and explicit returns.

Both printArray functions will be treated the same.

## Invoking a Function
We invoke a function by saying the function's name and passing in any necessary arguments. If we wanted to call our sayHello function we would do it as so: `sayHello()`. Because sayHello takes in zero arguments we wrote nothing in between the parenthesis. If we wanted to call printArray we would do it as so: `printArray([1, 2, 3])`.

If we changed our sayHello to accept an argument it would look like this:

```js
   function sayHello(name) {
    return "Hello " + name
  }

  sayHello()
```
<details>
  <summary>
What do you think would happen if we didn't pass in any arguments into sayHello?
  </summary>
  `"Hello undefined"`
</details>



Let's write a function that doubles a number.

```js
function doubleNumber(num) {
  return num + num;
}

doubleNumber(5) // => 10

const doubleNumberTwo = (num) => {
  return num + num;
}

doubleNumberTwo(12) // => 24
```



### Functions as Values

You may have noticed above that we're using const to define some of the functions. This is because in JS a function is a value, just like numbers and strings, and like other values, it can be assigned to a variable and invoked in the same way we've seen previously:

```js
const double = function(num) { return num + num }

double(5)
// => 10
```


As you may have realized, `console.log`, is also a function - one that is provided for us. The dot in it's name is meaningful, and will be discussed at a later point. `console.log` differs from our `double` function in two other ways:

1. It does not produce an output (ie it returns undefined).
2. It leads to something else happening - the value passed to it gets logged to the screen.



Again, in JavaScript, a function that does not have a return statement will return the value `undefined`.

### Single Responsibility Principle
It is BEST practice to write your functions to only do ONE thing. With our double function, the only thing it did was double a number. All of our functions have one job to do. If you find yourself needing your function to do multiple things, you should consider breaking it up into multiple functions. For now, you may not notice the importance because we're still writing very simple functions, but if we were making something a bit more complex like a game you would quickly see the benefit. There could be a takeTurn, isValidMove, isGameOver, switchPlayers, declareWinner, displayGame, movePlayer, etc... We'd want to break everything up to keep the logic and moving parts clear and simple.

### Side-effects

The second aspect of `console.log` - a value being logged to the screen, is not something we can replicate. However, this is part of a larger aspect of functions called a *side effect*. A *side effect* is anything that happens inside a function which results in a change to the outside world. One side effect that we *can* create is changing the value of a variable that was defined outside the function.

```js
let myNumber = 2
const sideEffect = function(){
  myNumber += 1
}

sideEffect()
console.log(myNumber)
```

The function `sideEffect` above takes no arguments, and has a single side-effect, adding `1` to the value of the variable `myNumber`.

> Ex. Call `sideEffect` multiple times, and then log myNumber. What is the result?
> Ex. Put a call to the `sideEffects` function as an argument to `console.log`: ```js console.log(sideEffects())```. What is logged? Why?
> Ex. Writing a function that produces side effects *and* has a return value.



### Function Hoisting

The only substantial difference is that function declarations are __hoisted__ or lifted to the top of the program. This means that you can call a function before it is defined:

```js
console.log(sayHelloDec) // logs: [Function: sayHelloDec]
sayHelloDec(); // logs "hello"

function sayHelloDec() {
  console.log('hello');
}
```

A function defined with  expression syntax or ES6 arrow function will be assigned to a variable, and any variable used before it is defined will have the value `undefined`

```js
console.log(sayHelloExp) // logs: undefined
console.log(sayHelloExpTwo) // logs: undefined
sayHelloExp(); // TypeError: sayHelloExp is not a function
sayHelloExpTwo(); // TypeError: sayHelloExpTwo is not a function

const sayHelloExp = function() {
  console.log('hello');
}

const sayHelloExpTwo = () => {
  console.log('hello');
}
```

### Functions as Mini-Programs

A function is like a mini-program inside our main program. Whenever the code inside it is done running, we return to the line from which we called the function. A variable defined inside a function will be forgotten when the function is done running. Every time we call the function `logPets` below, the variables will be created anew.

```js
// This function will print 'cat' and then print 'dog'
function logPets(){
  let pet = 'cat'
  console.log(pet)
  pet = 'dog'
  console.log(pet)
}
// logPets will do the same thing every time we call it
logPets() // => 'cat'
         //     'dog'
logPets() // => 'cat'
         //     'dog'

```

### Variable Scope

The variables defined inside a function simply do not exist outside of it.

```js
function hello(){
  let greeting = 'hello'
  console.log(greeting)
}

console.log(greeting) // ReferenceError: greeting is not defined
```

Variables declared outside a function are called `global` and they can be accessed and modified from any function.

```js
let greeting = 'hi'

// This function changes the global variable `greeting`
function hello(){
  greeting = 'hello'
  console.log(greeting)
}
hello()

console.log(greeting) // logs: 'hello'
```

A commonly used term for this is **scope**: a variable inside a function has _local scope_, and a variable not inside any function has _global scope_. So a variable with local scope is only available inside that function. A variable with global scope is available inside or outside the function. If we create a variable inside a function with the same name as a global variable - the function will only be aware of the local one. This, however, will not change the value of the global variable.

```js
let greeting = 'hello'

function hello(){
  let greeting = 'what\'s up?'
  console.log(greeting) // logs: 'what's up?'
}


console.log(greeting) // logs: 'hello'
```

Luckily with ES6 we don't have to worry too much about hoisting. const and let are both block scoped. This means that if we declared the same named variable inside the block and outside the block, they will be treated as two separate variables.
```js
let i = 0;
if (true) {
  let i = 1;
}
console.log(i); // 0
```

**History Note:** Before ES6 we only used _var_ to declare variables. Unlike let and const, var is only function scoped. So a redeclaration inside a block could result in undesirable side-effects.
```js
var i = 0
if (true) {
  var i = 1;
}
console.log(i); // 1

```


To read MORE about hoisting and differences between var, let and const, read [this](https://hackernoon.com/js-var-let-or-const-67e51dbb716f)

## Resources

* [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
* [Eloquent Javascript - Functions](http://eloquentjavascript.net/03_functions.html)
