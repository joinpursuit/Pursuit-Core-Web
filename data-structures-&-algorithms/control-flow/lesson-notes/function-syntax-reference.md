# Function Syntax Reference

## Function Declaration

```js
function greeting() {
  console.log("hello!");
}

greeting();
```

## Function Expression

```js
const greeting2 = function () {
  console.log("hello hello!");
};

greeting2();
```

## Arrow Functions

### No Arguments

```js
const greeting3 = () => {
  console.log("hello hello hello!");
};

greeting3();
```

### One Argument

The parenthesis around the parameter are optional, though if you are using prettier or es-lint, it will add the parenthesis back:

```js
const greeting4 = (str) => {
  console.log(str);
};

greeting4("howdy");
```

### Two or More Arguments

MUST have parenthesis

```js
const greeting5 = (greeting, personName) => {
  console.log(`${greeting} ${personName}`);
};

greeting5("Hey there", "Hadly");
```

```js
const greeting6 = (greeting, personName) => {
  greeting = greeting.toUpperCase();
  return `${greeting} ${personName}`;
};

console.log(greeting6("Hey there", "Hadly"))``;
```

Returns MUST start on the same line:

```js
const greeting7 = (greeting, personName) => {
  return;
  greeting.toUpperCase() + " " + personName;
};

console.log(greeting7("Hey there", "Hadly"));
```

```js
const greeting8 = (greeting, personName) => {
  return greeting.toUpperCase() + " " + personName;
};

console.log(greeting8("Hey there", "Hadly"));
```

If you want to put the return across multiple lines, you can wrap it in `()` - this is for clarity, and most useful when the return is verbose.

```js

const greeting9 = (greeting, personName) => {
  return(
    greeting + " " + personName;
  )
};

console.log(
   greeting9('Oh, hey?', 'Hadly')
)
```

### One Line Arrow Functions

When the arrow function is one line, the curly braces can be skipped. When you skip the curly braces, you will get an implicit return and not need the `return` keyword.

```js
const greeting10 = (greeting, personName) => `${greeting} ${personName}`;

console.log(greeting10("What's up ", "Hadly"));
```

This can lead to very short functions that can look quite odd!

```js
const greeting11 = (greeting) => greeting;

console.log(greeting11("WAZZUP"));
```

If one line of code is quite long, it can be wrapped in parenthesis for ease of code maintainability/ readability :

```js
const greeting12 = (greeting) => (
  greeting +
  "\n" +
  " Oh my! Isn't a fine day?" +
  "\n" +
  " perhaps we should sing a song together" +
  "\n" +
  " to celebrate what a fine day it is" +
  "\n" +
  " do you know what song you want to sing?" +
  "\n" +
  " Never mind! I have the perfect one" +
  "\n" +
  " Supercalifragilisticexpialiocious...";)

console.log(greeting12("Greetings & Salutations"));
```

We can convert an if/else statement into a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

```js
let isSunny = true;

if (isSunny) {
  console.log("I am going for a walk");
} else {
  console.log("I will take another nap");
}

isSunny
  ? console.log("I am going for a run")
  : console.log("I will curl up with a good book");
```

We can write a function that will make the days that start with an `s` all uppercase, in one line of code:

```js
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let newDaysArray = days.map((day) =>
  day[0] === "S" ? day.toUpperCase() : day
);

console.log(newDaysArray);
```

Even though you can create very short functions, you can easily lose readability. If your interest, as a hobby, is code golf, then it is nice to know these shortcuts.

However, when working at a company, or any professional project is far more important to write readable code that is easy to understand and update.
