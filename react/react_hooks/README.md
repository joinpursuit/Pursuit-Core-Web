# React Hooks

## Objectives

- Understand what problems React Hooks solve
- Use `useState` to refactor a React Class component into a functional one
- Use `useEffect` to add event listeners to a functional React component

## Resources

- [React Hooks Intro](https://reactjs.org/docs/hooks-intro.html)
- [Hooks Overview](https://reactjs.org/docs/hooks-overview.html)

# 1. Hooks Motivation

In 2018, React introduced Hooks as another way to create React components.  Why?  They identified some issues with how classes were used and wanted to introduce a solution to them.  Two of the issues they identified are:

1) Complex components become hard to understand
2) Classes confuse both people and machines.

To understand why, consider the following example of a Component class that sets up a counter and displays the current width of the page:

https://codesandbox.io/s/fervent-haze-u0i9q

<details>
<summary>`App` Code</summary>

```js
import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, width: window.innerWidth };
    this.handleIncrementClick = this.handleIncrementClick.bind(this);
    this.handleDecrementClick = this.handleDecrementClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
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

  handleIncrementClick() {
    this.setState({
      count: this.state.count + 1
    });
  }

  handleDecrementClick() {
    this.setState({
      count: this.state.count - 1
    });
  }

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


## Classes can become overly complex

One confusing thing about this class is that various important bits of functionality are spread over different lifecycle methods.  For example, to respond to window resizing, we need to setup an event listener when the component mounts, then remove it when the component unmounts:

```js
componentDidMount() {
  window.addEventListener("resize", this.handleResize);
}

componentWillUnmount() {
  window.removeEventListener("resize", this.handleResize);
}
```

As class components get bigger, you add more logic to each of these sections, making it harder to understand where code is being run.

## Classes can be confusing

`this` can be a confusing keyword in React.  In our constructor, we need to explicitly bind `this` to our methods, otherwise `this` will be undefined when we try to access `this.window`:

```js
constructor(props) {
  super(props);
  this.state = { count: 0, width: window.innerWidth };
  this.handleIncrementClick = this.handleIncrementClick.bind(this);
  this.handleDecrementClick = this.handleDecrementClick.bind(this);
  this.handleResize = this.handleResize.bind(this);
}
handleResize = () => {
  this.setState({ width: window.innerWidth });
};

handleIncrementClick() {
  this.setState({
    count: this.state.count + 1
  });
}

handleDecrementClick() {
  this.setState({
    count: this.state.count - 1
  });
}
```

It can be very easy to forget to bind `this`, and can lead to confusing errors.  To resolve these issues, as well as some other problems, React introduced *Hooks*.

# 2. useState

https://codesandbox.io/s/wonderful-gagarin-l5gtj

Hooks are a new feature of React that allow us to *hook into* a new piece of React functionality.  The most common hook is `useState`  If you have a component that needs state, you can still use a functional component using the `useState` hook.

`useState` is a new method that we can import from React:

```js
import React, { useState } from "react";
```

`useState` takes in one argument (a primate that represents your state) and returns a variable where your state is held, and a method for changing the state.

To recreate our counter component, we need to track the current value.

In the line below, we call `useState`, passing in the initial value of the counter (0).  We use [destructuring assignment syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to assign the return value of `useState` into two variables: `counter` and `setCounter`

```js
const [counter, setCounter] = useState(0);
```

With `setCounter` defined, we can then implement methods that increment and decrement the counter:

```js
function incrementCounter() {
  setCounter(counter + 1);
}

function decrementCounter() {
  setCounter(counter - 1);
}
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

## Using useState multiple times

To track multiple different parts of state, we have two options.  We can either pass an object into `useState`, or we can call `useState` multiple times.  Let's use the latter strategy to keep track of the width:

```js
const [width, setWidth] = useState(window.innerWidth);
```

We now have created an additional variable `width` which will track the width of the page, and a method `setWidth` we can call to update the stateful variable `width`.  We can then use that in our UI:

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

  function incrementCounter() {
    setCounter(counter + 1);
  }

  function decrementCounter() {
    setCounter(counter - 1);
  }

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

We have almost everything hooked up, but our width doesn't update as the page size changes.  Fortunately, React introduces a new, cleaner way to hook into event listeners in functional components with the `useEffect` hook.


# 3. useEffect

`useEffect` is another method that we can import from `React`:

```js
import React, { useState, useEffect } from "react";
```

`useEffect` allows us to create functional React components with **side effects**.  This means that when our functional component is called, it will call `useEffect`, which can allow us to introduce behavior.  Without `useEffect`, our functional components can only return JSX.  Now, they can execute code as well.  Code in a `useEffect` callback would be in a lifecycle method in a React component class, such as `componentDidMount` or `componentWillUnmount`.

`useEffect` takes in one argument: a callback that will be executed after the first render and every render afterwards.  In this callback, you can use state variables and methods.  In the snippet below, we define a method `handleResize` that takes in no arguments and calls `setWidth` passing in the width of the window.  We then add an event listener that will call `handleResize` whenever the window resizes.

```js
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
});
```

When implementing `useEffect`, we can also return a value.  The value we return from useEffect is a callback that React will call when the component is being unmounted.  We don't need to return a callback, but if we do, React will ensure that it's called at the appropriate time.

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

# 4. Summary

React hooks are a powerful new tool you can use to write cleaner, more functional React programs.  Hooks solve two problems with React components: (1) They can get complex with a lot of different lifecycle methods, and (2) `this` can be confusing when writing code.

Two of the most popular hooks are `useState` and `useEffect`.  `useState` allows us to create a stateful variable and method to change that variable.  This variable can be an object or any JavaScript primitive.  We can then call the method generated by `useState` to update our stateful variable.

`useEffect` allows us to create side effects for functional React components.  We can add add event listeners and use the return value of the callback that `useEffect` takes in to run any cleanup associated with that effect.
