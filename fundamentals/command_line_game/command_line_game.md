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

`readline-sync` can be a helpful tool for writing terminal games because it ensures synchronicity. To be clear: `readline-sync` in NOT required to make games, but can be helpful when we're still learning the JS fundamentals.

### Steps

1. Make a new directory called guessing_game.
2. Make a JS file called index.js (or anything else you'd rather call it)
3. Type the command `npm init -y`. This should automatically create a file called package.json.
4. Type in the command `npm install readline-sync`. This should have created a node_modules folder as well as a package-lock.json. You may also notice in your package.json that readline-sync is now listed as a dependency. You can think of package.json as the ingredient list of a recipe. We're telling others that if you want our program to run you'll have to install these packages.
5. Type `echo "node_modules" > .gitignore` This creates a file called .gitignore and informs git to ignore node_modules .
6. Type `git init` to initialize a git. Then go ahead and `git add .` and `git commit -m "initial commit"`

Okay, now you should be set up to start building a bit.
Let's first explore [`readline-sync`](https://www.npmjs.com/package/readline-sync).

At the top of your index.js file go ahead and require readline-sync like so:

```
const readlineSync = require('readline-sync');

```

Let's try and see a bit how this works. Enter the following code: 
```
const name = readlineSync.question("What's your name? \n")
console.log("Hi " + name + " nice to meet you!")
```
 Now try running the file with the command `node index.js`. 
 You should see your questions print to the terminal. Your response is then
 saved to a variable and used to craft the sentence below. 

 You use console.log to show text to the user. Each console.log will occupy a new line. This means you could technically draw things with it. [Other console methods](https://developer.mozilla.org/en-US/docs/Web/API/console)

 Now that we understand a little bit better how the command line and readline-sync work, let's start with building our game. The first function we should create is a play function. This is going to be how we start the game. 

Take a look: 
```
const readlineSync = require("readline-sync");

const play = () => {
  console.log("Thank you for playing the ultimate guessing game.");
  console.log("Let's start with you picking a number between 1 and 10,000");
  console.log("If I guess your number in 15 guesses or less I win");
  console.log("If I don't, you win");
  console.log("With each guess you have to tell me if I am too high or too low");

  if (readlineSync.keyInYN("Sound Good?")) {
    startGame();
  } else {
    leaveGame();
  }
};

const startGame = () => {};

const leaveGame = () => {
    console.log("That's too bad :-( Good luck in life!")
};

play();
```

Now that I have a play function I can start to write code that branches off. 
Using multiple functions is really helpful because that way you can more easily test your game without having to play the entire thing each time. Just test the function you're writing. 

Don't worry if you want to call a function you haven't written yet. Write the code you wish you had, and then add the next piece after. 

To exit a game at anytime press: Control + C

Let's take a look at the main function in this game. `startGame`. 
```
const startGame = () => {
  let guessCount = 15; // total guess count
  let bottom = 1; // lowest possible number they could choose
  let top = 10_000; // highest possible number they could choose
  while (guessCount > 0) { // while computer has guesses remaining 
    const guess = Math.floor((bottom + top) / 2); // guess in the middle to cut possible numbers in half
    console.log("My guess is " + guess);
    if (readlineSync.keyInYN("Am I right?")) {
      gameOver(true); // computer wins, guessed number is correct. 
      return;  // exit this function the game is over. 
    } else {
      guessCount--; // decrement guesses
      console.log("Yikes! I only have " + guessCount + "  guesses left!");
      let highOrLow;
      while (highOrLow !== "high" && highOrLow !== "low") { // user must type high or low to move past while loop
        highOrLow = readlineSync.question("Was I too high or too low? \n");
        highOrLow = highOrLow.toLowerCase().trim();
      }
      console.log("Thanks, I'll guess better from now on");
      if (highOrLow === "high") {  // adjusts top or bottom to narrow down correct guess. 
        top = guess - 1;
      } else {
        bottom = guess + 1;
      }
    }
  }
  gameOver(false); // guessed fifteen times incorrectly. Human wins :-(
};


```

Really read the code above and make sure you understand what each line is doing. The comments should help explain any grey areas. 

Our last function is the `gameOver`:
```
const gameOver = (computerWin) => {
  if (computerWin) {
    console.log("I win");
    console.log("I WIN!!!");
    console.log("COMPUTERS WILL RISE UP AND DOMINATE THE EARTH!!!");
  } else {
    console.log("Congrats, but don't get cocky. I'll win next time");
  }
  if (readlineSync.keyInYN("Play Again?")) {
    play();
  } else {
    leaveGame();
  }
};
```
All this function does is log a specific message depending on who won, and asks the user to play again. 
If they choose to play again, our play function is called, otherwise the original leaveGame function is called. 
## Summary

Command line games are a fun and simple way to allow us to write more interesting programs.

### Resources

- [readline-sync documentation](https://www.npmjs.com/package/readline-sync)
- [Node's Readline](https://nodejs.org/api/readline.html)
