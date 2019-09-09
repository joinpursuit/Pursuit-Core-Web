# Async and Await

## Goals 
* Know the syntax of `async` and `await`. 
* Be able to write async await calls. 
* Understand the benefits of using async await. 
* Understand how to write a try...catch statement. 

## Keywords
* `async`
* `await`
* `try`
* `catch`

## Lesson

### What? 
* Async / await is new way to write asynchronous code. 
* Async / await is built on top of promises and cannot be used with plain or node callbacks. 
* Async/await is, like promises, non blocking.
* Async/await makes asynchronous code look and behave a little more like synchronous code.

### Async
Let's start with the `async` keyword. It can be placed before any function; that function will automatically return a Promise: 
```js
async function returnOne() {
  return 1; 
}

```
This function will returned a resolved Promise with the result of `1`. 

Copy the following code into your test.js and try it out: 

```js
document.addEventListener('DOMContentLoaded', () => {

  const returnOne = async () => { // this is how use async with ES6 syntax 
    return 1;
  }

  returnOne().then(alert);
});


```

### Await
There is also a keyword called `await`. `await ` only works inside `async` functions and makes JavaScript wait until that promise
settles and returns its result. Let's see this in action. 

First, let's see how things work without `await`. Create a function called fireRequest inside your test.js file. 
Use axios to make a get request to https://jsonplaceholder.typicode.com/posts. Save the request to a variable called response and 
have your function console.log the response on the next line. 

<details>
  <summary>
    Solution
  </summary>
  
  
  ```js
  const fireRequest = async () => {
    let response = axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(response);
  };
  fireRequest();
  
  ```
  
</details>

Take a look at what is printed to the console. 

Now, add the keyword `await` directly before your axios call and refresh your browser.

```js
    let response = await axios.get("https://jsonplaceholder.typicode.com/posts");

```

What's different? 

### More Benefits

async/await allows us to write much cleaner code than when we are chaining together promises. Take for instance a situation
where you call a `promise1` and then use what it returns to call `promise2`, then use the results of both promises to call a `promise3`.
Your code would most likely look like this: 

```js
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return promise2(value1)
        .then(value2 => {
          // do something          
          return promise3(value1, value2)
        })
    })
}

```

Using async / await makes this code much more readable. 

```js
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}
```

### Error Handling
If a promise resolves normally, then await promise returns the result.
But in case of a rejection it throws the error, just as if there were a throw statement at that line.

Try changing your current axios call to `axios.get("https://jsonplaceholder.typicode.com/posts/900")`.

As you can see an error is thrown. 

We can catch and handle this error by using a `try ... catch` statement. A `try...catch` statement marks a block of
statements to try, and specifies a response, should an exception be thrown. 

Copy this code to your test.js to see it in action: 

```js
  const fireRequest = async () => {
    try {
      response = await axios.get("https://jsonplaceholder.typicode.com/posts/900");
      console.log(response.data);
    } catch (err) {
      console.log("The error that was thrown: ", err)
    }
  }
  fireRequest();

```



## Resource
* [async function MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* [Async/await](https://javascript.info/async-await)
* [6 Reasons Why JS's Async/Await Blows Promises Away](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)
* [try...catch MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
