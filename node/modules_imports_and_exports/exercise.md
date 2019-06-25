# NodeJS Modules: Imports and Exports - Exercises

## Setup

- Create a new folder.
- Add a `main.js` file to the folder.

### Math Module

- Add a `math-module.js` file to your folder
- In the `math-module.js` file add a function called `sum`. The `sum` function should take two arguments and return their sum.

Example:

```js
sum(3, 6); //returns 9
```

- Add a `module.exports` statement at the bottom of the `math-module.js` file.
- Add the `sum` function to `module.exports`.
- In the `main.js` file, use the `require` keyword to import the `math-module.js` file.
- Call the `sum` function from the `main.js` file and save the result to a new variable.
- Add a `console.log` statement that logs the saved variable.
- Open the terminal and run the `main.js` file. You should see the output from the `sum` function
- Add three more functions to the `math.module.js` file:
1. A `multiply` function (takes two arguments and returns their product).
2. A `divide` function (takes two arguments and returns the first argument divided by the second).
3. A `square` function (takes one argument and returns its square).

Examples:

```js
multiply(2, 5); //returns 10
divide(20, 10); //returns 2
square(5); //returns 25
```

- Add the `multiply`, `divide`, and `square` functions to `module.exports` in the `math-module.js` file.
- In the `main.js` file, use the use the imported `math-module.js` file to call the three new functions, and save the results as new variables
- Log the saved variable.
- Open the terminal and run the `main.js` file. You should see the output from all the functions.

### String Module

- Create a new file called `strings-module` that contains at least three string functions (for example: return the first letter of a string, reverse a string, etc.) of the choosing.
- Import the `string-module` into the `main.js` file and try calling and logging the functions from `string-module`.
- Can you also import the `string-module` into the `math-module` and use it in there? Or vice versa?

### Challenge - Modular: Files By Extension

The following is a code for an program that takes a user's input of a folder and an extension, and lists all the files in that folder that have the given extension.

```js
const fs = require('fs')
const path = require('path')

const folder = process.argv[2]
const ext = '.' + process.argv[3]

fs.readdir(folder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === ext) {
      console.log(file)
    }
  })
})
```

In a new folder, create the files `filterFiles.js` and `main.js`. 

1. Paste the above code into `filterFiles.js` and rewrite it as follows:

- Do not take any input from the user (i.e. remove lines that make use of the `process` object).
- Wrap the code in a function that takes as arguments a folder name, an extension, and a callback function.
- Change the `forEach` method call to `filter`: instead of logging the files, return a new array that contains only the files with the desired extension. Save the filtered array to a new variable.
- If there is an error while reading the folder, invoke the callback with the error.
- Otherwise, invoke the callback at the bottom of the `readDir` function with two arguments: `null` and the filtered file array.
- Export the function using `module.exports`.

2. In `main.js` do the following:

- Import the function from `filterFiles.js` as `filterFilesFn`.
- Read the input for folder and extension from the user (using the `process` object).
- invoke the function with the following arguments:
  - the folder
  - the extension
  - a callback function that takes as arguments an error object and a list. If the error object is not `null`, it logs the string: `'there was an error'` followed by the error. Otherwise, it logs the list, with each element in a separate line.