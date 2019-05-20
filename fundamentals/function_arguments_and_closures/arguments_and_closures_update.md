# Function Arguments and Closures

## Standards
LF.5, LF.6, LF.6.a

## Objectives

* Understand the various ways arguments can be passed to functions and utilized
* Understand what closures are in JavaScript
* Create and utilize closures

## Keywords

* arguments
* rest or spread operator
* default value
* closure


## Lesson

### Function Arguments

#### `arguments`
As we saw in previous lessons, functions can accept _arguments_ which can be used inside the function. JS functions also can accept more arguments than are asked for and you can access these through a special property called `arguments` which is very similar to an array. Let's say we want to write a function that will print out all the arguments but we don't know how many arguments there will be. This would be a good case to use the `arguments` property.

```js
function logArguments(args) {
  for(let i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
  }
}

logArguments(1,2,3)
// => 1
// => 2
// => 3
```

Above we passed in three arguments but no matter how many we passed in, it would log each argument to the screen. **WARNING** about using the `arguments` property: it is not a _true_ array, so you cannot use all of the built-in methods that come with a standard array.

#### Rest or Spread Operator

With ES6 we've added the _Rest Operator_, also referred to as the _Spread Operator_, which allows us to split items in an array into single values and vice-versa. We can use our `logArguments` function from above as an example. If we add the spread operator, represented by three periods `...`, before our arguments a standard array is formed. Now we can call `args.length` (whereas before we had to call `arguments.length`) and iterate **directly** over the new `args` array.

```js
function logArguments(...args) {
  for(let i = 0; i < args.length; i++) {
    console.log(args[i])
  }
}

logArguments(1,2,3)
// => 1
// => 2
// => 3
```

For more :cool: things you can do with the spread operator, check out this [article](https://davidwalsh.name/spread-operator).


#### Default Values

Occasionally, we want to ensure that an argument in a function is given regardless of user input. We've seen before that if a function expects to receive an argument but none is passed, the argument will become `undefined` which isn't great.

```js
function sayHello(name) {
  return `Hello, ${name}!`
}

sayHello()
//=> "Hello, undefined!"
```

To prevent this, we can now use _default variables_ with ES6. To do this, all you need to add is an assignment operator `=` after your argument and assign it a value. Now, if the function is called without a defined argument, the default value will be used instead.

```js
function sayHello(name="beautiful") {
  return `Hello, ${name}!`
}

sayHello()
//=> "Hello, beautiful!"

sayHello("Matt")
// => "Hello, Matt!"
```

## Closures

A closure, at it's simplest form is any function that refers to variables that currently exist within the scope of the function.
Simple Example:

```js
let variable = 0

function counter() {
  variable++
}

counter()
counter()

console.log(variable) // => 2

```

The reason this is a closure is because the variable being referred to __within__ the function was declared __outside__ of the function.

This is something you've probably seen or done before. However, closures can become very useful as your programs get more complex. Let's take a look at another closure.

```js
function createCounter() {
 let counter = 0
  return function increment() {
    counter++
    return counter
   }
 }
 const counterOne = createCounter()
 console.log(counterOne()) //=> 1
 console.log(counterOne()) // => 2
 console.log(counterOne()) // => 3

const counterTwo = createCounter()
console.log(counterTwo())  // => 1


```
In the function above we see `createCounter`, a function that initializes a `counter` variable at 0, and returns another function `increment`. The function `increment` increases the `counter` variable (which is _outside_ of the `increment` function) by 1 and then returns the current value of `counter`.

Because `createCounter` returns a function (`increment`), we can assign a new variable `counterOne` to have that returned function as it's value. When we invoke `counterOne`, and therefore invoke `increment`, the `counter` is returned.

Why is `counterTwo`'s value different than `counterOne` if they both have a `counter` variable?

Let's look at another closure.

```js
function greeting(str1) {
  return function (str2) {
    return `${str1} ${str2}`
  }
}


```
Like we've seen before, this is a function `greeting` that returns another function. I could give the returned function a name, but have decided to leave it anonymous because I don't _need_ to name it.

So, if we invoke the function `greeting('hello')` the output will be `[Function]` which is the inner function returned.  If I want to invoke _this_ inner function I could do so by invoking greeting twice at the same time. Like this: `greeting('hello')('Corey')`. This will return the output 'hello Corey'.

Using this concept to our advantage, we can save the initial returned inner function as different variables with different greetings, like so:
``` js
const whatUp = greeting("What up?")

const goodDay = greeting("Good day,")

```
From these lines we now have 2 new functions that work like so...

```js
whatUp("Matt") // => 'What up? Matt'
goodDay("Corey") // => 'Good day, Corey'

```

The ES6 equivalent to our greeting function looks like this:

```js
const greeting = (str1) => {
  return (str2) => {
   return  `${str1} ${str2}`
  }
}

//which is equivalent to...
const greeting = (str1) => {
  return (str2) => (`${str1} ${str2}`)
}

//which is equivalent to...
const greeting = (str1) => ((str2) => (`${str1} ${str2}`))

//which is equivalent to...
const greeting = str1 => str2 => `${str1} ${str2}`

```
As we can see, greeting is being declared. It's taking in str1 as an argument. It's implicitly returning a function that takes in str2 as an argument and implicitly returns the final result.
