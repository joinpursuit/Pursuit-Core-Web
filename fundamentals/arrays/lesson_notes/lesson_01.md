# Arrays, Standard Operations

## Setup

Please complete the following before the lesson begins:

- Fork this gist. Then, if you wish to take notes in the gist itself, click the “Edit” button.
- Open and then fork this [Replit](https://replit.com/@bwreid/Arrays-Part-I).
- Complete the Warmup Questions & Tasks detailed at the top of the Replit.

## Learning Objectives

By the end of this lesson you will be able to:

- Describe the purpose of arrays and their unique properties.
- Create new array literals with open and closing brackets.
- Access elements of an array at a given index.
- Access the length of an array.
- Use array methods to remove elements from the front and back of an array.
- Use array methods to add elements to the front and back of an array.
- Assign values in an array at a particular index with bracket notation.

## Guiding Questions

- What can arrays do that strings, numbers, booleans, undefined, and null cannot do?

  > Your answer…

- Arrays are collections of elements. What kinds of data types can be elements within in array?

  > Your answer…

- Take a look at the `teaOptions` array below. What characters let you know that this is an array?

  ```js
  let teaOptions = ["Earl Grey", "Jasmine", "Mint"];
  ```

  > Your answer…

- How can you determine the length of an array without manually counting all of the elements inside of the array?

  > Your answer…

- At the bottom of your Repl.it, copy and paste the following code. Before pressing the “Run” button, consider what you think will happen. Then, press “Run” to confirm your hypothesis. Did you guess right?

  ```js
  console.log([hobby1, age1, hobby2]);
  ```

- In your Repl.it, create a new variable with a name of `myArray`. Then, assign it the value of an array that includes five elements. You may use the existing variables to populate the array.

  If you wanted to access the first item in the array, how would you do so?

  > Your answer…

- Arrays are indexed starting at 0. If your array has a length of 5, what is the index of the last element in the array? How can you use the array’s length to calculate this?

  > Your answer…

- Some array methods can pull items out of an array from different positions. For example, copy the code below into your Repl.it. Before running it, mentally evaluate the code and make a guess as to what will be logged. Then, run the code.

  Did you guess right? What does the `.pop()` method do? What value does the `.pop()` method return?

  ```js
  let teaOptions = ["Earl Grey", "Jasmine", "Mint"];
  let result = teaOptions.pop();

  console.log(teaOptions);
  console.log(result);
  ```

  > Your answer…

- Overwrite the code above with the code below. Before running it, mentally evaluate the code and make a guess as to what will be logged. Then, run the code.

  Did you guess right? What does the `.push()` method do? What values does the `.push()` method return?

  ```js
  let teaOptions = ["Earl Grey", "Jasmine", "Mint"];
  let result = teaOptions.push("Genmai Cha", "Darjeeling");

  console.log(teaOptions);
  console.log(result);
  ```

> Your answer…

- What will the following code do? Why so?

  ```js
  let teaOptions = ["Earl Grey", "Jasmine", "Mint"];
  teaOptions.push("Chai").pop();
  console.log(teaOptions);
  ```

  > Your answer…

- It’s also possible to manually assign a spot in an array using bracket notation. Try running the following code to see how it works.

  ```js
  let teaOptions = ["Earl Grey", "Jasmine", "Mint"];
  teaOptions[3] = "Darjeeling";
  console.log(teaOptions);
  ```

  What would you expect to happen if instead assigning the value `"Darjeeling"` at the 3rd index, you instead did so at the 2nd? What about at 5th?

  Try each of these out and then describe your findings.

  > Your answer…

## Exercise

Clear out your Repl.it and then copy the code below into it. Underneath each comment, write a line of code that satisfies the directions.

Once you are done, check-in with an instructor.

```js
let names = [];

// 1. Add your name to the `names` array with an array method.

// 2. Add a single classmate's name to the front of the `names` array using the `.unshift()` method.

// 3. Add three classmate's names to the end of the `names` array at the same time.

// 4. Remove the last two classmates from the end of the array.

// 5. Print out your name by accessing its value in the array.

// 6. Change the last classmate's name to a different name using bracket notation. To access the last element in the array, make sure to use the `.length` property.

// 7. Remove the classmate from the front of the array using the `.shift()` method. Then, add it to the end of the array. Consider how you can do this without having to retype the person's name.

console.log(names);
```
