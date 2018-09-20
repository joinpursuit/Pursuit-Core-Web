# User Input in NodeJS

## Goals
* Understand what user input means in a command line interface (CLI) application
* Use `readline` to get user input + utilize that input
* Create a CLI application

## Terms

* Modules
* Require
* Synchronous
* Asynchronous
* Threads

## References

* [What is a Thread](https://stackoverflow.com/questions/5201852/what-is-a-thread-really)
* [Philip Roberts - JS Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
* [Asynchronous vs Synchronous](https://stackoverflow.com/questions/748175/asynchronous-vs-synchronous-execution-what-does-it-really-mean)
* [What does it mean that Javascript is Asynchronous](https://www.quora.com/What-does-it-mean-that-Javascript-is-asynchronous)

## Lesson

## Asynchronous Programming

Javascript is a single-threaded asynchronous language. Being single-threaded means that javascript can only do one thing at a time.  For example, if out code has an infinite loop, javascript will get stuck and never get to do anything else.

During any given time the computer is executing multiple processes. Each process performs an independent piece of work - such as running the operating system, communicating with devices, running a browser, etc. Within a process, we may have multiple threads - these are more tightly connected. Threads perform tasks that are related to the same job. Threads can also easily communicate with one another.

Being asynchronous means that javascript can do things like `setTimeOut` - a callback function will be called after a set amount of time, and meanwhile other code will continue being executed. But if javascript is single threaded, how can it keep a timer **and** run some code at the same time? These are clearly two separate tasks.

The answer is that the timer gets offloaded to another thread that knows how to do the required work. So while the javascript code itself gets executed on one thread only, other threads are being used for certain time-consuming work. The threads are like workers that each knows how to do some pre-determined task: such as keeping time, making network calls, listening for user input, etc. When the timer reaches zero, the worker-thread will put the callback function in a **task queue** - when the javascript thread is not doing any other work, it will perform the next task in the queue. Javascript will only be able to pick up tasks from the queue when it's completely idle - when no code at all is being executed. If the javascript thread is stuck in an infinite loop, it will never become available to execute anything else.

## The Readline Module

NodeJS handles most user input in an asynchronous manner. To illustrate, let's examine the `on` function that is part of the **readline** module. A Module is just some code that exists in another file. In order to access a specific module, we use the `require` keyword:

```js
var readline = require('readline')
```

The **readline** module is built into node - if you can run node you should be able to access it. The variable to the left of `require` can have any name, However, The string to the right of `require` (`'readline'`) must remain exactly the same. This string would be used to find a file whose name is `readline`. There is one more step to be made to set up a readline interface - this will be given to you as a boilerplate, and it's not something you need to be concerned with at the moment.

```js
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
```

Now we can use the variable `rl` to handle the user's input. The readline interface asynchronously listens to an input stream coming from the user via keyboard input. It does so on a separate thread, so the execution of JS code does not get interrupted. Readline can respond to certain events - such as a user pressing the `enter` key. We can provide a callback to readline, and when the user presses `enter`, readline will put that callback function in the JS task queue, with the user's input as an argument to that function.

To respond to a line of input from the user, we use the readline's `on` method: we provided as arguments a string with the desired event - in this case `'line'` and a callback that expects the user's input as an argument.

```js
rl.on('line', function(input) {
  console.log('your input was: ' + input)
})
```

The code above simply logs the user's input. Note that the input will always be of the `string` type, even if the user types a number. We can convert the string to a number if needed:

```js
rl.on('line', 'enter something', function(input) {
  var num = Number(input)
  console.log('your input was the number: ' + num)
})
```

In that case, however, we should make sure that the input is actually a valid number. If it isn't we will get `NaN`. We can only check if a value is `NaN` by using the `isNaN` function. Because `NaN` represents an arbitrary invalid value, the `===` operator will return false for `NaN === NaN`. This is one of the only such cases in javascript.

```js
rl.on('line', function(input) {
  // attempting to convert the input to a number
  var num = Number(input)
  // checking if input was not a number
  if (isNaN(num)) {
    console.log('that is not a valid number')
  } else {
    console.log('your input was the number: ' + num)
  }
})
```

Readline will continue listening for input by default until the program stops. So every time the user inputs a number, the callback will be triggered.

### Clear Screen

The following function, when called, will clear the terminal screen:

```js
function clear () {
  process.stdout.write('\u001B[2J\u001B[0;0f')
}
```

### Boilerplate 

These are all the excerpts of code we have used in this lesson to create a node app with readline. Use them as a boilerplate when writing your own node app.

```js
//  importing the readline module
var readline = require('readline')

// We will be able to use `rl`
// Only After creating the readline interface
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Clears the terminal screen
function clear () {
  process.stdout.write('\u001B[2J\u001B[0;0f')
}

// Listening to end of line event
rl.on('line', function(input) {

})
```
