# Higher Order Components

In this section, we will examine one particularly important React specific design pattern - **Higher Order Components**, or *HOC*s. 

An **HOC** is primarily for reusing component logic. It is a **function** that takes in as an argument a **React Component** and returns a **new React Component**, one that is a transformed version of the input (which, remember, was **also** a React Component.

Let's try and grok HOCs by example. Suppose we have two input fields in a form - one for managing email and another for password. When the user inputs valid values to both, we want to display a "submit" button. Let's take a naive pass at this implementation first:

```js
import {Component} from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pw: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePwChange = this.handlePwChange.bind(this)
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePwChange(e) {
    this.setState({ pw: e.target.value })
  }

  render() {
    const { email, pw } = this.state;
    return <form>
      <input type="text" onChange={this.handleEmailChange} value={email} />
      <input type="password" onChange={this.handlePwChange} value={pw} />
    </form>
  }

}
```

In this example, we have a simple form with two input fields. 

However, note how we are essentially writing a bunch of the same logic within the **handleChange** functions - in particular, **handleEmailChange** and **handlePwChange** are exactly the same! Moreover, for a simple form this is likely fine - but what if we have a complex form that required validation on dozens of fields...? This component would get **long** and more importantly, error prone.

This type of situation is a perfect example of why HOCs are useful. Let's refactor the code above with HOCs.

```js
const withControlledInput = (WComponent) => {
  return class ControlledInputComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      }
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
      this.setState({ value: e.target.value })
    }
    render() {
      return <WComponent
        {...this.props}
        value={this.state.value}
        onChange={this.handleChange}
      />
    }
  }
}

class Input extends React.Component {
  render() {
    return <input {...this.props} />
  }
}

const ControlledInput = withControlledInput(Input)

class Form extends Component {
  render() {
    return <form>
      <ControlledInput type="text" />
      <ControlledInput type="password" />
    </form>
  }

}

```

So what's going on here? Let's take it step by step.

### withControlledInput

This function is the **HOC** itself. It expects a component to be passed in and it returns a new component which **renders** the passing in component. Notice how we moved all the **handleChange** logic into the **HOC** function itself, which elimintes our need for the **handleEmailChange** and **handlePwChange** methods.

### Input

Since our actual JSX element in this case is simply an `input` field, we wrap it around a react component that we can pass in to our `withControlledInput` function.

### Form

Notice how simple our **Form** component becomes! Now, it's just a implementing a few **ControlledInput** components with specified `type` fields - and that's it!

It is worth noting that thanks to our changes, both the **Input** and the **Form** components can become stateless:

```js
const withControlledInput = (WComponent) => {
  return class ControlledInputComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      }
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
      this.setState({ value: e.target.value })
    }
    render() {
      return <WComponent
        {...this.props}
        value={this.state.value}
        onChange={this.handleChange}
      />
    }
  }
}


/*
Stateless!
*/
const Input = props => <input {...props} />
const ControlledInput = withControlledInput(Input)

/*
Stateless!
*/
const Form = props => {
  return <form>
      <ControlledInput type="text" />
      <ControlledInput type="password" />  
  </form>
}
```

### More examples / Deeper dives

There's a LOT of info and variations to HOCs out there. A lot of fundamental React community frameworks leverage HOCs often, be sure to check out the links below for more info.

* https://reactjs.org/docs/higher-order-components.html
* https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006
* https://medium.freecodecamp.org/higher-order-components-the-ultimate-guide-b453a68bb851
* https://css-tricks.com/what-are-higher-order-components-in-react/
* https://hackernoon.com/higher-order-components-hocs-for-beginners-25cdcf1f1713
