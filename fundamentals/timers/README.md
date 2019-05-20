# Timers

## Standards
FSW.1.b

## Objectives
  * Understand how to use setTimeout and setInterval.
  * Use callbacks
  * Gain a deeper understanding of asynchronicity.

## Keywords

- [.setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
  - [.clearTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout)
- [.setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
  - [.clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)

## Context

`.setTimeout()` and `.setInterval()` are called _timers_, and are used to add delays
to function execution.
They each take two arguments: a callback function and a measure of milliseconds.
They return numeric ids, which can be used with `.clearTimeout()` and
`.clearInterval()`  to halt the timer.

## .setTimeout(callback, time)

After _time_ milliseconds elapse, the callback function of .setTimeout() executes. In
this way, you can delay the execution of a function.

Let's see this in action. Copy the following code into a repl:

```js
setTimeout(() => console.log("three seconds have passed"), 3000);

```
In this example we are passing setTimeout two arguments. The first argument is an anonymous function that logs "three seconds have passed",
the second argument is the number of milliseconds we want to pass before our first argument is fired.

## .setInterval(callback, time)

`.setInterval()` will run indefinitely, and will execute the callback function every _time_ milliseconds. In this way, you can run
an infinite loop with a "pulse" or "heartbeat". A real life example for using `setInterval` would be writing a program for a clock.

Let's see an example of setInterval:

```js
setInterval(() => console.log("Hello forever"), 1000);

```

If you run the above function you will see that we print "Hello forever" every second to the console.

## .clearInterval(id) and .clearTimeout(id)

Both `.setInterval()` and `.setTimeout()` immediately return a numeric id
referencing their unique instance that can be used to later halt their execution.
To halt the indefinite execution of `.setInterval()`, you must assign its return value to a variable and then use that variable
 as an argument to `.clearInterval()`.

Although it is less common, `.clearTimeout()` is used in the same way.

This next example is a little strange to look at but see if you can understand what is happening.

```js
let stopInterval = setInterval(counter, 1000);

let count = 0;

function counter() {
  if(count === 10) {
    clearInterval(stopInterval)
    clearTimeout(stopTimeout)
  }
  let stopTimeout = setTimeout(() => {
    console.log(count)
    count++
  }, 1000);

}

```

The first thing we're doing is declaring a variable that will be the return statement of our setInterval. Out setInterval will call
the function counter every 1000 milliseconds.

The next line has another variable declaration called count.

Then we have our counter function. Our function checks to see if our count is equal to ten. If it is, we want to stop our setInterval
as well as our setTimeout.

The next part of our counter function is a setTimeout and prints our count and increments it by one. It waits 1000 milliseconds to do so.

Try changing things around and seeing what happens. If you're getting some unexpected results, it's because we haven't yet learned
about the _Event Loop_ and what's going on under the hood.

setTimeout and setInterval are both examples of asynchronous behavior in JS. We will cover this more later, but for now just make
a mental note that they are asynchronous and non-blocking.

## Resources
* [w3 schools](https://www.w3schools.com/js/js_timing.asp)
* [MND](https://developer.mozilla.org/en-US/docs/Talk:DOM/window.setTimeout)
* [Bonus: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
