# Arrays, Destructuring & Rest

## Setup

Please complete the following before the lesson begins:

- Fork this gist. Then, if you wish to take notes in the gist itself, click the “Edit” button.
- Open and then fork this [Replit](https://replit.com/@bwreid/Arrays-Part-III#index.js).
- Complete the Warmup Questions & Tasks detailed at the top of the Replit.

## Learning Objectives

- Use destructuring to declare multiple variables to parts of an array.
- Use the “rest” operator to assign part of an array to a variable.
- Combine arrays using the “spread” operator.

## Guiding Questions

- Extracting values from arrays is a common operation, particularly when you want to use those elements in a different way. For example, take a look at the example below.

  ```js
  let coffee = ["Ethiopia", "Desta Gola", 9.99];
  let origin = coffee[0];
  let name = coffee[1];
  let price = coffee[2];

  let statement = `The ${name} coffee from ${origin} costs $${price}.`;
  console.log(statement);
  ```

  Without running the code, what do you expect to be printed out?

  > Your answer…

- While the above is perfectly valid code, it can be done much quicker with destructuring. Destructuring allows you to assign multiple variables at the same time for each index of an array.

  ```js
  let [origin, name, price] = ["Ethiopia", "Desta Gola", 9.99];

  let statement = `The ${name} coffee from ${origin} costs $${price}.`;
  console.log(statement);
  ```

  The code above works the same as the earlier example.

  In your own words, describe what is occurring above. Consider describing the syntax as well as the result.

  > Your answer…

- Take a look at the code below which is indeed valid.

  ```js
  let coffee = [
    ["Ethiopia", "Desta Gola"],
    ["Peru", "Espíritu Cusco"],
    ["Ethiopia", "Wolde Hirbe Natural"],
    ["Colombia", "Yomar Quinlindo Micro Lot 2"],
  ];
  let [x, [y]] = coffee;
  ```

  What do you think the value of `x` will be in this case? What about `y`? Make a guess before running the code.

  > Your answer…

- Another helpful syntax tool is signified by three dots (i.e. `...`) and is called either the “spread” or “rest” operator, depending on its usage.

  In the example below, this code is used to grab the “rest” of the array and assign it to a variable.

  ```js
  let [origin, ...details] = ["Ethiopia", "Desta Gola", 9.99];
  console.log(origin, details);
  //> "Ethiopia" ['Desta Gola', 9.99];
  ```

  In the example below, this code is used to “spread” an array into another array. As opposed to ending up with an array inside of an array, you end up with each element next to one another.

  ```js
  let desta = ["Ethiopia", "Desta Gola", 9.99];
  let coffeeWithRating = [4.5, ...desta];
  console.log(coffeeWithRating);
  ```

  In your own words, describe what the `...` is doing in each of the above cases.

  > Your answer…

## Exercise

Use destructuring, rest, and spread to construct the arrays below. An example is included.

You should not need to use any array methods like `.push()` or `.pop()`.

```js
let origins = ["Ethiopia", "Peru", "Colombia"];
let names = [
  "Desta Gola",
  "Espíritu Cusco",
  "Wolde Hirbe Natural",
  "Yomar Quinlindo Micro Lot 2",
];
let prices = [8.99, 10.99, 12.99];

// Ex. [ "Ethiopia", "Desta Gola" ]
// let [ethiopia] = origins;
// let [desta] = names;
// let example = [ ethiophia, desta ];
// console.log(example);

// 1. [ "Peru", "Colombia" ]

// 2. [ 8.99, [ "Wolde Hirbe Natural", "Yomar Quinlindo Micro Lot 2" ] ]

// 3. [ "Wolde Hirbe Natural", "Yomar Quinlindo Micro Lot 2", 10.99, 12.99 ]
```
