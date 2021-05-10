# Arrays, Common Array Methods

## Setup

Please complete the following before the lesson begins:

- Open and then fork this [Replit](https://replit.com/@bwreid/Arrays-Part-II).
- Complete the Warmup Questions & Tasks detailed at the top of the Replit.

## Learning Objectives

- Use `.slice()` to create a new array that is a subsection of a larger array.
- Use `.splice()` to mutate an existing array.
- Use `.split()` to convert a string into an array.
- Use `.join()` to convert an array into a string.

## Guiding Questions

- The `.slice()` method returns a shallow copy of an array. When given one or two arguments, it can return an array that is a subsection of the array its called on.

  Copy the example below into your Replit and then press the “Run” button.

  ```js
  let coffeeAttributes = ["grapes", "tea", "chocolate"];
  let result = coffeeAttributes.slice();
  console.log("Coffee Attributes:", coffeeAttributes);
  console.log("Result:", result);
  console.log("Are they equal?", coffeeAttributes === result); // false
  ```

  Why is `false` logged to the console? What does calling `.slice()` without any arguments do?

- In the example above, add an argument of `1` to the `.slice()` method, like so:

  ```js
  let result = coffeeAttributes.slice(1);
  ```

  How is `result` different than before?

- In the example above, update the arguments of `.slice()` so that it looks like the following:

  ```js
  let result = coffeeAttributes.slice(0, 2);
  ```

  How is `result` different than before?

- Take a moment to describe the difference between the first and second argument of `.slice()`, in your own words.

- Is `.slice()` a destructive or non-destructive array method? How do you know?

- The `.splice()` method is very similar to `.slice()`. Update your example so that it looks like the code below.

  ```js
  let coffeeAttributes = ["grapes", "tea", "chocolate"];
  let result = coffeeAttributes.splice();
  console.log("Coffee Attributes:", coffeeAttributes);
  console.log("Result:", result);
  ```

  With no arguments, does `.splice()` work any differently than `.slice()`? If it does, how so?

- In the example above, add an argument of `1` to the `.splice()` method, like so:

  ```js
  let result = coffeeAttributes.splice(1);
  ```

  With a single argument, does `.splice()` work any differently than `.slice()`? If it does, how so?

- In the example above, update the arguments of `.splice()` so that it looks like the following:

  ```js
  let result = coffeeAttributes.splice(0, 2);
  ```

  With two arguments, does `.splice()` work any differently than `.slice()`? If it does, how so?

- In the example above, update the arguments of `.splice()` so that it looks like the following:

  ```js
  let result = coffeeAttributes.splice(1, 2, "hazelnut", "jasmine");
  ```

  After running the code above, you may be surprised at the result. Take a moment to experiment with the code to better understand how `.splice()` works. Then, in your own words, explain how the different ways the `.splice()` method works.

- Is `.splice()` a destructive or non-destructive array method? How do you know?

- The `.split()` method is not called on arrays but is instead called on strings. Run the code below and see if you can figure out how it works.

  ```js
  let coffeeAttributes = "grapes, tea, chocolate";
  let result = coffeeAttributes.split(", ");
  console.log("Coffee Attributes:", coffeeAttributes);
  console.log("Result:", result);
  ```

  What data type does the `.split()` command return? How would you describe the purpose of the argument that is passed into the `.split()` method?

- Take a look at the following code. Before running it, mentally evaluate the code and anticipate what you think will happen.

  ```js
  let coffeeAttributes = "grapes, tea, chocolate";
  let result = coffeeAttributes.split(", ").splice(0, 1, "hazelnut");
  console.log("Result:", result);
  ```

  Did it work as expected? Why or why not?

- The `.join()` method works similar to the `.split()` method, except it can be called on arrays. Run the example below to see how it works.

  ```js
  let coffeeAttributes = ["raspberry", "floral", "honey"];
  let result = coffeeAttributes.join(", ");
  console.log("Result:", result);
  ```

  What data type does the `.join()` command return? How would you describe the purpose of the argument that is passed into the `.join()` method?

- Take a look at the following code. Before running it, mentally evaluate the code and anticipate what you think will happen.

  ```js
  let coffeeAttributes = "grapes, tea, and chocolate";
  let result = coffeeAttributes.split(" and ").join(" ").split(", ");
  console.log("Result:", result);
  ```

  Did it work as expected? Why or why not?

## Exercise

Solve each of the tasks below, as described in the comments.

```js
// 1. Transform the `listing` string into an array that contains five strings, each one representing a tea that is available.
let listing =
  "The following teas are available: mint, pu-erh, oolong, darjeeling, jasmine";
let availableTeas = null; // Update this variable.
console.log("Available Teas:", availableTeas);

// 2. Update the `coffeeOrders` array so that the special order appears as the second item (i.e. index of 1) in the array.
let coffeeOrders = ["small drip", "medium drip with milk", "latte"];
let specialOrder = "americano";
console.log("Coffee Orders:", coffeeOrders);

// 3. Transform the array below into the following string:
// "Our decaf teas are: Chai Rooibos, Peppermint, and Decaf Vanilla."
let teas = ["Chai Rooibos", "Peppermint", "Decaf Vanilla"];
let response = "Our decaf teas are:"; // Update this variable.
console.log(response);
```
