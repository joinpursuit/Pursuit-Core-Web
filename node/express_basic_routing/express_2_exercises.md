# Express Part 2 - Exercises

## Rock Paper Scissors API

Create a server with a route will take  `'rock'`, `'paper'`, or `'scissors'` as the first parameter in its path. The API will return a JSON object with the results of a single "Rock, Paper, Scissors" match against a computer opponent.

Example: `localhost:8000/rock` will (randomly) result in one of three cases:

1. `{"user":"rock","ai":"rock","result":"tie"}`
2. `{"user":"rock","ai":"paper","result":"lose"}`
3. `{"user":"rock","ai":"scissors","result":"win"}`

## Calculator API - Four Routes

Create and express server that works as a basic calculator API.

* Create four routes, where each starts with add/sub/mul/div. Each of the routes will then accept two number parameters.

Here is one route in your app:

`/add/:num1/:num2`

* In each route, convert the numbers to integers using `parseInt`.
* Respond to each request with an object that contains both numbers and the result.

For example, if the users navigates to `http://localhost:8000/add/2/4`, the response should be:

`{num1: 2, num2: 4, result: 6}`

* If either of the parameters is not a number, respond with an string like "numbers only".

* If the user navigates to any other route, respond with an explanatory message about your API.

## Calculator API - One Route

Convert your calculator API to take the operator as a parameter as well. Now you will only need one route. If the operator is not valid, send an appropriate response like `"the operator is not supported"`.

## Challenge - Base Conversion API

Create an express server that converts numbers between three bases: decimal, binary, and hexadecimal.

* To convert a decimal number to binary and hex:

```js
let num = 10;
num.toString(2) // '1010'
num.toString(16) // 'a'
```

* To convert binary and hex strings to decimal:

```js
let hexStr = 'a'
parseInt(hexStr, 16) // 10
let binaryStr = '1010'
parseInt(binaryStr, 2) // 10
```

* On every request, the server will expect a url of the following structure:

`localhost:8000/{number}/{bin|dec|hex}`

It will return an object that contains {number} and all conversions for {number} with the provided base.

* If only a number is provided, e.g. `localhost:8000/{number}` - assume {number} has a decimal base and return an object with all conversions.

Example 1: on url `localhost:8000/10` the server should return:

```json
{
  "original": { "value":"10", "base":10 },
  "conversions": { "decimal":"10", "binary":"1010", "hex":"a" }
}
```

Example 2: on url `localhost:8000/11/bin` the server should return

```json
{
  "original": { "value": "11", "base":2 },
  "conversions": { "decimal": "3", "binary": "11", "hex":" 3" }
}
```
