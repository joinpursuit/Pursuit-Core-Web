# Intro to Object Orientated Programming (OOP)

### Setting intent

Now that we've had guidance on setting intent, what would you like the intent for today's class to be?

Discuss as a class, and keep this in mind throughout your day.

## Trivia Questions

- In JavaScript `.?` is the symbol for optional chaining. What is optional chaining and where/when would you use it?
- What is wrong with the following code

```js
const delete = (item) => {
  console.log('item was deleted')
}
```

## Model a Vending Machine

- a vending machine is an object

- it has an array of snacks (make 3 snacks)

  - snacks are objects that have a name and a price

- a vending machine has a function vend that allows user to enter the array position (a number) of the snack and then that snack will be returned

- Be able to call vendingMachine.vend() with a valid integer to return a snack

## Model a Deck of Cards

The goal will be to play a simple game of Blackjack (two players, each get two cards, determine who wins)

**Note**: We will continue to work on solving this after the second lesson on OOP and you will get more time to work on this problem during the next session

- Cards with a face of 2 - 10, jack, queen, king ace
- Values of cards 2-10 are same as face, jack, queen, and king are worth 10, ace starts as a value of 11, but can be changed to a value of 1
- There are 4 sets of 13 cards (hearts, diamonds, spades, clubs)

- The card objects should go in an array
- There should be a method that 'shuffles' the deck, the card objects can be reordered
- As each play happens, two cards are given to the player and two are given to the computer player - these cards are removed from the array of card objects

Write down any questions you have about this model, what information is needed? What other considerations are there?

## Bonus

- Make a simple BlackJack game to be played in the console

Both of these are from the book Cracking the Code Interview. Work with a partner to discuss and design the following:

- Model a Jukebox
- Model a Call Center

## Lab: Accumulate Points on Codewars

- [Object Oriented Piracy](https://www.codewars.com/kata/54fe05c4762e2e3047000add)
- [Classy Classes](https://www.codewars.com/kata/55a144eff5124e546400005a)
- [Regular Ball Super Ball](https://www.codewars.com/kata/53f0f358b9cb376eca001079)
- [Color Ghost](https://www.codewars.com/kata/53f1015fa9fe02cbda00111a)
