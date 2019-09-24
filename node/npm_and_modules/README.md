# NPM and Modules

# Topics
- What is NPM?
- Package Dependencies
- What are Node Modules?
- Types of Modules?

# Lesson

# 1. What is NPM?

One of the most powerful features of NodeJS is its package management system. You've seen how easy it is to create modules. Thousands of people have taken advantage of this by creating their own modules and sharing them with the world via npm.

npm (which stands for node package manager) is the best way to install, share and distribute those modules (aka packages). You can checkout the [npm website here](https://www.npmjs.com/) and a list of some of the [most popular packages here](https://www.npmjs.com/browse/star).

# 2. Adding Package Dependencies

Often times you will need to install many 3rd Party modules from NPM. There is a special file called `package.json` which will hold all your dependencies. There's two ways package.json can be created.

### npm init

To use npm, begin by creating a new folder and navigating to it with the terminal. Now run the command `npm init`, which will create a `package.json` file in the current folder. The `package.json` file keeps track of all of the packages you have installed.

### npm install

To install a package, you need to enter `npm install <name-of-package> --save`, where you replaced <name-of-package> with the specific package you want to install. You can find the package names on the npm website.

This install action will also create your `package.json` if it doesn't exist already.

Let's check out a few npm packages:

* [chalk](https://www.npmjs.com/package/chalk)
* [figlet](https://www.npmjs.com/package/figlet)

## package.json file

The `package.json` file is automatically created when you run the  `npm init` command. The `package.json` file basically just keeps track of all of the node modules that you've installed. When you run the `npm install` command with the special `--save` argument those modules will automatically be saved in your `package.json` file.


# 3. Node Modules

A module in NodeJS is a simple or complex functionality organized into its own file. It can be a library that does intense math calculations or a library that does cryptography. Each module plays its own purpose and role. Each module solves unique problems.

As your node apps start getting bigger and more complex, organizing them starts becoming more important. Luckily, `node.js` has a built-in module system that makes it easy to organize large apps and pieces of code into multiple files. In node.js, each separate `js` file is essentially a separate module.

Basically, the module system lets one `.js` file interact with another `.js` file, and do things like share functions, objects, and variables. Let's take a look at how it works.


## Types of NodeJS Modules

1. **Core Modules:** These are modules you can import without any special installation. It already comes packaged with NodeJS.
2. **Local Modules:** These are modules you define and create. You then can break your project up into modular components and include functionality when needed.
3. **3rd Party Modules:** These are modules made and published by other developers. You install them to your project and utilize them when needed.

# 4. Importing in Node's Module System

There are two key concepts for importing and exporting modules: `require` and `module.exports`.

You can use the `require` keyword to import other modules. You'll typically save the imported modules as a variable so you can use it elsewhere in your app. To import another file in your project, you'll need to enter the file's path as an argument to `require`. For example, if you have a `math-module.js` file and want to import it into a different file in the same folder, you would do the following:

```js
const mathModule = require('./math-module.js');
```

Note: you can name the variable whatever you want. Also, you can optionally omit the `.js` string at the end of the filename, and it will still work.

# 5. Exporting in Node's Module System


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

## Resources

* [EJS: Installing with NPM](http://eloquentjavascript.net/20_node.html#h_J6hW/SmL/a)
* [NPM - Official Docs](https://docs.npmjs.com/)
