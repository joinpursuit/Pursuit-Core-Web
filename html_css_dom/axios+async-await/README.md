# Axios + Async Await

## Goals

- Be able to install axios.
- Know how to perform different requests.
- Understand what makes _axios_ a preferable method.
- Know the syntax of `async` and `await`.
- Be able to write async await calls.
- Understand the benefits of using async await.
- Understand how to write a try...catch statement.

## Keywords

- Axios
- `async`
- `await`
- `try`
- `catch`

# 1. Axios

Axios is a JavaScript library that can be used for the following:

- Make XMLHttpRequests from the browser
- Make http requests from node.js
- Supports the Promise API
- Intercept request and response data
- Cancel requests
- Automatic transformation of data to JSON.
- Client side support for protecting against XSRF.

### Getting Started

- When we start using npm, we're going to run: `$ npm install axios`.
- However, for now, we can use a simpler approach: inside of our HTML file, add the following `script` to `head`:
  `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`


Axios is even better than `fetch`. It parses our JSON for us (so we don't have to use `JSON.parse()` or `.json()`) and it handles errors by automatically sending them to our `catch` clause (so we don't have to check if our `response.ok` is true).

Inside of a JS file paste the code:

```js
const button = document.querySelector("button");
button.addEventListener("click", fireRequest);

function fireRequest() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
      debugger
    });
}
```

Congrats! You just made your first axios _get_ request. Notice that our response data looks a little bit different. To get our data, we can write `response.data`. We don't have to return response.json() any more because we already have JSON!

Let's see how axios handles errors. Change your request url to "https://jsonplaceholder.typicode.com/posts/900". This url doesn't exist, so we should get an error. Now, we get caught in the debugger after `catch` because of a `404` error. This is much nicer than when we were working with `fetch`, because we no longer have to check `response.ok`.

## What about POST and other methods?

Axios makes all http requests simpler. Here's the code for making a POST request. Notice that we changed `axios.get` to `axios.post`, and that we passed in a data object. This is analogous to our second argument in `fetch`, where we specified a request method and a request body.

Try it in your browser:

```js
function fireRequest() {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", { name: "Corey" })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}
```

Take a look at `response.data`.

Additionally, requests can be made by just calling axios and passing in a configuration object like so:

```js
axios({
  method: 'post',
  url: "https://jsonplaceholder.typicode.com/posts",
  data: { name: "Corey" }
});

```

For convenience aliases have been provided for all supported request methods.

Checkout the [docs](https://github.com/axios/axios) to read more about it! 


# 2. Async and Await


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
This function will return a resolved Promise with the result of `1`.

Copy the following code into your JS file and try it out:

```js
  const returnOne = async () => { // this is how to use async with ES6 syntax
    return 1;
  }

returnOne().then(alert);


```
### Await
There is also a keyword called `await`. `await ` only works inside `async` functions and makes JavaScript wait until that promise
settles and returns its result. Let's see this in action.

First, let's see how things work without `await`. Create a function called fireRequest inside your JS file.
Use axios to make a get request to https://jsonplaceholder.typicode.com/posts. Save the request to a variable called response and
have your function console.log the response on the next line.
Before you actually run the code, make sure to predict what will get logged to the console. This is something you should **always** do while coding.

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

Now, add the keyword `await` directly before your axios call. Predict what will print to your console and then refresh your browser.

```js
    let response = await axios.get("https://jsonplaceholder.typicode.com/posts");

```
# 3. Chaining Calls

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
# 4. Error Handling

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

# 5. Another Example

For this example we'll use the same HTML from the fetch lesson but this time with the axios script tag. 

```html 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Countries</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="index.js" defer></script>
  </head>
  <body>
    <h1>Countries</h1>
    <form>
      <input
        type="text"
        placeholder="Enter a country name"
        id="country-name-input"
        required
      />
    </form>
    <section id="country-container"></section>
  </body>
</html>
```

Let's update the code from before to now use axios and try...catch

```js
document.querySelector("form").addEventListener("submit", loadCountries);

async function loadCountries(e) {
  e.preventDefault();
  const searchTerm = document.querySelector("#country-name-input").value;
  try {
    const res = await axios.get("https://restcountries.eu/rest/v2/name/" + searchTerm)
    const countries = res.data; 
    countries.forEach((country) => {
      console.log(country);
    });
  } catch (error) {
    console.log(error);
  } 
}

```

Take a moment to notice the key changes from before. How many differences can you spot? 
 * function as `async` in front 
 * Has one `try` block and an `await` instead of calling then. 
 * Uses `axios` instead of fetch. 
 * No longer checking if the response is okay. 
 * Saving the return from the `await` to a variable and getting the data by keying in with `.data`. 
 * Having a `catch` with the `try` instead of chained at the end of many `then`s. 

# 6. Things to Note

Some API's require that you use an API key. For now, we'd recommend finding and using just open API's; but if you do ever use an API key be careful not to push it to github because someone could use your account to make API calls. It's best practice to add a `.env` file and to put the API key into that file. Then add `.env` into a `.gitignore` file so that it doesn't get tracked by `git`. These keys generally live in the server side of a project.  

On some API calls you may experience a CORS error. For now just prefix your url with "https://cors-anywhere.herokuapp.com/". This can happen if server has a setting enabled. Check [here](https://www.freecodecamp.org/forum/t/solved-having-trouble-getting-response-from-dark-sky-api/100653) and [here](https://stackoverflow.com/questions/7067966/why-doesnt-adding-cors-headers-to-an-options-route-allow-browsers-to-access-my) for more resources on CORS.

## Practice 
Although it's relatively simple to find great free API's to make GET requests, most public API's won't allow you to change data on a database level. Thus there's not as many great places to practice making POST, PUT, PATCH, and DELETE requests. Because of this fact, let's go ahead and get our [own backend](https://github.com/joinpursuit/play_backend/) running so that we can play around with any all request types. Follow the instructions and get it running.

Challenge 1: Find the total of cars that user 1 has, Add that to the total of cars that user 2 has. Then find the car with the id that matches that sum.

Challenge 2: Create a form that takes in a username and on submission adds a new user to the database. 

Challenge 3: Create a show users button that prints a list of all the users. 

Challenge 4: When you click on a user, remove them from the list and also delete them from the database. 

## Resources

- [Axios Documentation](https://github.com/axios/axios)
- [Getting Started With Axios](https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237)
- [Axios Cheat Sheet](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index)
- [Fetch vs Axios](https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5)
- [Fetch vs Axios http request](https://medium.com/@sahilkkrazy/fetch-vs-axios-http-request-c9afa43f804e)
- [async function MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Async/await](https://javascript.info/async-await)
- [6 Reasons Why JS's Async/Await Blows Promises Away](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)
- [try...catch MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
