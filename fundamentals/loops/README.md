# Loops

## Goals

- Know and understand how to write a `while` loop.
- Know and understand how to write a `for` loop.

## Keywords

- `while` loops
  - condition
- `for` loops
  - initialization
  - condition
  - increment

## Lesson

Consider a program that logs the numbers between 1 and 10:

```js
console.log(1)
console.log(2)
console.log(3)
...
```

This program isn't much fun to write, and it isn't very practical either. What if we wanted to log the numbers between 1 and 1000? There is a better solution than writing this by hand: **loops**. Loops are a solution for repetitive tasks.

## The `while` loop

Now that we know why loops can be a good idea, let's write our first **while** loop. A **while** loop is similar to an **if** statement, in that we will check if some condition is true. Unlike an **if** statement, we will execute the code block following the while loop again and again **as long as the condition is true**. Whenever we reach the bottom of the code block, we go right back up and check the condition again.

```js
let num = 1;
while (num <= 10) {
  console.log("the number is: " + num);
}
```

If you try to run the code above, the number `1` will be logged repeatedly. Eventually, your computer will freeze or you will see an error message. This is because we are repeatedly checking if the value of `num` is smaller than 10. If it is smaller, we log the value of `num`, and check again. Since the value of `num` never changes, we just keep logging `1`, until the computer runs out of memory. To fix this, we need to change the value of `num` inside the code block. In this instance, we will increase the value by `1` every time.

```js
let num = 1;
while (num <= 10) {
  console.log("the number is: " + num);
  num += 1;
}
```

It works! Run the program and you will see that the numbers from 1 to 10 are logged to the screen. But what if we want to log only odd numbers? In that case, we'd just need to increase number by `2` every time.

```js
let num = 1;
while (num < 10) {
  console.log("the number is: " + num);
  num += 2;
}
```

* Ex 1. Write a `while` loop that logs all the even numbers between 0 and 100.

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
    if (num % 2) {
      console.log(num);
    }
    num--;
  }
  ```

  </details>

### The `for` loop

Another kind of loop, the `for` loop, is just a condensed version of the while loop. With the `for` loop we create a variable, check a condition, and change the variable's value, all in one line.

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
for ([initialization]; [condition]; [increment]) {}
```

### More complex problems

Loops can be used to solve pretty complex problems. Earlier, when we wanted to log only even or only odd values, we changed the increment from `1` to `2`. But what if we want to count both even and odd numbers and do something different for each?

Let's say we want to log for each number: `'even'` if it is even, and `'odd'` if it is odd. For this kind of problem we can use the modulo (remainder) operator: `%`. We will make a loop that increments a variable by `1`, and inside the code block check if the variable is even or odd. To do this we check to see if remainder of the number divided by 2 is equal to 0. If there is no remainder (the remainder is 0), the number is even. Otherwise the number is odd.

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

### Changing the increment

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
  - <details>
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
  - <details>
 <summary>
  Solution
 </summary>


 ```js
for(let i = 100; i >= 0; i -= 10) {
  console.log(i)
}
 ```
</details>
