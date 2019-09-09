# React Forms 2: Checkbox and Radio Inputs

## Introduction

Thus far, we've learned how to use React and React's `state` object to handle two kinds of user input: Text and select. Now, we're going to learn how to handle user input with radio buttons and checkboxes.

### A Quick Reminder

Before we get started, it's worth mentioning that **you aren't going to memorize the syntax for all of this stuff right away**. We're throwing a lot of new stuff at you, and we are not expecting you to be React forms experts quite yet. We'd like you to focus on the concepts first and the syntax second. How are these components working? What functions run when? When you understand that stuff better, the syntax will come. Don't get frustrated and think that you don't "get it" if you don't memorize it right away.

## Radio Buttons

Radio buttons pretty much fulfill the same function as select boxes, but have the added bonus of each option being visible to the user without them having to expand the select area. You've probably seen this in forms that ask you (for example) your legal marriage status, or a true/false question - questions that don't have too many options to display at once.

Their syntax, however, is quite different, and has to be pretty precisely put together - especially if you're handling them in conjunction with React state management. Let's take a look:

## [Preferred Animal App](https://codesandbox.io/s/j7rjj8ym09)

This app allows the user to select their preferred animal out of a short list: Cats, dogs, or giraffes. It then displays that selection to the user, saying "You selected <whatever>" underneath the form.

Let's take a look at our `prefAnimal.js` file. Our constructor function is pretty standard, so we're going to skip that and move directly to the `handleRadioChange` function:

```js
handleRadioChange = e => {
  // using es6 computed property name
  this.setState({
    [e.target.name]: e.target.value
  });
};
```

We are doing something pretty slick here. If we have multiple radio elements to our form (say, for example, we also had options for a user's preferred ice cream), we could handle each one with its own function - say, `handlePrefAnimalChange` and `handlePrefIceCreamChange`. However, using ES6 syntax and another property of our `e.target` event object, we can make one function that handles **any radio inputs** we might have. We do this by setting up our radio buttons with very specific `name` and `value` attributes. `name`, in this case, refers both to which radio input group it belongs to **and** which part of the state it's updating, whereas `value` refers to which option the user is selecting.

In order to understand more clearly how this syntax corresponds to the radio inputs themselves, let's take a look at our `render` function:

```js
render() {
  const { prefAnimal } = this.state;

  return (
    <div>
      <p> Do you prefer cats, dogs or giraffes? </p>
      <div>
        Cats
        <input
          type="radio"
          name="prefAnimal"
          value="cats"
          checked={prefAnimal === "cats"}
          onChange={this.handleRadioChange}
        />
      </div>
      <div>
        Dogs
        <input
          type="radio"
          name="prefAnimal"
          value="dogs"
          checked={prefAnimal === "dogs"}
          onChange={this.handleRadioChange}
        />
      </div>
      <div>
        Giraffes
        <input
          type="radio"
          name="prefAnimal"
          value="giraffes"
          checked={prefAnimal === "giraffes"}
          onChange={this.handleRadioChange}
        />
      </div>
      <br />
      {prefAnimal ? "You selected " + prefAnimal : ""}
    </div>
  );
}
```

Rather than wrapping our radio buttons in a containing element, you can see that our radio buttons are labeled as such by defining their `type` attribute as "radio" in a tag. We group them using `name` - all of these inputs are named "prefAnimal" to indicate that they're in the same group. This is important because, unlike checkboxes, users can't select multiple radio buttons at a time. Giving them the same `name` attribute prevents the user from doing so.

Then, we apply three more tags:
* `value`, which corresponds to the actual event value we'd like to use to update the state
* `checked`, which corresponds to whether the specific radio option is checked, in which we use logic operators to be either `true` or `false` depending on the value of `prefAnimal` in the state
* and `onChange`, which is important to make the form actually do something when the user clicks.

Finally, we utilize the ternary operator (`?`) to either display a message ("You selected giraffes") or nothing, depending on whether the user has selected an option in the form.

This might seem like a lot of tags, but as we've outlined above, **each and every one of them has a purpose**, and all of them are essential to include for this form to work properly.

## Checkboxes

Checkboxes are like radio buttons' more flexible siblings. Whereas radio buttons present the user with options and ask that they select just one, checkboxes can be selected and de-selected without limit. Think about pizza toppings - some people like a lot of toppings on their pizza, and checkboxes allow them to select each and every one their hearts desire. Radio buttons might be appropriate for some one-topping deal coupon.

Because checkboxes are fairly similar syntactically to radio buttons, we won't go too deep here. However, we've made a simple app that shows off how a checkbox form might work.

## [Not A Robot App](https://codesandbox.io/s/m9z7rmjlkj)

This app, very simply, asks the user to check a box to confirm they are not a robot. When they check the box, they see a button that would allow them to "Proceed", if this was a bigger app. As it stands, it isn't, so the button doesn't really do anything. The important thing is the checkbox.

We won't look at our constructor function here, but observe that we're instantiating a part of state called `notARobot`. Let's take a look at our `handleCheckBoxChange` function, which looks pretty darn similar to our `handleRadioChange` function from earlier:

```js
handleCheckboxChange = e => {
    // Using es6 computed property name
    this.setState({
      [e.target.name]: e.target.checked
    });
  };
```

Once again, we're using slick ES6 computed properties to assign a new value (`checked`, which can be true or false) to any given key. Like our `handleRadioChange` function, this can be applied to any checkbox input in our component.

Let's see it in action:

```js
render() {
  const { notARobot } = this.state;

  return (
    <div>
      <p>
        I am not a robot{" "}
        <input
          name="notARobot"
          type="checkbox"
          checked={notARobot}
          onChange={this.handleCheckboxChange}
        />
      </p>
      <p>{notARobot ? <button>proceed</button> : ""}</p>
    </div>
  );
}
```

Just like radio buttons, you can see that our `name` attribute in our checkbox input corresponds to the part of state that we'd like to update in `handleCheckBoxChange`. The difference here is that checkboxes don't contain a `value` - in fact, the closest approximation to a `value` they have is whether or not they're `checked`.

This is important in that the way that these two input types behave translates directly to how we implement them in React. Because checkboxes contain their human-readable label in their name, we store that as the key in the state. Because whether the checkbox is checked or not is how these questions are answered and processed, we store that as a boolean in the value.

Radio buttons, on the other hand, don't care so much *whether* the buttons are checked. Rather, they're concerned with *which* buttons are checked for a category. For example, `true` is not a valid answer for which animal you prefer. Instead of storing *whether* the user checked something, we wanna know *what* was checked - so, the button where `checked`  is `true` has its `value` attribute stored in state.

Tune in next time to see us pull all of this together!
