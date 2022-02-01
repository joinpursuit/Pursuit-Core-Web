# Control Flow

Control flow makes up the basic building blocks of programming

## Learning Objectives

- Explain why we use control flow
- Name the basic building blocks
- Utilize conditionals and booleans
- Utilize if/else statements
- Write a for loop
- Combine the above to solve a problem

## Conditionals

Conditional statements help us determine what we should do. If you are doing a whiteboard interview, you can create a flowchart to help structure the code you will write

[JavaScript Equality Table](https://dorey.github.io/JavaScript-Equality-Table/)

![Laboratory Troubleshooting Flowchart](https://cacoo.com/wp-app/uploads/2018/12/engineering-flow-chart.png)

We can convert this into code:

```js
let moving = true;
let shouldBeMoving = true;

if (moving) {
  if (shouldBeMoving) {
    console.log("No problem! This should be moving and it does!");
  } else {
    console.log("OK, time for some duct tape!");
  }
} else {
  if (shouldBeMoving) {
    console.log("Ok, some WD-40 should get this going!");
  } else {
    console.log("No problem! This should NOT be moving and it does not!");
  }
}
```

**Note:**

```js
if (moving == true)
if (moving === true)
if (moving)
```

Will all run the code when `moving` is true. One difference is that the final one will test for a truthy value as opposed to the value `true`, which can make the final expression a little more flexible

[Reference](https://dorey.github.io/JavaScript-Equality-Table/)

## Functions

Right now, the only way we can test if our item should move, is by going into the file and changing the values of `moving` and `shouldBeMoving`. The code will run immediately and only run once.

Functions allow us to create reusable blocks of code that we can control when they run and how many times they run

Therefore, we can improve this code by putting it in a function.

Refactoring code can be hard, it takes practice. It is still recommended to work outside in order to refactor.

First, create the outer function

```js
const fixIt = () => {};
```

Then, copy and paste the above code inside the `{}` of the function:

```js
const fixIt = (moving, shouldBeMoving) => {
  if (moving) {
    if (shouldBeMoving) {
      console.log("No problem! This should be moving and it does!");
    } else {
      console.log("OK, time for some duct tape!");
    }
  } else {
    if (shouldBeMoving) {
      console.log("Ok, some WD-40 should get this going!");
    } else {
      console.log("No problem! This should NOT be moving and it does not!");
    }
  }
};

fixIt(true, true);
fixIt(true, false);
fixIt(false, false);
fixIt(false, true);
```

## Loops

We have a few different ways to write loops.

### While

A `while` loop is a great choice when you don't know how many times a piece of programming should run:

**Note:** to use `prompt` and `alert`, you need to run this code in the browser, repl.it may also block this functionality. It is ok to not run this code but simply understand it

```js
let secretPhrase = prompt('Enter the secret');

while (secretPhrase != 'open sesame') {
    secretPhrase = prompt('Nope! Guess again!');
}

alert('you guessed it! Nice job!);
```

Many times we do know how many times we want to loop. In that case, a for loop is easier to write:

```js
console.log("you only have three guesses, be careful with your choices");

let access = false;

for (let i = 3; i >= 1; i--) {
  let password = prompt("what is the password");
  console.log(i);
  if (password === "password1234") {
    access = true;
    break;
  }
  if (i === 3) {
    alert(`You only have 2 guesses left`);
  } else if (i === 2) {
    alert("You only have 1 guess left!");
  }
}
if (access) {
  alert("Congratulations! You now have access to your account");
} else {
  alert("Sorry, you have lost access forever");
}
```

What does `break` do?

Could we use `return` instead?

## Print Primes

Now that we've reviewed the basic building blocks, let's go through how to solve the Print Primes problem.

> Write a function that takes an integer and then returns an array of all the prime numbers up to that value.

1. Do we understand all the words used in stating the problem?

- What is an integer?
- What is a prime number?
  - Is 0 a prime number?
  - Is 1 a prime number?
  - Is 2 a prime number?
  - Can a prime number be negative?
- How can we determine a number is prime?

2. What are we asked to show?

   - An array of prime numbers

3. Restate the problem in your own words (it's ok if your words are more clumsy, you don't need the perfect phrasing, you just need to clarify that you understand he problem, and one of the best ways to do that is to put it in your own words)

4. Is there enough information for you to find a solution?

   - Is there any information that is missing?

5. What is our plan?

### Part 1 - Test for a Prime Number:

This problem is actually two problems

- determining if a number is prime
- putting prime numbers, up to some upper limit value, into an array

Let's solve the first problem, first by hand. We'll look at two simple test cases: 4 which is NOT prime and 5 which is prime

```js
// a prime number is a number that is evenly divisible by numbers other than one and itself

// 4

// 4 is not evenly divisible by 3
// 4 is evenly divisible by 2 therefore 4 is NOT prime

// 5

// 5 is not evenly divisible by 4
// 5 is not evenly divisible by 3
// 5 is not evenly divisible by 2
```

Do we see a pattern? How can we translate this to code?

First, get started with small testable steps

```js
const isPrime = (num) => {
  return num;
};
console.log(isPrime(4));
```

Now, write a loop that starts at 2 (the smallest number we can check) to up to, but not including our number.

Let's just console log that our loop is just looping over the correct values:

```js
const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    console.log(i);
  }
  return num;
};
console.log(isPrime(4));
```

Now let's upgrade the loop to show the values of the remainders. We'll use the [modulo operator](https://en.wikipedia.org/wiki/Modulo_operation)

```js
const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    console.log(num % i);
  }
  return num;
};
console.log(isPrime(4));
```

We see that we get a remainder of 0. If we get a remainder of 0 then the number is not prime

```js
const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
console.log(isPrime(4));
```

Let's test 5:

```js
console.log(isPrime(5));
```

Do we need to solve for edge cases? Solving edge cases is usually easier to solve after the basic problem is solved

- numbers less than 2 are NOT prime
- numbers that are NOT integers are not prime
- 2 is a prime number

```js
const isPrime = (num) => {
  if (num < 2) {
    return false;
  } else if (!Number.isInteger(num)) {
    return false;
  } else if (num === 2) {
    return true;
  } else {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
};
console.log(isPrime(4));
```

### Part 2 - Collect Primes up to a Certain Value in an Array

Make a plan

```js
// start with an empty array
//  write a loop starting at 2 and ending at the number entered
// check if the number is prime
// if prime, push into the array
// if not prime, do nothing, go to the next number
```

Get started in a simple, testable way:

```js
const printPrimes = (limit) => {
  return limit;
};
console.log(printPrimes(6));
```

```js
const printPrimes = (limit) => {
  const primes = [];
  for (let i = 2; i < limit; i++) {
    console.log(i);
  }
  return primes;
};
console.log(printPrimes(6));
```

Oops! We want to include the limit

```js
const printPrimes = (limit) => {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    console.log(i);
  }
  return primes;
};
console.log(printPrimes(6));
```

How can we check if the number is prime? We could copy the code we wrote earlier. Or, we can just call `isPrime` inside this function

```js
const printPrimes = (limit) => {
  const primes = [];
  for (let i = 0; i <= limit; i++) {
    console.log(i, isPrime(i));
  }
  return primes;
};
console.log(printPrimes(6));
```

By console logging and testing for a known number, We can confirm that we are getting what we would expect - sometimes we will have unit tests during our interviews and sometimes we won't. So it's important to determine ways to check your code on your own.

Let's look back at our plan

```js
// if prime, push into the array
// if not prime, do nothing, go to the next number
```

and translate it into code:

```js
const printPrimes = (limit) => {
  const primes = [];
  for (let i = 0; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i);
    } else {
      // do nothing
    }
  }
  return primes;
};
console.log(printPrimes(6));
```

### Making our code better

We don't need the else statement. Let's get rid of it

```js
const printPrimes = (limit) => {
  const primes = [];
  for (let i = 0; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
};
console.log(printPrimes(6));
```

We can optimize our `isPrime` function

Right now we are testing

- 11 % 2
- 11 % 3
- 11 % 4
- 11 % 5
- 11 % 6
- 11 % 7
- 11 % 8
- 11 % 9
- 11 % 10

However, 6 x 2 is 12 and 7 x 2 is 14 etc. These are bigger than 11. Therefore there is no reason to test them.

In fact, all numbers above 5 are too big to be evenly divisible for 11.

What would be the largest number that could be divisible be?

> It would be the square root

With 11 - that would be 3.31

We only have to worry about integers, so the number we would need to check up to is 3

To determine the square root of a number, we can use the `Math.sqrt` method

```js
const isPrime = (num) => {
  if (num < 2) {
    return false;
  } else if (num === 2) {
    return true;
  } else {
    for (let i = 2; i < Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
};

console.log(printPrimes(30));
```

One final oops! We are now accidentally adding perfect squares like 4 and 9 as primes! We need to say that the loop goes to, and includes i.

```js
const isPrime = (num) => {
  if (num < 2) {
    return false;
  } else if (num === 2) {
    return true;
  } else {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
};

console.log(printPrimes(30));
```

And we did it! We solved the print primes problem!

## Bonus Function Syntax Variations Reference

JavaScript made some major updates in 2016 to its code base. Since 2016, small updates are being made annually.

One thing that has happened is that there are many variations on the syntax of functions.

If you need a review, check it out here:

[Function Syntax Reference](./function-syntax-reference.md)

## Further Reading

Eloquent JavaScript

[Chapter 1: Values, Types and Operators](https://eloquentjavascript.net)
[Chapter 2: Program Structure](https://eloquentjavascript.net/02_program_structure.html)
[Chapter 3: Functions](https://eloquentjavascript.net/03_functions.html)
