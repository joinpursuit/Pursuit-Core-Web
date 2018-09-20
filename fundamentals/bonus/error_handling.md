# Testing & Error Handling

## Links

* [MDN - Control Flow and Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
* [Eloquent Javascript - Bugs and Error Handling](http://eloquentjavascript.net/08_error.html)
* [Node - Assert](https://nodejs.org/api/assert.html)
* [Node - Errors](https://nodejs.org/api/errors.html)

## Lesson

The degree to which languages help you find mistakes varies. Some languages want to know the types of all your variables before even running a program, and will tell you right away when a type is used in a way that is not consistent. JavaScript considers types only when actually running the program, and even then, it allows you to do some things that don't make much sense, such as `let x = true * "giraffe"`.

There are some things that JavaScript does complain about. Writing a program that is not syntactically valid will immediately trigger an error. For example: `let x = ;` Other things will cause runtime errors, such as calling something that’s not a function:

```js
let x = 5;
x();
// TypeError: x is not a function
```

Or trying to access a property of an undefined value:

```js
let students = [{ name: 'John' }, { name: 'Kelly'}]
console.log(students[1].name)
// => 'Kelly'
console.log(students[4])
// => undefined
console.log(students[4].name)
// TypeError: Cannot read property 'name' of undefiend
```

Often, nonsense code will produce a `NaN` or `undefined` value. The mistake will manifest itself after the bogus value has traveled through several functions. It might not trigger an error at all but silently cause the program’s output to be wrong. Finding the source of such mistakes can be difficult.

### Strict Mode

JavaScript can be made a little more strict by enabling `strict mode`. This is done by putting the string `"use strict"` at the top of a file. For example:

```js
"use strict";

function greet(name) {
  greeting = "Hello ";
  // ReferenceError: greeting is not defined
  console.log(string + name)
}

greet('Elon')
```

Normally, when you forget to put `var` in front of your variable, as with `greeting` in the example, JavaScript will create a global variable and use that. In strict mode, however, there will be an error. There will not be an error, however, when a global variable with that name already exists:

```js
"use strict";

let greeting;

function greet(name) {
  // this will work
  greeting = "Hello ";
  console.log(string + name)
}

greet('Elon')
```

Another change in strict mode is the handling of the `this` keyword in functions that are not called as methods. (When functions *are* called as methods, `this` always points to the object that called that function). In non-strict mode, the following code results in an error:

```js
function Person(name) {
    this.name = name;
}

let p = Person("Ferdinand")
console.log(p)
// => undefined
```

Since we forgot to use the `new` keyword, the function `Person` will not return anything (i.e. will return `undefined`). The function will not define a `this` object either, but there will be no error because in non-strict mode, `this` will point at the global object by default. In strict mode, `this` be undefined inside functions by default. So, the same code as above will produce an error.

```js
"use strict";
function Person(name) {
    this.name = name;
    // TypeError: Cannot set property 'name' of undefined
}

let p = Person("Ferdinand")
console.log(p)
// => undefined

```

Strict mode will also produce an error when giving a function multiple parameters with the same name.

```js

"use strict";

function greet(name, name) {
  // SyntaxError: Duplicate parameter name not allowed in this context
  console.log("Hello " + name)
}
```

### Testing

We can test our programs by calling the same functions with different inputs. Let's look back to the Vector assignment:

```js
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
```

We can write a function to test if the code above works correctly, using the node `assert` module. This module has a `strictEqual` property, which is a function with the following signature:

#### assert.strictEqual(actual, expected[, message])

It takes an actual value, an expected value, and an optional message. If the actual and expected value are not strictly equal (i.e. `actual === expected` is `false`), then an error of type `AssertionError` will be thrown.

```js
let assert = require("assert");

function test1() {
  let p1 = new Vector(1, 2);

  assert.strictEqual(p1.x, 1, "p1.x should be 1");
  assert.strictEqual(p1.y, 2, "p1.y should be 2");
}

function test2() {
  let p1 = new Vector(1, 2);
  let p2 = new Vector(2, 4);
  let p3 = p1.plus(p2);

  assert.strictEqual(p3.x, 3, "p3.x should be 3");
  assert.strictEqual(p3.y, 6, "p3.y should be 6");
}

test1();
test2();
// → passed all tests
```

The above works, but the errors are hard to read:

1. We see the complete stack trace for the error.
2. We stop on the first test that failed.

### Try and Catch

Wrapping code in try-catch block lets us handle errors. When an error is caught, we decide what to do with it.

```js
function test1() {
  let p1 = new Vector(1, 2);

  assert.strictEqual(p1.x, 1, "p1.x should be 1");
  assert.strictEqual(p1.y, 2, "p1.y should be 2");
}

try {
    test1();
} catch (err){
    console.log(err)
}

```

The `AssertionError` object has three properties: `actual`, `expected`, and `message`. We can use only the `message` property to log a concise error for each test that fails:

```js
try {
    test1();
} catch (error){
    console.log(error.message)
}
```

We can do even better by changing the calls to `assert.strictEqual`:

```js
function test1(){
    let p1 = new Vector(1, 2);

    assert.strictEqual(p1.x, 1, "p1.x");
    assert.strictEqual(p1.y, 2, "p1.y");
}

try {
    test1();
} catch (error){
    console.log("--- Test Failed ---")
    console.log(error.message + " should be " + error.expected + " but is " + error.actual );
}
```

### Automating Tests

We can make a series of test functions, put them in an array, and then run them all, one after the other. We will wrap the function calls in try-catch blocks.

```js
function test1(){
    let p1 = new Vector(1, 2);

    assert.strictEqual(p1.x, 1, "p1.x");
    assert.strictEqual(p1.y, 2, "p1.y");
}

function test2() {
  let p1 = new Vector(1, 2);
  let p2 = new Vector(2, 4);
  let p3 = p1.plus(p2);

  assert.strictEqual(p3.x, 3, 'p3.x');
  assert.strictEqual(p3.y, 6, 'p3.y');
}

let tests = [test1, test2];

tests.forEach(function(test){
    try {
        test();
        passed += 1;
    } catch (error) {
        console.log("--- Test Failed ---")
        console.log(error.message + " should be " + error.expected + " but is " + error.actual );
        console.log(error.stack.split("\n")[1])
    }
})
```

We can also add counters to see how many tests passed and how many failed:

```js
function test1(){
    let p1 = new Vector(1, 2);

    assert.strictEqual(p1.x, 1, "p1.x");
    assert.strictEqual(p1.y, 2, "p1.y");
}

function test2() {
  let p1 = new Vector(1, 2);
  let p2 = new Vector(2, 4);
  let p3 = p1.plus(p2);

  assert.strictEqual(p3.x, 3, 'p3.x');
  assert.strictEqual(p3.y, 6, 'p3.y');
}

let tests = [test1, test2];

let passed = 0;
let failed = 0;

tests.forEach(function(test){
    try {
        test();
        passed += 1;
    } catch (error) {
        console.log("--- Test Failed ---")
        console.log(error.message + " should be " + error.expected + " but is " + error.actual );
        console.log(error.stack.split("\n")[1])
        failed += 1;
    }
})

console.log("---Total---")
console.log(passed + " passed")
console.log(failed + " failed")
```

Finally, the automated part can be put inside a function that takes the array of `test` functions, and performs the tests:

```js
function runTests(tests){
    let passed = 0;
    let failed = 0;

    tests.forEach(function(test){
        try {
            test();
            passed += 1;
        } catch (error) {
            console.log("--- Test Failed ---")
            console.log(error.message + " should be " + error.expected + " but is " + error.actual );
            failed += 1;
        }
    })

    console.log("---Total---")
    console.log(passed + " passed")
    console.log(failed + " failed")
}

```

Following this, we would only have to write the test functions:

```js
function test1(){
    let p1 = new Vector(1, 2);

    assert.strictEqual(p1.x, 1, "p1.x");
    assert.strictEqual(p1.y, 2, "p1.y");
}

function test2() {
  let p1 = new Vector(1, 2);
  let p2 = new Vector(2, 4);
  let p3 = p1.plus(p2);

  assert.strictEqual(p3.x, 3, 'p3.x');
  assert.strictEqual(p3.y, 6, 'p3.y');
}

let tests = [test1, test2];
runTests(tests)
```

### Going Forward

Going forward, we will talk about much better ways to tests our code. We will use testing libraries that great simplify writing and running tests. One such library is [jest](https://facebook.github.io/jest/).

[Click here for an example of using jest](https://repl.it/Ka5D/8).

### Exercise

This is what a jest `expect` statement looks like:

```js
let p1 = new Vector(1, 2);

expect(p1).toHaveProperty('x', 1);
expect(p1).toHaveProperty('y', 2);
```

Can you think of a way of recreating this particular functionality?
