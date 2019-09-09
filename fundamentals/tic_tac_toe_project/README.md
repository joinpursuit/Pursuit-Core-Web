# Tic Tac Toe! Or Command Line Game

## Goal
  * Create your own command line game!
  * Gain a stronger understanding of OOP(Object Oriented Programming).

## How?
Before we begin, you should know that you are allowed to choose a different game if you wish, but the game should not be something
as simple as rock paper scissors. Some suggestions of available games are: Yahtzee, Battleship, Hangman.

The rest of these instructions will pertain to Tic Tac Toe. You are encouraged to make this game if you want some guiding.

I am here to help you along with some suggestion, but the main design and implementation is ultimately up to you.

First make a directory called tic_tac_to_<your last name> and cd into the directory. Think of the classes that you want to include in your
game. Each one of these classes should be written in their own file. I'd suggest using the following classes:
  * Board - This is the class that will control the logic of my board. `isGameOver`, `displayBoard`, `validMove`, `makeMove`. Try
  to think of other functions you may need. Don't be afraid to add helper functions. `isVerticalWin`, `isHorizontalWin`, etc.
  Don't forget, because this game will be played in your terminal console.log prints things to the screen. Think about how you want
  to display your board and what kind of information you will want from your HumanPlayer to communicate the position of the move.
  Is it a grid with A B C and 1, 2, 3 (like battleship)? Is each open space a number? Choose what you thinks makes the most sense and is clear to the user.
  * HumanPlayer - `getMove`. I suggest using [readline-sync](https://www.npmjs.com/package/readline-sync) to get user input and have the game wait
  for a response. Do you want your HumanPlayer to have a symbol as one of it's properties? 
  * Game - This is where the all the game logic occurs. It should take in 2 Players, and initialize with a Board. You may need keep track of
  a current player. Think about what methods
  you may need: `switchPlayers`, `play`, `takeTurn`.
  * ComputerPlayer - This class is a bonus for if you finish early. It will need to have all the same methods as `HumanPlayer`,
  but depending on how smart you want your AI player you may need more methods.


## Helpful Hints

To require code modules (like the readline-sync) add `const readlineSync = require('readline-sync');` to use the library. This works
the same to require exported classes.

Export a Class to make it accessible else where. Add `module.exports =  HumanPlayer;` to the bottom of your file.

Run your file with the command `node <file name>`. This is how you will play your game and test code along the way.
