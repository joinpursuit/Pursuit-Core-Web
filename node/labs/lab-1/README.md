# Lab 1: Utility Server

## Task
- You will create an Express server that takes in different routes to do random but COOL things!
- Each of the routes are unique and takes in query parameters through GET requests
- Each of the individual functionalities should be seperated into modules that you will build
- Your routes should test for invalid inputs

## Features

```
// Math Routes
localhost:3000/math/add?a=2&b=3
localhost:3000/math/multiply?a=2&b=3

// Search Gif Route
localhost:3000/gif/?search=spongebob
```

## Math Routes Example

We will building a The user can enter as many query parameters as they want to do the math function on. AND be able to call them whatever they want.

If we entered the following: 

```
localhost:3000/math/add?a=2&b=3
```

We should get back the following JSON response:

```
{
  input: {
    a: 2,
    b: 3
  },
  sumString: '2 + 3',
  sum: 5
}
```

This example applies for every one of the math routes.

A more complex example:

```
localhost:3000/math/multiply?cat=50&b=3&zoo=10
```

We should get back the following JSON response:

```
{
  input: {
    cat: 50,
    b: 3,
    zoo: 10
  },
  productString: '50 * 3 * 10',
  product: 1500
}
```

An error example:

```
localhost:3000/math/multiply?a=hello&b=world
```

We should get back the following JSON response:

```
{
  error: 'You passed a non-number value into the parameters.'
}
```

- Really understand the structure of the response. 
- Remember the user can pass as many paramters into the query string as they want.
- User can call the keys whatever they want, but the values must properly parse into numbers.
- Give an error response if any of the passed in values are not numbers


## Gif Search Example

If they user searches the following:

```
localhost:3000/gif/?search=spongebob
```

Your response should be like the following:

```
[
  "https://media1.giphy.com/media/cZ7rmKfFYOvYI/200.gif",
  "https://media1.giphy.com/media/cZ7rmKfFYOvYI/200.gif"
]
```

- You will use the [Giphy API](https://developers.giphy.com/docs/#operation--gifs-search-get) to do your GIF search. 
- Parse through their results. 
- Respond back with an array of ONLY the direct GIF image URL. Where the image URL ends with `.gif`
