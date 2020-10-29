[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Command Line Game Intro

Learning to build games in the terminal.

## Learning Objectives

- Be able to write a game the executes in the terminal.
- Strengthen our JS foundations (loops, control flow, functions)

## Prerequisites

- Familiarity with logical operators
- Familiarity with values and types
- Familiarity with loops
- Familiarity with conditionals
- Familiarity with functions

---

## Let's Get Started

Today we're actually going to build a little game in the terminal.
The goal of our game will be to guess any number that a person is thinking between 1 and 10,000 and to do so in only 15 guesses.

Our program is going to run with something called Node. Node is an environment that allows us to run JavaScript code. We'll learn more about this in the future.

To help us build our game we're going to install the 3rd party module `readline-sync`. This is code that was written by someone else but is available for all to use because it is open sourced code.

`readline-sync` can be a helpful tool for writing terminal games because it ensures synchronicity, which allows us to write simpler code, so we can focus on the game logic. To be clear: `readline-sync` is NOT required to make games, but can be helpful when we're still learning the JS fundamentals.

## Setup

1. Make a new directory called guessing_game.
2. Make a JS file called index.js in that directory (or anything else you'd rather call it)
3. Type the command `npm init -y`. This should automatically create a file called `package.json` in the same directory.
4. Open this project in vscode with `code .` (make sure you include the `.` which is the current directory)
5. Type in the command `npm install readline-sync`. This should have created a `node_modules` folder as well as a `package-lock.json`. You may also notice in your package.json that readline-sync is now listed as a dependency. You can think of package.json as the ingredient list of a recipe. We're telling others that if you want our program to run you'll have to install these packages.
6. Create a new file called `.gitignore`.
7. Open `.gitignore` and on the first line, type `node_modules`. Save and close the file. This tells git not to look at the `node_modules` directory.
8. Type `git init` to initialize a git project. Then go ahead and `git add .` and `git commit -m "initial commit"`

When setting up a new project with dependencies, these are the general steps we will follow!

Okay, now you should be set up to start building a bit.
Let's first explore [`readline-sync`](https://www.npmjs.com/package/readline-sync).

At the top of your index.js file go ahead and require readline-sync like so:

```js
const readlineSync = require("readline-sync")
```

Let's try and see a bit how this works. Enter the following code:

```js
const name = readlineSync.question("What's your name? \n")
console.log("Hi " + name + " nice to meet you!")
```

Now try running the file with the command `node index.js`. You should see your questions print to the terminal. Your response is then saved to a variable (`name`) and used to craft the sentence below.

You use console.log to show text to the user. Each console.log will occupy a new line. This means you could technically draw things with it.

> [Other console methods](https://nodejs.org/api/console.html)

## You do: Expand the game

Adding to the existing code, make your game do the following:

- Ask another question about the user's age, store it in a variable.
- If age is 18 or older, log a congratulatory message about being an adult.
- If age is under 18, log a message telling the user to come back when they're older.

## Control flow

Let's make our code use some functions! We use these functions for a concept called `control flow`.

Instead of putting everything at the top level, we want to wrap the game logic so we have some control over when it runs. We can also run the functions multiple times which allows us to start the game over.

We can start by creating three functions: `startGame`, `leaveGame`, and `play`. Wrap the main logic we have so far with the `play` function.

```js
const readlineSync = require('readline-sync')

const startGame = () => {}

const leaveGame = () => {}

const play = () => {
  const name = readlineSync.question("What's your name? \n")
  console.log("Hi " + name + " nice to meet you!")

  const age = readlineSync.question("How old r u ? \n")

  if(age >= 18) {
    console.log('Congrats on being an adult')
    if(readlineSync.keyInYN("Play again?")) {
      play()
    }
  }
  else {
    console.log("come back when you're older.")
    leaveGame()
  }
}
```

We're also adding some logic in `play()` to start the game over if the user is willing.

Right now this won't work, we need to control when the game starts. So fill out the `startGame` function and `leaveGame` functions too, and make sure you call `startGame()` at the end of the file.

```js
const startGame = () => {
  if(readlineSync.keyInYN("Ready to play? Y or N")) {
    play()
  }
  else {
    leaveGame()
  }
}

const leaveGame = () => {
  console.log("Good luck with your life")
  process.exit()
}

const play = () => {
 /* ... */
}

startGame()
```

This setup prompts the user to start, then launches into the play logic. When the play logic is finished, we can choose to play the game again.

## Building a more realistic game

Now that we understand a little bit better how the command line and readline-sync work, let's start with building our game. 

We'll start from scratch this time, so ditch all the code you just wrote (sorry!) except the 3 functions.

Take a look:

```js
const readlineSync = require("readline-sync")

const play = () => {
  console.log("Thank you for playing the ultimate guessing game.")
  console.log("Let's start with you picking a number between 1 and 10,000")
  console.log("If I guess your number in 15 guesses or less I win")
  console.log("If I don't, you win")
  console.log("With each guess you have to tell me if I am too high or too low")

  // requires user to type Y or N
  if (readlineSync.keyInYN("Sound Good?")) {
    startGame()
  } else {
    leaveGame()
  }
}

const startGame = () => {}

const leaveGame = () => {
  console.log("That's too bad :-( Good luck in life!")
  process.exit()
}

play()
```

Breaking the game logic into chunks helps keep the complexity down. You can start to see how you might want to put logic in different functions, especially as your game gets more complex.

Don't worry if you want to call a function you haven't written yet. Write the code you wish you had, and then add the logic after.

To exit a game at anytime press: `Control + C` in the terminal

Let's take a look at the main function in this game. `startGame`.

```js
const startGame = () => {
  // total guess count
  let guessCount = 15
  // lowest possible number they could choose
  let bottom = 1
  // highest possible number they could choose
  let top = 10000
  // while computer has guesses remaining
  while (guessCount > 0) {
    // guess in the middle to cut possible numbers in half
    const guess = Math.floor((bottom + top) / 2)
    console.log("My guess is " + guess)

    if (readlineSync.keyInYN("Am I right?")) {
      // computer wins, guessed number is correct.
      // call gameOver function with true to end the game
      gameOver(true)
    } else {
      // decrement guesses
      guessCount-- 
      console.log("Yikes! I only have " + guessCount + "  guesses left!")
      let highOrLow
      while (highOrLow !== "high" && highOrLow !== "low") {
        // user must type high or low to move past while loop
        highOrLow = readlineSync.question("Was I too high or too low? \n")
        highOrLow = highOrLow.toLowerCase().trim()
      }
      console.log("Thanks, I'll guess better from now on")
      if (highOrLow === "high") {
        // adjusts top or bottom to narrow down correct guess.
        top = guess - 1
      } else {
        bottom = guess + 1
      }
    }
  }
  // guessed fifteen times incorrectly. Human wins :-(
  gameOver(false) 
}
```

Really read the code above and make sure you understand what each line is doing. The comments should help explain any grey areas.

Our last function is `gameOver`, which we will add:

```js
const gameOver = (computerWin) => {
  if (computerWin) {
    console.log("I win")
    console.log("I WIN!!!")
    console.log("COMPUTERS WILL RISE UP AND DOMINATE THE EARTH!!!")
  } else {
    console.log("Congrats, but don't get cocky. I'll win next time")
  }
  if (readlineSync.keyInYN("Play Again?")) {
    play()
  } else {
    leaveGame()
  }
}
```

All this function does is log a specific message depending on who won, and asks the user to play again.

If they choose to play again, our play function is called, otherwise the original `leaveGame` function is called.

## Summary

Command line games are a fun and simple way to allow us to write more interesting programs. Imagine taking this idea and turning it into a real program, something that does something useful! 

### Resources

- [readline-sync documentation](https://www.npmjs.com/package/readline-sync)
- [Node's Readline](https://nodejs.org/api/readline.html)
