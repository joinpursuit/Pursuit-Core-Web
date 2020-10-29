[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Loops Lesson

## Learning Objectives

- Know and understand how to write a `while` loop.
- Know and understand how to write a `for` loop.

## Keywords

- `while` loops
  - condition
- `for` loops
  - initialization
  - condition
  - increment
- `break`
- `continue`
- infinite loop

# Introduction

Consider a program that logs the numbers between 1 and 10:

```js
console.log(1)
console.log(2)
console.log(3)
...
```

This program isn't much fun to write, and it isn't very practical either. What if we wanted to log the numbers between 1 and 1000? There is a better solution than writing this by hand: **loops**. Loops are a solution for repetitive tasks.

# The `while` loop

Now that we know why loops can be a good idea, let's write our first **while** loop. A **while** loop is similar to an **if** statement, in that we will check if some condition is true. Unlike an **if** statement, we will execute the code block following the while loop again and again **as long as the condition is true**. Whenever we reach the bottom of the code block, we go right back up and check the condition again.

```js
let num = 1;
while (num <= 10) {
  console.log("the number is: " + num);
}
```

If you try to run the code above, the number `1` will be logged repeatedly. Eventually, your computer will freeze or you will see an error message. This is because we are repeatedly checking if the value of `num` is smaller than 10. If it is smaller, we log the value of `num`, and check again. Since the value of `num` never changes, we just keep logging `1`, until the computer runs out of memory. This is called an _infinite loop_.

To fix this, we need to change the value of `num` inside the code block. In this instance, we will increase the value by `1` every time.

```js
let num = 1;
while (num <= 10) {
  console.log("the number is: " + num);
  num += 1;
}
```

It works! Run the program and you will see that the numbers 1 to 10 are logged to the screen. But what if we want to log only odd numbers? In that case, we'd just need to increase num by `2` every time.

```js
let num = 1;
while (num < 10) {
  console.log("the number is: " + num);
  num += 2;
}
```

* Ex 1. Write a `while` loop that logs all the even numbers between 0 and 100.
  > Bonus: Can you do it while only incrementing num by one each time?
  > **Hint**: Can the `%` operator help you here?

  <details>
  <summary>
    Solution
  </summary>


  ```js
  let num = 0;
  while (num <= 100) {
    if (num % 2 === 0) {
      console.log(num);
    }
    num++;
  }
  ```
  </details>

* Ex 2. Write a `while` loop that logs all the odd numbers starting from 99, and going down to 1.

  <details>
  <summary>
    Solution
  </summary>


  ```js
  let num = 100;
  while (num > 0) {
    if (num % 2 === 1) {
      console.log(num);
    }
    num--;
  }
  ```

  </details>

# The `for` loop

Another kind of loop, the `for` loop, is a condensed version of the while loop. With the `for` loop we create a variable, check a condition, and change the variable's value, all in one line.

```js
for (let num = 1; num < 10; num += 1) {
  console.log(num);
}
```

The above loop logs the numbers between 1 and 10, just like the while loop above. Generally speaking, the structure of the `for` is the same every time. There are two semicolons.

- The part before the first semicolon defines a variable.
- The second part is a boolean expression that checks if the loop should continue (This section is most similar to our `while` loops).
- The last part updates the variable we created after every iteration.

More formally, this is what each part is called:

```js
for ([initialization]; [condition]; [increment / step]) {}
```

# Using loops to solve complex problems

Loops can be used to solve pretty complex problems. Earlier, when we wanted to log only even or only odd values, we changed the increment from `1` to `2`. But what if we want to count both even and odd numbers and do something different for each?

Let's say we want to log for each number: `'even'` if it is even, and `'odd'` if it is odd. For this kind of problem we can use the modulo (remainder) operator: `%`. We will make a loop that increments a variable by `1`, and inside the code block check if the variable is even or odd. To do this we check to see if remainder of the number divided by 2 is equal to 0. If there is no remainder (the remainder is 0), the number is even. Otherwise the number is odd.

It is a common convention to name the iterating variable i. 

```js
for (let i = 0; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i + " is even");
  } else {
    console.log(i + " is odd");
  }
}
```

When you run this program, you will see the following:

```
0 is even
1 is odd
2 is even
...
9 is odd
10 is even
```

We can also use a loop to calculate the sum of all the numbers between 1 and 10:

```js
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
```

We can write a chart to see what's going on more closely:

|  i  | sum |
| :-: | :-: |
|  1  |  1  |
|  2  |  3  |
|  3  |  6  |
|  4  | 10  |
|  5  | 15  |
|  6  | 21  |
|  7  | 28  |
|  8  | 36  |
|  9  | 45  |
| 10  | 55  |

You may have noticed that to find the value of `sum` in every new row, we take the existing value of sum and add it to the value of `i` in the next row. It is often useful to write things out this way. It can help clear things up.

# 5. Changing the increment in loops

So far we've been incrementing a variable by `1` on each iteration of the loop. We can increment by other numbers as well.

```js
// logging all multiples of 5 between 5 and 50
for (let i = 5; i <= 50; i += 5) {
  console.log(i);
}
```

We can also decrement instead of incrementing:

```js
// logging all multiples of 5 between 50 and 5, descending
for (let i = 50; i >= 5; i -= 5) {
  console.log(i);
}
```

- Ex. Log all multiples of 10 between 10 and 100
  <details>
    <summary>
      Solution
    </summary>

    ```js
    for (let i = 10; i <= 100; i += 10) {
      console.log(i);
    }
    ```
  </details>

- Ex. Log all multiples of 10 between 100 and 0, descending
  <details>
    <summary>
      Solution
    </summary>

    Did you write your own first?

    <details>
      <summary>
        Yes
      </summary>

      for(let i = 100; i >= 0; i -= 10) {
        console.log(i)
      }
    </details>

    <details>
      <summary>
        No
      </summary>
      **Go do it**
    </details>
  </details>


# `break` and `continue`

### `break`

Sometimes, we want to stop a loop when a certain condition is met.  For example, let's say that we want to count over a range of numbers, and stop once we get to five:

```js
for (i = 0; i < 10; i++) {
  if (i === 5) { 
    break;
  }
  console.log(`I am looking at the number ${i}`)
}
```

This will log the following to the console:

```
I am looking at the number 0
I am looking at the number 1
I am looking at the number 2
I am looking at the number 3
I am looking at the number 4
```

As soon as `i` is equal to 5, we immediately stop and don't execute the rest of the loop.

### `continue`

Alternatively, we might hit a condition where we want to ignore the rest of the code inside the body of the loop, but continue incrementing our iterator to its next value:

```js
for (i = 0; i < 10; i++) {
  if (i === 5) { 
    continue; 
  }
  console.log(`I am looking at the number ${i}`)
}
```

This will log the following to the console:

```
I am looking at the number 0
I am looking at the number 1
I am looking at the number 2
I am looking at the number 3
I am looking at the number 4
I am looking at the number 6
I am looking at the number 7
I am looking at the number 8
I am looking at the number 9
```

Note that we skip the line where it would log "I am looking at the number 5" because we `continue` in the line above it.


# Looping Through Arrays 

Looping through arrays and other _iterables_ is a very common practice in JS. Can you think of how we might use an arrays index to help us loop through it? 

This is how we can print each animal in the animals array. 
```js
const animals = ["cat", "dog", "bird"];
for(let i = 0; i < animals.length; i += 1) {
  console.log(animals[i]);
}
```
Let's take a moment to break down what's going on in the code above. 
  * We have an animals array. 
  * We initialize our `for` loop with `i = 0` because arrays start at index 0. `animals[0]` evaluates to "cat". 
  * Next we have a condition which should be read as: while i < animals.length run this block of code. `animals.length` will evaluate to 3 in this case. So while i is less than 3 we want to run the code block. 
  * Then we have the step. In this case we want to increment our i (index) by 1 after each run of the code block. 
  * Lastly we have a block of code that prints the console the animal at the current index that i is on. 

  **Challenge:** write a loop that loops through the animals array and prints every other animal to the console. 

  <details>
    <summary>
      Solution
    </summary>

    ```js
    const animals = ["cat", "dog", "bird"];
    for(let i = 0; i < animals.length; i += 2) {
      console.log(animals[i]);
    }
    ```
  </details>


  To loop through an array backwards we can initialize our i to `array.length - 1` and then decrement while our i >= 0. 

### Other For Loops
  The `for loop` that you have seen so far is very famous and popular because it is very flexible and useful. You can use it to iterate between any numbers, through arrays, and through strings. We can `return` from it, we can `break` out of it, and we can `continue` to skip through it. When it doubt go with the traditional for loop or basic while loop. 

  However, there are other types of for loops that should be used in different situations. In later lessons we'll learn about the  `for...in` loop which is used for objects and also the `forEach` method that can be used with arrays. 

  The other great `for loop` to know about is the `for...of` loop. The `for...of` loop should be used when we want to iterate through the elements of an array (or the characters of a string), but we don't care about knowing or using the index.  

  Let's revisit the animals example and say I want to print the name of each animal. 

  ```js
    const animals = ["cat", "dog", "bird"];
    for(let animal of animals) {
      console.log(animal);
    }
  ```

  Let's talk about the differences. 

  Instead of declaring `i`, we declare a variable the refers to the elements that we're iterating. Because each element in animals is an animal, I'm calling that variable animal. Next, we say `of` and then the array we wish to iterate through. 

  This code is definitely cleaner than the code before, however there is a tradeoff. I no longer have access to the i (without doing things that are little bit messy / confusing). So if we wanted to go back and print out every other animal instead of each animal as we did before, we'd have to convert our loop back into a traditional `for loop` so that we can increment our `i` by 2 or check `i` with a conditional. 


  Try writing a `for...of` loop that prints out every character in the string "hello"

  <details>
    <summary>
      Solution
    </summary>

    ```js
    const str = "hello";
    for(let char of str) {
      console.log(char);
    }
    ```
  </details>

## Summary 

Loops allow us to run code blocks any number of times and are therefore an extremely powerful tool in programming (all languages). 

The `while` loop is the most basic and foundational loop there is. It will run a code block indefinitely while a certain condition is truthy. 

The `for` loop is an extremely common loop in JS. While declaring it, we initialize a variable, set a condition, and specify a step towards breaking the condition. We nearly always use for loops for iterating between numbers (often those numbers refer to indices in an array or string )

The `for...of` loop is kind of a shortcut for the traditional `for` loop but does not include a reference to an index. This loop is commonly used for iterating through arrays and strings when the index will not be needed. 

## Resources
 - [Loops - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

 - [while - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)