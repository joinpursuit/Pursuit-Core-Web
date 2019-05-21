# Promises

## Goals
* Understand what a promise is and why it's beneficial. 
* Know how to use a promise. 
* Know how to chain promises. 
* Be able to handle errors with our promises. 

## Keywords
* Promises
* then 
* catch
* Pending
* Fulfilled
* Rejected
* Settled
* Callback Hell
* Chaining
* Success and Failure 

## Promises 

### The What? 
A *Promise* is an object representing the eventual completion or failure of an asynchronous operation. This is most often seen 
when we make API calls. Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into
a function.

### The Why?
Using promises allows us to wait for certain code to finish execution prior to running the next bit of code. But why do we need that? 
Pretend that you had a website that loads data from an API call, and then process that data to display for the user. If we tried to process the data before actually getting any data back we'd end up with a blank website or an error. With with promises we can ensure synchronicity. 

### The States Of a Promise
Promises have three states:
1. _Fulfilled_ - The action relating to the promise succeeded.
2. _Rejected_ - The action relating to the promise failed. 
3. _Pending_ - Hasn't fulfilled or rejected yet. 

After a promise has been fulfilled or rejected, the promise is considered _Settled_. 

### Chaining 
Before promises we used callbacks. This would quickly become unwieldy if we were doing several asynchronous operations in a row. 

This is _callback hell_: 
```js
doSomething(result => {
  doSomethingElse(result, newResult => {
    doThirdThing(newResult, finalResult => {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);


```
With modern functions, we attach our callbacks to the returned promises instead. Promises return a promise. Adding a `.then()` creates a promise chain:

```js
doSomething().then(result => {
  return doSomethingElse(result);
})
.then(newResult => {
  return doThirdThing(newResult);
})
.then(finalResult => {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);

```

The `.then` takes in two optional arguments. The first argument is a function that will be fired upon the promise succeeding, the second argument is the function that will be fired upon the promise failing. 

The arguments to `then` are option and  `catch(failureCallback)` is short for `then(null, failureCallback)`. `catch` is the way we typically deal with error handling. You'll most often see a promise chain with multiple success calls and then just the one `catch` at the end. 

### Constructor Function
Although you will most likely already be dealing with asynchronous calls that return promises, it is possible to create your own promise with it's constructor function. To do this you write new Promise and then pass in a callback function. That callback function will take in two arguments (each of which will be a function), one for resolve, and one for reject. Here's an example of what that might look like: 

```js
let promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});

```

### See it in action!

Run this code in your console and see how promises are chained:

```js
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 2000);

}).then((result) => {
  alert(result);
  return result + 2;
}).then((result) => {
  alert(result);
  return result + 2;
}).then((result) => {
  alert(result);
  return result + 2;
});

```

Now try running this code that intentionally throws an error. See how catch works?

```js
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 2000);

}).then((result) => {
  alert(result);
  return result + 2;
}).then((result) => {
  throw new Error('FAILED HERE');
  alert(result);
  return result + 2;
}).then((result) => {
  alert(result);
  return result + 2;
}).catch((e) => {
  alert('error: ' + e)
});

```

## Advanced Topics
* [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all): Accepts an array of promises, and creates a single promise that only gets fulfilled if every promise in the array is fulfilled. 

* A [polyfill](https://github.com/stefanpenner/es6-promise) is required for consistent functionality across older browsers.

## Resources 
* [JavaScript: Learn Promises](https://codeburst.io/javascript-learn-promises-f1eaa00c5461)
* [JavaScripot Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
