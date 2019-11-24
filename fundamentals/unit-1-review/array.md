# Array

## Problem 1
Create a function that takes in an array of strings.
and returns an array where the last index of each string is uppercased
- while loop
- build-in method

```js
input => ['lowercase', 'uppercase', 'index', 'method', 'function'];
output => ['lowercasE', 'uppercasE', 'indeX', 'methoD', 'functioN'];
```

## Problem 2
Create a function that takes in an array of numbers, and return only the numbers that are even after 1 is added to their value.
Solve using:
 - while loop
 - for loop

```js
input => [2,5,7,8,1,2,57,99]
output => [5,7,1,57,99]
```

## Problem 3
Create a function that takes in an array of numbers, returns all the non-zero numbers in front of all the zeros in the array, then return the new array and the count of non-zero numbers.

```js
input => [2,0,3,0,5,0,7,1,0]
output => [2,3,5,7,1,0,0,0,0,], 4
```

## Problem 4

Create a function that takes in array of integer, find the two numbers that when multiplied together give the greatest product, and return that product.

```js
input => [2,7,5,8,3,9,1]
output => 72
```

## Problem 5

Write a function that given an array return an array such as the output is equal to the product of all elements except itself.

```js
input: [1, 2, 3, 4];
output: [24, 12, 8, 6];
```

24 = 2 _ 3 _ 4
12 = 1 _ 3 _ 4
8 = 1 _ 2 _ 4
6 = 1 _ 2 _ 3 \* 4

## Problem 6

Write a function that returns a boolean if two numbers in the array equal to a target numnber

```js
input: [2, 8, 6876, 6, 8], 10;
output: true;
```

## Problem 7 

Write a function that sorts numerically in ascending order elements in an array

- for loop
- using a built-in method

```js
input: [3, 58, 873, 9];
output: [3, 9, 58, 873];
```

## Problem 8

Write a function that takes a number and prints 'Fizz' if the number is a multiple of 3, 'Buzz' if the number is a multiple of 5, 'FizzBuzz' if it is a multiple of 3 and 5.
Make sure you can handle negative numbers.

```js
input: 15
output: [
    1
    2
    Fizz
    4
    Buzz
    Fizz
    7
    8
    Fizz
    Buzz
    11
    Fizz
    13
    14
    FizzBuzz
]
```