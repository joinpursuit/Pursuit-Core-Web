# ES6 Classes - An Applied Overview

## Sources

* [Object Oriented Programming vs. Functional Programming](https://www.codenewbie.org/blogs/object-oriented-programming-vs-functional-programming)
* [JavaScript: Prototype vs. Class](https://medium.com/@parsyval/javascript-prototype-vs-class-a7015d5473b)
* [Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [this - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

# Introduction

As we've learned, React is a library driven by the concept of components. These components can be written either as functions or as **classes**. Classes are high-level data structures that can contain many **attributes** and **methods**. Like how functions are defined and then called, classes outline their attributes and methods in class **definitions** and then utilize them in **instances**.

You've been using classes way more than you think. Classes are baked into the way JavaScript was built. For example, `[1, 2, 3, 4, 5]` is an instance of the class `Array`. When you inquire as to its `.length`, you are checking on an attribute defined in the class itself. This attribute is updated when items are added to, or removed from, the array - it doesn't check the array's length every time, it stores the length of the array in its own separate place. Similarly, if you called `.forEach` on this array, you'd be calling a method whose behavior is defined in the array's prototype.

Class notation is new to JavaScript as of ES6. Before this, classes were referred to as prototypes and had fairly different formatting. We aren't going to worry about prototypal notation for right now - feel free to read the article listed in the Resources section for more information.

# Using Classes

The following is a definition for an `Animal` class, with a constructor function (`constructor()`), an attribute (`this.name`), and a method (`speak`).

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak(words) {
    return `${this.name} says "${words}"`
  }
}
```

You can see that the class definition looks sort of like a function definition, except it doesn't include a parentheses to capture an argument. In lieu of this, classes usually have a constructor function, which is called whenever a class instance is created.

Our Animal prototype includes the ability for different instances to have different names - just as two dogs might share many qualities but be named differently. We add `name` as an argument to the constructor, and then we immediately apply it as an attribute to the class by placing it on `this`. 

`this` is a keyword in JavaScript that means different things depending on context. Generally, it refers to the greater context in which it was placed - in this case, the class object itself. By writing `this.name = name`, we place the `name` we passed into the constructor's argument on the `this` object, which is, in this case, the instance of `Animal` we're constructing.

That's a lot going on under the hood, but in practice, the notation for creating an instance of `Animal` is fairly straightforward:

```js
const myDog = new Animal('Luna')

myDog.name
// => 'Luna'

myDog.speak('woof')
// => 'Luna says "woof"'
```

# Extending classes

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

When extending a class, in order to make sure the parent class gets the data it needs, we need to call `super()` with the arguments the parent class constructor was expecting. Above, the `super` function calls the constructor for the `Animal` class with the provided name.

# Class components in React

Now that we understand the basics of how classes use `extends` to inherit functionality, we get a better impression of why classes might have utility in React. Consider the following functional React component:

```jsx
import React from 'react';

const Example = () => {
  return <h1> Hello World! </h1>;
}
```

And its class-based equivalent:

```jsx
import React from 'react';

class Example extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <h1> Hello World! </h1>;
  }
}
```

We can see here that our component's connection to the React library is much more explicit in a class component than it is in a functional component. Class components come with other perks, too. Because the render logic is explicitly handled by the component's `render` method, we can define and use other methods on the class to keep our logic organized and make our components more readable.

The main disadvantage to a class component, as you can see, is that the functional component is much more concise. Therefore, we will start by using class components to handle higher-level, more complex responsibilities, and we'll be using functional components to handle simpler render logic.

Please note that, in older versions of React, class components were able to perform specific tasks and hold specific logic that functional components could not. This is no longer true - the differences between class and functional components, these days, are mostly cosmetic. However, we ask that you follow the above guidelines as we start building in React together. You can develop your own style down the line.