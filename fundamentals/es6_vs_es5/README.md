# ES6

## Standards
FSW.1

## Objectives


## Sources

* [ES6 Features](http://es6-features.org)
* [Exploring ES6 - About ECMAScript 6 (ES6)](http://exploringjs.com/es6/ch_about-es6.html)
* [Exploring ES6  - Core ES6 Features](http://exploringjs.com/es6/ch_core-features.html)
* [Just Another Introduction to ES6](https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f)

## Lesson

### About ECMAScript 6 (ES6)

JavaScript (a.k.a. ECMAScript) is designed by a committee called TC39 (Ecma Technical Committee 39). Among the members of TC39 are all major browser vendors (Google for Chrome, Mozilla for Firefox, Microsoft for IE and Edge, Apple for Safari).

#### Writing ES6 in Browsers

Upgrading our javascript code is **challenging**:

* Some very **old code** exists on the web. Removing support for old features would result in many websites breaking. Therefore, new javascript versions add features, but **nothing is removed**.

* We want our code to run on **all browsers**. Also, many users have old versions of browsers. If we want to use ES6 (or later versions) in our code, we have two options:
1. We can **wait** until no one in our target audience uses a non-ES6 engine anymore.
2. We can **compile** ES6+ to ES5 and use it now. This will be discussed later on.

#### ES6 in Node

* Since node runs on the developer's machine, we do not depend on browsers or users. To support much of ES6, the developer simply needs to upgrade their version of node. [Check node.green for a compatibility table](http://node.green/).

#### ES2015

The official name of ES6 is ES2015, but ES6 is the name that people know and use.

After ES6, ECMAScript editions are created via a new process and a yearly release cycle. So - ES7 is ES2016, ES8 is ES2017, etc.

#### ES5 -> ES6

ES6 is a superset of ES5. All the code you've been writing so far is ES6.

#### Why we still learn ES5

* ECMAScript 6 is a **superset** of ECMAScript 5 – new JavaScript versions must never break existing code.

* Since we will often need to compile ES6 code to to ES5 (for compatibility reasons), it is useful to understand the output of the compilation process.

* Also, it is **crucial** to be able to understand older javascript code, since it exists everywhere on the web.

### ES6 Features

#### From `var` to `let`

* [Source: let, by Mozilla Contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

Like `var`, `let` is used to declare a new variable. The difference is in **scoping**: A variable declared with `var` exists either globally or in the scope of a function. A variable declared with `let` exists in the **block of code** (surrounded by curly braces) in which it was created.

When using `let`, there is less concern with re-using variable names:

```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

#### Temporal Dead Zone with `let`

Variables declared with `let` **do not move** to the top of the current execution context. Referencing the variable in the block before the initialization results in a ReferenceError (contrary to a variable declared with var, which will just have the undefined value).

```js
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2;
}
```

<a name="letconst"></a>

#### From `let` to `const`

* [Source: const, by Mozilla Contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

Variables declared with the `const` keyword are block-scoped, like variables defined using `let`. However, we **cannot assign** a new value to the variable. When declaring a constant variable you must specify its value. Which makes sense, given that it can't be changed later.

The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable **cannot be reassigned**. For example, in the case where the content is an object, this means the object's contents (e.g. its parameters) can be altered.

```js
// define FAV_NUM as a constant and give it the value 7
const FAV_NUM = 7;

// this will throw an error - Uncaught TypeError: Assignment to constant variable.
FAV_NUM = 20;

// throws an error - Uncaught SyntaxError: Missing initializer in const declaration
const FOO;

// const also works for objects
const MY_OBJECT = {'key': 'value'};

// attempting to overwrite the object throws an error - Uncaught TypeError: Assignment to constant variable.
MY_OBJECT = {'OTHER_KEY': 'value'};

// however, object keys are not protected,
// so the following statement is executed without a problem
MY_OBJECT.key = 'otherValue';

// if you don't want this to happen, use Object.freeze() to make an object immutable

// the same applies to arrays
const MY_ARRAY = [];

// it's possible to push items into the array
MY_ARRAY.push('A'); // ["A"]

// however, assigning a new array to the variable throws an error - Uncaught TypeError: Assignment to constant variable.
MY_ARRAY = ['B'];
```

#### Arrow Functions

##### Shorter function syntax

```js
var animals = [
  'dog',
  'cat',
  'giraffe',
  'moose'
];

animals.map(function(animal) {
  return animal.length;
}); // [3, 3, 7, 5]

animals.map((animal) => {
  return animal.length;
}); // [3, 3, 7, 5]

animals.map(animal => animal.length); // [3, 3, 6, 5]
```

#### Function Declaration

When declaring functions, we can **combine** arrow functions and the `const` keyword. For example, consider the following code in ES5:

```js
function getEvens(arr){
  return arr.filter(function(num){
    return num % 2 === 0;
  })
}
```

This can translate to:

```js
function getEvens(arr){
  return arr.filter(num => num % 2 === 0);
}
```

Which can be further translated to

```js
const getEvens = (arr) => {
  return arr.filter(num => num % 2 === 0);
}
```

Which can be boiled down even further. When the code within the function boils down to a single value, we can remove the curly braces and the `return` keyword, and the expression will become the function's return value. Consider the following simple example:

```js
const add = (a, b) => a + b;

const double = num => num + num;
```

Both `a + b` and `num + num` evaluate to a single value. So in both cases we can omit the curly braces and the `return` keyword. In the `getEvens` function, `arr.filter` will return a single value - an array. That array will then become the return value of `getEvens`.

```js
const getEvens = arr =>
  arr.filter(num => num % 2 === 0);
```

Note that a function declared with `const` or `let` is **not hoisted**. Also, be mindful of the length of each line in your code.

#### No separate `this`

A functions declared with the `function` keyword defines its own `this` value (a new object in the case of a constructor, `undefined` in strict mode function calls, the base object if the function is called as an "object method", etc.)

Consider the following object:

```js
var person = {
  name: 'Chris'
  age: 0
}

person.growUp = function(){
  var that = this;

  // the callback to set interval will not have access to the person object's `this`.
  setInterval(function() {
    // the callback refers to the `that` variable of which
    // the value is the expected object.
    that.age++;
  }, 1000);
}
```

An arrow function **does not** have its own this; the this value of the enclosing execution context is used. Thus, in the following code, the this within the function that is passed to setInterval has the same value as this in the enclosing function:

```js
person.growUp = function(){

  setInterval(() => {
    // `this` properly refers to the person object
    this.age++;
  }, 1000);
}

var p = new Person();
```

### Method Definitions

* source: [Method definitions by Mozilla Contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)

ES6 introduces a **shorter syntax** for method definitions when creating objects. It is a shorthand for a function assigned to the method's name.

Given the following code in ES5:

```js
var dog = {
  bark: function() {
    /* code */
  },
  speak: function(words) {
    console.log('the dog says: ', words)
  }
};
```

You can now write:

```js
let dog = {
  bark() {
    /* code */
  },
  speak(words) {
    console.log('the dog says: ', words)
  }
};
```

### Template Literals

* [Source: Template literals, by Mozilla Contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

**Template literals** allow you to easily create multi-line strings and to use [string interpolation](https://en.wikipedia.org/wiki/String_interpolation) (see below).

#### Multi-line strings

Any new line characters are part of the template literal. Using normal strings, you would have to use the following syntax in order to get multi-line strings:

```js
let multiline = 'string text line 1\n' +
                'string text line 2';
console.log(multiline)
// "string text line 1
// string text line 2"
```

To get the same effect with multi-line strings, you can now write:

```js
let multiline = `string text line 1
string text line 2`;
console.log(multiline)
// "string text line 1
// string text line 2"
```

This is especially useful for creating strings that represent HTML:

```js
const HTML = `
    <!doctype html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
    </body>
    </html>`;
```

#### Embedding Expressions in Strings

In order to **embed expressions** within normal strings, you would use the following syntax:

```js
var a = 5;
var b = 10;
console.log('Fifteen is ' + (a + b) + ' and not ' + (2 * a + b) + '.');
// "Fifteen is 15 and not 20."
```

With template literals, you are able to embed values like this in a more readable way:

```js
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);
// "Fifteen is 15 and not 20."
```
