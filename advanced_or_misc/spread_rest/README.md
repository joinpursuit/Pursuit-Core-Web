# Spread and rest operators

Practice some ES6 ellipses

## Intro

One of the things that was included in the release of ES6 was the spread/rest operator. It's a neat piece of syntax that allows us to save a lot of typing of code, and it can be used all over the place!

It is especially handy in react.

## Spread operator

The spread operator looks like this:

```js
...
```

We can use it to "unpack" a list of items, or "spread" them out. Let's compare two things here:

```js
let items = ["desk", "lamp", "cat", "chair"]
console.log(items) // [ 'desk', 'lamp', 'cat', 'chair' ]
console.log(..items) // desk lamp cat chair
```

But what does this mean on its own? It's really not that useful unless we combine that spreading with something else. 

Lets say we have two things:

1. An array of numbers `[10, 20, 56, 1, 12, 53]`
2. A function that takes in `n` number of arguments (a variable amount!), like our favorite `Math.max()`. 

Since we can't pass the array to `Math.max()` directly (it requires only numbers as arguments), we have to unpack them first using spread.

```js
let numbers = [10, 20, 56, 1, 12, 53]
Math.max(numbers) // NaN
Math.max(...numbers) // 56
```

Line 3 above is equivalent to doing this:

```js
Math.max(10, 20, 56, 1, 12, 53) // 56
```

We can also use it to combine two arrays together.

```js
let items = ["desk", "lamp", "cat", "chair"]
let office = ["rug", "window", ...items]
console.log(office) // [ 'rug', 'window', 'desk', 'lamp', 'cat', 'chair' ]
```

What if we did this instead?

```js
let nestedOffice = ["rug", "window", items]
console.log(nestedOffice) // [ 'rug', 'window', ['desk', 'lamp', 'cat', 'chair' ]]
```

Or copy an array!

```js
let arr = [1, 2, 3];
let arr2 = [...arr]; // like arr.slice()

arr2.push(4);
//  arr2 becomes [1, 2, 3, 4]
//  arr remains unaffected
```

What about objects? Can we do that too? Sure can.

```js
let garage = {
  car: true,
  doors: 2
}

let house = {
  color: "green",
  driveway: true,
  floors: 2,
  ...garage
}

console.log(house)
// { color: 'green', driveway: true, floors: 2, car: true, doors: 2 }
```

A couple things to note:

You can only use spread syntax on `iterable` types. Iterable means anything that you can loop through, either using one of the various `for` loops or an array method like `.forEach`.

This means you cannot spread a number or a boolean.

```js
let num = 555
let happy = true
console.log(...num) // Uncaught TypeError: Found non-callable @@iterator
console.log(...happy) // Uncaught TypeError: Found non-callable @@iterator
```

## Rest operator

The rest operator looks just like spread! It's not the same though. In fact, you can sort of think of it as the opposite behavior.

When `...` is used with function arguments, it condenses all the arguments into a single variable.

Let's say we wanted to declare a function but we didn't know how many arguments we needed it to take. We could use a single argument (an array) and then loop through the array. OR we could use the rest operator and then collect all the arguments together.

```js
function addAllNumbers(...allNumbers) {
  let total = 0
  allNumbers.forEach(num => total += num)
  return total
}

addAllNumbers(1,2,3) // 6
addAllNumbers(5,6,7,8,9) // 35
```

Basically, this sytax converts all the arguments into a single array. It is a real array that you can use your favorite .forEach methods on.

Let's look at another example, which might help explain the reason it's called the REST operator.

```js
function funkyMath(a, b, ...moreNums) {
  console.log("a", a)
  console.log("b", b)
  console.log("the rest of the nums", moreNums)
  return a * b + moreNums.reduce((acc, curr) => acc += curr)
}

funkyMath(10, 20, 30, 40, 50, 60)
// a 10
// b 20
// the rest of the nums [ 30, 40, 50, 60 ]
// 380
```

Basically, any arguments left over after the first two (a and b) get collected into one array. We will see this pattern in react especially!

Some rules:

* The rest syntax must be the ONLY or the LAST parameter in the function. You cannot mix and match
* You can't use more than one rest operator in a function definition.

### Resources


* [rest parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
* [spread syntax - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)