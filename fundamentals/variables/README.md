[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Variables Lesson

Declaring, using, and modifying variables in Javascript!

## Learning Objectives

- Understand the difference between a statement and an expression.
- Independently define, assign value to, and modify variables.
- Understand what `state` means
- Differentiate between `var`, `let` and `const` for variable declaration

## Keywords

- expression vs statement
- variable
  - definition
  - assignment
- state
- the `undefined` type
- keyword

## Prerequisites

- Values and Types

---

## 1. Expressions

In the previous lesson we only used _expressions_ in our code. But on their own, expressions don't really do anything. We can write the following program, using `;` to indicate the end of a line.

```js
1 + 1
("cat")
"bat" + "man"
```

Each of the expressions will be evaluated (become a value), and then get discarded. None of the expressions will have any permanent ffect on anything.

## 2. console.log

The first kind of effect we need is to display text to the console. After all, we have to be able to see what we're doing.

Thus far, we have been using the node REPL, where the value returned by an expression was logged for us. To write programs, however, we will be creating text files that contain JavaScript. Javascript filenames end in `.js`

If we try to run a file with the code we looked at before, nothing will get logged. In order to log something in a JavaScript file, we need to use the `console.log` function. This will print (AKA **log**) whatever we type inside the parentheses to your terminal window (the **console**).

It is important to note that `console.log` prints information to the screen but _does not_ return / evaluate to anything itself. This gets at the difference between _returning_ and _logging_. When something returns something, it means that it evaluates to that and can be utilized by other code (for example, comparisons).

The return value of `console.log` is `undefined`. If you wanted to do `console.log(2 + 2)` it would simply print `4` to the screen - you could not then use the `4` to do something else.

```js
// running a file:
console.log("bat" + "man")
// => undefined, but it WILL print "batman" to the terminal

console.log("bat" + "man") === "bat" + "man"
// => false, because we're comparing undefined to "batman"
```

1. Create a folder called `variables`
<details>
  <summary> Hint </summary>
  <p>

```
mkdir variables
```

  </p> 
</details>

2. cd into the directory and then create a file called test.js.
3. Copy the previous code into the file.
4. Now run your file by entering `node test.js` in your terminal.

## 3. Creating a variable

To save values in the computer's memory, we use **variables**. A variable is a container in which we can store values to be later retrieved. To create a variable, we use the keywords `var`, `let`, or `const`, followed by the name of the variable.

In JavaScript, we name variables using camelCase, which means that there are no spaces or underscores in the name and that every first letter of each word is capitalized except for the first word: `thisIsUsingCamelCase`.

Other languages, like Ruby or Python, use snake case to name variables: `this_is_using_snake_case`. If you're writing in JavaScript (which you are :wink:), make sure you're _always_ using the standard camelCase style convention.

```js
var myVarVariable
let myLetVariable
const myConstVariable = "I used const!"
```

What do you think would be logged if we ran `console.log(myVarVariable)`?
What about `console.log(myLetVariable)` and `console.log(myConstVariable)`?

<details>
  <summary> Answer </summary>

`myVarVariable` and `myLetVariable` both currently log `undefined`. Then we have `myConstVariable` that logs the string, "I used const!". What gives?

</details>

## 4. Assigning a value

A variable is a placeholder for a value that is stored somewhere in the computer's memory. We can assign a value to a variable by using the assignment operator, `=`. If we don't assign the variable to a value, as we saw above, it will be `undefined`. To get back the value we assigned, we write the variable's name. The name can be used by itself or as part of an expression.

```js
const myCat = "Tom"
let myAge = 25
console.log(myAge)
// 25
```

You would also receive an error if you tried to declare a `const` without assigning it a value.

```js
const myConstVariable
// => Uncaught SyntaxError: Missing initializer in const declaration
```

In later lessons we will explore the differences between `let`, `const` and `var` in greater depth. For now just know that you should be using `const` for variables you do not want to change (thus constant), and `let` for everything else. You should not be using `var` (it's an old way of declaring variables).

## 5. Using Variables

Now what are some things we can do with our variables? Let's explore different ways we can interact with our variables and use them in different contexts.

```js
const myCat = "Tom"
console.log(myCat)
// Tom

console.log("The name of my cat is " + myCat)
// The name of my cat is Tom
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

## 6. Statements and Expressions

Variable assignment is our first example of a **statement**. When we assign a value to a variable, nothing visible happens. Instead, the **state** of our program changes. **State** is everything that's stored in memory while a program runs. In general, an expression returns a value, while a statement changes the program's state. When using the assignment operator, the right hand side is actually an expression. This means that we are not limited to writing a single value.

```js
let myNumber = 2 * 4 + 2
console.log(myNumber)
```

<details>
  <summary>What do you think <code>myNumber</code> will be equal to?</summary>

When running the code above, the expression to the right of the `=` operator will first be evaluated to `10` and then assigned to the variable `myNumber`.

</details>

---

We can also use the value of existing variables to create new ones.

```js
let num1 = 4
let num2 = 8
let sum = num1 + num2
```

<details>
  <summary>What do you think <code>sum</code> will be equal to?</summary>

`sum` will equal 12 because 4 + 8 is equal to 12.

</details>

<details>
<summary>What do you think <code>sum</code> will equal to if we changed the value of <code>num1</code> to 10 after calculating <code>sum</code>?</summary>

`sum` will still equal 10! When we declared `sum`, `num1` was equal to 4 so no matter how many times we change `num1` or `num2` after, `sum` will not change.

</details>

---

In the following code, what would be logged to the screen?

```js
let string = "My favorite number is "
let number = 42
let sentence = string + number
console.log(sentence)
```

## 7. `undefined` and `null`

As we saw above, if we don't assign a value to a variable, it will hold the value `undefined`. This is not a description but an actual value, one we can write in the node REPL:

```js
> undefined
undefined
```

It is important to make sure that you consider when variables might be undefined when you are writing code.

Since `undefined` is an actual value, it's different than something that is NOT defined. For example:

```js
let what = undefined
let also
console.log(what) // undefined
console.log(also) // undefined
console.log(another) // Uncaught ReferenceError: another is not defined
```

Similarly, we can give a variable a `null` value.

```js
let nothing = null
console.log(nothing) // null
```

`null` and `undefined` are similar, but not the same. Using null is a way to say "there is a value and it is nothing", versus "this value is not defined". They are both `falsy` though, so they can be used in similar cases.

## 8. Modifying Variables

We can assign a new value to a variable at any time by using the assignment operator. This will overwrite the old value of that variable. `let` is a useful and flexible way to declare variables because it allows you to change what you've stored in the variable. For example, your age will change every year so you'd probably like to update that variable to match your age. To redefine a variable you would do the following:

```js
let myAge = 25
myAge = 26
```

Now the `myAge` variable would have the value `26`. Notice how we didn't use `let` to redefine the variable - this is because `let` is specifically used to **create** the variable. Once it's made, you can change it as you'd like. In older versions of the JavaScript language, you could only use `var` to declare variables. While you can still use `var` to declare variables, it is preferred to use `let` or `const`.

```js
let day = "Monday"
console.log("Today is " + day)
day = "Tuesday"
console.log("Tomorrow will be " + day)
```

While `let` is flexible, `const` is not. `const` is used when declaring variables we **do not** want to change and want to keep **constant**. We used `const` for `myCat` because we don't expect `myCat` to change anytime soon. If we tried to redefine the `myCat` variable, we would receive an error:

```js
const myCat = "Tom"
myCat = "Thomas"
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
let sentence = "My name is "
let name = "Mia"
sentence = sentence + name
console.log(sentence)
// My name is Mia
```

## 9. Updating Variables Shorthand

There is a shorter syntax to updating variables using their existing value. When we wish to add something to the variable's value, we may use the `+=` operator, as in `num += 1`. This is a shorthand for `num = num + 1`. The same works with `-=`, `*=`, and `/=` and other math operators. This shorthand is sometimes referred to as syntactic sugar.

```js
let num = 2
num += 6
// num is 8
num -= 3
// num is 5
```

## Summary

Variables allow us to write code that can be referenced later. When creating a variable we should use `let` or `const` to declare the variable. We can then assign value to that variable.

Using `console.log` can be a helpful tool fo us the humans see what the code is doing and to check what values are where. It shouldn't be used to save information and is irrelevant to the computer.

## Resources

- [MDN Variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations)
- [Syntactic Sugar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations)
- [Var, Let, Const - What's the Difference?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/#:~:text=var%20declarations%20are%20globally%20scoped%20or%20function%20scoped%20while%20let,be%20updated%20nor%20re%2Ddeclared.)
