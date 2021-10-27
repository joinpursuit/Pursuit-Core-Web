# React Class Components

## Sources

* [Object Oriented Programming vs. Functional Programming](https://www.codenewbie.org/blogs/object-oriented-programming-vs-functional-programming)
* [JavaScript: Prototype vs. Class](https://medium.com/@parsyval/javascript-prototype-vs-class-a7015d5473b)
* [Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [this - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

# Objectives
- Understand the purpose of ES6 classes
- Create instances of an ES6 class and access its attributes and methods
- Add attributes and methods to an existing ES6 class and access them from an instance of the class
- Understand how classes are extended in JavaScript and create a class that extends another class
- Describe the differences between React class components and React functional components

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

Our Animal class includes the ability for different instances to have different names - just as two dogs might share many qualities but be named differently. We add `name` as an argument to the constructor, and then we immediately apply it as an attribute to the class by placing it on `this`. 

`this` is a keyword in JavaScript that means different things depending on context. Generally, it refers to the greater context in which it was placed - in this case, the class object itself. By writing `this.name = name`, we place the `name` we passed into the constructor's argument on the `this` object, which is, in this case, the instance of `Animal` we're constructing.

That's a lot going on under the hood, but in practice, the notation for creating an instance of `Animal` is fairly straightforward:

```js
const myDog = new Animal('Luna')

myDog.name
// => 'Luna'

myDog.speak('woof')
// => 'Luna says "woof"'
```

Note the `new` keyword here. This is an essential keyword for creating a class instance in JavaScript. Think of it (with the standard `()` syntax that we also see on that line) as a way of invoking the class instance's constructor.

*Exercise 1: Create an instance of the `Animal` class. Give it a unique name. Assign the instance to a variable, and log the instance's `name` and the result of its `speak` method (with some unique words to speak) to the console.*

*Exercise 2: Create instances of the `Animal` class with these names. Log `name` and `speak()` to the console for each instance. Use the words in the table with `speak()` How can you use a loop to do this more efficiently?*

| Name | Says |
| ---- | ---- |
| Kermit | ribbit |
| Ms. Piggy | oink |
| Fozzie | wakka wakka |
| Rowlf | arf arf |
| Big Bird | cheep cheep |

*Exercise 3: Let's add some attributes and methods to the `Animal` class code*
- Add an `age` attribute to the `Animal` class. Update the constructor to set the `age` when an instance of `Animal` is created.
- Add a `greet` method to the `Animal` class. `greet()` should return a string that contains the animal's name and age. Ex: `Hello. My name is Luna and I am 42 years old`
- Create two new instances of `Animal`. Log the instances' age and greeting to the console.

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

*Exercise: Create a `Cat` class that extends `Animal`. Cats should have a `meow()` method. Create an instance of `Cat` and log its `speak()` and `meow()` methods to the console.*

# Class components in React

Now that we understand the basics of how classes use `extends` to inherit functionality, we get a better impression of why classes might have utility in React. Consider the following functional React component:

```jsx
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

The main disadvantage to a class component, as you can see, is that the functional component is much more concise. Class components, however, are designed not just to render JSX, but to store and handle data. Therefore, we will start by using class components to handle higher-level, more complex responsibilities, and we'll be using functional components to handle simpler render logic.

*Exercise: Are these statements true of React functional components, React class components, or both?*
1. They use JSX.
2. They are functions.
3. They output JSX using the `return` keyword.
4. They output JSX using a `render` method.
5. They extend the React `Component` class.
6. They have `constructor` methods.

## Should React class components extend other React class components?

Every React class component **must** extend the `React.Component` class. Because these components are classes, you _could_ try to have one React component inherit from another React component. For example, if I have an `<Animal />` component that extends `React.Component`, should I create a `<Mouse />` component that extends the `<Animal />` component?

**The answer is NO.** [Facebook explicitly advises us against having React components inherit from (extend) other React components](https://reactjs.org/docs/composition-vs-inheritance.html#so-what-about-inheritance).

> At Facebook, we use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.

This doesn't mean we can't have components rendering other components! That's a huge part of react 


## Practice writing components with properties

Let's start a new project and see how we might write components using properties. We'll do this with both functional and class components.

`cd` to your sandbox or any directory you prefer

```bash
$ npx create-react-app component-practice
$ cd component-practice
$ code .
```

Open the `App.js` component and delete everything inside of it!

We can use class components along with the constructor to store and render properties. An example!

```js
import { Component } from 'react';

class Hello extends Component {
  constructor() {
    super()

    this.name = "Jimmy"
  }

  render() {
    return <h1> Hello {this.name}! </h1>
  }
}

export default Hello
```

> What do you think this will render?

Run `npm start` once you're done and see what appears!

## Refactoring class & functional components

Here's an equivalent way to write the above class component using a functional component instead.

```js
function Hello () {
  const name = "Jimmy"
  return <h1> Hello {name}</h1>
}

export default Hello
```

Note the differences here!

* We got rid of the class declaration, so nothing to extend
* There is no constructor - variables are declared directly in the function using `let` or `const`
* Variables are referenced by name, no `this`
* There's no `render()` method. We just return from the function
* You no longer need to import `React` (this is relatively new, we used to have to import `React` in functional components, too - [read details here!](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html))

What's similar?

* You still need to export every component. One component per file is good practice.

## Practice!

Here's one class and one functional component as examples. Convert the class component to a functional one, and convert the functional component to a class component.

Before you start the refactor:

* Copy the entire code snippet into your `App.js` component
* run `npm start` to look at what the component renders in your browser
* Take note of what it looks like!
* Do your refactor, using the original starting point as a guideline.

Your refactoring is successful when the component looks identical before and after!

```js
import { Component } from 'react'

class BookList extends Component {
  constructor() {
    super()

    this.titles = ["moby dick", "the great gatsby", "of mice and men"]
  }
  render() {
    return (
      <ul className="book-titles">
        {this.titles.map(title => <li>{title}</li>)}
      </ul>
    )
  }
}

export default BookList
```


```js
function Card() {
  const cardTitle = "Song Info"
  const author = "Andrew Bird"
  const songTitle = "Danse Caribe"
  const description = "A wonderful song off of the album 'Break it yourself'"

  return (
    <div className="card">
      <h1 className="card-title">{cardTitle}</h1>
      <h2 className="author-title">{author} - {songTitle}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Card
```
