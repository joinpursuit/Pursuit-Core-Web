# Sorting Algorithms

### Setting intent

> Determine, as a class, what the intent of today should be

## Trivia Questions

What is the value of `newArr`

```js
const newArr = [...[1, 2, 3], ...[4, 5, 6]];
```

<hr>

What is the value of `color` for `newCar`
What is the value of `color` for `secondNewCar`

```js
class Car {
  constructor(brand, model, color = "soul red") {
    this.brand = brand;
    this.model = model;
    this.color = color;
  }
}

const newCar = new Car("Mazda", "MX-30");
const newCar = new Car("Porche", "Vintage Carrera", "Yellow");
```

## Main Problem

Here we have our Deck of Cards class that has been simplified to generate cards that just have a numeric value. We can generate a deck of shuffled cards. We want to create a method that will put the cards back in order.

Write your own `sort` method that sorts the cards from 2 - 11. Do not use the array method `.sort()`

```js
class DeckOfCards {
  constructor() {
    this.cards = [];
    this.createDeck();
    this.shuffle(this.cards);
  }
  createDeck() {
    for (let i = 1; i <= 13; i++) {
      if (i === 1) {
        this.cards.push(11);
      } else if (i === 11) {
        this.cards.push(10);
      } else if (i === 12) {
        this.cards.push(10);
      } else if (i === 13) {
        this.cards.push(10);
      } else {
        this.cards.push(i);
      }
    }
  }
  sort(array) {
    // your code
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

## Next Steps

[Use this visualization to learn more about different sorting algorithms](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

[Another visualization using colors and pixels](https://imgur.com/gallery/RM3wl)

[More visuals](https://imgur.com/gallery/GD5gi)

[Watch a video about two different sorting algorithms](https://www.youtube.com/watch?v=TZRWRjq2CAg&list=PL2aHrV9pFqNRS2b2XX2BvgQIPKh72xREP&index=8)

## Lab: Accumulate Points on Code Wars & Practice with JavaScript's Sort Method

- [Bubble Sort Once](https://www.codewars.com/kata/bubblesort-once)
- [`.sort()` Practice](https://github.com/joinpursuit/m6-sorting-algos-practice) - please continue next session if not finished
