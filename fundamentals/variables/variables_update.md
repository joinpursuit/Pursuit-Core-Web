# Variables

## Goals

* Understand the difference between a statement and an expression. 
* Independently define, assign value to, and modify variables. 
* Understand what `state` means 
* Differentiate between `var`, `let` and `const` for variable declaration

## Vocabulary

* expression vs statement
* variable
  * definition
  * assignment
* state
* the `undefined` type
* keyword

## Expressions

In the previous lesson we only used _expressions_ in our code. But on their own, expressions don't really do anything. We can write the following program, using `;` to indicate the end of a line.

```js
1 + 1;
"cat";
"bat" + "man";
```

Each of the expressions will be evaluated, return a value, and then get discarded. None of the expressions will have any effect on anything.

## console.log

The first kind of effect we need is logging text to the screen. We have been using the node REPL, where the value returned by an expression was logged for us. To write programs, however, we will be creating files in which we put our javascript code. When running a file with the code above, nothing will get logged. In order to log something in a javascript file, we will need to use the `console.log` function. This will print (**log**) whatever we type inside the parentheses to your terminal window (the **console**). It is important to note that `console.log` prints information to the screen but _does not_ return anything. The return value of `console.log` is `undefined`. If you wanted to do `console.log(2 + 2)` it would simply print `4` to the screen--you could not then use the `4` to do something else.

```js
// running a file:
console.log("bat" + "man")
// "batman"

// using the node REPL:
console.log("bat" + "man")
// "batman"
// => undefined
```

1. Create a folder called variables 
<details>
  <summary>
  Hint   
 </summary>
 mkdir variabls
</details>

2. cd into the directory and then create a file called test.js. 
3. Copy the previous code into the file. 
4. Now run your file by entering `node test.js` in your terminal. 

## Creating a variable

To save values in the computer's memory, we use **variables**. A variable is basically a container in which we can store values to be later retrieved. To create a variable, we use the keyword `var`, `let` or `const`, followed by the name of the variable. In JavaScript, we name variables using camelCase, which means that there are no spaces or underscores in the name and that every first letter of each word is capitalized except for the first word: thisIsUsingCamelCase. Other languages, like Ruby, use snake_case to name variables: this_is_using_snake_case. If you're writing in JavaScript (which you are :wink:), make sure you're _always_ using the standard camelCase style convention.

```js
var myVarVariable;
let myLetVariable;
const myConstVariable = "I used const!";
```

What do you think would be logged if we ran `console.log(myVarVariable)`?
What about `console.log(myLetVariable)` and `console.log(myConstVariable)`?

<details>
<summary> Answer </summary>
`myVarVariable` and `myLetVariable` both currently log `undefined`. Then we have `myConstVariable` that logs the string, "I used const!". What gives?
</details>

### Assigning a value

A variable is really a placeholder for a value that is stored somewhere in the computer's memory. We can assign a value to a variable by using the assignment operator, `=`. If we don't assign the variable to a value, as we saw above, it will be `undefined`. To get back the value we assigned, we simply need to write the variable's name. The name can be used by itself, or as part of an expression.

```js
const myCat = 'Tom'
let myAge = 25
console.log(myAge)
// 25
```

You would also receive an error if you tried to declare a `const` without assigning it a value.
```js
const myConstVariable
// => Uncaught SyntaxError: Missing initializer in const declaration
```

In later lessons we will explore the differences between `let`, `const` and `var` in greater depth but for now just know that you should be using `let`, not using `var`, and using `const` for variables you do not want to change.

### Using Variables

Now what are some things we can _do_ with our variables? Let's explore different ways we can interact with our variables and use them in different contexts.

```js
const myCat = 'Tom'
console.log(myCat)
// Tom

console.log('The name of my cat is ' + myCat)
// The name of my at is Tom
```

We can use variables as the left hand and right hand sides of any comparison operator:

```js
let num1 = 2
let num2 = 4
console.log(num1 === num2)
// false

console.log(num2 >= num1 + 2)
// true

console.log(num1 + num2 === 6)
// true
```

### Statements and Expressions

Variable assignment is our first example of a <b>statement</b>. When we assign a value to a variable, nothing visible happens. Instead, the <b>state</b> of our program changes. <b>State</b> is everything that's stored in memory while a program runs. In general, an expression returns a value, while a statement changes the programs state. When using the assignment operator, the right hand side is actually an expression. This means that we are not limited to writing a single value.

```js
let myNumber = 2 * 4 + 2
console.log(myNumber)
```
<details>
<summary>What do you think `myNumber` will be equal to?</summary>
When running the code above, the expression to the right of the `=` operator will first be evaluated to `10` and then assigned to the variable `myNumber`. We can also use the value of existing variables to create new ones.
</details>

```js
let num1 = 4
let num2 = 8
let sum = num1 + num2
```
<details>
<summary>What do you think `sum` will be equal to?</summary>
`sum` will equal 12 because 4 + 8 is equal to 12.
<summary>What do you think `sum` will equal if we changed the value of `num1` to 10?</summary>
`sum` will still equal 10! When we declared `sum`, `num1` was equal to 4 so no matter how many times we change `num1` or `num2`, `sum` will not change.
</details>

> In the following code, what would be logged to the screen?

```js
let string = 'My favorite number is '
let number = 42
let sentence = string + number
console.log(sentence)
```

### `undefined`

As we saw above, if we don't assign a value to a variable, it will hold the value `undefined`. This is not a description but an actual value, one we can write in the node REPL:

```js
> undefined
undefined
```

## Modifying Variables

We can assign a new value to a variable at any time by using the assignment operator. This will overwrite the old value of that variable. `let` is a useful and flexible way to declare variables because it allows you to change what you've stored in the variable. For example, your age will change every year so you'd probably like to update that variable to match your age. To redefine a variable you would do the following:

```js
let myAge = 25
myAge = 26
```

Now the `myAge` variable would be equal to `26`. Notice how we didn't use `let` to redefine the variable--this is because `let` is specifically used to **create** the variable. Once it's made, you can change it as you'd like. In older versions of the JavaScript language, you could only use `var` to declare variables. While you can still use `var` to declare variables, it is preferred to use `let` or `const`.

```js
let day = 'Monday'
console.log('Today is ' + day)
day = 'Tuesday'
console.log('Tomorrow will be ' + day)
```

While `let` is flexible, `const` is not. `const` is used when declaring variables we **do not** want to change and want to keep **constant**. We used `const` for `myCat` because we don't expect `myCat` to change anytime soon. If we tried to redefine the `myCat` variable, you would receive an error:

```js
const myCat = 'Tom'
myCat = 'Thomas'
//=> Uncaught TypeError: Assignment to constant variable.
```

We may want to use the current value when modifying a variable. For example, we may want to add some numeric value to an existing number. To do this, we can use the variable's name to the right hand side of the assignment operator:

```js
let myNumber = 2
myNumber = myNumber + 1
console.log(myNumber)
// 3
```

Since the right hand side of `=` is an expression, it will first be evaluated to a single number. This number will then be assigned to the variable `myNumber`.

> Ex. write the step-by-step evaluation of the third line in the code below:

```js
let sentence = 'My name is '
let name = 'Mia'
sentence = sentence + name
console.log(sentence)
// My name is Mia
```

### Updating Variables Shorthand

There is a shorter syntax to updating variables using their existing value. When we wish to add something to the variable's value, we may use the `+=` operator, as in `num += 1`. This is a shorthand for `num = num + 1`. The same works with `-=`:

```js
let num = 2
num += 6
// Num is 8
num -= 3
// num is 5
```

## Exercises

1. Age Calculator:
* Store your birth year in a variable.
* Store a future year in a variable.
* Calculate your 2 possible ages for that year based on the stored values.
* For example, if you were born in 1988, then in 2026 you'll be either 37 or 38, depending on what month it is in 2026.
* Log them to the screen like so: "I will be either NN or NN in YYYY", substituting the values.

2. Snack Supply Calculator:
* Store your current age in a variable.
* Store a maximum age in a variable.
* Store an estimated amount per day (as a number).
* Calculate how many you would eat total, from your current age until the maximum age.
* Log the result to the screen like this: "You will need NN to last you until the age of X".

3. Calculate properties of a circle, using the definitions [here](http://math2.org/math/geometry/circles.htm).
* Use google: find how to get the number `Pi` in JavaScript.
* Store a radius into a variable.
* Calculate the circumference based on the radius, and log "The circumference is NN".
* Calculate the area based on the radius, and log "The area is NN".

4. Temperature Converter:
* Store a celsius temperature into a variable.
* Convert it to fahrenheit and output "NN°C is NN°F".
* Now store a fahrenheit temperature into a variable.
* Convert it to celsius and output "NN°F is NN°C."
