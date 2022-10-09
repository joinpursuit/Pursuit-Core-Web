# OOP Part 2

## Lesson Objectives

- Understand the utility of inheritance
- Make a class inherit from a parent class
- Understand the utility of creating a factory
- Create a factory

## Inheritance

Note: we are building on top of our code we wrote yesterday.

In our world of animals, let's say there is a new kind: Mythical creature. The mythical creature will have all the properties of methods as an animal and some additional ones. We could copy our `Animal` class and paste it and add more, but what if we need to change the `greet` function? Then we would have to find every place we copy/pasted and carefully update. We are going to keep our animal as our one source of truth as a parent class.

Original Animal:

```js
class Animal {
  constructor(name, type, color, walkStyle, isFriendly = true) {
    this.name = name;
    this.type = type;
    this.age = 4;
    this.color = color;
    this.isFriendly = isFriendly;
    this.walkStyle = walkStyle || "Walka, walka";
  }
  walk() {
    console.log(this.walkStyle);
  }
  greet(otherBeing) {
    console.log(`Sniff sniff, ${otherBeing}`);
  }
  classyGreeting(otherClassyBeing) {
    console.log(`Howdy, there, ${otherClassyBeing.name}`);
  }
  ageUp() {
    this.age++;
  }
}
const buttons = new Animal("Buttons", "turtle", "green");
const fluffy = new Animal("Fluffy", "cat", "calico", "Strut, strut", false);
const marshmallow = new Animal(
  "Marshmallow",
  "miniature horse",
  "white",
  "Clip clop, clip clop"
);
```

Mythical Creature:

```js
class MythicalCreature extends Animal {
  grantWish(wish) {
    console.log(`I have granted you your wish to ${wish}`);
  }
}

const chips = new MythicalCreature(
  "Chips",
  "unicorn",
  "iridescent white",
  "clip clop, vanish"
);

console.log(chips);
chips.walk();
chips.grantWish("always write bug free code");
```

We can override previous functionality

```js
class MythicalCreature extends Animal {
  grantWish(wish) {
    console.log(`I have granted you your wish to ${wish}`);
  }
  walk() {
    console.log(`💫✨🌟 ${this.walkStyle} 💫✨🌟 `);
  }
}

const chips = new MythicalCreature("Chips", "unicorn", "iridescent white");

console.log(chips);
chips.grantWish("always write bug free code");
chips.walk();
```

We can reference the parent's class' method and and extend its original functionality

```js
class MythicalCreature extends Animal {
  grantWish(wish) {
    console.log(`I have granted you your wish to ${wish}`);
  }
  walk() {
    console.log(`💫✨🌟 ${this.walkStyle} 💫✨🌟 `);
  }

  greet(otherBeing) {
    super.greet(otherBeing);
    console.log("I am very pleased to see you today!");
  }
}

const chips = new MythicalCreature("Chips", "unicorn", "iridescent white");

console.log(chips);
chips.walk();
chips.grantWish("always write bug free code");
chips.greet("Marshmallow");
```

We can also add properties in the constructor

```js
class MythicalCreature extends Animal {
  constructor(name, type, color, isFriendly) {
    super(name, type, color, isFriendly);
    this.powers = ["invisibility", "laser eyes", "super strength"];
  }
  grantWish(wish) {
    console.log(`I have granted you your wish to ${wish}`);
  }
  walk() {
    console.log(`💫✨🌟 ${this.walkStyle} 💫✨🌟 `);
  }

  greet(otherBeing) {
    super.greet(otherBeing);
    console.log("I am very pleased to see you today!");
  }
}

const chips = new MythicalCreature("Chips", "unicorn", "iridescent white");

// console.log(chips);
chips.walk();
chips.grantWish("always write bug free code");
chips.greet("Marshmallow");
console.log(chips.powers);
```

`super` is another special keyword/function. Try misspelling it - and you'll see it won't work.

## Factory

Sometimes we need a controlled way to generate other objects.

Let's think back to our example of creating a deck of cards for the game BlackJack.

```js
class DeckOfCards {
  constructor() {
    this.deck = [];
    this.createDeck();
  }
  createDeck() {
    for (let i = 1; i <= 13; i++) {
      this.deck.push(i);
    }
  }
}

const deck = new DeckOfCards();
console.log(deck);
```

The above is a good start, but we need to make sure we understand the specks

> The goal will be to play a simple game of Blackjack (two players, each get two cards, determine who wins)

- Cards with a face of 2 - 10, jack, queen, king ace
- Values of cards 2-10 are same as face, jack, queen, and king are worth 10, ace starts as a value of 11, but can be changed to a value of 1
- There are 4 sets of 13 cards (hearts, diamonds, spades, clubs)

- The card objects should go in an array
- There should be a method that 'shuffles' the deck, the card objects can be reordered
- As each play happens, two cards are given to the player and two are given to the computer player - these cards are removed from the array of card objects

> Write down any questions you have about this model, what information is needed? What other considerations are there?

Cards are objects. They are not simple numbers. There are also 4 sets.

Let's create a `Card` class

```js
class Card {
  constructor(face, value, suit) {
    this.face = face;
    this.value = value;
    this.suit = suit;
  }
}
```

And update our `Deck` class

```js
class DeckOfCards {
  constructor() {
    this.cards = [];
    this.createDeck();
  }
  createDeck() {
    for (let i = 1; i <= 13; i++) {
      this.cards.push(new Card(i, i, "hearts"));
    }
  }
}

const deck = new DeckOfCards();
console.log(deck);
```

Let's add some more logic to make sure our card values match what they should be for a game of Blackjack

```js
class DeckOfCards {
  constructor() {
    this.cards = [];
    this.createDeck();
  }
  createDeck() {
    for (let i = 1; i <= 13; i++) {
      if (i === 1) {
        this.cards.push(new Card("Ace", i, "hearts"));
      } else if (i === 11) {
        this.cards.push(new Card("Jack", 10, "hearts"));
      } else if (i === 12) {
        this.cards.push(new Card("Queen", 10, "hearts"));
      } else if (i === 13) {
        this.cards.push(new Card("King", 10, "hearts"));
      } else {
        this.cards.push(new Card(i, i, "hearts"));
      }
    }
  }
}

const deck = new DeckOfCards();
console.log(deck);
```

Now, let's add the different suits:

**Hint**: write your `j` for loop first. Then copy and paste the entirety of your `i` loop inside.
**Hint 2:** Highlight the first `hearts` you want to replace, then press <kbd>command</kbd> <kbd>d</kbd> until you have highlighed the ones below, now type `suits[j]` in their place

```js
class DeckOfCards {
  constructor() {
    this.cards = [];
    this.createDeck();
  }
  createDeck() {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    for (let j = 0; j < suits.length; j++) {
      for (let i = 1; i <= 13; i++) {
        if (i === 1) {
          this.cards.push(new Card("Ace", i, suits[j]));
        } else if (i === 11) {
          this.cards.push(new Card("Jack", 10, suits[j]));
        } else if (i === 12) {
          this.cards.push(new Card("Queen", 10, suits[j]));
        } else if (i === 13) {
          this.cards.push(new Card("King", 10, suits[j]));
        } else {
          this.cards.push(new Card(i, i, suits[j]));
        }
      }
    }
  }
}

const deck = new DeckOfCards();
console.log(deck);
```

We now need a way to shuffle the deck. There is no built-in shuffle method in JavaScript. So let's look up how to do it.

There is a [Fisher-Yates Shuffle](https://bost.ocks.org/mike/shuffle/) - This one is written by Mike Bostock - he wrote the D3 JavaScript library which is used to create a lot of visuals used by the NYT.

```js
shuffle (array) {};
```

```js
class DeckOfCards {
  constructor() {
    this.cards = [];
    this.createDeck();
    this.shuffle(this.cards);
  }
  createDeck() {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    for (let j = 0; j < suits.length; j++) {
      for (let i = 1; i <= 13; i++) {
        if (i === 1) {
          this.cards.push(new Card("Ace", 11, suits[j]));
        } else if (i === 11) {
          this.cards.push(new Card("Jack", 10, suits[j]));
        } else if (i === 12) {
          this.cards.push(new Card("Queen", 10, suits[j]));
        } else if (i === 13) {
          this.cards.push(new Card("King", 10, suits[j]));
        } else {
          this.cards.push(new Card(i, i, suits[j]));
        }
      }
    }
  }
  shuffle(array) {
    let m = array.length;
    let i = 0;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
  }
}

const deck = new DeckOfCards();
console.log(deck);
```

## Bonus

<details><summary>Alternative Syntax: Switch Statement</summary>

We have a lot of if/else statements inside our Create Deck function. We can rewrite it to use a switch statement:

```js
const createDeck = () => {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  for (let j = 0; j < suits.length; j++) {
    for (let i = 1; i <= 13; i++) {
      switch (i) {
        case 1:
          value = 11;
          face = "A";
          break;
        case 11:
          value = 10;
          face = "J";
          break;
        case 12:
          value = 10;
          face = "Q";
          break;
        case 13:
          value = 10;
          face = "K";
          break;
        default:
          value = i;
          face = i;
      }
      deck.push(new Card(value, face, suits[j]));
    }
  }
  return deck;
};
```

This works a lot like an if/else statement, but can be easier to read if there are a lot of cases.

</details>

## Game Play

### Get Two Cards

```js
const playerHand = [];
const theHouseHand = [];

playerHand.push(deck.cards.pop());
playerHand.push(deck.cards.pop());
theHouseHand.push(deck.cards.pop());
theHouseHand.push(deck.cards.pop());

console.log(playerHand);
console.log(theHouseHand);
```

### Get Sums

```js
let playerHandSum = playerHand[0].value + playerHand[1].value;
let theHouseHandSum = theHouseHand[0].value + theHouseHand[0].value;
console.log(playerHandSum, theHouseHandSum);
```

### Compare Sums

```js
if (playerHandSum > theHouseHandSum) {
  console.log("player wins");
} else if (playerHandSum < theHouseHandSum) {
  console.log("The House wins");
} else {
  console.log("it is a tie");
}
```

Can you think of the edge case where this logic may not work as expected?

**Hint** What happens if someone has two aces as their hand?

How would you solve it?

### Continue Game Play

We would likely want each player to have a name, an amount of money to bet, a total amount of money and more. We could keep making separate values for each one like `playerName`, `playerHand`, `playerBet`, `playerBankroll`, `playerNumOfWins`. But what becomes the problem with such a strategy? What happens if this is a game ends up going into production and is played by millions of people and we are expected to implement all the rules of Black Jack? What could we do to organize our code?

## Further Reading

Eloquent JavaScript

[Chapter 6: The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

### Extreme Super Bonus

Read this code, analyze what it does then research what is `prototype` in JavaScript, how it works and what does it do?

How does it relate to this lesson on classes?

```js
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

console.log("foMO".reverse());
```

Check out [README3.md from the linked list lesson (note: go through linked list lesson to understand the examples provided)](../linked-lists/lesson-notes/README2.md)

Check out this section of [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)

[All the You Don't Know JS Books](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed)
