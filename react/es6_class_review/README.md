# ES6 Classes

## Sources

* [Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Introduction

Welcome to React! React is a relatively new, exciting frontend technology developed by Facebook. Once you get the hang of it, you'll never want to use anything else.

That being said, we'll start with a quick review...

### ES6 Classes

Since React uses ES6 `class`es, we will need to review these first. An ES6 class is not too different from a JavaScript constructor function. This means that a class is really a function we can use to create an object with specific properties, methods, and prototypes.

Let's have a look at a constructor function and its corresponding class definition:

The following is a constructor function for an `Animal` object, along with a method defined on the constructor's prototype.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function(words) {
  return `${this.name} says "${words}"`;
}

let dog = new Animal('Luna')
dog.speak('woof')
// => 'Luna says "woof"'
```

Here is the corresponding `class` definition:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak(words) {
    return `${this.name} says "${words}"`
  }
}

let myDog = new Animal('Luna')
myDog.speak('woof')
// => 'Luna says "woof"'
```

The `class` combines the constructor function and the prototype methods. The constructor is the lowercase `constructor` and will be invoked whenever we create a new object using the class. The other methods will be automatically be added to the common prototype.

Aside from the class definition, our code is identical.

### Extending classes

Another feature available with classes is the `extends` keyword. This allows us to define a type of object with the same methods (and properties) of an existing type of object, plus whatever new methods and properties we want to define. For example, we may define an object of type `Dog` that extends the `Animal` class:

```js
class Dog extends Animal {
  constructor(name, breed){
    super(name)
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks.`
  }
}

let myDog = new Dog('Luna')
myDog.speak('haha!')
// => 'Luna says "haha!"'
myDog.bark()
// => 'Luna barks.'
```

In this case, the method `speak` is a method on the `Animal` class, but the method `bark` is unique to the `Dog` class. We can make Dogs `speak` (as they are animals), but we cannot make any Animal `bark` (as they are not, necessarily, dogs). In other words, all forks are utensils, but not all utensils are forks.

When extending a `class`, we always need to call `super` with the arguments the _parent_ class constructor was expecting. Above, the `super` function calls the constructor for the `Animal` class with the provided name.
