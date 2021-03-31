# Classes

## Objectives
* Be able to write your own class.
* Be able to inherit  qualities from a class.

## Keywords
* [class](https://www.w3schools.com/js/js_classes.asp)
* [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)
* [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)
* [extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)

## 1. Constructor Function Review

*Constructor Functions* are ways of storing a prototype of common objects that we want to make. For example, you might find yourself writing the following code a lot:

```js
let userOne = {
  name: "Anne",
  userId: 6021
}

let userTwo = {
  name: "Ben",
  userId: 6022
}

let userThree = {
  name: "Cal",
  userId: 6023
}
```

While this will create 3 reasonable user objects, it increases the possibility that you might make a mistake. For example, you might make a typo when making userFour:

```js
let userFour = {
  name: "Dan",
  userID: 6024
}
```

Here, we made a typo and capitalized the `d` in `ID` by mistake.  Now when we go to use the userIds, we will have undesired behavior:

```js
let allUserIds = [userOne, userTwo, userThree, userFour].map( user => user.userId )
console.log(allUserIds) //[ 6021, 6022, 6023, undefined ]
```

We were relying on remembering the right way to make a user, but we didn't have a standard to guide us.  Constructor functions can help us by providing a unified standard for objects we want to create a lot of.

```js
function User(name, userId) {
  this.name = name
  this.userId = userId
}
```

```js
let userOne = new User("Anne", 6021)
let userTwo = new User("Ben", 6022)
let userThree = new User("Cal", 6023)
let userFour = new User("Dan", 6024)
let allUserIds = [userOne, userTwo, userThree, userFour].map( user => user.userId )
console.log(allUserIds) //[ 6021, 6022, 6023, 6024 ]
```

## 2. Constructor Functions in ES6 using Classes

Constructor functions help us create templates for objects that we want to create multiple times.  This concept is very common in other programming languages as well, but most of them use a different *syntax* to make their constructor functions.  In ES6, JavaScript introduced a new way of writing constructor functions that make them look more like how they appear in other programming languages.  We'll review the new syntax, and some new things that we can do with them.

Old way:

```js
function Animal(name) {
    this.name = name;
}

let corey = new Animal("corey")
```

New way:

```js
class Animal {
  constructor(name) {
      this.name = name;
  }
}

let corey = new Animal("corey")
```

What's changed?

Instead of creating a constructor function that looks like most other functions, we have the new `class` word.
__NOTE:__ function declarations are hoisted, class declarations are not.

The next difference we see is the `constructor` method. The constructor method is a special method for creating and
initializing an object created with a class. There can only be one special method with the name "constructor" in a class.


## 3. Methods

The next thing you may notice is a syntactic difference on how we write methods in that class.

If you wish to add methods to the prototype and aren't able to add them directly inside of the class object, you must
still use the className.prototype syntax.

ES5 Syntax:

```js
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + " makes a noise");
}

let corey = new Animal("corey")

corey.speak() // => "corey makes a noise"
```

ES6 Syntax:

```js
class Animal {
  constructor(name) {
      this.name = name;
  }
  speak() {
    console.log(this.name + " makes a noise")
  }
}

let corey = new Animal("corey")

corey.speak() // => "corey makes a noise"
```

## 4. Static methods

Using ES6 syntax, we can write methods that are true about the class as a whole, not just an individual instance.  We use the keyword `static` to indicate the a method is called on the name of the class, not on a particular instance.

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755
```

## 5. Inheritance

The extends keyword is used in class declarations or class expressions to create a class as a child of another class.
Let's see this in action by pretending we want to create another class called Dog. We want dog to have all the same methods as Animal
but make its speak be woof woof and add a new method called fetch.

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name)
    this.breed = breed
  }

  speak() {
    console.log(this.name + " says woof woof")
  }

  fetch() {
    console.log("Running to retrieve stick!")
  }
}

let corey = new Dog("corey", "hound",)

corey.speak() //=> "corey says woof woof"
corey.eat() // => "nom nom nom"
corey.fetch() // => "Running to retrieve stick!"

let matt = new Animal("matt")
matt.speak() //=> "matt makes a noise."
matt.fetch() //=> TypeError: matt.fetch is not a function


```

So... what's new?

The first new thing we see is the `extends` keyword. This means that we will be inheriting the qualities of that other class.
It's like saying I want the Animal class, but I'm going to extend it to include Dog.

The next thing we see is the keyword `super`. `super` can _only_ be placed inside of the `constructor` method. It's essentially
saying, I am passing this quality to the class that I am extending. Because our Animal class took in a name we pass that quality
into our `super`.

We see our speak method has changed! If you name a method with the same name as it's parents, the new method will override the
old. However, the change will not effect objects made from the parent class.

## Resources
* (MDN - Classes)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes]
