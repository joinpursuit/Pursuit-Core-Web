# Reference Types

## Setup

Please complete the following before the lesson begins:

- Fork this gist. Then, if you wish to take notes in the gist itself, click the “Edit” button.
- Open and then fork this [Replit](https://replit.com/@bwreid/Reference-Types#index.js).
- Complete the Warmup Questions & Tasks detailed at the top of the Replit.

## Learning Objectives

- Distinguish between data types that pass a value and those that pass references.
- Differentiate between destructive and non-destructive methods.
- Successfully mentally evaluate code that makes use of both references and values.

## Guiding Questions

- Take a look at the code below. What do you expect the values of `year` and `founded` to be when the variables are logged? Before running the code, make your guess, then run it to confirm.

  ```js
  let year = 2013;
  let founded = year;
  year++;
  console.log(year, founded);
  ```

  Did the code do what you expect? Does this seem right to you? Why or why not?

  > Your answer…

- Take a look at the code below. What do you expect the values of `companies` and `partners` to be when the variables are logged? Before running the code, make your guess, then run it to confirm.

  ```js
  let companies = ["Google", "Citi", "Uber"];
  let partners = companies;
  partners.push("Etsy");
  console.log(companies, partners);
  ```

  Did the code do what you expect? Does this seem right to you? Why or why not?

  > Your answer…

- There are two different kinds of values in programming languages: primitive values and reference values. Strings, numbers, booleans, `undefined`, and `null` are all primitive values whereas arrays are reference values.

  Based on the examples above, take a moment to try and write your own explanation of the differences between the two. Feel free to spend more time exploring both in the Repl.

  > Your answer…

- Take a look at the following code. Based on your understanding of primitives and reference types so far, attempt to evaluate the code below. Make a guess and then run the code.

  ```js
  let companies = ["Google", "Citi", "Uber"];
  let partners = companies;
  let citi = companies[1];
  citi += " Foundation";
  console.log(companies, partners);
  ```

  Did your guess turn out to be true? Describe why or why not.

  > Your answer…

- In the examples above, modifying an array through `.push()` modifies the reference. Functions and methods which mutate a reference type are called destructive.

  This is in contrast to other code which is non-destructive. For example, in the code below a value is being accessed in the `companies` array. Nothing about the array is being mutated in this code.

  ```js
  let companies = ["Google", "Citi", "Uber"];
  console.log(companies[1]); //> "Citi"
  ```

  Given what you’ve learned above, do you believe calling `.length` on an array is destructive or non-destructive?

  > Your answer…

## Exercise

Take a moment and mentally evaluate the code below before you run it. For each of the situations below, anticipate what will be logged. Then, run your code to check your answers.

Once you are done, check-in with an instructor and ask them any questions you may have.

```js
// 1.
let companies = ["Lyft", "Uber", "Google", "DuckDuckGo"];
let searchEngines = companies;
searchEngines.push("Bing");
searchEngines.shift();
searchEngines.shift();
console.log(companies, searchEngines);

// 2.
let employeeCount = [200, 5000, 1000];
let first = employeeCount[0];
first += 100;
console.log(employeeCount);

// 3.
let companiesAndEmployees = [
  ["Honey", 250],
  ["AirBnB", 5500],
  ["Sonos", 3100],
];
let sonos = companiesAndEmployees[2];
sonos[1] += 50;
console.log(companiesAndEmployees);
```
