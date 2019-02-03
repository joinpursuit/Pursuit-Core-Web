# Redux 3

Onward!

## `FormContainer` and `Form`

Just like `Posts`, `Form` is interacting with our global Redux state, and therefore needs its own container.

But wait! `FormContainer` holds state in React! How can this be? I thought Redux was handling **all** of our state?

Well, not quite. Until a user submits a form, we usually don't need to pass their input to any other components. In fact, it can be better to store user input information in React state, so we don't muddy our Redux state with tons of temporary input sections. Better to let the user put together the form, make sure their inputs are right, and _then_ update our Redux state.

Which is exactly what we're doing:

```js
import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux-utils";

import Form from "../components/Form";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title } = this.state;
    const { posts } = this.props;

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    this.props.addPost({ title, id });
    this.setState({ title: "" });
  };

  render() {
    const { title } = this.state;

    return (
      <Form
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        title={title}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);
```

You can see here that `handleChange` is updating the React state, whereas `handleSubmit` is calling the Redux method `this.props.addPost` with a new Post object as an argument. Then, it calls React's `setState` method to reset the input.

Once again, using the container-presentational component model, we are passing all of this down as props to our `Form` component and rendering JSX there:

```js
import React from "react";

const Form = ({ handleChange, handleSubmit, title }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" id="title" value={title} onChange={handleChange} />
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default Form;
```

Pretty nice, huh?

## Conclusion: Why Redux?

So, any project with a low level of complexity probably doesn't benefit much from Redux. Even in this example, it's a bit much. However, as our apps grow in size, Redux is a great tool to make sure we don't get lost in state management/prop passage shenanigans.
