# Redux Part One

## Objectives

- Explain what Redux is and what problem it solves
- Diagram the state flow of an application
- Examine & modify a counter app using Redux

## Resources

- [Redux - Official Site](https://redux.js.org/)
- [React Component Lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle)
- [Leveling Up With React: Redux - CSS Tricks](https://css-tricks.com/learning-react-redux/)
- [Question: How to choose between Redux's store and React's state? GitHub's Redux repo](https://github.com/reactjs/redux/issues/1287)


# Introduction

Redux is a library for managing application state. When used with React, Redux provides a single state object (commonly referred to as _the store_) that exists at the root of our app. This is especially useful when building large-scale React applications, as it prevents the problems of *prop drilling* and *state duplication*. It also allows the same state to be used by multiple components regardless of application architecture.

# A Birds-Eye View

When we start building React applications that feature multiple components, we inevitably run into issues regarding state and passing props down through many components. This makes seemingly-trivial changes, such as updating the name of a part of state, much more difficult, as we have to update it in each component that its being passed through - not just where it's being stored and where it's being used. To illustrate this problem, here's an example structure of an e-commerce app:

![prop drilling](./assets/prop_drilling.png)

You can see here how we need our state and props to flow through many levels of components.

Additionally, we often want the state of a component to be preserved throughout our app. Consider the following app:

## Show / Hide Animal Selector

[Example with hooks](https://codesandbox.io/s/mounting-unmounting-with-hooks-m4kd5)

Take a look at the `App` component's render method. It renders a button that toggles whether the `AnimalSelector` component is displayed or not. Clicking the button sets the state to either show or hide it. This state is stored locally in the `App` component.

Now look at `AnimalSelector`. It has its own state, separate from `App`. This state just decides whether to show one of two strings: "giraffe" or "moose". The it also has a button that toggles between them. Note that the default state is `"giraffe"`.

Click the `change animal` button to switch to `"moose"`. Then hide the component. Then show it again. See how the state has reset? It's back to `"giraffe"`!

Let's run that back for a second - **when a component is unmounted, its internal state is forgotten.** If we go to a new route, or if, for any reason, our component isn't included in our app's final render, that component's state is lost. This is why having a centralized state can be really useful.

In this app, if we wanted to keep the value of the selected animal, we could do that by moving the `selectedAnimal` property to the `App` component's state, then make `AnimalSelector` a stateless component that receives a callback function from `App` to change the animal.

> Exercise: Rewrite the app so that the selected animal value will be in the state of `App`.

## A larger example

The solution outlined above works well for smaller apps, but this can get quite difficult to do for larger-scale apps that have components rendering other components. We pass props to a child component, and they pass those same props to grandchildren, and great-grandchildren, and so on. It's like making a chain - if you miss a single link, the whole thing falls apart.

### Dog Pictures

[Example with Hooks](https://codesandbox.io/s/react-router-dog-breeds-l22kx)

This is another app which fetches random dog pictures. It includes a few different routes. It has a homepage, a route that lists all breeds, a route that fetches a random dog picture, and a route that fetches a random dog picture of a specific breed. This dog picture app can be represented using the following diagram:

![dog pictures](assets/react_dogs.png?raw=true)

There is an arrow from each component to the component that it renders. Props are represented along the arrows. Each component that communicates with the dog API has a cloud next to it.

Let's say we want to add a _favorites_ feature to this app. A user can select a breed and add that breed to their favorites for easy access. The `Dogs` component seems like a good candidate to hold this array of favorite breeds. Let's walk through what that might look like:

If `Dogs` held the favorites in state (an array of strings matching dog breeds):

* `Dogs` would need to pass a callback that modifies the array in `Dogs` down to `RandomDog` and `DogBreeds`.
  * These components could in turn pass it to the `Dog` component.
* Once the route changes (back to `/` to render `Home`) then the `Dogs` component is unmounted and our state, along with all our favorites, is lost.

What if we moved our favorites up to `App` instead? well, we'd still have to pass callbacks down everywhere to modify that state, and pass the state down through multiple components where it's needed. In other words, we'd have to drill props.

## Centralizing State

Redux helps us fix the above problems. With Redux, we can keep state in a `store` at the root of our app. The following is a possible diagram for the dogs app with react and redux:

![React Redux dogs](assets/react_redux_dogs.png?raw=true)

Note that while the store is at the root of our app, we can think of it as communicating directly with certain components - no matter where those components might be in our app's architecture. These components - `RandomDog` and `DogBreeds` - communicate with the store directly using _actions_. 

Actions are JavaScript objects that describe how, specifically, we want to update the state. Think of them sort of like RESTful routes - we know what a GET request to `/users` means even if we aren't looking at the code we set up for that request.

An action looks like this:

```js
{ type: "SET_IMAGE_URL", optionalDataValueOfSomeKind }
```

The `"SET_IMAGE_URL"` action from `RandomDog` also contains a string with the image URL we'd like to render, and the `"SET_DOG_BREEDS"` action from `DogBreeds` also contains an array with the dog breeds we'd like the user to select from. The store will use the action type to determine what needs to be changed. Once a change is made, the app will be re-rendered from the root `App` component all the way down. We say that an action is _dispatched_ when it is sent from a component to the store.

Adding a _favorites_ functionality to the Redux app may involve adding a `favorites` property to the store, and possibly two actions: `"ADD_TO_FAVORITES"` and `"REMOVE_FROM_FAVORITES"`. 

Once the action is received by the store, it gets ingested by what's called a **reducer**. A reducer is a function that updates the store.

So we have three new concepts in Redux: `actions`, `reducers`, and the `store`. Dispatching an action is similar to calling `setState()`. The function that updates the state is the `reducer`. And the `store` is the state object itself, that lives separately from any components.

Redux does not force us to put _all_ of our state in the store. For example, if a component has a search bar that we don't need available globally, we can keep the search input in the state of that component. This is a common pattern for form inputs. It is up to us to decide how much of the state we want to put in the global store. There is a great discussion on this point in the [Redux GitHub repo](https://github.com/reactjs/redux/issues/1287).

Now, let's see all these concepts in action!

# Building a Counter App with Redux

Having looked at Redux from a birds-eye view, we will now start learning how to use it. Redux is most beneficial for larger projects where there are many different components, but we'll start small to understand the fundamentals and patterns.

## A Working Example

[Redux-Counter](https://github.com/joinpursuit/FSW-Redux-Counter)

Clone down the repo, `cd` to the cloned directory, run `npm install`, then `npm start` to launch it.

This is a basic counter app. This `src/` folder of the app has the following structure:

- actions/
  - actionTypes.js
  - counterActions.js
- components/
  - Counter.js
- containers/
  - CounterContainer.js
- reducers/
  - count.js
  - index.js
- index.js

### Component Structure

To set up the store to work with React, we wrap our `App` component with a `<Provider>` at the top level of the app.

The `App` component renders the `CounterContainer`.

`CounterContainer` is the component that actively connects to the Redux store and dispatches actions to it. It renders the `Counter` component, which is a functional (stateless) component.

`CounterContainer` communicates directly with the store using two hooks - `useDispatch()` and `useSelector()`.

These two hooks are critical! `useDispatch` is how we fire actions - think of it as similar to `setState()`. And `useSelector()` is how we retrieve the state values we want from the store.

### Redux Terminology 

`actions`, `containers`, and `reducers` are terms from the React/Redux world. You'll also see `createStore` inside of our root-level `index.js` file. Let's get into all of these concepts.

**Store** is the most important part of our Redux app. The store is the centralized state that all of our components have access to. We wrap our `App` component, inside of `index.js`, with a class `Provider` from the library `react-redux` and we pass our store as a prop. `Provider`, for the most part, does what it says - it *provides* our React app with a centralized state from Redux.

**Actions** are how we tell the store to update. You'll notice we have two files in our `actions/` folder. Action types tell Redux which `reducer` they're going to run - think of how RESTful actions work. For example, POST `/user` adds a new user to the database. Here, if we wanted to add a user to our `users` part of state in our Redux store, we'd create an action with the string `ADD_NEW_USER`. 

`actionTypes` is a very small file, and its use may not be initially apparent. Essentially, it's so we *always* apply consistent actions to our store. This is just a good convention to follow, since we use these types in multiple files, we can import them as variables instead of risking typos by just re-typing strings everywhere.

"Wait," you might ask. "If the reducer is the function that actually updates the store, why do we need actions? Why can't we just call the reducers directly?" Well, we could, but that's not what Redux is for. You see, Redux is made to handle **large production apps** maintained by **large teams**. Actions are a way we can protect our store from weird manipulation that may break the functionality of our app. Actions clearly define how, and what part, of our state we want to update. That's why we're so particular about strongly typing them.

```js
// actionTypes.js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
```

In the above example, if a developer accidentally referred to our `DECREMENT` action as `DEACREEMENT`, JavaScript would immediately correct them with a reference error. Not so if they passed in the `"DEACREEMENT"` string directly to the reducer!

`counterActions` process the action type with an optional payload (not provided here, because we're just adding one to the current value). We utilize `useDispatch` in our React components to pass these actions and corresponding payloads into our reducers and update our global state.

```js
// counterActions.js
import { INCREMENT, DECREMENT } from "./actionTypes";

export const incrementCount = () => {
  return { type: INCREMENT };
};

export const decrementCount = () => {
  return { type: DECREMENT };
};
```

**Reducers**, then, process actions, assemble a new state based on what the actions tell them to do, and send that new state to the store. They are the middlemen between our actions and our store.

To keep ourselves organized, we can have multiple reducers representing different parts of our global state. Currently, there is only one, called `count`. Looking inside `count.js`, we will see a single function being exported:

```js
// count.js
export default (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};
```

This function is a reducer. It takes two parameters - the initial value of `count` (`0`) and the action object. 

Since the whole reducer function is called every time `useDispatch()` is called, we have to make sure that we only run a single action - this is why we use a switch statement and switch on the action type.

> Reducers must be `pure functions` meaning they don't mutate any values. See [Redux three principles](https://redux.js.org/introduction/three-principles/)

The other file in the `reducers/` folder, `index.js`, imports all the reducers (currently just `count`) and exports them as a single object using a function provided by Redux: `combineReducers`. The properties of this object correspond to the names of the reducers. This object will define the shape of our store. So, in our case, the store will initially look like this:

```js
{
  count: 0;
}
```

This object will be the global state in our store. When an action is dispatched, a new state will be generated. For example:

```js
// initial store state
{ count: 0 }

// action gets fired
{ type: "INCREMENT" }

// reducer processes and returns a new state
case INCREMENT:
  return state + 1;

// new store state
{ count: 1 }
```

The combined reducers are imported in `index.js` as `reducer` and used to create the Redux store with the provided `createStore` function. 

## Adding more components

Now that we have an overview, let's add something to our app.

We want to add another input that lets us set the state to any number that we type in. What's required for us to do that?

<details>
<summary>Answer</summary>
* Add a new component with an input field
  * Connect that input field using onChange to the store
  * Connect that input field's internal state to the store
* Add a reducer that sets the state value to whatever is typed into the field
* Add an action type
* Add a counterAction function
* Dispatch that action whenever the input field changes
</details>

<br />

## Add a new input field

Try it yourself! Add a text input field that is rendered by `CounterContainer`. The text input field should change the `count` part of state whenever you type into it. It should also respond to the same buttons that our original count corresponded to, so clicking on + or - should increment or decrement the number in the field by 1.

If you get extremely stuck, check out the solution branch on the example repo.
