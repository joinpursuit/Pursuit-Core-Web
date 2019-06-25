# Fetch

## Goals
* Understand how the Fetch API is used to make HTTP requests
* Make HTTP requests using the Fetch API

## Keywords
* Fetch
* Promise
* Response

## Lesson

## Fetch

The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

The fetch() method takes one mandatory argument, the path to the resource you want to fetch. It returns a _Promise_ that resolves to the _Response_ to that request, whether it is successful or not. You can also optionally pass in an options object as the second argument. An options object can contain any custom settings that you want to apply to the request such as the method (GET, POST, DELETE, etc), headers, body and many [more](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters). 

Let's try this out! 

Inside your test.js, add a fetch() and pass in the string https://ghibliapi.herokuapp.com/films. Because fetch returns a promise we can chain on a then(). Throw in a debugger and look at the response. 

<details>
  <summary>
    Your code should look like this so far:
  </summary>
  
  ```js
  fetch("https://ghibliapi.herokuapp.com/films")
  .then(response => {
    debugger
  })
  ```
</details>

Now try returning your response in json. response.json().

_NOTE_ Your manipulation of the response object will very often be to

```js
return response.json();
```

Let's chain another .then() and add a debugger. What does our response look like now? 

<details>
  <summary>
    Your code should look like this so far:
  </summary>
  
  ```js
  fetch("https://ghibliapi.herokuapp.com/films")
  .then(response => {
    debugger
    return response.json();
  })
  .then(response => {
    debugger
  })
  ```
</details>

### Challenge: 
Just like we did with our XMLHttpRequest, let's see if we can update our DOM to show the title of all the movies that we're fetching after we click a button. 


<details>
  <summary>
    Solution: 
  </summary>
  
  ```js
  let button = document.getElementById("button");

  button.addEventListener("click", getMovies);

  function getMovies() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(response => {
        return response.json();
      })
      .then(response => {
        showMovies(response);
      });
  }

  function showMovies(allMovies) {
    let movies = document.getElementById("movies");
    allMovies.forEach(movie => {
      let newMovie = document.createElement("li");
      newMovie.innerText = movie.title;
      movies.append(newMovie);
    });
  }
  ```
</details>

## Handling more requests, like POST
To handle other requests is simple. All you need to do is pass in an object with some data as the second argument to fetch. 
You could do something like this:

```js
  let button = document.getElementById("button");

  button.addEventListener("click", fireRequest);


  function fireRequest() {
    let data = { name: 'Corey' };

    let fetchData = {
      method: 'POST',
      body: data,
      headers: new Headers(),
    };

    fetch("https://jsonplaceholder.typicode.com/posts", fetchData)
      .then(response => {
        return response.json();
      })
      .then(response => {
        debugger
      })
      .catch(err => {
        debugger
      })
  }


```

## The Pitfalls 

So far fetch seems almost like a dream come true, especially when compared to XMLHttpRequest. However, there are some negative features that are worth noting. 
1. Getting an api response in 2 steps. We saw this when we returned response.json(). We weren't able to get the json immediately but instead had to chain a then before we were finally able to access the desired data. 

2. Error handling. The Promise returned from fetch() **won’t reject on HTTP error status** even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.

Let's take a closer look at this. Copy and paste the following code into your test.js:

```js
  let button = document.getElementById("button");

  button.addEventListener("click", fireRequest);


  function fireRequest() {
    fetch('https://jsonplaceholder.typicode.com/posts/900')
      .then(response => {
        debugger
        return response.json();
      })
      .then(response => {
        debugger
      })
      .catch(err => {
        debugger
      })
  }

```

Notice that when you run the code you end up in the `.then` debugger. This is not desirable behavior. Try checking response.status. Your status should be a 404 error because there is no post 900. Also try checking response.ok. In this situation, our intuition tells that we should be in the `catch` section. Here's the workaround:

```js

  function fireRequest() {
    fetch("https://jsonplaceholder.typicode.com/posts/900")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        debugger;
      })
      .catch(err => {
        debugger;
      });
  }

```
 We have to throw our own error after checking the response. This works, but its' definitely _not_ pretty. 
 
 3. No timeout functionality available. 
 
 4. Cancelling request.
 
 5. Fetch does not support upload progress. 
 
 6. No cookies by default. 





## Resources

* [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [Fetch Parameters](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
* [How to use the Fetch API)[https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data]
* [Fetch vs Axios](https://medium.com/@sahilkkrazy/fetch-vs-axios-http-request-c9afa43f804e)

