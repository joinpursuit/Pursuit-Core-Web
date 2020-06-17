[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Forms in React

Using react to manage form state

## Learning Objectives

- Use the `form` tag in a React app
- Create an `input` and `select` and update state accordingly
- Understand the difference between controlled and uncontrolled components

## Standards

- TBD

## Prerequisites

- HTML forms & input tags
- React, state

---

## Framing & Background

Working with forms in react requires a little bit of extra effort. Because input fields have their own state, we have to decide how to handle that state in react. There are two main ways we can do this:

**Controlled Components**

This means _managing the form state in a react component_. In order to do this we have update the form state on change, and tie the value of the form field to the state itself, so that it updates visually when it changes.

**Uncontrolled Components**

This means _not managing the form state_ in a component. Not having react hold the state makes it simpler to implement, but we need a way to retrieve the values from the form. Usually we do this when the form submits, or we click a button.

## Lesson Outline

* Controlled components using forms
  * checkboxes
  * selects
  * inputs
  * etc
* Do all the same uncontrolled

## Code Example

Clone down this repo, open it in your code editor, and run `npm install`

[React forms exercise](https://github.com/joinpursuit/FSW-React-Forms-Exercise)

## Controlled components

Open up `UserInfoForm.js` and look at what's there.

Why should we use a `form` tag and use `onSubmit` instead of setting the `onClick` property of the submit button? The main reason is **accessibility**. 

Some users use a screen reader that translates the UI into audio. In order for this to work effectively, websites should be designed using **semantic HTML**. This means that your HTML tags should be as descriptive as possible to make it clear what their function is.

Also, this means that you can type into a form and hit `Enter` to submit it, which is a better user experience.

Note that we must call `event.preventDefault()` in our `handleFormSubmit` to avoid the page from being reloaded, which is the default behavior that browsers use when a form submits. 

With the structure of our form built, we can now include other opportunities for user input.

## 1. Checkboxes

The first input we'll add is a checkbox.  As the box is checked, we want to update our state. 

```jsx
import React, { useEffect, useState } from "react";

const handleFormSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted!");
}

const UserInfoForm = () => {

  const [notARobot, setRobot] = useState(false)
  
  const handleCheckboxChange = (e) => {
    setRobot(e.target.checked)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>User Information</h2>
      <input 
        id="not-robot" 
        type="checkbox" 
        checked={notARobot}
        onChange={handleCheckboxChange}
       />
      <label htmlFor="not-robot">I am not a robot</label>
    </form>
  )
}

export default UserInfoForm;
```

We need to _control_ two things here: the value of the checkbox (`true` or `false`), and the function that updates that value.

Here we are setting the `checked` property to either `true` or `false`. The state variable `notARobot` is what holds the value.

We bind the function `handleCheckboxChange` to the `onChange` event. When the checkbox gets clicked, this function gets the value (`e.target.checked`) from the checkbox and sets the state using `setRobot`.

Since the current state of the checkbox is stored in our `notARobot` variable, we are done.

## 2. Selects (dropdowns)

For select dropdowns, we have to _control_ two things: the current value of the dropdown, and the function that updates it `onChange`.

Selects are a little tricky in that we _must_ use `<select>` and `<option>` together. The `value` attribute in `<option>` is what actually gets read, and the text inside the tag is what gets displayed to the user. 

We now add a `select` for the title (e.g Ms. or Dr.). First, we need to add the property `title` to the state. This represents the `value` property of the `option` tag.

```js
const [title, setTitle] = useState('')
```

Next, we add a function `handleSelectChange` that will update our state when the user selects a different option.

```jsx
const handleSelectChange = (e) => {
  setTitle(e.target.value)
}
```

Finally, we can add a select inside of our `render()` method:

```jsx
return (
  <form onSubmit={handleFormSubmit}>
    <h2>User Information</h2>
    <input id="not-robot" type="checkbox" checked={notARobot} onChange={handleCheckboxChange}/>
    <label htmlFor="not-robot">I am not a robot</label>

    <div>
      <select value={title} onChange={handleSelectChange}>
        <option value=''></option>
        <option value='mr'>Mr.</option>
        <option value='ms'>Ms.</option>
        <option value='mrs'>Mrs.</option>
        <option value='mx'>Mx.</option>
        <option value='dr'>Dr.</option>
      </select>
    </div>

    <button type="submit">Submit</button>
  </form>
)
```

## 3. Text Inputs

Text inputs work similarly to the other two. We need a `value` to keep in react state, and to change that value when the user types in the field. 

We want now to add text inputs for the first name and the last name of the user. First, add two new hooks for first and last name:

```jsx
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
```

Then, we add methods to handle the text in the inputs changing:

```jsx
const handleFirstNameChange = (e) => {
  setFirstName(e.target.value)
}

const handleLastNameChange = (e) => {
  setLastName(e.target.value)
}
```

And add our inputs to the `render` method:

```jsx
return (
  <form onSubmit={handleFormSubmit}>
    <h2>User Information</h2>
    <input id="not-robot" type="checkbox" checked={notARobot} onChange={handleCheckboxChange}/>
    <label htmlFor="not-robot">I am not a robot</label>

    <div>
      <select value={title} onChange={handleSelectChange}>
        <option value=''></option>
        <option value='mr'>Mr.</option>
        <option value='ms'>Ms.</option>
        <option value='mrs'>Mrs.</option>
        <option value='mx'>Mx.</option>
        <option value='dr'>Dr.</option>
      </select>
    </div>

    <input
      value={firstName}
      placeholder="First Name"
      onChange={handleFirstNameChange}
    />
    <input
      value={lastName}
      placeholder="Last Name"
      onChange={handleLastNameChange}
    />

    <button type="submit">Submit</button>
  </form>
)
```

Do we really have to write a whole hook for every form field we want to update? That seems repetitive.

Luckily there are other options! We can write a [custom hook](https://serverless-stack.com/chapters/create-a-custom-react-hook-to-handle-form-fields.html). We can also store the state values in one hook and make our function [use dynamic key names](https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks) (see #2).

## 4. Handling submission

Since we've done everything in a `controlled` manner, we have all the values that we need in our component's state. So all we have to do is modify our `onSubmit` function to grab the variables.

When the submit button is pressed, `handleFormSubmit` is called, and reads from the state to ensure that the form can be submitted. In a future lesson, we'll see how to react to the state changing to ensure that the user isn't able submit the form until all fields are valid.

```jsx
const allFieldsValid = () => {
  return (
    notARobot &&
    title &&
    firstName &&
    lastName
  );
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  if(allFieldsValid()) {
    alert("Form submitted!");
  }
  else {
    alert("Please fill out the form completely")
  }
}
```

## Summary

Do a quick review at the end of the lesson to talk about what you covered.

### Resources

- [A link to relevant documentation](https://www.google.com/)
- Or another [free practice resource](https://www.google.com/)
- etc.