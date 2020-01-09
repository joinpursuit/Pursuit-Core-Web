# React Hooks

## Objectives

- Understand what problem React Hooks solve
- Use `useState` to refactor a React Class component into a functional one
- Use `useEffect` to add observation handling to a React component

## Resources

- [React Hooks Intro](https://reactjs.org/docs/hooks-intro.html)
- [Hooks Overview](https://reactjs.org/docs/hooks-overview.html)

# 1. Hooks Motivation

In 2018, React introduced Hooks as another way to create React components.  Why?  They identified some issues with how classes were used and wanted to introduce a solution to them.  Two of the issues they identified are:

1) Complex components become hard to understand
2) Classes confuse both people and machines.

https://codesandbox.io/s/heuristic-thunder-v6ru1

## Classes can become overly complex

```js
import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleIncrementClick = this.handleIncrementClick.bind(this);
    this.handleDecrementClick = this.handleDecrementClick.bind(this);
  }

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
      </div>
    );
  }
}

export default App;
```

## Classes can be confusing

# 2. useState

## Use multiple times

# 3. useEffect
