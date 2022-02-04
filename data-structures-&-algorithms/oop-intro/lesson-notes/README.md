# Object Oriented Programming (OOP)

## Learning Objectives

- Explain why we need classes
- Create a class
- Add methods and properties to a class
- What is `this`? Why do we need it?

## Classes

Sometimes, we need to repetitively create new objects with the same attributes. Imagine we want to create a bunch of pet profiles. Each user profile would need at least the following

- name
- type
- age
- greeting
- take for a walk

```js
{
    name: "Buttons",
    type : "miniature horse",
    age: 10,
    greeting: "sniff sniff",
    walk: "clip clop, clip clop",
}
```

Great! One object. How can we create another one?

- Copy pasting and then changing the details?
- Typing it all from scratch?

Both methods above can introduce typing errors and it isn't very controlled.

There is a better way, with classes. You've been using classes all along in this course, like the `Math` methods, these are JavaScript's version of classes, but we have not spent much time making our own.

## Create a Class

Whenever we create a class, we will start the class name with a capital letter. This is convention. In JavaScript, you could keep it all lowercase and it would not throw an error. In other languages, capitalization may be enforced.

```js
class Animal {}
```

Now we can `instantiate` (make a new instance) / create a new object, using this class.

```js
const buttons = new Animal();
const marshmallow = new Animal();

console.log(buttons);
console.log(marshmallow);
```

## Add Methods to a Class

Right now, our objects are empty and don't do anything. Let's add a method. What is great, is that we will add our code in one place, but it will update both of our objects. This keeps our code DRY (principle of **d**on't **r**epeat **y**ourself).

```js
class Animal {
  walk() {
    console.log("Clip clop, clip clop");
  }
}
const buttons = new Animal();
const marshmallow = new Animal();

console.log(buttons);
console.log(marshmallow);

buttons.walk();
marshmallow.walk();
```

If we create a second method, we don't add a `comma` between them. We can also pass in an argument to our function.

```js
class Animal {
  walk() {
    console.log("Clip clop, clip clop");
  }
  greet(otherBeing) {
    console.log(`Sniff sniff, ${otherBeing}`);
  }
}

const buttons = new Animal();
const marshmallow = new Animal();

console.log(buttons);
console.log(marshmallow);

buttons.walk();
marshmallow.walk();

buttons.greet("Fluffy");
marshmallow.greet("Patches");
```

## Setting Properties on an Instance of a Class

Right now, our class has methods (functions that are attached to the class), but objects also have properties. Let's add some properties.

The way we add properties is by using a special function called `constructor`

```js
class Animal {
  constructor() {
    this.type = "minature horse";
    this.age = 4;
    this.color = "roan";
    this.isFriendly = true;
  }
  walk() {
    console.log("Clip clop, clip clop");
  }
  greet(otherBeing) {
    console.log(`Sniff sniff, ${otherBeing}`);
  }
}

const buttons = new Animal();
const marshmallow = new Animal();

console.log(buttons);
console.log(marshmallow);
```

Try misspelling `constructor` what happens?

[Reserved words in JavaScript](http://www.javascripter.net/faq/reserved.htm)

## What is `this`?

`this` is another keyword. Let's go back to the vending machine problem

- a vending machine is an object

- it has an array of snacks (make 3 snacks)

  - snacks are objects that have a name and a price

- a vending machine has a function vend that allows user to enter the array position (a number) of the snack and then that snack will be returned

- Be able to call vendingMachine.vend() with a valid integer to return a snack

```js
const vendingMachine = {
  snacks: [
    {
      name: "kitkat",
      price: 6,
    },
    {
      name: "sun chips",
      price: 7,
    },
    {
      name: "apple",
      price: 12,
    },
  ],
  vend(input) {
    console.log("vending", vendingMachine.snacks[input]);
  },
};

vendingMachine.vend(1);
```

This strategy worked just fine, because we knew the name of the object: `vendingMachine`

However, with classes, we are using classes to make blueprints of objects - we can create many objects all with different names.

So we need a way to say `this` object's snacks, `this` object's age property. We need a `pronoun` - a generic term to refer to the item.

JavaScript uses the keyword `this`

```js
const vendingMachine = {
  snacks: [
    {
      name: "kitkat",
      price: 6,
    },
    {
      name: "sun chips",
      price: 7,
    },
    {
      name: "apple",
      price: 12,
    },
  ],
  vend(input) {
    console.log("vending", this.snacks[input]);
  },
};

vendingMachine.vend(1);
```

When we make a new class and add properties inside of the constructor, we use `this` to be sure we are referencing the properties inside `this` class.

## Make an Instance of Each Class Customizable

Our world is very boring; all we have are roan colored miniature horses. We need a way to customize each object so we can have more animals.

```js
class Animal {
  constructor(name, type, color, walkStyle) {
    this.name = name;
    this.type = type;
    this.age = 4;
    this.color = color;
    this.isFriendly = true;
    this.walkStyle = walkStyle;
  }
  walk() {
    console.log(this.walkStyle);
  }
  greet(otherBeing) {
    console.log(`Sniff sniff, ${otherBeing}`);
  }
}
const buttons = new Animal("Buttons", "turtle", "green");
const fluffy = new Animal("Fluffy", "cat", "calico", "Strut, strut");
const marshmallow = new Animal(
  "Marshmallow",
  "miniature horse",
  "white",
  "Clip clop, clip clop"
);

console.log(buttons);
console.log(fluffy);
console.log(marshmallow);
```

Notice what happens when we don't pass enough arguments into our functions in JavaScript.

It can be really confusing to understand how the values are being set. Let's go over it.

- First, we are creating a new animal and passing in the name `Buttons`

- This goes up into the `Animal` class and is passed in as the argument `name` inside the constructor
- This value is then on the right side in

```js
this.name = name;
```

- Which sets the property `this.name` to `Buttons`

Try drawing it, either with an annotation tool on your computer, or writing it out on paper. Naming this variable the same is very useful once you are comfortable with the concept, but as a learner, it can be really hard to understand which value represents what and how they all tie together.

You can also try naming it like so:

```js
constructor (parameter1, parameter2, parameter3) {

}
```

And then playing around with the syntax/values, until it makes sense.

In this course it can feel like everything is very fast paced, one of the hardest things can be to slow down and give yourself the time to fully explore a fundamental concept so that you can become faster with it in the future.

## Default Values

Sometimes you want to create default values that can be overwritten. For example, if a user were creating a profile, but did not include a picture, you would likely want to have a default placeholder image set that can be updated later.

Let's look at the code to write a default value

```js
class Animal {
  constructor(name, type, color, walkStyle, isFriendly = true) {
    this.name = name;
    this.type = type;
    this.age = 4;
    this.color = color;
    this.isFriendly = isFriendly;
    this.walkStyle = walkStyle || "Walka, walka";
  }
  walk() {
    console.log(this.walkStyle);
  }
  greet(otherBeing) {
    console.log(`Sniff sniff, ${otherBeing}`);
  }
}
const buttons = new Animal("Buttons", "turtle", "green");
const fluffy = new Animal("Fluffy", "cat", "calico", "Strut, strut", false);
const marshmallow = new Animal(
  "Marshmallow",
  "miniature horse",
  "white",
  "Clip clop, clip clop"
);

console.log(buttons);
console.log(fluffy);
console.log(marshmallow);
```

Thought question, do `walkStyle` and `isFriendly` need to come last as parameters? Or could they be first?

## Create Methods to Alter the Properties of an Instance

We can alter the properties of an instance, after it is created

```js
marshmallow.color = "dappled grey";
console.log(marshmallow);
```

JavaScript, being JavaScript lets you do this, for better or worse. Other languages, by default, will prevent you from overwriting the initial value, and you would have to write specific code to do so.

It is better practice to name a value you would not change (often referred to as private) starting with an \_ and to write functions to deal with changes.

Let's take a look:

```js
class Animal {
  constructor(name, type, color, walkStyle, isFriendly = true) {
    this.name = name;
    this._type = type;
    this.age = 4;
    this.color = color;
    this.isFriendly = isFriendly;
    this.walkStyle = walkStyle || "Walka, walka";
  }
  walk() {
    console.log(this.walkStyle);
  }
  greet(otherBeing) {
    console.log(`Sniff sniff, ${otherBeing}`);
  }
  ageUp() {
    this.age++;
  }
}
const buttons = new Animal("Buttons", "turtle", "green");
const fluffy = new Animal("Fluffy", "cat", "calico", "Strut, strut", false);
const marshmallow = new Animal("Marshmallow", "miniature horse", "white");

buttons.ageUp();
console.log(buttons);
console.log(buttons._type);
```

Here, we are controlling the aging process by only doing increments of 1. With type, we should not be able to change Buttons from a turtle to a bird. Again, in other languages we would be prevented from changing type, but with JavaScript, we can just start the variable name with an underscore `_` to make this code more readable for other coders, to know that this value should not be overwritten.

## Objects Interacting with Other Objects

We can pass objects in to other objects to have them interact

```js
class Animal {
  constructor(name, type, color, walkStyle, isFriendly = true) {
    this.name = name;
    this._type = type;
    this.age = 4;
    this.color = color;
    this.isFriendly = isFriendly;
    this.walkStyle = walkStyle || "Walka, walka";
  }
  walk() {
    console.log("Clip clop, clip clop");
  }
  greet(otherBeing) {
    console.log(`Sniff sniff, ${otherBeing}`);
  }
  classyGreeting(otherClassyBeing) {
    console.log(`Howdy ${otherClassyBeing.name}`);
  }
  ageUp() {
    this.age++;
  }
}
const buttons = new Animal("Buttons", "turtle", "green");
const fluffy = new Animal("Fluffy", "cat", "calico", "Strut, strut", false);
const marshmallow = new Animal("Marshmallow", "miniature horse", "white");

buttons.classyGreeting(marshmallow);
marshmallow.classyGreeting(buttons);
```

## Static Members

As we've mentioned, you have already been working with JavaScript's version of classes with things like `Math` methods.

When you use a `Math` method you don't do this

```js
const mathStuff = new Math();

console.log(mathStuff.abs(-5));
```

Rather, we do this:

```js
console.log(Math.abs(-5));
```

This makes sense because we want all the math methods to be organized in a way that they are all together, however, we don't want to instantiate a new class to use them.

We can then add the word `static` to declare methods and properties to a class

```js
class StringExtra {
  static reverse(str) {
    return str.split("").reverse().join("");
  }
  static description =
    "I have some extra methods for doing things with strings";
}

console.log(StringExtra.reverse("I palindrome I"));

console.log(StringExtra.description);
```

## Further Reading

Eloquent JavaScript

[Chapter 6: The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

### Extreme Super Bonus

Read this code, analyze what it does then research what is `prototype` in JavaScript, how it works and what does it do?

How does it relate to this lesson on classes?

```js
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

console.log("foMO".reverse());
```

## React Classes, a real world coding example

[link](./react-classes.md)
