# OOP Part 2

### Setting intent

> As a class, determine the intent for the day

## Trivia Questions

- In JavaScript, what does the keyword `static` inside of a class do?
- Why would we use the keyword `static`? What problem does it solve?

## Model a Deck of Cards

The goal will be to play a simple game of Blackjack (two players, each get two cards, determine who wins)

**Note**: This is a continuation of yesterday's problem

- Cards with a face of 2 - 10, jack, queen, king ace
- Values of cards 2-10 are same as face, jack, queen, and king are worth 10, ace starts as a value of 11, but can be changed to a value of 1
- There are 4 sets of 13 cards (hearts, diamonds, spades, clubs)

- The card objects should go in an array
- There should be a method that 'shuffles' the deck, the card objects can be reordered
- As each play happens, two cards are given to the player and two are given to the computer player - these cards are removed from the array of card objects
- Sum the values of the two cards that each player has
  - The one that is closer to a value of 21 wins
  - If the two values are the same, it is a tie
- Bonus
  - if a player has an Ace and a losing score, change the value of Ace to be 11, then check if this is a winning score
  - allow for multiple rounds to be played
  - keep a bankroll, allow players to make bets
  - Use React to build a user interface and allow the game to be played there [very simple version example](https://vigorous-kepler-feaec9.netlify.app)

Write down any questions you have about this model, what information is needed? What other considerations are there?

## Bonus

- Make a simple BlackJack game to be played in the console

## Lab: Accumulate Points on Codewars

- [Build a Car](https://www.codewars.com/kata/5832d6e2565e120ae60000bb)
