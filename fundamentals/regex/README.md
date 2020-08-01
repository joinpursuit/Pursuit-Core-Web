# Regular Expression


## Objectives

Learn how to use regular expression to search, extract and replace in strings, efficiently.

## Vocabulary

* regex, regexp, regular expression
* characters
* match
* search
* flags
* replace
* groups, nested groups

## Lesson

### What is a Regular Expression or a Regex?

Simply put a Regex is a **pattern** that describes a string. We use this pattern to search, replace or manipulate strings. 

A regular expression is a pattern that is matched against a target string. The pattern provides a way to describe complex sequences of characters, but in its
simplest form is just a few characters that need to match exactly.

For instance the pattern `/xyz/` will match any `x` followed by a `y` followed by a `z`. In `"You do abc and then xyz"`, the pattern `/xyz/` will match the `xyz` characters at the end of the string.

On the string `"I earned 12 gold medals throughout my career"` the pattern `/\d\d/` will match the number `12`. `\d` matches **any digit** and we are searching for two of them.

:bulb: Regular Expressions are usually used by string-searching algorithms for "find", "find and replace" operations on string or for input validation.

### Creating a Regex and using it.

There is two ways in which you can create a Regex in JavaScript. By using the `RegExp('pattern')` constructor or by defining it literally inside a pair of forward slashes `/pattern/` 

##### Using RegExp Constructor
```js
let text = "You do abc and then xyc.";
let pattern = new RegExp('xyz'); 

pattern.exec(text); // Execute the pattern on text string
// => [ 'xyc', index: 20, input: ...]
```

##### Using a Regex literal
```js
let text = "You do abc and then xyz.";
let pattern = /xyc/; // Literal Regex

pattern.exec(text);
// => [ 'xyc', index: 20, input: ...]
```

The return value of both this expressions is an array with the match. It has `index` and `input` properties. `index` is the location of the match (starting from 0). and `input` is the original text.

It returns `null` if there is no match.

```js
let text = 'The text does not have exwhyzee';
let pattern = new RegExp('xyz');

pattern.exec(text);
// => null
```

### Using Regular Expressions in JavaScript

Regular Expressions can be used in the following JavaScript Methods:

| Method                          | Description                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `RegExp.prototype.exec()`       | Executes a search for a match in a string. It returns an array of information or null on a mismatch.             |
| `RegExp.prototype.test()`       | Tests for a match in a string. It returns true or false.                                                         |
| `String.prototype.match()`      | Returns an array containing all of the matches, including capturing groups, or null if no match is found.        |
| `String.prototype.matchAll()`   | Returns an iterator containing all of the matches, including capturing groups.                                   |
| `String.prototype.search()`     | Tests for a match in a string. It returns the index of the match, or -1 if the search fails.                     |
| `String.prototype.replace()`    | Executes a search for a match in a string, and replaces the matched substring with a replacement substring.      |
| `String.prototype.replaceAll()` | Executes a search for all matches in a string, and replaces the matched substrings with a replacement substring. |
| `String.prototype.split()`      | Uses a regular expression or a fixed string to break a string into an array of substrings.                       |

:information_source: Source MDN - [Using Regular Expressions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#:~:text=Using%20regular%20expressions%20in%20JavaScript)

#### str.match() Example

```js
let text = 'I may not have been sure about what really did interest me, but I was absolutely sure about what didn\'t.';

let pattern = /may/;

text.match(pattern);
// -> [ 'may', index: 2, input: ... ]
```

Above code behaves identical to writing it as `pattern.exec(text)`


### Character Classes

| Character | Matches                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `\d`      | Digits.                                                                 |
| `\D`      | non-digits.                                                             |
| `\s`      | Space symbols, tabs, newlines `[ \t\r\n\f]`                             |
| `\S`      | All but `\s`.                                                           |
| `\w`      | Word characters (Latin letters, digits, underscore '_').                |
| `\W`      | All but `\w`.                                                           |
| `.`       | Any character any except a newline `\n`. Include flag 's' to match `\n` |

Regular expressions would be anemic without powerful expressions, the most commonly used one is the dot `.`.

```javascript
/h..e/.exec('The text does not have exwhyzee');
// -> [ 'have', index: 18, input: ... ]
```

A dot stands for any single character. For exactly one of them.

If we do not if there is a character or not, we can _modify_ a character match with a question mark:

```javascript
/not/.test('The text does not have exwhyzee'); // true
/nt/.test('The text doesnt have exwhyzee'); // true

/not/.test('The text doesnt have exwhyzee'); // false
/nt/.test('The text does not have exwhyzee'); // false

// But one pattern to rule them all:
let pattern = /no?t/

pattern.test('The text doesnt have exwhyzee'); // true
pattern.test('The text does not have exwhyzee'); //true
```

Question mark stands for __1 match or 0 matches__.

Sometimes we need to search for the dot or question mark. In order to do that we need to escape it, otherwise it will have the special meaning:

```javascript
let text = 'We have 3 sentences here. Each one ends with a full stop. Which is a dot.';

let pattern = /\./;

/\./.exec(text);
// -> [ '.', index: 24, input: ... ]
```


### Sets & Ranges

Occasionally the dot character is too powerful as it matches any characters, in this case we can use the ranges. A **set** expression is in brackets, example `[aeiou]`. This will match any **one character** of the English vowels:

```javascript
/[aeiou]/.exec('The text does not have exwhyzee');
// -> [ 'e', index: 2, input: ... ]

// Try to just looks for an o or a u:

/[ou]/.exec('The text does not have exwhyzee');
// -> [ 'o', index: 10, input: ... ]
```

In case we want to include all letters (but not the digits, emojis, etc.), we could write: `[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]`, but that seems to be unwieldily, so we have a neat shortcut: **Ranges** written like `[a-zA-Z]`. Same trick can be used to find the digits:

```javascript
/[0-9]/.exec('The text does has a few numbers. 1 exactly.');
// -> [ '1', index: 33, input: ... ]
```

What if we want to include the dash character? We need to put that at the first spot right after the opening brackets. Also notice the lack of need to escape the dot charter when it is inside the range expression:

```javascript
let punctuation = /[-,.;:]/;

punctuation.exec('The text does has a few numbers. 1 exactly.');
// -> [ '.', index: 31, input: ... ]
```

When we need a character match that is NOT one of the listed one, we can use the exclusion range expression: `[^`...`]`:

```javascript
let notLetter = /[^a-zA-Z]/;

notLetter.exec('The text does has a few numbers. 1 exactly.');
// -> [ ' ', index: 3, input: ... ]
```

:bulb:

* Range `[0-9]` is same as character class `\d` 
* `[ \t\r\n\f]` same as `\s` 
* `[A-Za-z0-9_]` same as `\w` 

### Quantifiers
Ok, what if we want to match a repeating word character, digit or an entire pattern?. **Quantifiers!!** 

There are a few more of these:

* `?` -- 0 or one matches.
* `*` -- 0 or more matches.
* `+` -- 1 or more matches.
* `{`_n_`}` -- exactly _n_ matches.
* `{`_n_`, }` -- _n_ or more matches.
* `{`_n_`, `_m_`}` -- exactly _n_ to _m_ matches.

Notice how the question mark, the plus sign and the star are just shortcuts and could be written as:

* `?` -- `{0, 1}`
* `*` -- `{0, }`
* `+` -- `{1, }`


This trick comes super handy:

```javascript
let aWord = /[a-zA-Z]+/; // Match 1 or more characters from the range a-z or A-Z

aWord.exec('The text does has a few numbers. 1 exactly.');
// -> [ 'The', index: 0, input: ... ]
```

There are other shortcuts we can use, saving us lazy programmers from typing too much:


### Matching Boundaries. Match on start and end of.

* `^` -- matches on start of the string
* `$` -- matches at the end of the string
* `\b` -- matches at the boundaries of the word

Note that these all share a common trait: as opposed to every other one we learned before these do NOT match on a character, but on boundaries of characters.

### .test, .search, .replace, .split

Occasionally we just need to know if there is a match and we are not interested in the match or the location of it. We can use `RegExp.test(text)` in this case:

```javascript
let aDefiniteArticle = /[tT]he/;

aDefiniteArticle.test('The text does has a few numbers. 1 exactly.');
// -> true

aDefiniteArticle.test('Any text can have numbers.');
// -> false
```

`String.search(pattern)` returns only the location of the match, instead of the usual array.

```javascript
let aDefiniteArticle = /[tT]he/;

'The text does has a few numbers. 1 exactly.'.search(aDefiniteArticle);
// -> 0
```

`String.replace(pattern, newText)` replaces the match with the text supplied in the second argument and returns the new string.

```javascript
let aDefiniteArticle = /[tT]he/;

'The text does has a few numbers. 1 exactly.'.replace(aDefiniteArticle, 'A');
// -> 'A text does has a few numbers. 1 exactly.'
```

`String.split(pattern)` is our old friend but it does work great with patterns:

```javascript
let wordBoundary = /\b/;

'The text does has a few numbers. 1 exactly.'.split(wordBoundary);
// -> '[ 'The',
//   ' ',
//   'text',
//   ' ',
//   'does',
//   ' ',
//   'has',
//   ' ',
//   'a',
//   ' ',
//   'few',
//   ' ',
//   'numbers',
//   '. ',
//   '1',
//   ' ',
//   'exactly',
//   '.' ]
```

Notice how it preserves the whitespace between the words.


### Flags: Global, multiline, match-all, ignore case

```javascript
let aDefiniteArticle = /\b[tT]he\b/g;

'Make the thing do the thing. There is no try, just the done.'.replace(aDefiniteArticle, 'a');
// -> 'Make a thing do a thing. There is no try, just a done.'
```

Notice the g after the closing `/` of the regular expression. This is an example of a regex flag. This stands for _global_, as in find all instances of the match.

```javascript
let aDefiniteArticle = /\b[tT]he\b/g;

'Make the thing do the thing. There is no try, just the done.'.match(aDefiniteArticle);
// -> [ 'the', 'the', 'the' ]
```

This gives us a handy trick for counting occurrences of a word:

```javascript
let aDefiniteArticle = /\b[tT]he\b/g;

'Make the thing do the thing. There is no try, just the done.'.match(aDefiniteArticle).length;
// -> 3
```

Other useful flags:

* `/pattern/i` -- ignore case, letters match both lowercase and uppercase.
* `/pattern/m` -- multiline, treat beginning and end characters (`^` and `$`) as working over multiple lines (i.e., match the beginning or end of each line (delimited by `\n` or `\r`), not only the very beginning or end of the whole input string)
* `/pattern/u` -- unicode; treat pattern as a sequence of unicode code points


### All the matches and match groups

Besides matching text we can use regular expressions to extract information for further processing. This is done by defining groups of characters and capturing them using the special parentheses `(` and `)` metacharacters. Any subpattern inside a pair of parentheses will be captured as a group. In practice, this can be used to extract information like phone numbers or emails from all sorts of data.

```javascript
let ipAddress = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;

'10.1.14.41'.match(ipAddress);
// -> [ '10.1.14.41' ]

let ipAddressParts = /(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/;

let groups = '10.1.14.41'.match(ipAddressParts);
// -> [ '10.1.14.41',
//   '10',
//   '1',
//   '14',
//   '41',
//   index: 0,
//   input: '10.1.14.41' ]

groups[0]; // the whole match
groups[1]; // the first byte
// ...
```

Groups can get modifiers just like single characters and ranges:

```javascript
let aSong = /tra (la ){3,}/;

'tra la la la la lah'.match(aSong);
// -> ['tra la la la la ', ...

'tra la la'.match(aSong);  // too short
// -> null
```


#### Nested matches

For complex data, you can easily extract multiple layers of information, with nested groups. The results of the captured groups are in the order in which they are defined--in order by open parenthesis.

The nested groups are read from left to right in the pattern, with the first capture group being the contents of the first parentheses group, etc.

```javascript
let dateAndYear = /(\w+ (\d+))/g;

while (matches = dateAndYear.exec('Jan 1987\nMay 1969\nAug 2011')) {
  console.log(matches)
}
// [ 'Jan 1987',
//   'Jan 1987',
//   '1987',
//   index: 0,
//   input: 'Jan 1987\nMay 1969\nAug 2011' ]
// [ 'May 1969',
//   'May 1969',
//   '1969',
//   index: 9,
//   input: 'Jan 1987\nMay 1969\nAug 2011' ]
// [ 'Aug 2011',
//   'Aug 2011',
//   '2011',
//   index: 18,
//   input: 'Jan 1987\nMay 1969\nAug 2011' ]
```

Notice how we use the `RegExp.exec()` return value truthiness to loop through until we get a `null` match, which being falsy, terminates the loop.


### The or `|` operator

You can use the `|` (or) operator for defining alternative matches, you do this inside a group:

```javascript
let allDigits = /(zero|one|two|three|four|five|six|seven|eight|nine)/i;

'Three little daffodils waving at me\nOne, two, three\nOne, two, three\nThree little daffodils waving at me'.match(allDigits);
// -> ['Three', ...
```

### Controlling greediness

Greedy means match longest possible string. Lazy means match shortest possible string. By default all the expressions we wrote are greedy. We use `?` to mark a modifier as lazy.

For example, the greedy `/h.+l/` matches `'hell'` in `'hello'` but the lazy `/h.+?l/` matches `'hel'`:

```javascript
let notAnHtmlTag = /<.+>/;
let anHtmlTag = /<.+?>/;

'<em>Hello World</em>'.match(notAnHtmlTag);
// -> ['<em>Hello World</em>', ...

'<em>Hello World</em>'.match(anHtmlTag);
// -> ['<em>', ...
```

### Exercises

* Complete the Exercises in [RegexOne](https://regexone.com/)
<details>
<summary> Additional Exercises</summary>

1. Find `the` in the text below:

  ```js
  let text = "I looked up at the mass of signs and stars in the night sky and laid myself open for the first time to the benign indifference of the world."
  ```

2. Find **ALL** the definite articles (`the`) in the text below:

  ```js
  let text = "I looked up at the mass of signs and stars in the night sky and laid myself open for the first time to the benign indifference of the world."
  ```

3. Find the first capital letter in the text below:

  ```js
  let text = "txtng: the Gr8 Db8"
  ```

4. Find the first number in the text below:

  ```js
  let text = "There are 300,000,000 Americans, give or take."
  ```

  Yes, it should be three hundred million.

5. Find the first capitalized word in the text below:

  ```js
  let text = `txting: the Great Debate`
  ```

6. Match all hexadecimal color codes[:

  ```js
  let text = `
    These are CSS colors, some are in the RGB format, some are in the Hexadecimal format and some are in both.
    Extract all the colors that are in hex format. 
    gainsboro rgb(220,220,220)
    lightgray #D3D3D3
    silver #C0C0C0
    darkgray #A9A9A9 rgb(169,169,169)
    gray rgb(128,128,128)
    aquamarine #7FFFD4
    dimgray rgb(105,105,105)
    lightslategray rgb(119,136,153)
    slategray #708090 
    darkslategray #2F4F4F rgb(47,79,79)
    black #000000
  `
  ```

7. Find the first word in the text:

  ```js
  let text = 'This is an example.';
  ```

8. Find the last word in the text:

  ```js
  let text = 'This is an example.';
  ```

  Note that does not include the full stop. Also should work on sentences without the full stop:

  ```js
  let text = 'This is also an example';
  ```

9. For the following strings, write an expression that matches and captures both the full date, as well as the year of the date.

  ```js
  let dates = ['01/01/2000', '12/31/1999', '02/29/2017'];
  ```

10. Find and print all tags in this simple html:

  ```js
  let html = '<html><head>'+
             '<title>Simple</title>'+
             '</head><body>'+
             'Nothing to see here'+
             '</body></html>';
  ```
</details>

### Resources
* [JavaScript Methods with Regex](https://javascript.info/regexp-methods)
* [Regex Tester/Debugger (super helpful)](https://regexr.com/)
* [RegexOne: Interactive Tutorial](https://regexone.com/)
* [Regex - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
