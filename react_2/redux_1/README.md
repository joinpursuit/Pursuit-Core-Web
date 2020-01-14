# Redux Part One

## Objectives

- Explain what Redux is and what problem it solves
- Diagram the state of an application
- Build a counter app using Redux

## Resources

- [Redux - Official Site](https://redux.js.org/)
- [React Component Lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle)-
- [Leveling Up With React: Redux - CSS Tricks](https://css-tricks.com/learning-react-redux/)
- [Question: How to choose between Redux's store and React's state? github redux repo](https://github.com/reactjs/redux/issues/1287)


# 1. Introduction

Redux is a library for managing application state. When used with React, Redux provides a single state object (commonly referred to as _the store_) that exists at the root of our app. This is especially useful when building large-scale React applications, as it prevents the problems of *prop drilling* and *state duplication*.

## A Birds-Eye View

When we start building React applications that feature multiple components, we inevitably run into issues regarding state and prop drilling. We often want the state of a component to be preserved throughout our app. However, this will not always be the case. Consider the following app:

## [Show / Hide Animal Selector](https://codesandbox.io/s/py858r28j0)

The `App` component conditionally renders a nested component `AnimalSelector`. The animal selector will display either "giraffe" or "moose" - we click on the `change animal` button to switch between the two. `AnimalSelector` stores the selected animal in its own state as `selectedAnimal`, with "giraffe" being the default value.

The `App` component renders a button that toggles the animal selector. This is done by changing the value `showAnimalSelector` in the state of the `App` component. The `AnimalSelector` component will only be rendered if the value of `showAnimalSelector` is `true`. When `App` stops rendering `AnimalSelector`, the latter will be unmounted - the instance of that component will be discarded, and its internal state will be forgotten. So, when `App` renders `AnimalSelector` again, it will display "giraffe", regardless of the value that was being displayed before.

Let's run that back for a second - **when a component is unmounted, its internal state is forgotten.** If we go to a new route, or if, for any reason, our component isn't included in our app's final render, that component's state is lost. That's why state management is so important.

In this simple app, if we wanted to keep the value of the selected animal, we could do that by putting the `selectedAnimal` property inside the state of the `App` component, and make `AnimalSelector` a stateless component that receives a callback function from `App` to change the animal.

> Exercise: Rewrite the app so that the selected animal value will be in the state of `App`.

# 2. Adding Redux to Manage State

The solution outlined above works well for smaller apps, but this can get quite difficult to do for larger-scale apps that have components rendering other components. We pass props to a child component, and they pass those same props to grandchildren, and great-grandchildren, and so on. It's like making a chain - if you miss a single link, the whole thing falls apart.

### [Dog Pictures](https://codesandbox.io/s/8z91lzo50)

This dog picture app can be represented using the following diagram:

![dog pictures](assets/react_dogs.png?raw=true)

There is an arrow from each component to a component that is renders. Props are represented along the arrows. Each component that communicates with the dog API has a cloud next to it.

If we want to add a _favorites_ feature to the dog picture app, things can get tricky. The `Dogs` component seems like a good candidate to hold the array of favorite dogs, but this means it will need to pass a callback to `RandomDog` (and `RandomDogWithBreed`), and these components could in turn pass it to the `Dog` component. Another problem is that if the `App` component can render something that follows a different route than `/dogs/...`, the favorites will be forgotten - `App` will no longer be rendering the `Dogs` component, so this component will be unmounted.

### Centralized State

Redux helps us fix the above problems. With Redux, we can keep state in a `store` at the root of our app. The following is a possible diagram for the dogs app with react and redux:

![react redux dogs](assets/react_redux_dogs.png?raw=true)

Note that while the store is at the root of our app, we can think of it as communicating directly with certain components. These components - `RandomDog` and `DogBreeds` - communicate with the store using _actions_. Actions are JavaScript objects that describe how, specifically, we want to update the state. Think of them sort of like RESTful routes - we know what a GET request to `/users` means even if we aren't looking at the code we set up for that request.

The `"SET_IMAGE_URL"` action from `RandomDog` also contains a string with the image URL we'd like to render, and the `"SET_DOG_BREEDS"` action from `DogBreeds` also contains an array with the dog breeds we'd like the user to select from. The store will use the action type to determine what needs to be changed. Once a change is made, the app will be re-rendered from the root `App` component all the way down. We say that an action is _dispatched_ when it is send from a component to the store.

Adding a _favorites_ functionality to the redux app may involve adding a `favorites` property to the store, and possibly two actions: `"ADD_TWO_FAVORITES"` and `"REMOVE_FROM_FAVORITES"`. We will discuss the implementation details in further lectures.

Redux does not force us to put _all_ of our state in the store. For example, if a component has a search bar that we don't need available globally, we can keep the search input in the state of that component. This is a common pattern for form inputs. It is up to us to decide how much of the state we want to put in the global store. There is a great discussion on this point in the [redux github repo](https://github.com/reactjs/redux/issues/1287).

# 3. Building a counter app with Redux

Having looked at redux from a birds-eye view, we will now start learning how to use Redux. While the benefits discussed above will not be apparent in the small examples discussed today, these will lay the foundations for more complex use-cases of Redux.

### [Redux-Counter](https://codesandbox.io/s/2lkk7484y)

We start with the traditional counter app. This `src/` folder of the app has the following structure:

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

`actions`, `containers`, and `reducers` are terms from the react/redux world. You'll also see `createStore` inside of our root-level `index.js` file. Let's get into all of these concepts.

**Store** is the most important part of our Redux app. The store is the centralized state that all of our components have access to. We wrap our `App` component, inside of `index.js`, with a class `Provider` from the library `react-redux` and we pass our store as a prop. `Provider`, for the most part, does what it says - it *provides* our React app with a centralized state from Redux.

**Actions** are how we tell the store to update. You'll notice we have two files in our `actions/` folder. Action types tell Redux how it's going to process the information we give - think RESTful routes again. POST `/user` means we want to add a new user to our Express apps. If we wanted to add a user to our `users` part of state in our Redux store, we'd fire an action with the string `ADD_NEW_USER`.  `actionTypes` is a very small file, and its use may not be initially apparent. Basically, it's so we *always* apply consistent actions to our store. We never let typos get in our way, because we aren't manually re-writing our action string every time.

`counterActions` processes the action type with an optional payload (not provided here, because we're just incrementing, but this is where we'd put the user object if we wanted to add a new one). We utilize another Redux function, `dispatch`, in our React components to pass these actions into our reducers and update our global state.

**Reducers**, then, process actions, assemble a new state based on what the actions tell them to do, and send that new state to the store. They are the middleman between our actions and our store. Remember in previous assignments when we copied the state, assembled a new one, and only *then* passed it into setState? Reducers are where we do that stuff.

To keep ourselves organized, we can have multiple reducers representing different parts of our global state. Currently, there is only one, called `count`. Looking inside `count.js`, we will see a single function being exported:

```js
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

This function is a reducer. It describes the initial value of `count` (`0`) and how it will change when an action is dispatched to the store, based on the action type. Each reducer exists in isolation and describes its own state. In the world of count, the state is just a number. This number is incremented by one on an `INCREMENT` type action, and decremented by one on a `DECREMENT` type action (both imported from our `actionTypes` file). Actions of any other type (if there are any) will result in returning the current state unchanged.

The other file in the `reducers/` folder, `index.js`, imports all the reducers (currently just `count`) and exports them as a single object using a function provided by redux: `combineReducers`. The properties of the object correspond to the names of the reducers. So, in our case, the object will initially look like this:

```js
{
  count: 0;
}
```

This object will be the global state in our store. When an action is dispatched, a new state will be generated. For example:

```text
// store state
{ count: 0 }
// action:
{ type: "INCREMENT" }
// new store state
{ count: 1 }
```

The combined reducers are imported in `index.js` as `reducer` and used to create the redux store with the provided `createStore` function. To set up the store to work with React, we set `<Provider>` at the the root of the app in `ReactDom.render`, taking the initial `App` component as a child. The `App` component renders the `CounterContainer`, imported from `containers/CounterContainer.js`. `CounterContainer` is the component that actively connects to the redux store and dispatches actions to it. It receives as props from the store both a `dispatch` function and the `count`. It renders the `Counter` component from `components/Counter`, which is a simple functional component. To connect `CounterContainer` to the store, we use the `connect` method provided by the `react-redux` library. The use of this method will look strange. In practice it is used differently. We will discuss this in more detail in later lessons.
