# NodeJS Modules: Imports and Exports

# Topics
- What are Node Modules?
- Types of Modules?
# Lesson

## What are Node Modules?

A module in NodeJS is a simple or complex functionality organized into it's own file. It can be a library that does intense math calculations or a library that does cryptography. Each module plays it's own purpose and role. Each module solves unique problems.

As your node apps start getting bigger and more complex, organizing them starts becoming more important. Luckily, `node.js` has a built-in module system that makes it easy to organize large apps and pieces of code into multiple files. In node.js, each separate `js` file is essentially a separate module.

Basically, the module system lets one `.js` file interact with another `.js` file, and do things like share functions, objects, and variables. Let's take a look at how it works.


## Types of NodeJS Modules

1. **Core Modules:** These are modules you can import without any special installation. It already comes packaged with NodeJS.
2. **Local Modules:** These are modules you define and create. You then can break your project up into modular components and include functionality when needed.
3. **3rd Party Modules:** These are modules made and published by other developers. You install them to your project and utilize them when needed.

## Importing in Node's Module System

There are two key concepts for importing and exporting modules: `require` and `module.exports`.

You can use the `require` keyword to import other modules. You'll typically save the imported modules as a variable so you can use it elsewhere in your app. To import another file in your project, you'll need to enter the file's path as an argument to `require`. For example, if you have a `math-module.js` file and want to import it into a different file in the same folder, you would do the following:

```js
const mathModule = require('./math-module.js');
```

Note: you can name the variable whatever you want. Also, you can optionally omit the `.js` string at the end of the filename, and it will still work.

## Exporting in Node's Module System


Importantly, you also need to export things from the files that you want to import in. To export modules you'll need to use the special `module.exports` keyword. Every time you export something you are exporting an object.

There are a few different ways to structure your exports. All of the below essentially do the same thing:

**1**

```js
const sum = (a, b) => a + b;

const multiply = (a, b) => a * b;

module.exports = {
  sum: sum,
  multiply: multiply
}
```

**2**

With ES6 [shorthand property names](http://es6-features.org/#PropertyShorthand)

```js
const sum = (a, b) => a + b;

const multiply = (a, b) => a * b;

module.exports = {
  sum,
  multiply
}
```

**3**

```js
module.exports = {
  sum: (a, b) => {
    return a + b;
  },
  multiply: (a, b) => {
    return a * b;
  }
}
```

**4**

```js
function sum(a, b) {
  return a + b;
}

function multiply() {
  return a * b;
}

module.exports.sum = sum;
module.exports.multiply = multiply;
```

**5**

```js
module.exports.sum = (a, b) => a + b;
module.exports.multiply = (a, b) => a * b;
```

## Exercises

- [Modules Exercises](exercise.md)

## Project

- [Create a module](project.md)