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
- Client side support for protecting agains XSRF.

### Getting Started

- When we start using npm, we're going to run: `$ npm install axios`.
- However, for now, we can use a simpler approach: inside of our HTML file, add the following `script` to `head`:
  `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`


Axios is even better than `fetch`. It parses our JSON for us (so we don't have to use `JSON.parse()` or `.json()`) and it handles errors by automatically sending them to our `catch` clause (so we don't have to check if our `response.ok` is true).

Inside of our test.js paste the code:

```js
let button = document.getElementById("button");
button.addEventListener("click", fireRequest);

function fireRequest() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
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
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}
```

Take a look at `response.data`. Check out the resources to learn more!


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

# 5. Building an app with await async

Let's return to the application that we built out with `Fetch`.

<details>
<summary>index.js</summary>

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
    var result = fetch("https://restcountries.eu/rest/v2/name/" + searchTerm)
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
</details>

<details>
<summary>index.html</summary>

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
</details>

<details>
<summary>styles.css</summary>

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
</details>

Let's replace the following method with an async await implementation:

```js
function loadCountries() {
    const searchTerm = getCountryInput().value
    if (!searchTerm) { return }
    var result = fetch("https://restcountries.eu/rest/v2/name/" + searchTerm)
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
```

First, we'll split up our `loadCountries` method into two functions: `loadNewData` and `getCountriesFromOnline`

```js
async function loadNewData() {
    const countries = await getCountriesFromOnline()
    // Do something with the countries
}

async function getCountriesFromOnline() {
    // Fetch the countries from online
}
```

Then, we can move our fetching logic to the `getCountriesFromOnline` method

```js
async function getCountriesFromOnline() {
    const searchTerm = getCountryInput().value
    if (!searchTerm) { return }
    const response = await axios.get("https://restcountries.eu/rest/v2/name/" + searchTerm)
    return response.data
}
```

Then, we can complete our `loadNewData` function:

```js
async function loadNewData() {
    const countries = await getCountriesFromOnline()
    removePreviousCards()
    for (let country of countries) {
        createCardFromCountry(country, weather)
    }
}
```

Now, let's see it all together:

```js
document.addEventListener('DOMContentLoaded', () => {
    configureInputListeners()    
})

function configureInputListeners() {
    getCountryInput().addEventListener('change', loadNewData)
}

async function loadNewData() {
    const countries = await getCountriesFromOnline()
    removePreviousCards()
    for (country of countries) {
        createCardFromCountry(country)  
    }    
}

async function getCountriesFromOnline() {
    const searchTerm = getCountryInput().value
    if (!searchTerm) { return }
    const response = await axios.get("https://restcountries.eu/rest/v2/name/" + searchTerm)
    return response.data
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

Much cleaner!  Instead of having to nest our logic in a callback inside of our fetch call, we can separate each of the components.

# 6. Building an app with chained calls

### Setup

We saw above how we can use `async` and `await` to make our code more readable.  We can also use it to chain together calls in more complicated ways.  Let's add functionality that also shows the current weather in each country.  To achieve this, we'll need to add another api that can get the weather.  We'll use [Dark Sky](https://darksky.net/dev).  It requires an API Key, so you'll need to register for one.  First, let's make sure that we're keeping our API Key secret.  If someone has your API Key, they can make calls and pretend to be you, which can cause many security problems.  To avoid this, we'll make it so that our API Key won't be stored on GitHub.

In your project directory, create a file named `.gitignore`.  Edit the file giving it the following text:

```
Secrets/
```

This means that the Secrets directory will not be tracked by Github.  Add and commit your changes, then create a `Secrets` directory with an internal file name `secrets.js`.  In that file, add the following constant:

```js
const Secrets = {
    "DarkSkyApiKey": "YOUR API KEY HERE"
}
```

Replace "YOUR API KEY HERE" with your API Key.

### Fetching the weather

Now, we can make an asynchronous function that returns the weather data, given a country object.

```js
async function getWeather(country) {
    if (country.latlng.length == 0) { return }
    const latLong = `${country.latlng[0]}, ${country.latlng[1]}`
    const darkSkyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${Secrets.DarkSkyApiKey}/${latLong}`
    const response = await axios.get(darkSkyURL)
    return response.data
}
```

Our URL needs to have the "https://cors-anywhere.herokuapp.com/" prefix because of a setting that the Dark Sky server has enabled.  Check [here](https://www.freecodecamp.org/forum/t/solved-having-trouble-getting-response-from-dark-sky-api/100653) and [here](https://stackoverflow.com/questions/7067966/why-doesnt-adding-cors-headers-to-an-options-route-allow-browsers-to-access-my) for more resources on CORS.

### Fetching the weather for all countries

Now we need a way to get a list of countries, and get the weather for all of them.  `async` `await` allows to use the `getWeather` function in a straightforward way:

```js
async function getWeatherForCountries(countries) {
    let weatherObj = {}    
    for (let country of countries) {
        weatherObj[country.name] = await getWeather(country)
    }
    return weatherObj
}
```

This function takes in an array of countries, and returns an object whose keys are the names of each country, mapped to a value of the weather object we get back from the Dark Sky API.  Now, we can put it all together and load the weather data into each card:

```js
document.addEventListener('DOMContentLoaded', () => {
    configureInputListeners()    
})

function configureInputListeners() {
    getCountryInput().addEventListener('change', loadNewData)
}

async function loadNewData() {
    const countries = await getCountriesFromOnline()
    const weatherObj = await getWeatherForCountries(countries)
    removePreviousCards()
    for (let country of countries) {
        const weather = weatherObj[country.name]
        createCardFromCountry(country, weather)
    }
}

async function getCountriesFromOnline() {
    const searchTerm = getCountryInput().value
    if (!searchTerm) { return }
    const response = await axios.get("https://restcountries.eu/rest/v2/name/" + searchTerm)
    return response.data
}

async function getWeatherForCountries(countries) {
    let weatherObj = {}    
    for (let country of countries) {
        weatherObj[country.name] = await getWeather(country)
    }
    return weatherObj
}

async function getWeather(country) {
    if (country.latlng.length == 0) { return }
    const latLong = `${country.latlng[0]}, ${country.latlng[1]}`
    const darkSkyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${Secrets.DarkSkyApiKey}/${latLong}`
    const response = await axios.get(darkSkyURL)
    return response.data
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
    while (countryContainer.firstChild) {
        countryContainer.removeChild(countryContainer.firstChild)
    }
}

function createCardFromCountry(country, weather) {
    let newCard = makeNewCard()

    newCard.appendChild(makeFlagImage(country))
    newCard.appendChild(makeCoutryNameHeader(country))
    newCard.appendChild(makeTempPara(weather))
    newCard.appendChild(makeWeatherSummaryPara(weather))

    countryContainer.appendChild(newCard)
}

function makeNewCard() {
    let newCard = document.createElement('div')
    newCard.className = "card"
    newCard.style = 'width: 300px'
    return newCard
}

function makeFlagImage(country) {
    let flagImage = document.createElement('img')
    flagImage.src = `${country.flag}`
    flagImage.style = 'width:200px'
    return flagImage
}

function makeCoutryNameHeader(country) {
    let countryNameHeader = document.createElement('h4')
    countryNameHeader.innerText = `${country.name}`
    return countryNameHeader
}

function makeTempPara(weather) {
    let tempPara = document.createElement('p')
    if (weather) {
        const temp = weather.currently.apparentTemperature
        tempPara.innerText = `${weather.currently.apparentTemperature}˚F`        
    } else {
        tempPara.innerText = "??˚F"
    }
    return tempPara
}

function makeWeatherSummaryPara(weather) {
    let weatherSummaryPara = document.createElement('p')
    if (weather) {        
        weatherSummaryPara.innerText = weather.currently.summary    
    } else {
        weatherSummaryPara.innerText = "No weather data available"
    }
    return weatherSummaryPara
}
```

Great!  Even with very nested calls, our code structure still reads sensibly without putting UI manipulation inside of networking callbacks.

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
