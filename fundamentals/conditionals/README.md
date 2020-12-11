[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Conditionals

Controlling the flow of our code.

## Learning Objectives

- Understand control flow
- Effectively write `if`/`else`/`else if` statements
- Understand Ternary Operators
- Be able to write a Switch statement

## Standards

- LF.4
- LF.1

## Keywords

- control flow - the order in which the computer executes statements. Sources: [mdn](https://developer.mozilla.org/en-US/docs/Glossary/Control_flow)
- `if`, `else`, `else if`
- code block
- truthy
- falsy
- ternary
- switch statement

## Prerequisites

- Familiarity with logical operators
- Familiarity with values and types

---

## What good are conditionals?

So far, our programs have been running line-by-line, from top to bottom. Conditionals allow us to execute some lines of code in some cases, but not in others.

### The `if` statement

Our first conditional is the `if` statement. It executes a block of code only when an expression (provided in parentheses) evaluates to a _truthy_ value. A block of code is any number of lines enclosed with curly brackets: `{...}`.

The simplest `if` statement is the one where we simply provide the boolean value `true`:

```js
if (true) {
  console.log("It is true");
}
```

The value `true` above can be substituted with any expression that evaluates to `true`, such as `'cat' === 'cat'` and `2 > 1`.
The code block will also run if the conditional can evaluate to a truthy value such as:

```js
// this will log 'hello' to the console.
if (1) {
  console.log("hello");
}
```

Reminder: The only falsey values in JavaScript are: `null`, `false`, `""`, `0`, `NaN`, and `undefined` .

The next simplest `if` statement is the one that is always false.

```js
if (false) {
  console.log("hello");
}
```

The code block following the `if` statement will **never** be executed.

This is also true for expressions that evaluate to _falsy_ such as:

```js
// this will not log anything to the console.
if (0) {
  console.log("hello");
}
```

We can also put an entire expression in the if statement! Ultimately, whatever we put in there should evaluate to truthy or falsy.

```js
const num1 = 23
const num2 = 56

if(num1 > num2 && num2 % 2 === 0) {
  console.log("Hahaaaa! Success!")
}
```

Note that an an `if` statement is not the end of a program. The code following it will run as usual.

```js
function checkNum(num) {
  if (num > 2) {
    console.log("It's larger than 2");
  }
  console.log("done checking");
}

checkNum(4)
// It's larger than 2
// done checking

checkNum(2)
// done checking
```

In the code above, `'Its larger than 2'` may or may not be printed (depending on the value of `num`). Either way `'done checking'` _will_ be printed.

### The `if` `else ` statement

We can extend the `if` statement to make it an `if - else` statement. This statement will execute one of two code blocks:

```js
let num = 1;
if (num > 2) {
  console.log("it's larger than 2");
} else {
  console.log("it's not large than 2");
}
```

If the condition evaluates to a truthy value, the first block will be executed. If it evaluated to a falsy value, the second block will be executed.
We can think of an `if` statement like choosing one of two detours:

![if statement diagram](./assets/if.svg)

<sup> Image: [Eloquent JavaScript, Chapter 2](http://eloquentJavaScript.net/02_program_structure.html)</sup>

> Write three `if - else` statements in which the **second** block of code will always be executed.

### if - else if - else

We can use the `if - else if - else` statement when we want one of three or more code blocks to be executed.
We will have the initial `if`, followed by any number of `else if`s, optionally followed by an `else`.

```js
let color = "azure";

if (color === "blue") {
  console.log("That's my favorite color!");
} else if (color === "green") {
  console.log("That's a nice color!");
} else {
  console.log("That's an okay color.");
}

console.log("done checking");
```

The above statement will check the conditions one at a time. First, the conditional statement following `if` will be checked.

If it is falsy, the conditional statement following `else if` will be checked. If it is also falsy, the code block following `else` will be executed.

We can have as many `else if` statements as we like. For example, we may want to check if a number is equal to `1`, `2` or `3`:

```js
let num = 2;
if (num === 1) {
  console.log("Jackpot!");
} else if (num === 2) {
  console.log("You won 10 coins");
} else if (num === 3) {
  console.log("You won 20 coins");
} else {
  console.log("Try again.");
}
```

Remember, only **one** of the code blocks will be executed.

### Checking for range

One way we can utilize `if - else if` statements is to check for different ranges.
For example, we may want to perform a different action depending on the user's age group.

```js
let userAge = 19;

if (userAge < 18) {
  console.log("Parental supervision is required");
} else if (userAge < 21) {
  console.log("Parental permission is required");
} else {
  console.log("You may proceed");
}
```

> What are the ranges that the code above is checking for? How can we rewrite the statement with the **larger than** (`>`) operator?

Remember, `else` acts as a default block that will only be run if no other conditionals are truthy. `else` NEVER takes a condition.

### Using logical operators

So far in our `if ...` statements we have been checking for a single condition. It is also possible to check for multiple conditions using the `&&` and `||` boolean operators.
For example, we may want to perform the same action when the day is Saturday or Sunday.

```js
let day = "Monday";

if (day === "Saturday" || day === "Sunday") {
  console.log("Have a nice weekend!");
} else if (day === "Friday") {
  console.log("The weekend is almost here!");
} else {
  console.log("Have a nice day.");
}
```

We can use the && operator to check for ranges. For example, say we want to check if a user's age is between 18-45.
This is how we will express this in JavaScript: if age is larger than 18 **AND** age is smaller than 45,
then {...}. In JavaScript, the opening curly bracket stands in place of the word `then`, and the closing one stand in place of the period at the end of the sentence.

```js
let userAge = 27;

if (userAge > 18 && userAge < 45) {
  console.log("would you like to take a survey?");
}
```

> How would you write a conditional statement that outputs the same message if a user's age is either smaller than 18 **OR** larger than 45?

## The Ternary Operator

```js
conditional ? true : false;
```

The ternary operator is made up of three parts: 
  * The first part to the left of the question mark is a conditional. 
  * The second part, between the question mark and the colon, is the value returned if the conditional is truthy. 
  * The third part, after the colon, is the value returned if the condition is falsey.

```js
> 1 === 1 ? 1 : 2
// => 1
> 1 === 2 ? 1 : 2
// => 2
```

This can be useful when declaring a variable which depends on a value.

```js
let age = 33

let amIOld = age > 30 ? "old" : "young"
```

This is sort of equivalent to doing this:

```js
let age = 33
let amIOld = ""

if(age > 30) {
  amIOld = "old"
}
else {
  amIOld = "young"
}
```

> Try it yourself! Experiment with different conditionals and outcomes.

## Switch Statements

Switch statements evaluate similarly to `if - else` statements. They take in an expression, and depending on the value of that expression, run a specific code block. Switch statements are useful if you are checking a single value and then determining a lot of different possible outcomes based on that value.

The **break** keyword allows us to break out of the switch statement.

The **default** keyword works similarly to the 'else' in regular conditionals. If the expression does not match any of the cases,
the default code block will run.

```js
switch (expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
  // code block
}
```

The main difference here is we can't use case to compare anything. We can only use it to check equivalency. For more complex comparisons, `if - else` is going to be more useful.

[Examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

## Summary

Conditionals allow us to better control the flow of our code. We can decide when certain blocks of code should run. Think about it similarly as you would in English.

```
if(you are hungry) {
  eat something
} else if(you are tired) {
  go to sleep
} else {
  study code
}
```

You are allowed to nest if blocks inside of other if blocks.

```
if(you are hungry) {
  if(you are craving chocolate) {
    eat chocolate
  } else {
    eat a sandwich
  }
} else if(you are tired) {
  go to sleep
} else {
  study code
}
```

### Resources

- [MDN on if else](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals)
- [MDN ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [MDN Switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [javascript.info](https://javascript.info/ifelse)
