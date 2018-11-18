# Axios

## Goals

- Be able to install axios.
- Know how to perform different requests.
- Understand what makes _axios_ a preferable method.

## Keywords

- Axios

## Lesson

### Why?

Axios is a JavaScript library that can be used for the following:

- Make XMLHttpRequests from the browser
- Make http requests from node.js
- Supports the Promise API
- Intercept request and response data
- Cancel requests
- Automatic transformation of data to JSON.
- Client side support for protecting agains XSRF.

### Getting Started

- When we start using npm, we're going to run: `$ npm install axios`.
- However, for now, we don't want to do that. Instead, inside of our HTML file, add the following `script` to `head`:
  `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`

### How?

Axios is even better than `fetch`. It parses our JSON for us (so we don't have to use `JSON.parse()` or `.json()`) and it handles errors by automatically sending them to our `catch` clause (so we don't have to check if our `response.ok` is true).

Inside of our test.js paste the code:

```js
let button = document.getElementById("button");
button.addEventListener("click", fireRequest);

function fireRequest() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      debugger;
    })
    .catch(err => {
      debugger;
    });
}
```

Congrats! You just made your first axios _get_ request. Notice that our response data looks a little bit different. To get our data, we can write `response.data`. We don't have to return response.json() any more because we already have JSON!

Let's see how axios handles errors. Change your request url to "https://jsonplaceholder.typicode.com/posts/900". This url doesn't exist, so we should get an error. Now, we get caught in the debugger after `catch` because of a `404` error. This is much nicer than when we were working with `fetch`, because another process that we'd previously have to write out manually is done for us.

## What about POST and other methods?

Axios makes all of http requests simpler. Here's the code for making a POST request. Notice that we changed `axios.get` to `axios.post`, and that we passed in a data object. This is analogous to our second argument in `fetch`, where we specified a request type and a request body.

Try it in your browser:

```js
function fireRequest() {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", { name: "Corey" })
    .then(response => {
      debugger;
    })
    .catch(err => {
      debugger;
    });
}
```

Take a look at `response.data`. Check out the resources to learn more!

## Resources

- [Axios Documentation](https://github.com/axios/axios)
- [Getting Started With Axios](https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237)
- [Axios Cheat Sheet](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index)
- [Fetch vs Axios](https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5)
- [Fetch vs Axios http request](https://medium.com/@sahilkkrazy/fetch-vs-axios-http-request-c9afa43f804e)
