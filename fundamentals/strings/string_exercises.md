# String Exercises

1. console.log the first character of a string.

2. console.log the length of a string.

3. console.log the last character of any string.

4. Create a code block that takes a single string variable, and returns a copy of the string with the last letter capitalized. For example:

```js
'jimmy'
// => 'jimmY'
```

5. Create a drEvil code block that will take a single number variable, and log the '<variablbeAmount> dollars',
your code block should add '(pinky)' at the end of the amount if it's 1 million. For example:

```js
let amount = 10
// => 10 dollars
let amount = 1000000
// =>  1000000 dollars (pinky)
```

6. Create a `verbing` code block. It should take a single string variable. If its length is at least 3, it should add 'ing' to its end, unless it already ends in 'ing', in which case it should add 'ly' instead. If the string length is less than 3, it should leave it unchanged.
For example:

```js
verbing('box')
// => 'boxing'
verbing('train')
// => 'training'
verbing('swimming')
// =>  'swimmingly'
verbing('go')
// =>  'go'
```

7. Create a `withoutLast` code block that takes a single string variable, and returns a copy of the string without the  last letter.
For example:

```js
withoutLast('jimmy')
// => 'jimm'
```

8. Create a `getLast` code block that takes a single string variable, and returns the last letter of the string. For example:

```js
getLast('jimmy')
// => 'y'
```

9. Create a `mixUp` code block. It should take in two strings, and return the concatenation of the two strings (separated by a space) slicing out and swapping the first 2 characters of each.
You can assume that the strings are at least 2 characters long. For example:

```js
mixUp('mix', 'pod')
// => 'pox mid'
mixUp('dog', 'dinner')
// => 'dig donner'
```
10. Write a `XO` code block to check to see if a string has the same amount of 'x's and 'o's.
The method must return a boolean and be case insensitive. The string can contain any character.

```js
XO("ooxx")    // returns true
XO("xooxx")   // returns false
XO("ooxXm")   // returns true
XO("zpzpzpp") // returns true because zero 'x's and 'o's are present
XO("zzoo")    // returns false
```
11. Write a `countVowels` code block that receives a string and returns the number of vowels found in the string.

countVowels("hello") // returns 2

countVowels("dog says woof") // returns 4

countVowels("cat says meow") // returns 4

12. Write a `isPalindrome` code block that receives a string and returns a boolean if the string is a palindrome or not.

isPalindrome("racecar") // returns true

isPalindrome("tattarrattat") // returns true

isPalindrome("dog") // returns false

13. Write your own `mySubString` code block that looks at three variables, a string and two numbers (a start index and an end index).
The substring should include all characters from the the start index and up to (but not including) the end index.
```js
mySubString("giraffe", 1, 2) // returns "i"
mySubString("giraffe", 2, 7) // returns "raffe"
mySubString("giraffe", 0, 2) // returns "gi"
```
14. Write a `myIncludes` code block that takes a string variable and a letter variable. It should log a boolean of whether
 letter is found in the string or not.

```js
myIncludes("hello", "e") // returns true  


myIncludes("buddy", "z") // returns false
```

15. Write a code block that takes a number variable (num) and logs a triangle - using hashtags,
with height and base equal to the value of num.
For example, if the value of num is 5, the triangle will look like this:
```js
#
##
###
####
#####
```
