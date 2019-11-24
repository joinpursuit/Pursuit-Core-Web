# Promises and Fetch

## Goals
* Understand what a promise is and why it's beneficial.
* Know how to use a promise.
* Know how to chain promises.
* Be able to handle errors with our promises.
* Understand how the Fetch API is used to make HTTP requests
* Make HTTP requests using the Fetch API

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
* Fetch


# 1. Promises Introduction

A *Promise* is an object representing the eventual completion or failure of an asynchronous operation. This is most often seen when we make API calls. Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

Using promises allows us to wait for certain code to finish execution prior to running the next bit of code. But why do we need that?

Pretend that you had a website that loads data from an API call, and then process that data to display for the user. If we tried to process the data before actually getting any data back we'd end up with a blank website or an error. With with promises we can ensure synchronicity.

### The States Of a Promise

Promises have three states:
1. _Fulfilled_ - The action relating to the promise succeeded.
2. _Rejected_ - The action relating to the promise failed.
3. _Pending_ - Hasn't fulfilled or rejected yet.

After a promise has been fulfilled or rejected, the promise is considered _Settled_.


# 2. Promise Chaining

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

# 3. Making Promises

Although you will most likely already be dealing with asynchronous calls that return promises, it is possible to create your own promise with its constructor function. To do this you write new Promise and then pass in a callback function. That callback function will take in two arguments (each of which will be a function), one for resolve, and one for reject. Here's an example of what that might look like:

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

# 4. Using Promises with Fetch


The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

The fetch() method takes one mandatory argument, the path to the resource you want to fetch. It returns a _Promise_ that resolves to the _Response_ to that request, whether it is successful or not. You can also optionally pass in an options object as the second argument. An options object can contain any custom settings that you want to apply to the request such as the method (GET, POST, DELETE, etc), headers, body and many [more](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters).

Let's try this out!

We'll use the `https://restcountries.eu` resource to load a list of countries based off of the user's search query.  First, let's put together the html that we'll be using:

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Countries</title>
    <link rel="stylesheet" href="styles.css">
    <script src="index.js"></script>
</head>
<body>
    <h1>Countries</h1>
    <input type="text" placeholder="Enter a country name" id="countryNameInput">
    <div id = 'countryContainer'></div>
</body>
</html>
```

Now, we'll need to add our event listeners in our `index.js`:

### index.js

```js
document.addEventListener('DOMContentLoaded', () => {
    configureInputListeners()    
})

function configureInputListeners() {
    getCountryInput().addEventListener('change', loadCountries)
}

function loadCountries() {
    const searchTerm = getCountryInput().value
    if (!searchTerm) { return }
    fetch("https://restcountries.eu/rest/v2/name/" + searchTerm)
        .then(response => {
            return response.json()
        })
        .then(countries => {
            // remove Previous Cards
            countries.forEach(country => {
              console.log(country)
              // create Card From Country
            })
        })
        .catch(error => {
            console.log(error)
        })
}
```

We are using `fetch`, which returns a Promise that we that we can immediately attach a `.then` to to process the response once the promise is fulfilled.  For now, we're just printing the countries that come back to us.  Test it out with different search terms and make sure that you're getting back data.  Let's go ahead now and add in our remaining functionality to create cards for each country that we load and add them to the DOM:

```js
document.addEventListener('DOMContentLoaded', () => {
    configureInputListeners()    
})

function configureInputListeners() {
    getCountryInput().addEventListener('change', loadCountries)
}

function loadCountries() {
    const searchTerm = getCountryInput().value
    if (!searchTerm) { return }
    fetch("https://restcountries.eu/rest/v2/name/" + searchTerm)
        .then(response => {
            return response.json()
        })
        .then(countries => {
            removePreviousCards()
            countries.forEach(country => {
                createCardFromCountry(country)
            })
            return countries
        })
        .catch(error => {
            console.log(error)
        })
}

function getCountryInput() {
    const countryInput = document.querySelector('#countryNameInput')
    return countryInput
}

function getCountryContainer() {
    const countryContainer = document.querySelector('#countryContainer')
    return countryContainer
}

function removePreviousCards() {
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    const countryContainer = getCountryContainer()
    console.log(countryContainer.firstChild)
    while (countryContainer.firstChild) {
        countryContainer.removeChild(countryContainer.firstChild)
    }
}

function createCardFromCountry(country) {
    let newCard = document.createElement('div')
    newCard.className = "card"
    newCard.style = 'width: 300px'

    let flagImage = document.createElement('img')
    flagImage.src = `${country.flag}`
    flagImage.style = 'width:200px'

    newCard.appendChild(flagImage)

    let coutryNameHeader = document.createElement('h4')
    coutryNameHeader.innerText = `${country.name}`

    newCard.appendChild(coutryNameHeader)

    countryContainer.appendChild(newCard)
}
```

Finally, let's add a little bit of styling to make our website look a little nicer:

### styles.css

```css
/* https://www.w3schools.com/howto/howto_css_cards.asp */

#countryContainer {
    margin:30px;
    display: flex;
    flex-wrap: wrap;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    margin:5px;
    /* border-style: solid;
    border: 5px; */
  }

  /* Add rounded corners to the top left and the top right corner of the image */
  img {
    border-radius: 5px 5px 0 0;
  }
```

# 5. POST requests with fetch

To handle other requests is simple. All you need to do is pass in an object with some data as the second argument to fetch.
You could do something like this:

```js
  let button = document.getElementById("button");

  button.addEventListener("click", fireRequest);

  function fireRequest() {
    let data = { name: 'My Name' };

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
        console.log(response)
      })
      .catch(err => {
        console.log(response)
      })
  }
```





## Resources

* [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [Fetch Parameters](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
* [How to use the Fetch API)[https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data]
* [Fetch vs Axios](https://medium.com/@sahilkkrazy/fetch-vs-axios-http-request-c9afa43f804e)
* [JavaScript: Learn Promises](https://codeburst.io/javascript-learn-promises-f1eaa00c5461)
* [JavaScripot Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) * [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all): Accepts an array of promises, and creates a single promise that only gets fulfilled if every promise in the array is fulfilled.
 * A [polyfill](https://github.com/stefanpenner/es6-promise) is required for consistent functionality across older browsers.
