# Math Basics, Reviewed

## Setting Intent

> Sometimes I need to lean into my discomfort

Sometimes we have to work on things we are not comfortable with. For some people, it is CSS, for others it can be working on a solution that requires a bit of math.

Most coding jobs require basic math skills however few require advanced math skills (calculus, trigonometry etc.).

There are a handful of really useful math methods in JavaScript that can help you get what you need to get done.

## Trivia Questions

Write an answer somewhere that you can easily reference later to practice talking/writing about code:

- What is the difference between `=`, `==` and `===`?
- What is `NaN`?
- Is `NaN == NaN` true or false? Why?
- Is `NaN === NaN` true or false? Why?

## Find the Median

Using the following numbers array, find the median

```js
const nums = [
  14, 11, 16, 15, 13, 16, 15, 17, 19, 11, 12, 14, 19, 11, 15, 17, 11, 18, 12,
  17, 12, 71, 18, 15, 12,
];
```

## More Problems (Solve if you finished the main problem or want more practice)

### Clock Hands

Write a function `clock` that takes two integers, `hour` and `minute`. The function should calculate the two angles in degrees between the **hour hand** and **minute hand** on a twelve-hour analog clock face.

Note that the hour hand has 'drift'. If the time is **6:30**, the hour hand will be halfway through its travel between **6** and **7**. If the time is **9:45**, the hour hand will be three quarters of the way between **9** and **10**.

Return an "out of range" message if an input is greater than the clock's range.

Expected output:

```
clock(6, 00)

=> [180, 180]
```

```
clock(12, 00)

=> [360, 0]
```

```
clock(12, 15)

=> [277.5, 82.5]
```

```
clock(9, 45)

=> [22.5, 337.5]
```

```
clock(1, 59)

=> [294.5, 65.5]
```

```
clock(500, 34)

=> "out of range"
```

## Lab: Accumulate Points on Codewars

- [A Square of Squares](https://www.codewars.com/kata/54c27a33fb7da0db0100040e)
- [Twice as Old](https://www.codewars.com/kata/5b853229cfde412a470000d0)
- [Halving Sum](https://www.codewars.com/kata/5a58d46cfd56cb4e8600009d)
- [Buying a Car](https://www.codewars.com/kata/554a44516729e4d80b000012)
- [Multiplication Table](https://www.codewars.com/kata/5a2fd38b55519ed98f0000ce)
- [Cat Years, Dog Years](https://www.codewars.com/kata/5a6663e9fd56cb5ab800008b)
- [Over the Road](https://www.codewars.com/kata/5f0ed36164f2bc00283aed07)
- [Get Nth Even Number](https://www.codewars.com/kata/5933a1f8552bc2750a0000ed)
- [Deodorant Evaporator](https://www.codewars.com/kata/5506b230a11c0aeab3000c1f)
- [Primorial of Number](https://www.codewars.com/kata/5a99a03e4a6b34bb3c000124)
- [Potion Class](https://www.codewars.com/kata/5981ff1daf72e8747d000091)
- [Reverse FizzBuzz](https://www.codewars.com/kata/reverse-fizzbuzz)
- [Is it a Cube?](https://www.codewars.com/kata/58d248c7012397a81800005c/solutions/javascript)
- [RGB to Hex](https://www.codewars.com/kata/513e08acc600c94f01000001)
