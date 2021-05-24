# NPM and Modules

# Objectives
- Understand what a Node Module is
- Implement correct syntax for importing and exporting modules
- Utilize NPM to install new packages
- Interpret a `package.json` file


## Key Vocabulary
- Module
- require
- module.exports
- NPM (Node Package Manager)
- Package
- Dependencies
- package.json

# Lesson

# Objective 1: Node Modules

A module in Node.js is a simple or complex piece of functionality organized into one or multiple files, that can be used throughout a Node.js application. In other words, it's a chunk of code that can be passed around! You will often hear the words <kbd>module</kbd>, <kbd>library</kbd>, and <kbd>package</kbd> used somewhat interchangeably. There are some differences between each, but we won't worry about that right now, we'll stick with the word <kbd>module</kbd>. A module can be code that does intense math calculations or code that tells a joke! A module can be self-created (by *you*!), or pulled into your code from another developer. Some `core` modules are even built into Node.js already. You can think of node modules as distinct chunks of functionality, like tools, each doing their own particular task.

## Types of Node.js Modules

1. <kbd>**Core Modules:**</kbd> These are modules you can use without any special installation. They already come packaged with Node.js. One very common core module is the `http` module!
2. <kbd>**Local Modules:**</kbd> These are modules *you* define and create. This helps us break up a project into modular components, aka smaller, distinct, chunks of code.
3. <kbd>**3rd Party Modules:**</kbd> These are modules made and published by other developers. You install them to your project and utilize them when needed.

As your node apps start getting bigger and more complex, organizing your modules starts becoming more important.

![Node Modules](assets/node-modules-jokes.png)
*It's easy for a project to end up with, well, a LOT of node modules!*

Luckily, `node.js` has a built-in module system that makes it easy to organize large apps and pieces of code into multiple files. In `node.js`, each separate `js` file is essentially a separate module.

The module system lets one `.js` file interact with another `.js` file, and do things like share functions, objects, and variables. Let's take a look at how it works.


`Check for Understanding:` Why do you think it's helpful to write `modular` code (code that is broken up into distinct modules)? What are some benefits?

<details><summary>Solution</summary>

  Modular code allows us to break down very large, complicated apps into small, manageable chunks. So, one benefit is `organization`. Instead of having one HUGE file with all our javascript, we can break it out into many files that can easily access each other. 
  It also allows us to easily re-use code throughout our project - `reusability`. It also helps us `encapsulate` code that we might only want to be accessed in certain places, but not everywhere!

</details>
<br>

`Check for Understanding:` Imagine you are building a To-Do list app to help keep yourself organized. What are some chunks of functionality that could be broken out into modules?

<details><summary>Solution</summary>

  Maybe there is a module for:
  - A single task view
  - A list of tasks view
  - Backing your tasks up to the cloud
  - Styling the text in your to-do list
  - Styling the header of the to-do list
  - Writing tests for your code 
  - ...and so much more!
</details>
<br>


# Objective 2: Importing + Exporting Modules

## Importing in Node's Module System

You can use the <kbd>`require`</kbd> keyword to import other modules into a file. You'll typically save the imported modules as a variable so you can use it elsewhere in your app. For example:

```js
const mathModule = require('./math-module.js');
```

In this case, we are importing another file (`math-module.js`) from our project as a module into our current file. We are able to just enter the file's path as an argument to <kbd>`require`</kbd> and it imports that file in as a module!
Note: you can name the variable whatever you want. Also, you can optionally omit the `.js` string at the end of the filename, and it will still work.

We can also import modules that are built into Node.js, for example, the [`assert`](https://nodejs.org/dist/latest-v10.x/docs/api/assert.html) module:

```js
const assert = require('assert');

let a = 1;
let b = 1;

// Use the module
assert.strictEqual(a, b)

```
In this case, we didn't pass a file path into <kbd>`require`</kbd>, we just passed the name of the Node.js built-in module. There are *tons* of helpful built-in modules!


## Exporting in Node's Module System

Importantly, you also need to export things from the files if you want to use them in other places. In short, in order to import something into a file, it has to have been exported from somewhere. To export modules you'll need to use the special <kbd>`module.exports`</kbd> keyword. Every time you export something it is exported as an object.

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
<br>

***

<br>

`Check for Understanding:` What's wrong with the following imports and exports?

**Problem 1**
```js
  function sayHello(a, b) {
    console.log('Hello!');
  }

  exports.sayHello = sayHello;
```
<details><summary>Solution 1</summary>

  The keyword is `module.exports` not just `exports`.
</details>
<br>

**Problem 2**

```js
  const htmlModule = require('./my-cool-website.html');
```
<details><summary>Solution 2</summary>

  `require()` is only used for importing in Javascript modules
</details>
<br>

**Problem 3**
```js
  const divide = (a, b) => a / b;

  const subtract = (a, b) => a - b;

  module.exports = [divide, subtract]
```
<details><summary>Solution 3</summary>

  Modules are always exported as objects! For example:
  ```js
  module.exports = {
    divide,
    subtract
  }
  ```
</details>
<br>





# Objective 3: Using NPM

<kbd>npm</kbd> (which stands for **n**ode **p**ackage **m**anager) is the best way to install, share and distribute 3rd Party Node.js modules. We are now going to start using the word <kbd>package</kbd>, which you can just think of as a 3rd Party module. You can check out the [npm website here](https://www.npmjs.com/) and a list of some of the [most popular packages here](https://www.npmjs.com/browse/star).

Imagine you need a bunch of fake data for an app you're making. Why write it yourself, when there's a package (called [faker.js](https://www.npmjs.com/package/faker)) for that! Or maybe you want to sprinkle some cute Kawaii illustrations into your React app, well there's a package ([react-kawai](https://www.npmjs.com/package/react-kawaii)) for that, too! 

One of the most powerful features of `Node.js` is its package management system, and how easy it is to create modules. Thousands of people have taken advantage of this by creating their own modules and sharing them with the world via <kbd>npm</kbd>!

## Adding Package Dependencies

Often times you will want to install many 3rd Party modules from NPM (unless you want to write all the code yourself). 

When you install 3rd Party modules into your project, they are referred to as <kbd>dependencies</kbd> (your project `depends` on them!). There is a special file called `package.json` which will hold all your dependencies. There are two ways `package.json` can be created:

***

## npm init

To use npm, begin by creating a new folder and navigating to it with the terminal. Now run the command `npm init`, which will create a `package.json` file in the current folder. The `package.json` file keeps track of all of the packages you have installed.

## npm install

To install a package, you need to enter `npm install <name-of-package> --save`, where you replace `<name-of-package>` with the specific package you want to install. For example:
```js
  npm install --save react-kawaii
```

You can find the package names on the [npm website](https://www.npmjs.com/).

This install action will also create your `package.json` if it doesn't exist already.


Here are a few other fun packages for you to check out:

* [chalk](https://www.npmjs.com/package/chalk)
* [figlet](https://www.npmjs.com/package/figlet)



`Check for Understanding:` Are `chalk`, `figlet`, and `react-kawaii` core, local, or 3rd Party modules?

<details><summary>Solution</summary>
  These are 3rd Party modules.
</details>
<br>

`Check for Understanding:` How would  you import in the `figlet` module to use it in your own project?

<details><summary>Solution</summary>
  
  First, in my terminal:
  ```js
  `npm install figlet --save`
  ```

  Then, at the top of the file where I'd like to use `figlet`:
  ```js
    const figlet = require('figlet')
  ```
</details>
<br>

# Objective 4: Interpret a `package.json` File

## package.json

The `package.json` file is automatically created when you run the  `npm init` command. The `package.json` file basically just keeps track of all of the node modules that you've installed. When you run the `npm install` command with the special `--save` argument those modules will automatically be saved in your `package.json` file.

Here's what one `package.json` file might look like:

```js
  {
    "name": "my_project",
    "version": "1.0.0",
    "description": "",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/mysteryauthor/my_project.git"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "chalk": "^4.1.1",
      "express": "^4.17.1",
      "figlet": "^1.5.0"
    }
  }
  ```
<br>

`Check for Understanding:`: What three modules have been installed in "my_project"?
<details><summary>Solution</summary>

- chalk
- express
- figlet

You can see them listed under "dependencies".
</details>


***

## Extra Resources

* [EJS: Installing with NPM](http://eloquentjavascript.net/20_node.html#h_J6hW/SmL/a)
* [NPM - Official Docs](https://docs.npmjs.com/)
