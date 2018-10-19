# Classes

## Goals 
* Be able to write your own class.
* Be able to inherit  qualities from a class.

## Keywords
* class
* constructor
* super
* extends

## Lesson 

JavaScript classes, are primarily syntactical sugar (introduced in ES6) over JavaScript's existing prototype-based inheritance.

Let's take a look at some of the differences:

Old way:
```js 
function Animal(name) {
    this.name = name;
    this.speak = function() {console.log(this.name + " makes a noise")};
}

Animal.prototype.eat = function() {
  console.log("nom nom nom");
}

let corey = new Animal("corey")

corey.speak() // => "corey makes a noise"
corey.eat() // => "nom nom nom"

```

New way: 
 
```js
class Animal {
  constructor(name) {
      this.name = name;
  }
  speak() {
    console.log(this.name + " makes a noise")
  }
}

Animal.prototype.eat = function() {
  console.log("nom nom nom")
}

let corey = new Animal("corey")


corey.speak() // => "corey makes a noise"
corey.eat() // => "nom nom nom"
```

What's changed? 

Instead of creating a constructor function that looks like most other functions, we have the new `class` word. 
__NOTE:__ function declarations are hoisted, class declarations are not. 

The next difference we see is the `constructor` method. The constructor method is a special method for creating and
initializing an object created with a class. There can only be one special method with the name "constructor" in a class.

The next difference we see a syntactic difference on how we write methods in that class. 

Lastly, if you wish to add methods to the prototype and aren't able to add them directly inside of the class object, you must
still use the className.prototype syntax. 

## Extends
The extends keyword is used in class declarations or class expressions to create a class as a child of another class.
Let's see this in action by pretending we want to create another class called Dog. We want dog to have all the same methods as Animal
but make it's speak be woof woof and add a new method called fetch. 

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
