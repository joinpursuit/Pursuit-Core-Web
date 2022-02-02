# Strings and Regular Expressions

## Learning Objectives

- Review strings and common string methods
- BONUS: regular expressions

## Strings can be Array-Like

- Strings are the way we store a series of characters like `C3PO` or `Hello World!`

Strings share some properties with arrays.

```JS
let str = "Hello, world!";

console.log(str.length)
```

You can access a certain letter at a position

```js
console.log(str[1]); // e
```

But you can't replace a character this way

```JS
str[1] = "E";

console.log(str[1]); // e
```

To access a portion of the string, you can use the method `.substring`

```JS
console.log(str.substring(1,5)) // ello
```

You can loop over strings:

```JS

for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}
```

or

```JS
for (let letter of str) {
  console.log(letter);
}
```

But you can't use the array method `reverse`

```JS
console.log(str.reverse()) //str.reverse is not a function
```

You would have to split the string into an array

```js
console.log(str.split()); // [ 'Hello, world!' ]
```

Oops, that just makes it one array item, we want each character

```js
console.log(str.split(" ")); // [ 'Hello,', 'world!' ]
```

Oops, that splits it on the space!

```js
console.log(str.split("")); // [ 'H', 'e', 'l', 'l', 'o', ',', ' ', 'w' 'o', 'r', 'l', 'd', '!']
```

There! Now we have each character. `.split` allows us to choose where we will split our string into separate characters, we could split it on the letter `l`, or any other way we might need in order to solve a problem.

Now we can reverse it

```js
console.log(str.split("").reverse());
```

And to return it to a string, we can use the method `.join`. `.join` also takes an argument to define how we join together the array items into a string

```js
console.log(str.split("").reverse().join(""));
```

## Other Useful String Methods

These are helpful methods to know. By know, it doesn't mean memorize! It just means you will remember enough to google them so you can reference how to use them

- charCodeAt - returns the [character code (video introduction)](https://www.youtube.com/watch?v=MijmeoH9LT4) for a character in a string
- fromCharCode - returns the letter/character from the unicode value
- includes - case sensitive search for a set of characters in a string, returns true or false
- indexOf - finds the index of a character
- padEnd - adds whitespace to the end of a string
- padStart - adds whitespace to the beginning of a string
- repeat - repeats a string, by the value given
- slice - returns a portion of a string, based on position
- substring - returns a portion o a string, based on length
- toString - converts other data types (i.e. numbers) to strings
- trim - removes whitespace from the ends of a string
- JSON.stringify() - converts JSON to a string

Regular Expression methods

- search - searches for a specified value and returns the position
- match - looks for a match, returns true/false
- replace - replaces a value

## Is a Palindrome?

Now that we've reviewed some basics let's go through how to solve Is a Palindrome?

Is a word a palindrome? Write a function that returns `true` if the word is a palindrome and `false` if it is not.

1. Do we understand all the words in stating this problem?

   - what is a palindrome?

   - how can we determine if a word is a palindrome?

2. What are we asked to show?

   - a true or false value

3. Restate the problem in your own words

4. Is there enough information to find a solution?

5. What is our plan?

## Part 1

- Let's think of some test cases. Let's use some words
- radar - a palindrome
- borsch - not a palindrome
- harpo - a word that has meaning forward and backwards, but not a palindrome

Note, we are just testing for alphabetical letters and single words, not sentences or expressions: I.e. is `{}{}` a palindrome?

Note, when writing a function that is supposed to return a true or false value using `is` can be helpful to understand what this function does.

Compare the function names

`palindrome` - this is a noun, it doesn't sound like a function.

`palindromeTester` - this is a verb, which is generally more accurately descriptive of functions (functions do things), but what will it return? The word itself a number?

`isPalindrome` - this can almost be read as English and you can reasonably expect it would return a true or false value:

- radar is palindrome? true
- borsch is palindrome? false

You can apply this to other functions like, `isOdd`, `isPrime` etc.

```js
const isPalindrome = (word) => {
  return word;
};

console.log(isPalindrome("radar"));
```

Now that we have our most basic function written and tested, what is our plan?

- we need to test whether a string is equal to itself when it is reversed
- reverse the string and compare it to the original

Good news! We just learned how to reverse a string, so we can look back at our previous work and adapt it into the current problem:

```js
const isPalindrome = (word) => {
  const reversedWord = word.split("").reverse().join("");
  if (reversedWord === word) {
    return true;
  } else {
    return false;
  }
};

console.log(isPalindrome("radar"));
console.log(isPalindrome("borsch"));
console.log(isPalindrome("harpo"));
```

## Part 2 - Refactoring

Refactoring can be a great way to make your code more readable and deepen your understanding of code.

We can clean this code up a little because comparing the `word` to itself backwards will be true or false value:

```js
const isPalindrome = (word) => {
  if (word === word.split("").reverse().join("")) {
    return true;
  } else {
    return false;
  }
};

console.log(isPalindrome("radar"));
console.log(isPalindrome("borsch"));
console.log(isPalindrome("harpo"));
```

And we can clean it up a little more as well

```js
const isPalindrome = (word) => {
  return word === word.split("").reverse().join("");
};

console.log(isPalindrome("radar"));
console.log(isPalindrome("borsch"));
console.log(isPalindrome("harpo"));
```

This kind of refactoring and writing shorter, more elegant code just comes with practice. Its better to start with the simplest way you can write it and then go back and refactor it. The alternative of getting stuck because you want to make it perfect immediately will not serve you as well.

### Part 3 - Edge Cases

Is `Radar` the same as `radar`?

Yes. So we want to make our function case insensitive.

What is our plan?

We can make the word all lowercase (or uppercase) and then compare it

```js
const isPalindrome = (word) => {
  return word.toLowerCase() === word.split("").reverse().join("");
};

console.log("Racecar");
```

Uh oh! It's false! Can anyone solve what the trouble is?

```js
const isPalindrome = (word) => {
  return word.toLowerCase() === word.toLowerCase().split("").reverse().join("");
};

console.log("Racecar");
```

This is getting a bit hard to read. What kinds of things could we do to help clarify what this function does? What would you say "best practices" are?

## Disemvowel Trolls

[From Code Wars](https://www.codewars.com/kata/52fba66badcd10859f00097e/javascript)

> Trolls are attacking your comment section!

> A common way to deal with this situation is to remove all of the vowels from the trolls' comments, neutralizing the threat.

> Your task is to write a function that takes a string and return a new string with all vowels removed.

1. Do we understand all the words in stating this problem?

   - Vowels are a, e, i, o, u and NOT y for this example

2. What are we asked to show?

   - Strings with the vowels removed "hello" => "hll" and not "h ll "

3. Restate the problem in your own words

4. Is there enough information to find a solution?

5. What is our plan?

- choose some good use cases

  - `ha` => `h` (simplest - just one vowel: `a`)
  - `eh`, `hi`, `oh`, `huh` - test each vowel, in each position ]
  - `seen` - test two vowels in a row
  - `pfft` => `pfft` (will not change if no vowels)
  - `Oh!` => 'h!` (deals with a capital letter and a non-letter)
  - `My girl wove six dozen plaid jackets before she quit.` => `My grl wv sx dzn pld jckts bfr sh qt.` This is a pangram, it has at least one of each letter in the alphabet. It also has multiple words.

- loop over each letter
  - check if it is a vowel
  - if it is a vowel remove it (not replace it)
  - return the updated word without vowels

Get started:

```js
const disemvowelWord = (word) => {
  return word;
};

console.log(disemvowelWord("ha"));
```

Loop over each letter:

```js
const disemvowelWord = (word) => {
  for (let i = 0; i < word.length; i++) {
    console.log(word[i]);
  }
  //   return word;
};

console.log(disemvowelWord("ha"));
```

Only console log if the letter is an a

```js
const disemvowelWord = (word) => {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "a") {
      console.log(word[i]);
    }
  }
  //   return word;
};

console.log(disemvowelWord("ha"));
```

Only console log if the letter is a vowel: `a` or `e` or `i` or `o` or `u`

```js
const disemvowelWord = (word) => {
  for (let i = 0; i < word.length; i++) {
    if (
      word[i] === "a" ||
      word[i] === "e" ||
      word[i] === "i" ||
      word[i] === "o" ||
      word[i] === "u"
    ) {
      console.log(word[i]);
    }
  }
  //   return word;
};

console.log(disemvowelWord("ha"));
console.log(disemvowelWord("pffft"));
console.log(disemvowelWord("eh"));
console.log(disemvowelWord("hi"));
console.log(disemvowelWord("oh"));
console.log(disemvowelWord("huh"));
```

Remove the letter if it is a vowel

```js
const disemvowelWord = (word) => {
  let wrd = word;
  for (let i = 0; i < word.length; i++) {
    if (
      word[i] === "a" ||
      word[i] === "e" ||
      word[i] === "i" ||
      word[i] === "o" ||
      word[i] === "u"
    ) {
      wrd = word.slice(0, i) + word.slice(i + 1);
    }
  }
  return wrd;
};

console.log(disemvowelWord("ha"));
console.log(disemvowelWord("pffft"));
console.log(disemvowelWord("eh"));
console.log(disemvowelWord("hi"));
console.log(disemvowelWord("oh"));
console.log(disemvowelWord("huh"));
```

Good progress! Two vowels in a row!

```js
console.log(disemvowelWord("seen"));
```

Uh oh, the second letter is skipped. Why? How do we fix it?

<details><summary> hint
</summary>

```js
const disemvowelWord = (word) => {
  for (let i = 0; i < word.length; i++) {
    if (
      word[i] === "a" ||
      word[i] === "e" ||
      word[i] === "i" ||
      word[i] === "o" ||
      word[i] === "u"
    ) {
      word = word.slice(0, i) + word.slice(i + 1);
      i--;
    }
  }
  return word;
};
```

</details>

Let's try our a capital vowel:

```js
console.log(disemvowelWord("Oh"));
```

```js
const disemvowelWord = (word) => {
  for (let i = 0; i < word.length; i++) {
    if (
      word[i].toLowerCase() === "a" ||
      word[i].toLowerCase() === "e" ||
      word[i].toLowerCase() === "i" ||
      word[i].toLowerCase() === "o" ||
      word[i].toLowerCase() === "u"
    ) {
      word = word.slice(0, i) + word.slice(i + 1);
      i--;
    }
  }
  return word;
};
```

Thought question: why cant we do?

```js
const disemvowelWord = (word) => {
  word = word.toLowerCase();
  // ...
};
```

Last use case:

```js
disemvowelWord("My girl wove six dozen plaid jackets before she quit.");
```

Oh! It really doesn't work!

We have written a really nice, well-tested function to remove vowels from a word. However, we didn't write it to deal with many words/sentences.

What can we do? We can think back to `Print Primes` - we used a function that tested a single number, and then wrote another function that dealt with a group of numbers. We can write a `disemvowelTrolls` function that will take sentences, split them into words, pass the words in to our disemvowelWord function and update our sentence.

Let's write out our plan

- take a sentence (string) and `split` it up by word
- replace the array of original words, with an array of words without vowels (`.map` is an array method that iterates over an array and returns a new array - we will go over this function and working with arrays in more depth, later)
- join the array back together

```js
const disemvowelTrolls = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => disemvowelWord(word))
    .join(" ");
};

console.log(
  disemvowelTrolls("My girl wove six dozen plaid jackets before she quit.")
);
```

## Bonus

Now that we've solved this using what we know, we can check out the Code Wars top voted solution

```js
function disemvowel(str) {
  return str.replace(/[aeiou]/gi, "");
}
```

## What?!

- One line!?
- what the heck is `/[aeiou]/gi` ?!

It's ok! Our solution works great and we didn't have `Regular Expressions` in our personal tool kit. Now, we have something new to study! Hooray!

[Let's Learn More](README2.md)

## Further Reading

Eloquent JavaScript

[Chapter 1: Values, Types and Operators](https://eloquentjavascript.net)

[Chapter 9: Regular Expressions](https://eloquentjavascript.net/09_regexp.html)
