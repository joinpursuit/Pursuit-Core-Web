# State, Re-Rendering, and Event Handling in React

## Terms

* State
* `this.setState`
* Event listener
* Event handler
* `className`

## Objectives

- Understand what `state` does in a React application
- Instantiate `state` in a constructor
- Call `setState` to update state
- Refer to state using the `{}` JSX syntax

# 1.  Introduction

In the previous lesson, we saw how to create a static web page using React components.  In this lesson, we will start to review the strategy that React uses to handle user input, using the `state` property.


React has a few ways of storing, handling, and using information. Of course, as a JavaScript framework, it has access to variables. However, updating a variable in React won't change what the user sees. The page won't re-render to reflect that updated information.

Enter **state**. State is a way of storing information in a component and rendering it to the user. When we update state, the entire component re-renders, showing the user different information depending on what the state is and how our component is using it. You might think that re-rendering an entire component would be an inefficient process, but because of the virtual DOM, it's also fast.

# 2. Building a Counter App

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

We first call `super()` to inherit the typical React component functionality.  

Then, we assign `this.state` to be equal to an object.  In React, `state` is a very special property that your application uses to render the view.  Whenever the state changes, React will redraw your component to reflect its new state.

How can we change the state?  React makes available a function for us called `setState`. `setState` takes one argument - an object with the part (or parts) of state you'd like to change.  We define a method `handleClick` that calls `setState` and increments it by one.

```js
handleClick = () => {
  this.setState({
    count: this.state.count + 1
  });
};
```

The important thing here is that we aren't just increasing the count by one. We are setting a new `count` key which replaces the old one. We are using the previous value of `count` and adding one. `setState` will **call the render function**, reflecting the change that you made to the user.

But wait. How do we actually call this function? Well, we could devise some way to call it ourselves, independent of user input. However, frequently, we'd like to call our functions in *response to an event* initiated by our users. Back when we were using DOM manipulation, you'll remember we had to use `addEventListener` in our js file and make sure we were referring to the correct DOM node in our HTML. React is much nicer - we can insert our `handleClick` function directly into our JSX:

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

Alright, let's look at this line-by-line. First, we're using object destructuring to assign the `count` part of our state to a variable of the same name. This is just for convenience's sake, so we don't have to write `this.state.count` all over the place.

Then, we return our JSX. We've got a containing `div`, because our component can only render one element at a time. Inside that `div`, we have a `button` element with an **event listener**: `onClick`.

`onClick` is one example of how JSX listens for certain events. For the most part, it does what it says - it triggers when the element is clicked. However, take a look at those curly braces (`onClick={this.handleClick}`)! These braces, unique to JSX, allow us to insert JavaScript code into our HTML. We can do this for a few different purposes. In this case, we're doing it to specify what should happen when we click the button. `onClick` **listens** for an event, whereas `handleClick` **handles** what happens afterwards - our `handleClick` function is therefore known as an **event handler**.

Please note that we **are not invoking the handleClick function** in those curly braces! There's no parentheses after our function, and there shouldn't be. The function will invoke when clicked, but if we do it ourselves, it will invoke as soon as the component renders. Then, `setState` will be called, the component will re-render, `handleClick` will run again, the component will re-render... Do you see where I'm going here? It'll be an infinite loop! As a rule, we never want to invoke a function that calls `setState` in our `render` function.

To see this in action, go ahead and click the button. Our `count` part of state increases by one, `render` is called again, and the page updates with this new information. Pretty slick, huh?

Let's check out another example with state being used in a different way:

# 3. Building a color-changing app

 [Our Second Stateful App](https://codesandbox.io/s/nn9zov9jqm)

This is an app that changes the color of our background depending on the values contained in the state. We do this by using React to *change the class of our HTML/JSX elements* when the state updates, which we then define styling for in our CSS file. Therefore, let's start with our CSS:

### `styles.css`

```css
.App {
  font-family: sans-serif;
  text-align: center;
  width: 100%;
}

.red {
  height: 500px;
  background-color: red;
}

.blue {
  height: 500px;
  background-color: blue;
}

.yellow {
  height: 500px;
  background-color: yellow;
}
```

Here, we define three classes: `red`, `yellow`, and `blue`. We style them accordingly, including giving them a `height` attribute, because while they aren't going to contain too much, we still want them to be visible. Pretty self-explanatory here.

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

We're defining two parts of state here: `colorIndex`, which corresponds to the index of the `possibleColors` array that we want our element's class to be. By default, `colorIndex` is at 0, which corresponds to the zero-th index of `possibleColors` - in this case, red.

The user will change the `colorIndex` by clicking a button - but what function will fire when that button is clicked? Let's look at the function `changeColor`:

```js
changeColor = () => {
  let nextIndex = (this.state.colorIndex + 1) % 3;

  this.setState({
    colorIndex: nextIndex
  });
};
```

`nextIndex` uses the modulo operator to do something pretty slick. Ideally, we'd like to cycle between 0, 1, and 2 (the indices of our `possibleColors` array). When we get past 2, we'd like to go back to 0. `nextIndex` accomplishes this by using modulo. Whenever `this.state.colorIndex + 1` works out to 3, we call 3 % 3 which gets us back to 0. 2 % 3 and 1 % 3 work out to 2 and 1 respectively, and are therefore unchanged.

Then, we use `setState` to make sure our state updates with this new index. However, nothing would happen unless we also reflected this new state in our `render` function:

```js
render() {
  let { colorIndex, possibleColors } = this.state;
  return (
    <div className={possibleColors[colorIndex]}>
      <button onClick={this.changeColor}>Change Color</button>
    </div>
  );
}
```

First, of course, we use object destructuring to break out our parts of state. Then, we immediately use both parts in our `div` element. You'll notice that HTML's `class` tag is, here, replaced by `className`. They are identical - we just can't use `class` in JSX because it's a protected term in JavaScript, so we use `className` instead. Here, the `className` reflects the index (`colorIndex`) of our colors array (`possibleColors`). So, by default, it would be `'red'`, but as `colorIndex` updates, it would cycle through the `possibleColors` array.

We then insert a single `button` tag into our `div`, which we add `onClick` functionality to fire the `changeColor` function we wrote earlier. Click the button a couple of times to see this in action!

*Discussion topic: Is a button the only thing we can add `onClick` functionality to? Test this by removing the button and adding the `onClick` tag to the containing `div`.*

# 4. Conclusion

You might be wondering: Okay. We've updated a counter and changed color on a page. Why? What's the point?

To describe how we might use these basic tools in a production app, here's a quick example. Let's say you were building an e-commerce site for sneakers. When somebody clicks on a size, you'd like to pop out a menu with sneakers in their size (say, size 10). To do this, you'd want to use state to both:

* Update some kind of `selectedSneakers` part of state with all the sneakers in-stock in a size 10.
* Toggle a `sneakerPopout` part of state (from  `false` to `true`, perhaps) in order to update the JSX/CSS so that the `selectedSneakers` render in the proper place.

State lets you do both of these things! Remember: If you want something to change, visibly, in a React app, you're going to use `setState`.



# 5. State anti-pattern

You might be tempted, at first, to change the state directly. For example, if you wanted to increase `this.state.count` by one, you might write a function like this:

```js
badFunctionPlusOne = () => {
  this.state.count += 1;
}
```

Don't do this. **Never, ever access the state directly.** This will not cause your component to re-render, will not cause anything in your app to change, and will only confuse you.
