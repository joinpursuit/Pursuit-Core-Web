# Working with Objects

- Review fundamentals of objects
- Build and use nested objects

## Objects Keys and Properties

An object is a collection of keys and values. It is represented with `{}`. In some other coding languages objects can be referred to as `dictionaries`.

The values can be strings, numbers, booleans, arrays, functions or other objects.

Let's build a computer

```js
const computer = {};
```

Let's add some properties

```js
const computer = {
  brand: "Tandy",
  weight: 22,
  working: false,
  condition: "mint",
  price: 2894,
  powerUp() {
    return "the computer now is on";
  },
  powerDown() {
    return "the computer is now off";
  },
};
```

We can access a property in two ways:

```js
console.log(computer.brand);
console.log(computer["brand"]);
```

The second way, allows us to pass in a variable

```js
const someKey = "weight";

console.log(computer[someKey]);
```

This will allow us to iterate over an object with the `for in` loop

Here we can see the keys:

```js
for (let key in computer) {
  console.log(key);
}
```

To access the properties:

```js
for (let key in computer) {
  console.log(computer[key]);
}
```

We can also see a list of keys with the `Object.getOwnPropertyNames()` function

```js
const computerKeys = Object.getOwnPropertyNames(computer);

console.log(computerKeys);
//[ 'brand', 'weight', 'working', 'trackpad', 'condition', 'price' ]
```

We can then use a `for loop`

```js
for (let i = 0; i < computerKeys.length; i++) {
  console.log(computer[computerKeys[i]]);
}
```

To call a function inside an object, we must invoke the function

```js
console.log(computer.powerUp());
```

To change a property we can overwrite it

```js
computer.price = 5;

console.log(computer.price);
```

To add a property, we name the key and set a value

```js
computer.color = "griege";

console.log(computer);
```

## Nested Objects

```js
const backpack = {
  color: "green",
  contents: [
    "laptop",
    "paper",
    "phone",
    { wallet: ["money", "id", ["mastercard", "visa card", "discover card"]] },
    {
      pockets: {
        outer: ["metrocard", "tissues"],
        inner: {
          outer: "ruler",
          inner: ["dental floss", { mintFlavor: "peppermint", number: 33 }],
        },
      },
    },
  ],
  zipIt() {
    return "it is zipped";
  },
  unZipIt() {
    console.log("some items fell out");
    return {
      pickUpItems() {
        return ["lip balm", "comb", "38 cents"];
      },
    };
  },
};
```

Work your way to console log the following

1. color
1. contents
1. the contents of the wallet
1. the mint flavor
1. the return value of pickUpItems
1. 38 cents

<details><summary>Check your work</summary>

```js
console.log(backpack.color);

console.log(backpack.contents);

console.log(backpack.contents[4]);

console.log(backpack.contents[4].pockets.inner);

console.log(backpack.contents[4].pockets.inner.inner[1].mintFlavor);

console.log(backpack.unZipIt().pickUpItems());

console.log(backpack.unZipIt().pickUpItems()[2]);
```

</details>

## Object Destructuring

Let's imagine we are building a web page that is showing all the contents of the backpack.

When we get to `contents` - we will have to type `backpack.contents` every single time, which makes our code a bit long and perhaps, even tougher to read. This is especially true if you are working with someone else's object who was not careful working naming things and the data you are working with has properties like `whatchamacallit.thingie.thing.stuff1.otherstuff`

We can pull out our contents and use them directly, the new variable must be named the same as the key

```js
const { contents } = backpack;

console.log(contents);
```

If we change the contents, the original object will be affected as well:

```js
contents[0] = "Tablet";

console.log("just contents:", contents); // our new object
console.log("backpack:", backpack.contents); // our old object
```

We can do this inside a function

```js
const showContents = ({ contents }) => {
  for (let content of contents) {
    console.log(content);
  }
};

showContents(backpack);
```

We can rename the key:

```js
const { wallet: clip } = backpack.contents[3];

console.log(clip);
```

## Combining objects

Let's go back to our `computer`. We have scored a `box` and we want to combine the contents with our computer.

```js
const box = {
  brand: "Tandy",
  joystick: "Classic Vintage 1000",
  keyboard: "Keyfun 5000",
  working: "true",
};
```

There is a function called `Object.assign` that will merge our objects together.

The first argument is the target object, the second is will have its content moved in. What happens if both have the same property like `brand`? What happens if the property value has changed like `working`?

Notice, that the properties for `computer` have been updated, but `box` has not.

```js
const newComputer = Object.assign(computer, box);

console.log(newComputer);
console.log(computer);
console.log(box);
```

What if we wanted to make a new object but not change newComputer?

Could we put the values in a new object?

```js
const clonedComputer = Object.assign({}, computer);
const newComputer = Object.assign(clonedComputer, box);

console.log(computer);
console.log(clonedComputer);
console.log(newComputer);

console.log(box);
```

### Using the Rest Operator

```js
const restComputer = { ...computer, ...box };

console.log("===Old Computer===");
console.log(computer);
console.log("===Rest Computer ===");
console.log(restComputer);
```

Finally, we have a shortcut for adding key value pairs

```js
const a = 5;
const b = "hello";
const c = true;

const someObject = {
  a,
  b,
  c,
};

console.log(someObject);
```

Take the time to run this code and see if you can explain what it is doing

## Word Frequency

Write a function `findWordFrequency` that takes a sentence (a string), and returns an object with each word as a key, with a value of how many times that word appears in a the sentence

[Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo](https://en.wikipedia.org/wiki/Buffalo_buffalo_Buffalo_buffalo_buffalo_buffalo_Buffalo_buffalo)

Would result in:

```js
{
  buffalo: 5,
  Buffalo: 3
}
```

1. Do we understand all the words used in stating the problem?

2. What are we asked to show?

3. Restate the problem in your own words (it's ok if your words are more clumsy, you don't need the perfect phrasing, you just need to clarify that you understand he problem, and one of the best ways to do that is to put it in your own words)

4. Is there enough information for you to find a solution?

   - Is there any information that is missing?

5. What is our plan?

   - Do we need more test cases beyond the one(s) provided?

   - Convert sentence to an array of words
   - Loop over the array of words
   - If the word is not an object key, add it as a key and set the count value to 1
   - Else if the word is an object key, increase the count value to 1
   - Loop over the object to find the word with the greatest frequency

Get started:

```js
const buffaloSentence =
  "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo";

const wordCounter = (sentence) => {
  return sentence;
};

console.log(wordCounter(buffaloSentence));
```

Convert sentence to array of words

```js
const wordCounter = (sentence) => {
  const wordsArray = sentence.split(" ");
  return wordsArray;
};

console.log(wordCounter(buffaloSentence));
```

Loop over the array

```js
const wordCounter = (sentence) => {
  const wordsArray = sentence.split(" ");
  for (let word of wordsArray) {
    console.log(word);
  }
  //   return wordsArray;
};

console.log(wordCounter(buffaloSentence));
```

If the word is not an object key, add it as a key and set the count value to 1

```js
const wordCounter = (sentence) => {
  const wordsArray = sentence.split(" ");
  const wordCount = {};
  for (let word of wordsArray) {
    if (!wordCount[word]) {
      wordCount[word] = 1;
    }
  }
  return wordCount;
};

console.log(wordCounter(buffaloSentence));
```

Else if the word is an object key, increase the count value to 1

```js
const wordCounter = (sentence) => {
  const wordsArray = sentence.split(" ");
  const wordCount = {};
  for (let word of wordsArray) {
    if (!wordCount[word]) {
      wordCount[word] = 1;
    } else {
      wordCount[word]++;
    }
  }
  return wordCount;
};

console.log(wordCounter(buffaloSentence));
console.log(wordCounter(roseSentence));
```

Finally, we need to figure out which word has the highest frequency.

This is actually a separate task than counting words, so let's write a new function.

```js
const findHighestFrequency = (wordsObj) => {
  return wordsObj;
};

const buffaloWords = wordCounter(buffaloSentence);

console.log(findHighestFrequency(buffaloWords));
```

We need to return two values: the word and the count. We'll store it as an object, the word being the key and the count being the value

Then, we will loop over each key and check if it has the highest count. If it has the highest count, then we will store it as the new value, if it does not have a higher count, we will not update the object.

```js
const findHighestFrequency = (wordsObj) => {
  let highestFrequency = 0;
  let word = null;
  for (let key in wordsObj) {
    if (wordsObj[key] > highestFrequency) {
      highestFrequency = wordsObj[key];
      word = key;
    }
  }
  return { [word]: highestFrequency };
};
```

### Bonus

We can rewrite our if/else statement from our first function like so:

```js
const wordCounter = (sentence) => {
  const wordsArray = sentence.split(" ");
  const wordCount = {};
  for (let word of wordsArray) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }
  return wordCount;
};
```

Explain how the new line of code works:

- What does `||` do?
- Why does it need `0`?
- Why are there parenthesis?
- What does the `+1` do?
- How does it all come together to create the counter object?

## Edge Case Punctuation

What if our sentences had punctuation, like so?

```js
const buffaloSentence =
  "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo!";
```

We would want to look at each word and `replace`any character that is not a letter with an empty string.

We can use a regular expression:

- Every lowercase letter:
  - `/[a-z]/g`
- Every letter (lowercase and uppercase)
  - `[a-z]/gi`
- NOT every letter
  - `/[^a-z]/gi`

```js
const wordCounter = (sentence) => {
  const wordsArray = sentence.split(" ");
  const wordCount = {};
  for (let word of wordsArray) {
    word = word.replace(/[^a-z]/gi, "");
    wordCount[word] = (wordCount[word] || 0) + 1;
  }
  return wordCount;
};
console.log(wordCounter(buffaloSentence));
```

## Further Reading

Eloquent JavaScript

[Chapter 4: Data Structures: Objects and Arrays](https://eloquentjavascript.net/04_data.html)
