# Big O

### Setting intent

> Things that are unfamiliar often seem difficult or impossible to understand. Practice patience and give yourself time.

Think back to the beginning of the course - look at early labs and lessons. They will seem much easier to understand now that you've had time to think about them and practice the concepts.

## Trivia Questions

Look at the following code:

```js
const numbers = [1, 2, 3, 4, 5];
const printItems = (arr) => {
  for (let item in arr) {
    console.log(item);
  }
};

console.log(printItems(numbers));
```

The output is:

```
0
1
2
3
4
undefined
```

Why is the last item `undefined`?

## Main Problem

Let's look at some code and figure out how long it takes.

Every computer has a different speed and there are many conditions that can affect how fast some code runs (how many other programs are running? etc.)

Instead, we are going to measure by the number of steps it takes to run the code.

For example:

```js
const getLastItem = (arr) => {
  return arr[arr.length - 1];
};
```

The code inside this function runs one time. It doesn't matter if the array has 1 item, 10 items, 100 items or 1 million items. We can represent items by the letter `n`. It will always run one time. We can represent this as `n^0`

Another example

```js
const printItems = (arr) => {
  for (let item in arr) {
    console.log(item);
  }
};
```

This runs `n^1` times. If `n` is 1 it loops 1 time. If `n` is 1000, it will loop 1000 times.

Try to identify how many times `n` - each of the following code examples would run:

#### 1

```js
const getMiddleItem = (arr) => {
  return arr[Math.floor(arr.length / 2)];
};
```

#### 2

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
```

#### 3

```js
const loopTheLoop = (twoDArray) => {
  for (let i = 0; i < twoDArray.length; i++) {
    for (let j = 0; j < twoDArray[i].length; j++) {
      console.log(twoDArray[i][j]);
    }
  }
};
```

#### 4

Create an `index.html` file and open it in your browser or copy/paste the JavaScript code in chrome

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Game</title>
    <script src="app.js"></script>
  </head>
  <body>
    <p>refresh the page to play again</p>
  </body>
</html>
```

```js
const game = () => {
  const limit = 100;
  let number = Math.ceil(Math.random() * limit);
  let guess = prompt(`Guess a number between 1 and ${limit}`);

  guess = Number(guess);

  while (guess !== number) {
    if (guess < number) {
      guess = prompt(`Too low! Guess again`);
    } else {
      guess = prompt(`Too high! Guess again`);
    }
    guess = Number(guess);
  }
  alert(`That's right! The number was ${number}`);
};

game();
```

Play this game a few times. What is your method for finding correct number?

Try to write it down in psuedo code.

Now try to build an answer.

Here is a naive coding solution. But it is always going to be the worst case scenario - the last guess will always be the correct one. That means if this guessing game were between 1 and 100 million it would take a while...

**Note:** - `alert`,`prompt`, and `confirm` are all browser specific functions that will NOT work in `node`. They also `STOP` the code from running until the user does something. This means that the order of events can be a bit unexpected, don't worry about fixing it. This is for demonstration purposes only.

Now that the computer is guessing and we don't need user imput, we'll just use `console.log` instead

```js
const game = () => {
  const limit = 100;
  let number = Math.ceil(Math.random() * limit);

  guess = 0;

  while (guess !== number) {
    if (guess < number) {
      guess = myAutomaticGuesser(guess, true);
    } else {
      guess = myAutomaticGuesser(guess, false);
    }
  }
  console.log(`That's right! The number was ${number}`, guess);
};

const myAutomaticGuesser = (number, tooLow) => {
  console.log(number);
  if (tooLow) {
    return ++number;
  } else {
    return --number;
  }
};

const myAutomaticGuesser = (number) => {
  console.log(number++);
  return number++;
};

game();
```

How close is this solution to the one you used when trying it yourself? If it matched what you tried, can you think of another way?

If it isn't how you approached it, try to code your approach

## More Problems (Solve if you finished the main problem or want more practice)
