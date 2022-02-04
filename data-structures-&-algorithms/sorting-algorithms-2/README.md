# Sorting Algorithms 2

### Setting intent

> Framework Fatigue is real. If you're feeling stressed, go back to fundamentals

Tech is always changing, there are always new developments, frameworks tech stacks etc. New things are exciting! But new things are still based on core principles. The better you know your fundamentals, the easier you'll be able to adapt to something new.

It is also worth noting that it is more important to use the right tool for the job, and that may or may not be the newest library/framework/language/database. Older tech may be less exciting, but it usually comes with more stability and a larger ecosystem : More users, more support, more additional features (packages, libraries, etc.).

## Trivia Questions

If `const` declares a constant variable, why can you declare an array and still add/change and delete elements?

<hr>

What is the final value of `a` and `b`

```js
let a = 10;
let b = 20;

[a , b] = [b, a];

```

Is there any difference if the code is written like so?
```js
const a = 10;
const b = 20;

[a , b] = [b, a];

```


## Main Problem

Here we have our Deck of Cards class. We can generate a deck of shuffled cards. This time the cards are card objects. We want to create a method that will put the cards back in order.

Write your own function called `cardSort` inside the `DeckOfCards` class that sorts the cards first by `suit` then by `value`, then sort the `10`s by the order `Jack`, `Queen`, `King`. Try using the array method `.sort()`

```js
class Card {
  constructor(face, value, suit) {
    this.face = face;
    this.value = value;
    this.suit = suit;
  }
}

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

## More Problems (Solve if you finished the main problem or want more practice)

- [Bubble vs Insertion Sort](https://www.youtube.com/watch?v=TZRWRjq2CAg&list=PL2aHrV9pFqNRS2b2XX2BvgQIPKh72xREP&index=8)
- [Merge vs Quick Sort](https://www.youtube.com/watch?v=es2T6KY45cA&list=PL2aHrV9pFqNRS2b2XX2BvgQIPKh72xREP&index=4)
- Just for fun [Bogo and Stooge Sort](https://www.youtube.com/watch?v=bfzYj-qGw7U&list=PL2aHrV9pFqNRS2b2XX2BvgQIPKh72xREP&index=9)

- [Use this visualization to learn more about different sorting algorithms](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

After reviewing some other strategies for sorting, do any of them represent your pseudo code you wrote during the least lesson for sorting the cards?

### Lab Practice with `.sort()`

- [`.sort()` Practice](https://github.com/joinpursuit/m6-sorting-algos-practice) - may have started this in previous session
