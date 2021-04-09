# State, Re-Rendering, and Event Handling in React

## Terms

* State
* `this.setState`
* Event listener
* Event handler
* `className`

## Objectives

- Understand what state does in a React application
- Instantiate `state` in a component's constructor
- Call `setState` to update state
- Refer to and utilize state in a component's render function

# Introduction

In the previous lesson, we saw how to create a static web page using React components and props. In this lesson, we will start to review the strategy that React uses to handle changing data, user input, and visual updates. For nearly any task that requires information to update on the page, we use the `state` property.

React has a few ways of storing, handling, and using information. Of course, as a JavaScript framework, it has access to variables. However, updating a variable in React won't change what the user sees. The page won't re-render to reflect that updated information.

Enter **state**. State is a way of storing information in a component and rendering it to the user. A class component can hold state in `this.state`. When we update this state, the entire component re-renders, showing the user different information depending on what the state is and how our component is using it. You might think that re-rendering an entire component would be an inefficient process, but because of the virtual DOM, it's fast.

Let's see this in action:

# Building a Counter App

[Our First Stateful App](https://codesandbox.io/s/react-counter-bzxo7)

This is a very simple app to count up from zero. Let's take a look at what's going on here.

The first thing you might notice is our constructor function:

```js
constructor() {
  super();
  this.state = {
    count: 0
  };
}
```

We first call `super()` in our constructor to inherit the typical React component functionality.

Then, we assign `this.state` to be equal to an object. Our state should always be an object. In React, `state` is a very special property that our application uses to render and update information. Whenever the state changes, React will redraw your component to reflect its new state.

How can we change the state? React's library has a function for us called `setState`. `setState` takes one argument: An object with the part (or parts) of state you'd like to change. We define a method on our component, `handleClick` that calls `setState` and increments the `count` part of state by one.

```js
handleClick = () => {
  this.setState({
    count: this.state.count + 1
  });
};
```

So, let's break down what this is doing under the hood.

`setState` updates our component's state and then **calls our component's `render` function**, propogating to the virtual DOM, then the real DOM, reflecting the change that you made to the user.

Now that we've defined our function, it's time to figure out how it will be called. Frequently, we'd like to call our functions in *response to an event* initiated by our users. Back when we were using direct DOM manipulation, you'll remember we had to use `addEventListener` in our JS file and make sure we were referring to the correct DOM node. React is much nicer - we can insert our `handleClick` function directly into the JSX element we'd like to trigger it:

```js
render() {
  const { count } = this.state;

  return (
    <div>
      <button onClick={this.handleClick}>click here</button>
      <p>Clicked {count} times</p>
    </div>
  );
}
```

Alright, let's look at this line-by-line. First, we're using object destructuring to assign the `count` part of our state to a variable of the same name. 

Then, we return our JSX. We've got a containing `div`, because our component can only render one element at a time. Inside that `div`, we have a `button` element with an **event listener**: `onClick`.

`onClick` is one example of how JSX listens for certain events. For the most part, it does what it says - it triggers the function you pass in when the element is clicked. `onClick` **listens** for an event, whereas `handleClick` **handles** what happens afterwards - our `handleClick` function is therefore known as an **event handler**.

To see this app in action, go ahead and click the button. Our `count` part of state increases by one, `render` is called again, and the page updates with this new information. Pretty slick, huh?

Here's the whole run-down of what happens:

* Counter component is created
* constructor function runs
  * `this.state` is initialized and assigned a value (0)
* render function runs
  * JSX is rendered
  * JSX includes the current state value (0)
  * onClick event listener is bound to `this.handleClick`
* user clicks button
* handleClick function runs
* `this.setState` runs
  * `this.state.counter` is now 1
  * setState triggers a re-render
* new state value is displayed on the screen

*Discussion Topic: Notice that the function is passed into `onClick` un-invoked. What would happen if we invoke the function inside the `onClick` attribute?*

<details>
<summary>Answer</summary>
The function will invoke as soon as the component renders. Then, `setState` will be called, the component will re-render, `handleClick` will run again, the component will re-render... Do you see where I'm going here? It'll be an infinite loop. This is why we should never call a function that updates our state inside of our `render` method.
</details>
<br />

Let's check out another example with state being used in a different way:

# Building a Color-Changing App

 [Our Second Stateful App](https://codesandbox.io/s/delicate-wood-b4k7h)

This is an app that changes the color of our background depending on the values contained in the state. We do this by using React to *update the class selectors on our elements* when the state updates, which we then define styling for in our CSS file. Therefore, let's start with our CSS, in `styles.css`.

Here, we define three classes, besides the default `App` class that Create React App gives us: `red`, `yellow`, and `blue`. We style them accordingly, including giving them a `height` attribute, because while they aren't going to contain too much, we still want them to be visible.

Alright, let's get to the meat of the app:

### `colorPicker.js`

Let's look at the constructor function first:

```js
constructor() {
  super();
  this.state = {
    colorIndex: 0,
    possibleColors: ["red", "blue", "yellow"]
  };
}
```

We're defining two parts of state here: `colorIndex`, which corresponds to the index of the `possibleColors` array. To start, `colorIndex` is set to 0, which, taking a look at the array, should be red.

The user will change the `colorIndex` by clicking a button.  What function will fire when that button is clicked? Let's look at the function `changeColor`:

```js
changeColor = () => {
  const { colorIndex } = this.state;
  const nextIndex = (colorIndex + 1) % 3;

  this.setState({
    colorIndex: nextIndex
  });
};
```

`nextIndex` uses the modulo operator (`%`) to cycle between 0, 1, and 2 (the indices of our `possibleColors` array). When we get past 2, we'd like to go back to 0. `nextIndex` accomplishes this by using modulo. Whenever `this.state.colorIndex + 1` works out to 3, we call 3 % 3 which gets us back to 0. 2 % 3 and 1 % 3 work out to 2 and 1 respectively, and are therefore unchanged. Then, we use `setState` to make sure our state updates with this new index. 

However, nothing would happen unless we called this function and reflected this new state in our `render` function:

```jsx
render() {
  const { colorIndex, possibleColors } = this.state;
  return (
    <div className={possibleColors[colorIndex]}>
      <button onClick={this.changeColor}>Change Color</button>
    </div>
  );
}
```

First, we use object destructuring to break out our parts of state. Then, we immediately use both parts in our `div` element. Here, the `className` of our `div` reflects the index (`colorIndex`) of our colors array (`possibleColors`), whatever that might be. This index starts at 0, which, in the array, is `red`. Then, as `colorIndex` updates in the state, it cycles through the `possibleColors` array and propogates to the DOM for the user.

We then insert a single `button` tag into our `div`, which we add `onClick` functionality to fire the `changeColor` function we wrote earlier. Click the button a couple of times to see this in action!

*Discussion topic: Is a button the only thing we can add `onClick` functionality to? Test this by removing the button and adding the `onClick` tag to the containing `div`.*

*Exercise: Add three buttons, labeled "Red", "Yellow", and "Blue." When the user clicks on a button, the background of our `div` should change to the corresponding color.*

# Conclusion

You might be wondering: Okay. We've updated a counter and changed color on a page. Why? What's the point?

To describe how we might use these basic tools in a production app, here's a quick example. Let's say you were building an e-commerce site for sneakers. When somebody clicks on a size, you'd like to display a menu with sneakers available in the selected size. To do this, you'd want to use state to both:

* Update a `selectedSneakers` part of state with all the sneakers in-stock in a size 10.
* Update a `showSneakerList` part of state from `false` to `true`, updating the DOM so that the `selectedSneakers` render in the proper place.

`state` lets you do both of these things! Remember: If you want something to change in a React app, you're likely going to be using `setState` somewhere.

## Extra Tip: State Anti-pattern

You might be tempted, at first, to change the state directly. For example, if you wanted to increase `this.state.count` by one, you might write a function like this:

```js
badFunctionPlusOne = () => {
  this.state.count += 1;
}
```

Don't do this. **Never access the state directly.** This will not cause your component to re-render, will not cause anything in your app to change, and will only mess with you.
