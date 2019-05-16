# Values, Types, and Operators

## Goals

- Understand what values are in JavaScript.
- Know some basic value types:
  - Number
  - String
  - Boolean
  - undefined
- How to check for types (`typeof`).
- Understand what operators are and how to use them:
  - Math
  - Modify strings
  - Compare boolean values
- Learn about expressions and order of evaluation.

## Vocabulary

- Types: number, string, boolean and undefined. Sources: [Microsoft](https://docs.microsoft.com/en-us/scripting/JavaScript/data-types-JavaScript)
- Operators. Sources: [WhatIs](http://whatis.techtarget.com/definition/operator)
- Arithmetic operators, string concatenation, comparison operators, the negation operator, the typeof operator.
- Logical Operators: [IBM](https://www.ibm.com/support/knowledgecenter/en/SSLVMB_20.0.0/com.ibm.spss.statistics.help/syn_transformation_expressions_and_or_logical_operators.htm)
- Literals: [Wikipedia](https://en.wikipedia.org/wiki/Literal_%28computer_programming%29)
- Expressions: [Wikipedia](<https://en.wikipedia.org/wiki/Expression_(computer_science)
- Truth tables: [Medium](https://medium.com/i-math/intro-to-truth-tables-boolean-algebra-73b331dd9b94)

## Lesson

In the computer world, the only thing that exists is a sequence of bits: `1`s and `0`s. In JavaScript, these bits are separated
into things called **values**.
Each value has a `type` that determines its role in a program.
The basic types of values in JavaScript are: **number, string, boolean, object, function, and undefined**.

### Numbers

To create a number, we just type the value of the number:

```js
> 42
42
```

### Operators

An **operator** is one of a predefined group of words and symbols.
It takes one or two values, does some work behind the scenes, and returns the result of that work.
For example, the `+` operator takes two numbers, adds them, and returns the sum.
In JavaScript, many operators, such as `+`, `-`, `*`, `/`, will take one value from their left side and one value from their
right side.
Other operators, such as `typeof` (discussed below) take only one value on their right side.

Here's the important thing: Just like a math equation, a chemistry table, or any problem that you've seen that returns a result, **operators evaluate into something other than the some of their parts.**

### Arithmetic

We can do arithmetic operations using the `+`, `-`, `*`, and `/` operators. We may also use parentheses `()` to affect the order of operations.
JavaScript will evaluate <b> expressions </b> and return a single number.

```js
> 2 + 2 * 4
10
```

Another useful operator is `modulo`, the remainder operator.

```js
> 6 % 2
0

> 6 % 4
2

> 5 % 2
1
```

This gets the remainder of dividing the left number by the right. For instance, in the last example, two goes into five twice (4), leaving behind a remainder of 1.

### Special Numbers

Occasionally, we will come across special values that are of the number type, but do not look like numbers. Two of these are `Infinity` and `NaN` - _Not a Number_. For example, zero divided by zero has no defined value, and results in `NaN`:

```js
> 0 / 0
NaN

> "hello" * 5
NaN
```

Division of a non-zero number by zero will result in `Infinity` (there is a mathematical basis for this but it's not crucial for our purpose)

```js
> 2 / 0
Infinity
```

### Strings

Strings are used to represent text. To create a string, write any text enclosed by either "double quotes" or 'single quotes' (as long as the starting and ending quotes match).

```js
> 'Hello there'
'Hello there'
```

The `+` Operator can be used to join two strings together.

```js
> 'My name is Jo' + 'hn'
'My Name is John'
```

The is called **string concatenation** (verb: concatenate).

### The `typeof` Operator

The `typeof` operator returns a string with the type of the value that follows it.

```js
> typeof 2
'number'
> typeof 'John'
'string'
```

The earlier operators required two values - one to the left and one to the right.
By contrast, `typeof` only takes one value. The `-` (minus) operator can also take a single value, when placed to the left of a mathematical expression:

```js
> - (2 * 4)
-8
```

> note: the left hand and right hand sides of an operator are called <b>operands</b>. We can say that the `-` and `typeof` operator take a single operand.

### Booleans

Boolean is a type that can only have one of two possible values: `true` or `false`, usually indicating wither a statement is, in fact, true or false. Boolean values are returned when using certain operators.

### Comparison Operators

Comparison operators include `===`, `>`, `<`. These do not make a statement about values, but rather test the relationship between them. The test returns one of the two boolean values.

- `===` - Tests for Equality. Is "this" the same or equal to "that"?
- `!==` - Tests for inequality. Is "this" not the same as "that"?
- `>` - Greater than. 3 > 2 : Is 3 greater than 2 ?
- `<` - Less than. 3 < 2 : Is 3 less than 2 ?
- `>=` - Greater than or equal to.
- `<=` - Less than or equal to.

```js
> 2 === 2
true

> 2 === 3
false

> 2 > 1
true

> 3 >= 2
true

> 3 <= 3
 true
```

Strings can also be compared:

```js
> 'Tom' === 'Jerry'
false
> 'cat' !== 'dog'
true
> 'cat' === 'cat'
true
```

### Creating and Comparing Booleans

A boolean type can be created by simply typing one of the values:

```js
> true
true
> false
false
```

JavaScript knows what `true` and `false` means, they are special. `true` and `false` not strings, they are booleans, and JavaScript picks that up without us telling it to do so explicitly. If we attempt to evaluate other arbitrary words without quotations, it knows that they are not booleans, nor are they strings, and it throws an error:

```js
> broom
ReferenceError: broom is not defined
```

We can also use `typeof` with boolean values:

```js
> typeof true
'boolean'
```

Boolean values can be compared, in the same way that we compare numbers and strings:

```js
> false === false
true
> true === false
false
> false !== true
true
```

### Logical Operators

The three logical operators are AND (`&&`) OR (`||`) and NOT (`!`). When logical operators are used, a boolean value will result.

#### The AND (&&) Operator

We use the `&&` operator to test if statements made on both sides of the operator have a truthy value.
For example:

```js
> true && true
true

> true && false
false

> false && true
false

> false && false
false
```

This works for expressions as well:

```js
> 1 === 1 && 2 === 2
true
```

In the statement above, both the right and the left-hand sides of the `&&` operator evaluate to `true`.
So the above is equivalent to writing:

```js
> true && true
// (1 === 1 is true) && (2 === 2 is true)
true
```

The `&&` operator will evaluate to `true` only if both left-hand and right-hand sides are true. Otherwise it will return `false`:

```js
> 1 === 1 && 2 === 3
// 2 === 3 is false
false
```

We can write down all the possible results of an `&&` operator in a table. We use `A` and `B` to represent two expressions
that are either true or false. We write in each row a unique combination of the possible values of `A` and of `B`. Given those values, we write the result of providing `A` and `B` to the `&&` operator. This is called a <b>truth-table</b>:

#### The OR (||) Operator

We use the `||` operator to check if one of two statements is true.
This will be `false` only if both left-hand side and right-hand side are false:

```js
> false || true
true

> true || false
true

> true || true
true

> false || false
false

> 2 === 3 || 4 === 5
false

```

#### The NOT (`!`) Operator

The `!` operator, like `typeof` takes a single value to its right. It returns the opposite value

- given `true`, it returns `false`; given `false`, it returns `true`

```js
> !true
false

> !false
true

> !(1 === 2)
true
```

### Expressions

All the code we've written in this lesson has consisted of <b>expressions</b>. An expression is anything that returns a value. `1 + 2` is an expression - it returns the value `3`. And `1 + 2 + 3 + 4` is also an expression, as well as `1 === 1`, which returns the boolean value `true`. The process of producing a value from an expression is called **evaluation**.

This process can be simple, as in the case of `1 + 2`.
In some cases, however, the evaluation can take multiple steps. The computer can only perform one operation at a time.
In the case of `1 + 2 + 3 + 4`, one and two will be added first, then their result will be added to `3`, etc.
We will use the arrow `->` as a symbol for _evaluates to_.

- `1 + 2 + 3 + 4`
- -> `3 + 3 + 4`
- -> `6 + 4`
- -> `10`

In the case of concatenating strings, a similar process will happen:

- `'af' + 'ter' + 'wards'`
- -> `'after' + 'wards'`
- -> `'afterwards'`

In the case of `1 === 2 || 3 === 3`, the same process will happen. The computer will scan the expression and identify
the OR operator. To evaluate this operator, we need to check if either the left or the right-hand sides evalutate to `true`. We typically start by examining the left hand side.
In this case, it is an expression, so we evaluate it. Since it returns the value `false`, we continue examine the
right operand of the `||` operator. This is again an expression, which returns the value `true`.
Now we can finally say that the entire expression, `1 === 2 || 3 === 3` returns `true`.

- `1 === 2 || 3 === 3`
- -> `false || 3 === 3`
- -> `false || true`
- -> `true`

The process outlined above is typical for evaluating expressions, both for JavaScript and for many other programming languages. When evaluating expressions, logical operators come first, followed by the comparison operators, followed by the arithmetic operators.

### Type Conversion

Type conversions may occur in expressions that feature different types. A common situation is when the `+` operator is used with a string and a number. In this case, the number will be converted to a string:

```js
> 'The number is ' + 42
'The number is 42'
```

This automatic conversion can lead to unexpected results:

```js
> '2' + 4
'24'
```

Since the number is converted to a string, the above was the same as writing `'2' + '4'` - like concatenating any two strings.

### Truthy and Falsey

Everything in JS has a truthy or falsey value attached to it. Most things have a truthy value. The falsey values in JS are:

- false
- 0 and other forms of numeric zero like -0, 0.0 and 0x0
- "", '' and `` - strings of length 0
- NaN - Not a Number
- null
- undefined

[helpful link](https://stackoverflow.com/questions/19839952/all-falsey-values-in-JavaScript)

This means we can use logical operators to evaluate things that don't just value to `true` and `false` but also things that just have
a truthy or falsey value.

```js
> "hello" && ""
false

> "hello" && "goodbye"
true
```

When the `||` operator interacts with truthy and falsey values, it behaves in an unusual way: if the left-hand side is truthy, the left-hand value will be returned (instead of `true`). If the left-hand side is falsey, the right-hand value will be returned (regardless of whether it evaluates as truthy or falsey).

```js

 > NaN || "hi"
 "hi"

> false || 1
1
> '' || 0
0
> 'cat' || false
'cat'

> 0 || true
true

> false || ''
''
```

If the left-hand expression evaluates to false, the value in the right-hand side is returned:

```js
> 0 || 2
2
> '' || 'cat'
'cat'
```

### Resources

- Eloquent JavaScript: [Chapter 1](http://eloquentJavaScript.net/01_values.html)
- Microsoft: [JavaScript Fundamentals](https://docs.microsoft.com/en-us/scripting/JavaScript/JavaScript-fundamentals)
  - Data Types
  - Operators
  - Operator Precedence
