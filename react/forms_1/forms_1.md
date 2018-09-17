# React Forms 1: Text and Select Inputs

## Terms
* Event object
* Event target and value

## Introduction

So, we've learned how to handle events in React. However, the only event that we can currently handle is when a user clicks a part of the page. This is OK, but real websites are full of forms for the user to enter information. Today, we're going to explore two different input types and how to handle these in React.

The main difference between clicking and updating a form, we'll learn, is as follows: **While clicking an element is simple (e.g. did you click or not?), forms and their corresponding inputs contain different values and options that much each be handled in different ways.**

Each of these sections is going to start with a quick review of what the specific input is, what it's for, and how it behaves, in case you've forgotten from your HTML learnings.

## Text Inputs

You know this just by using the Internet: Text input is one of the most common input types. Luckily, React has a great way to handle text input in the state. Let's see it in action:

## [Greeter App](https://codesandbox.io/s/jpzkqkm1oy)

This is an app where a user can input their name. When they input text, the component greets them with the name they entered.

Let's take a look at `greeter.js`, the only file in this app that contains stuff we haven't seen before:

```js
constructor() {
  super();
  this.state = {
    name: ""
  };
}
```

Of course, we start by defining a constructor with a part of state, `name`, that we are going to use to store the user's input. We instantiate this part of state with an empty string, which, if you'll recall, JavaScript treats **as falsey**. This will be important later.

```js
handleInputChange = e => {
  this.setState({
    name: e.target.value
  });
};
```

So, our `handleInputChange` function looks pretty similar to the `handleClick` function from our counter app, with one big exception - it utilizes an argument, `e`, which stands for "event". The event object is something that React makes available to us whenever we include an input. When we key into it, (for example, using `e.target.value`, referring to the *value* of the *target* input the user is selecting), we can get information from the form. In this case, `handleInputChange` fires whenever the user types a character into the form, accessing whatever's in the text input by keying into `e.target.value` and updating the state accordingly.

You might think that this function firing whenever a user types anything might be inefficient, but, again, React is very fast.

The `render` function is especially interesting here. Let's take a look:

```js
render() {
  const { name } = this.state;

  if (name) {
    return (
      <div>
        <p>
          Your Name: <input onChange={this.handleInputChange} />
        </p>
        <p>Hello {name}!</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          Your Name: <input onChange={this.handleInputChange} />
        </p>
      </div>
    );
  }
}
```

So, it starts simply enough - we use object deconstruction to key into the `name` part of state, so we don't have to use `this.state.name` everywhere. After that, things get interesting. You can see that we are using a conditional to render **two different versions** of this component.

Our conditional (`if (name)`) depends on whether we have a **truthy value** for our `name` part of state. Remember when we reviewed earlier that an empty string ("") was a *falsey* value? Therefore, if the text input contains nothing, our `name` part of state is falsey, and the `if (name)` logic sends us to the `else` condition. This is because we don't want our app to greet the user until they have input something as their name.

However, as soon as our user inputs anything, our string contains a value, and becomes truthy. `else` no longer is called, and instead our component returns the JSX found in the first `return`, which includes a greeting (`hello {name}!`).

As usual, use `console.log` to test this theory. Putting a `console.log` before the `return` values in our if-else logic really makes this cycle clear. Like so:

```js
if (name) {

  console.log("We've got a name!")

  return (
    <div>
      <p>
        Your Name: <input value={name} onInput={this.handleInputChange} />
      </p>
      <p>Hello {name}!</p>
    </div>
  );
} else {

  console.log("Not yet!")

  return (
    <div>
      <p>
        Your Name: <input value={name} onInput={this.handleInputChange} />
      </p>
    </div>
  );
}
```

So, let's review what this thing does when the user visits the site and types in the input:

* First, the `else` return value is returned. "Not yet!" is logged to the console, and our input renders, with its value connected to the `name` part of state. The user clicks on the input and enters a character, which triggers...
* `handleInputChange` runs, and the state is updated with the character the user typed. `render` is called again, and now that the `name` part of state is truthy, `else` is not reached, and the return value in the initial `if` is returned.
* "We've got a name!" logs to the console and the text area is re-rendered with the new value representing what the user typed.

Try this yourself and check out the console. We've made our first stateful React form!

Of course, text isn't our only input type...

## Select Inputs

On the face of it, select inputs work similarly to text inputs. Instead of accepting any text value, they only accept specific options that we outline, but otherwise, the idea is the same: The user clicks on an option, and we update the state to reflect that option.

Let's look at an example of this in action:

## [Ice Cream App](https://codesandbox.io/s/0omxoj1pll)

This app is, again, pretty simple: It asks the user if they like ice cream. If they answer "yes", it writes the message "Great!", and if they answer "no", it tells the user to "Go home" - because how can you not like ice cream??

Again, the `iceCream.js` component is the most interesting part of this app. Let's take a look:

```js
constructor() {
  super();

  this.state = {
    likesIceCream: ""
  };
}
```

It's worth noting in the constructor that, even though we are technically using a different input type, we are still storing our user's response (`likesIceCream`) as a string.

The next function, `handleLikesIceCream`, is basically identical to `handleInputChange` from our previous example:

```js
handleLikesIceCream = e => {
  this.setState({
    likesIceCream: e.target.value
  });
};
```

We are still using the event object, specifically `e.target.value`, to set the state with the user's choice. Again, `render` is our most interesting function here:

```js
render() {
  const { likesIceCream } = this.state;
  let message = "";

  if (likesIceCream === "yes") {
    message = "Great!";
  } else if (likesIceCream === "no") {
    message = "Go home.";
  }

  return (
    <div>
      <div>
        Do you like ice cream?
        <select value={likesIceCream} onChange={this.handleLikesIceCream}>
          <option value="" />
          <option value="yes">Yes!</option>
          <option value="no">Nope</option>
        </select>
      </div>
      <div>{message}</div>
    </div>
  );
}
```

Okay, so let's break this down. We're creating a variable, `message`, that changes depends on our state - that is, on whether or not the user likes ice cream. By default, it's an empty string, because we don't want the message to render if the user hasn't picked anything. It changes when the state is updated and render is called again. In our `return` section, we add the message to the bottom of our app using curly braces.

It's important to note that **this solves the same problem as the if-else render logic in the text input example** - we don't want our message to render if the user hasn't interacted with the input. You'll see, however, that we don't have if-else logic around our `return` value. Instead, we trust that nothing will render if `message` is an empty string, and we add it to our return value either way.

*Discussion question: What's the difference between these two methods? Can you identify potential problems with either approach?*

Let's take a look at the form. It should look pretty familiar from our study of forms in the DOM. However, we've adjusted a couple things:

* We've changed the `select` tag to make the selected `value` of our input dependent on the state. We've also added our old friend `onChange` so that the state will update when the user makes a selection.
* We've included `value` tags to each of our three options. The first one is blank, and is the default selection, because our state starts as an empty string. The other two will re-render with a message.

Perhaps more than any component we've seen thus far, this illustrates what happens when `setState` is called. `render` doesn't just put together the JSX and return - when the state is updated, the entire `render` function re-runs. The variables (in this case, `message`) are re-instantiated and updated to reflect the new state, and then (and only then!) does the JSX return and the component display for the user.

Again, however, this happens very fast. React is awesome.

Tune in next time for our other two input types - checkboxes and radio buttons!

*Challenge: Combine these two components to personalize an ice cream message with the user's name!*
