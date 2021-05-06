# React Hooks

## Objectives

- Understand what problems React Hooks solve
- Use `useState` to refactor a React Class component into a functional one
- Use `useEffect` to add event listeners to a functional React component

## Resources

- [React Hooks Intro](https://reactjs.org/docs/hooks-intro.html)
- [Hooks Overview](https://reactjs.org/docs/hooks-overview.html)
- [An Explanation of React.useEffect()](https://dmitripavlutin.com/react-useeffect-explanation/)

# Why Hooks?

In 2018, React introduced Hooks as another way to hold state in React components. Why? They identified some issues with how classes were used and wanted to introduce a solution to them.

To understand why, consider the following example of a Component class that sets up a counter and displays the current width of the page:

[Example](https://codesandbox.io/s/angry-wescoff-3qmzb)

<details>
<summary>`App` Code</summary>

```js
import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, width: window.innerWidth };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  };

  handleIncrementClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleDecrementClick = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Counter app</h1>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleDecrementClick}>-</button>
        <button onClick={this.handleIncrementClick}>+</button>
        <h2>Width: {this.state.width}</h2>
      </div>
    );
  }
}

export default App;
```

</details>

<br />

## In a nutshell: Classes can become overly complex, not DRY, and hard to read.

One confusing thing about this class is that various bits of similar functionality are spread over different lifecycle methods.

For example, to respond to window resizing, we need to setup an event listener when the component mounts, then remove it when the component unmounts:

```js
componentDidMount() {
  window.addEventListener("resize", this.handleResize);
}

componentWillUnmount() {
  window.removeEventListener("resize", this.handleResize);
}
```

As our class component gets bigger, we add more logic to each of these sections, making it more and more difficult to understand where code is being run.

# `useState`

- [Example Code](https://codesandbox.io/s/billowing-meadow-61cnj)

Hooks are a new feature of React that allow us to _hook into_ a piece of React functionality. The most common hook is `useState`. If you have a component that needs state, you **no longer need a class component** - you can now use a functional component with the `useState` hook.

`useState` is a new method that we can import from React:

```js
import React, { useState } from "react";
```

`useState` takes in one argument (representing the initial state) and returns both a variable to access that part of state and a method for changing it.

Let's recreate our counter/window measurer app shown above using hooks. In order to implement a counter, of course, we need to track the current value of our count.

In the line below, we call `useState`, passing in the initial value of the counter (0). We use [destructuring assignment syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to assign the return value of `useState` into two variables: `counter` and `setCounter`.

```js
const [counter, setCounter] = useState(0);
```

With `setCounter` defined, we can then implement functions that increment and decrement the counter:

```js
const incrementCounter = () => {
  setCounter(counter + 1);
};

const decrementCounter = () => {
  setCounter(counter - 1);
};
```

Finally, we can build our UI with our new `counter` variable:

```js
return (
  <div className="App">
    <h1>Counter App with React Hooks</h1>
    <h2>{counter}</h2>
    <button onClick={decrementCounter}>-</button>
    <button onClick={incrementCounter}>+</button>
  </div>
);
```

In an app this simple, we could even nix implementing the increment and decrement functions entirely. If we did, our `render` would look like this:

```js
return (
  <div className="App">
    <h1>Counter App with React Hooks</h1>
    <h2>{counter}</h2>
    <button onClick={() => setCounter(counter + 1)}>-</button>
    <button onClick={() => setCounter(counter - 1)}>+</button>
    <h2>Width: {width}</h2>
  </div>
);
```

## Using `useState` multiple times

To track multiple different parts of state, we have two options. We can either pass an object into `useState`, or we can call `useState` each time we want to define a different part of state. Let's use the latter strategy to keep track of the width:

```js
const [width, setWidth] = useState(window.innerWidth);
```

We now have created an additional part of state, `width`, which will track the width of the page, and a method `setWidth` we can call to update it. We can then add this to our UI:

```js
return (
  <div className="App">
    <h1>Counter App with React Hooks</h1>
    <h2>{counter}</h2>
    <button onClick={decrementCounter}>-</button>
    <button onClick={incrementCounter}>+</button>
    <h2>Width: {width}</h2>
  </div>
);
```

<details>
<summary>Full Class So Far</summary>

```js
import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <div className="App">
      <h1>Counter App with React Hooks</h1>
      <h2>{counter}</h2>
      <button onClick={decrementCounter}>-</button>
      <button onClick={incrementCounter}>+</button>
      <h2>Width: {width}</h2>
    </div>
  );
}
```

</details>

<br />

We have almost everything hooked up, but our width doesn't update as the page size changes. In our old app, we had to add an event listener to our window in `componentDidMount` and remove it in `componentWillUnmount`. Fortunately, React introduces a new, cleaner way to hook into the component lifecycle with the `useEffect` hook.

# useEffect

`useEffect` is another method that we can import from `React`:

```js
import React, { useState, useEffect } from "react";
```

`useEffect` allows us to create functional React components with **side effects**. This means that when our functional component is called, it will call `useEffect`, which can allow us to add functionality to the component on mount, update, and unmount - just like a lifecycle method. In fact, it's useful to think of `useEffect` as all those lifecycle methods rolled into one.

## useEffect as componentDidUpdate

`useEffect` takes in up to two arguments, the first of which is a callback that will be executed after the first render **and every render afterwards**. In this callback, you can use state variables and methods.

```js
useEffect(() => {
  // Code to be run on every render.
});
```

In the snippet below, we define a method, `handleResize`, that calls `setWidth`, passing in the width of the window. We then add an event listener that will call `handleResize` whenever the window resizes.

```js
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
});
```

The effect of the code above is very similar to using the `componentDidUpdate` method.

However, the solution above has some problems. As mentioned, `useEffect` will run on every render. That means on every prop and state change, the same event listener will be added multiple times to the window. One way to solve this is to remove the event listener when the component is unmounted.

## useEffect as componentWillUnmount

When implementing `useEffect`, we can also return a value. The value we return from `useEffect` is a callback that React will call when the component is being unmounted. We don't need to return a callback, but if we do, React will ensure that it's called at the appropriate time.

```js
useEffect(() => {
  // Code to be run on every render.
  return () => {
    // Code to be run when the component is unmounted.
  };
});
```

In this case, it's convenient because we can remove the event listener on our component's unmount, like we did before in `componentWillUnmount`:

```js
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
});
```

Just like `useState` can be called multiple times, we can call `useEffect` multiple times to add multiple different event listeners or anything else that would typically be done in a class component's lifecycle method.

The code above effectively implements `componentDidUpdate` as well as `componentWillUnmount`. But what about `componentDidMount`?

## useEffect as componentDidMount

When we add functionality to the `useEffect` hook, we can pass in two arguments. The first one, a callback that defines behavior, is the one we've been using. The second one is optional, but critically important if we want to control when our callback is actually called.

This second argument, when used, is always an array. Inside this array should be **the values that we want useEffect to keep track of** and run when they change. We can use this to call a function when the props change, like our `componentDidUpdate` method does.

Alternatively, we can pass in an empty array to tell our `useEffect` hook to only run on mount - a `componentDidMount` equivalent. Like so:

```js
useEffect(() => {
  // Code to be run when the component is mounted.
  return () => {
    // Code to be run when the component is unmounted.
  };
}, []);
```

Adding the empty array effectively changes `useEffect` from mimicking `componentDidUpdate` to `componentDidMount`. The final version of the resizing code would look very similar to before.

```js
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}. []);
```

# Conclusion

React hooks are the result of years of developers working on React and identifying problems with syntax and readability. While they don't add any new functionality to React, they provide a more direct, streamlined set of tools for managing and rendering data in your React components. If ES6 Class syntax isn't your cup of tea, hooks are your best friend. Even if it is, hooks are an excellent tool in your toolbox for writing concise, beautiful React code.
