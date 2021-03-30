# Forms in React

## Objectives

- Use the `form` tag in a React app
- Create an `input` and `select` and update state accordingly
- Understand the difference between controlled and uncontrolled components

## Vocabulary

- Controlled components
- Uncontrolled components
- Semantic HTML
- `onChange`

## Resources
- [Official React forms docs](https://reactjs.org/docs/forms.html)
- [Form Labels](https://www.w3.org/WAI/tutorials/forms/labels/)

# Framing & Background

Remember working with forms in the DOM? How, in retrospect, did those forms know what information to submit? Did they somehow mark a `select`'s `option` element when the user clicked it? Did they keep track what the user types in a text `input` field, or do they have to read it quickly when the user clicks `submit`?

The answer is: Form values are kept track of by the document, and that's how they were accessible via the DOM. Read [here](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement) if you want more informatiion about what happens under the hood, but the jist is: When it comes to forms, the document has its own way to hold "state." Not anything close to a React state, but it keeps track of itself.

Because the document keeps track of forms itself, we have to choose which state we want to use to keep track of our forms. Do we use the document's state, or React's? Our choice is between:

**Controlled Components**

This means _managing the form's state in a React component's state rather than using the input fields' values_. In order to do this, we have to do two things: First, we have to update the component's state when the form changes. Second, we have to make sure that the input's field reflects React's state to the user and not the document's. This allows us to keep everything in React, and it allows us to more easily handle input errors. For example, if a user types an invalid email in a text input, we can flag that their email is incorrect as soon as they finish typing.

**Uncontrolled Components**

This means _not managing the form's state_ using our component's state, but rather, using the form's own state. Not having React hold the state makes it simpler to implement, but we need a way to retrieve the values from the form. Usually, we do this when the form submits. This means that it's trickier to handle malformed user inputs immediately when they're made. Instead, we have to wait to look at their inputs when they submit the form, analyze whether they're wrong, and display an error message. For this reason, we will **not be using uncontrolled components** in our React forms.

# Code Examples

Copy the contents of this folder to a local folder, open it in your code editor, and run `npm install`:

[React forms exercise](https://github.com/joinpursuit/FSW-React-Forms-Exercise)

## Controlled Components

Open up `UserInfoForm.js` and look at what's there:

```jsx
import React from "react";
import './UserInfoForm.css';

class UserInfoForm extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    alert(`Form submitted!`)
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="form-container">
        <h2>User Information</h2>
        
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default UserInfoForm
```

Wait, though. We learned how to handle clicks in React already. Why do we use a `form` tag and use `onSubmit` instead of just applying an `onClick` property to the submit button? 

The main reason is **accessibility**. Some vision-impaired users use a screen reader that translates the UI into audio. In order for this to work effectively, websites should be designed using **semantic HTML**. This means that your HTML tags should be as descriptive as possible to make it clear what their function is. 

In other words, semantic HTML means not reflexively using an `h1` tag whenever you want your text to be large. You use it if the text inside the tag represents the actual header of a block of content. Screen readers use these tags to figure out how to sound out the website to the user. If your website is not very accessible, that's not just wasting the time of your disabled users - it's actually a violation of federal law.

*To learn more about web accessibility, specifically creating optimal and maximally accessible and fully assistive-technology-optimized form inputs, take a look at this [tutorial](https://www.w3.org/WAI/tutorials/forms/labels/). Web accessibility is much, much bigger than we can get fully into here, but it's one of the most important and overlooked parts of production web development.*

Additionally, using `form` and `onSubmit` means that you can type into a form and hit `Enter` to submit it, which is a better user experience. If we didn't use a `form` tag, then we'd have to add a listener for a keystroke, which doesn't make sense - it's totally redundant behavior that the tag already handles for us.

Note that we must call `event.preventDefault()` in our `handleFormSubmit` to avoid the page from being reloaded, which is the default behavior that browsers use when a form submits. 

With the structure of our form built, we can now include opportunities for user input.

### Checkboxes

Right now we just have an empty form with a submit button, which isn't super useful.

The first input we'll add is a checkbox.  When the user checks this box, we want to update our new `notARobot` part of state: 

```jsx
import React from "react";
import './UserInfoForm.css';

class UserInfoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      notARobot: false,
    };
  }

  handleCheckboxChange = (e) => {
    const { checked } = e.target;

    this.setState({
      notARobot: checked,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    alert(`Form submitted!`);
  };

  render() {
    const { notARobot } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} className="form-container">
        <h2>User Information</h2>
        <input
          id="not-robot"
          type="checkbox"
          checked={notARobot}
          onChange={this.handleCheckboxChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default UserInfoForm;
```

We need to _control_ two things here in the JSX: the value of the checkbox and the function that updates that value.

Here, we are setting the `checked` property on our input to either `true` or `false`. The state variable `notARobot` is what holds the value.

So, we've got `checked`, and we've got `onChange`. The `onChange` attribute hooks a callback function into the input's change event. Our callback function is, generically, called `handleCheckboxChange`. When the checkbox gets clicked, this function gets the value `checked` from the checkbox's event (`e.target`) and sets the state using `setState`.

Since the current state of the checkbox is stored in our `notARobot` variable, after `setState` re-renders, our checkbox is checked.

*Question: What would happen if you removed the `onChange` key here? Would the checkbox still get checked on click? What about the `checked` key? Play around with removing and adding attributes to our checkbox.*

### Selects (i.e. Dropdown Menus)

For select elements, we have to _control_ two things: the current value of the dropdown, and the function that updates it `onChange`.

Selects are a little tricky in that we _must_ use `<select>` and `<option>` together. The `value` attribute in `<option>` is what actually gets read, and the text inside the tag is what gets displayed to the user. It's important that there isn't a mismatch between these values unless we have a very, very good reason.

Alright, let's add a `select` input for the user's title (e.g. "Ms." or "Dr."). First, we need to add the property `userTitle` to the state. This will directly correspond to the `value` property of the `option` tag that's selected.

```js
this.state = {
  notARobot: false,
  userTitle: '',
};
```

Next, we add a function `handleSelectChange` that will update our state when the user selects a different option.

```jsx
handleSelectChange = (e) => {
  const { value } = e.target;
  this.setState({
    userTitle: value,
  });
}
```

Finally, we can add a `select` inside of our `render()` method:

```jsx
render() {
  const { notARobot, userTitle } = this.state;

  return (
    <form onSubmit={this.handleFormSubmit} className="form-container">
      <h2>User Information</h2>
      <input
        id="not-robot"
        type="checkbox"
        checked={notARobot}
        onChange={this.handleCheckboxChange}
      />
      <select value={userTitle} onChange={this.handleSelectChange}>
        <option value=''></option>
        <option value='mr'>Mr.</option>
        <option value='ms'>Ms.</option>
        <option value='mrs'>Mrs.</option>
        <option value='mx'>Mx.</option>
        <option value='dr'>Dr.</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
```

Remember, we always make sure we're doing two things when we set up controlled inputs: We make sure that the state updates when the input is changed, and we make sure that the value of the changed element reflects the state. Here, our `select` tag does those things with `onChange` and `value`, respectively.

### Text Inputs

Controlled text inputs work similarly to the other two. We need a `value` to keep in React state, and we need an `onChange` to change that value when the user types in the field. 

Let's add text inputs for the first name and the last name of the user. First, add two new parts of state to store that input data:

```jsx
this.state = {
  notARobot: false,
  userTitle: '',
  firstName: '',
  lastName: '',
};
```

Then, we add methods to handle the text in the input fields changing:

```jsx
handleFirstNameChange = (e) => {
  const { value } = e.target;
  this.setState({
    firstName: value,
  });
}

handleLastNameChange = (e) => {
  const { value } = e.target;
  this.setState({
    lastName: value,
  });
}
```

And add our inputs to the `render` method:

```jsx
render() {
  const { notARobot, userTitle, firstName, lastName } = this.state;

  return (
    <form onSubmit={this.handleFormSubmit} className="form-container">
      <h2>User Information</h2>
      <input
        id="not-robot"
        type="checkbox"
        checked={notARobot}
        onChange={this.handleCheckboxChange}
      />
      <select value={userTitle} onChange={this.handleSelectChange}>
        <option value=""></option>
        <option value="mr">Mr.</option>
        <option value="ms">Ms.</option>
        <option value="mrs">Mrs.</option>
        <option value="mx">Mx.</option>
        <option value="dr">Dr.</option>
      </select>
      <input
        type="text"
        name="firstName"
        value={firstName}
        placeholder="First Name"
        onChange={this.handleFirstNameChange}
      />
      <input
        type="text"
        name="lastName"
        value={lastName}
        placeholder="Last Name"
        onChange={this.handleLastNameChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

You might be thinking: Do we have to create a new function for each new input we create? Besides their names and the parts of state they interact with, these text inputs are functionally the same.

We can, actually, use the **same function** to handle both of these inputs, like so:

```js
handleTextChange = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  })
}
```

You'll notice that we added a `name` attribute to our text `input` tags in our JSX. These names correspond directly to the parts of state that we'd like to update with our input's `value`. Conveniently, both of these attributes exist on our event's `target` key. 

Using a special type of square-bracket syntax (`[name]: value`), we can set a variable as a key in an object. When a user, Damien, types their first name into the corresponding field, we pass the `name` of the field in-between the square brackets, and so doing comes up with something like this when `onChange` is called and the values are passed in:

```js
this.setState({
  firstName: "Damien"
})
```

This way, even though we don't reference the key directly, we make sure that the "First Name" field adjusts the `firstName` part of state, and so on.

### Handling submission

Since we've done everything in a controlled manner, we have all the values that we need in our component's state. All we have to do now is modify our `onSubmit` function to get these values from our state and do what we want with them.

When the `submit` button is pressed, `handleFormSubmit` is called, and calls `allFieldsValid` to make sure that all of our data is provided and the form can be submitted.

```jsx
allFieldsValid = () => {
  const { notARobot, userTitle, firstName, lastName } = this.state;
  return notARobot && userTitle && firstName && lastName;
}

handleFormSubmit = (event) => {
  event.preventDefault();
  if (this.allFieldsValid()) {
    alert("Form submitted!");
  } else {
    alert("Please fill out the form completely")
  }
}
```

Normally, `handleFormSubmit` is where we would send the form data to our server via an AJAX. For this example, however, we'll just validate that our data is truthy using the helper function `allFieldsValid`. If our data is valid, we pop up an alert to let them know the form has been successfully submitted.

We can also show the form data in the alert, just to demonstrate that we have access to all the data in the form:

```js
handleFormSubmit = (event) => {
  event.preventDefault();
  const { notARobot, userTitle, firstName, lastName } = this.state;

  if (this.allFieldsValid()) {
    alert(
      `Form submitted! \n ${notARobot} \n ${userTitle} \n ${firstName} ${lastName}`
    );
  } else {
    alert("Please fill out the form completely");
  }
};
```

## Summary & Poll Questions

**1. Where is the proper place to put .preventDefault()?**
* In the onClick handler function.
* In the onSubmit handler function.
* Inside useEffect().
* You shouldn't use .preventDefault() with React forms.

**2. How do we get the current state value from a checkbox?**

* `.value`
* `.checked`
* `.name`
* `event.target`
