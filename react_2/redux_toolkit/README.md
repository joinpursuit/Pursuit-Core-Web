[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Redux Toolkit

A newer, more developer-friendly method of managing your state centrally!

### Learning Objectives

- Understand the advantages that redux toolkit offers over regular redux
- Practice integrating redux toolkit into a redux app

### Prerequisites

- React
- Redux concepts, like reducers, store, and actions

---

## Framing & Background

If you have a need to centrally manage state in your application, redux is an excellent tool. What redux-toolkit provides is still redux, but with several helpers that make managing your state less tedious. It's important to understand the core principles behind redux before redux-toolkit, otherwise you may not see any advantages to using it.

## Using rtk

Most of the benefits of redux toolkit come in the form of reduced boilerplate code. Meaning: we can now write less repetitive code to accomplish the same thing. This means the pattern in which we write code is changed slightly.

Let's look at some typical redux code. Right now, this is all one file (which is totally allowed!), but the convention is to split up our actions, action types, reducers, and store into 4 files.

```js
// action types
const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"

// actions
function increment() {
  return { type: INCREMENT }
}

function decrement() {
  return { type: DECREMENT }
}

// reducer
function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

// store, which takes a reducer as argument
const store = Redux.createStore(counter)

// dispatching actions on click
// imagine this happens in a react component
document.getElementById("increment").addEventListener("click", () => {
  store.dispatch(increment())
})
```

### the Store

In the above example, we create a store and pass a reducer in. That's all.

With RTK, we do something very similar:

```js
const store = configureStore({
  // counter is the variable that contains the reducer, from above
  reducer: counter,
})
```

So what's the big deal? There are two main differences:

- `configureStore` sets up the [redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) for us to use, which is extremely nice.
- It also adds some default [middleware](https://redux-toolkit.js.org/api/getDefaultMiddleware) like `thunk` and `logger`, which we would have to do manually otherwise.

But we don't get to see any of that happening, which can be a little confusing! There's also a way to [customize what middleware gets included](https://redux-toolkit.js.org/api/getDefaultMiddleware#customizing-the-included-middleware)

### Actions

The old way of writing actions was to write both the `action type` and the `action` by hand.
Now there's one simple way!

```js
let increment = createAction("INCREMENT")
console.log(increment)
// { type: "INCREMENT" }
```

This is great, but what happened to the action type? You can access the pure string value in one of two ways:

```js
console.log(increment.toString())
// "INCREMENT"

console.log(increment.type)
// "INCREMENT"
```

This is useful when you need to access the name of the action inside of a reducer.

### Reducers

A normal reducer is just a function with two parameters: state and an action type. It gets passed into the store to be called whenever an action gets dispatched.

The cool hip new way is to use `createReducer`. Instead of taking a state and type, it takes a state and an _object_. The key in each object is the action type, and the value is the function that returns the new state. This way you don't have to write a whole bunch of switch or if/else statements when your reducers get super long.

Additionally, we can use [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) in ES6. If you haven't seen this syntax before, it lets us put _variables_ as the key name, instead of literal values. This allows us write something like this:

```js
const counter = createReducer(0, {
  [increment.type]: (state) => state + 1,
  [decrement.type]: (state) => state - 1,
})

// or leave off .type because .toString() is called automatically on computed properties
const counter = createReducer(0, {
  [increment]: (state) => state + 1,
  [decrement]: (state) => state - 1,
})
```

This resolves to:

```js
// don't use this code, it's not what you want
const counter = createReducer(0, {
  INCREMENT: (state) => state + 1,
  DECREMENT: (state) => state - 1,
})
```

Isn't that so much easier than what we were doing before? With the whole long switch statement shenanigans?

```js
function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
```

### Slices

Since we love to save the best for last...

Slices are probably the most useful part of redux toolkit. A slice can be thought of as a piece of the store. Imagine the store is a whole pie (an object), but the slice is just one piece of it (a key/value pair). Associated with a slice are actions (what gets updated) and methods (a reducer!) to update that slice. This isn't specific to RTK - we've used slices before with `combineReducers()` in plain old redux.

So, when creating a slice, we will specify the reducer that goes along with it. Then we'll be able to automatically access the actions: they'll be generated for us based on the names we pass into the reducer object.

Let's just take a look!

```js
// create a slice
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
})

// then we can pass only the reducer into our store
// the reducer is part of the newly created object
const store = configureStore({
  reducer: counterSlice.reducer,
})

// pretend this is another file, where we increment on click
document.getElementById("increment").addEventListener("click", () => {
  // where did increment come from?
  store.dispatch(counterSlice.actions.increment())
})
```

This is a much more concise way of setting up our store and reducers. We do it all in one step. And the object that we get back (stored in a variable called `counterSlice`) has everything we need: the reducer and actions.

Here's what you can imagine the slice object structure looking like:

```js
let counterSlice = {
  actions: {
    increment : () => { return { type: 'increment' } },
    decrement : () => { return { type: 'decrement' } },
  },
  reducer: () => {},
}
```

<details>
  <summary>Where did the actions come from?</summary>

They get generated for us - whatever we declare in the reducer becomes an action automatically.

We can access them by doing `counterSlice.actions.actionName()`

</details>

<details>
  <summary>How do we acccess the actions?</summary>

We can access them by doing `counterSlice.actions.actionName()`

Or we can destructure them:

```js
const { increment, decrement } = counterSlice.actions
```

</details>

<details>
  <summary>How do we acccess the reducer?</summary>

Access the reducer by doing `counterSlice.reducer`. You'll generally use this to set up the store.

Or destructure it:

```js
const { reducer } = counterSlice
```

</details>


### Async actions

Async actions are still the same, all they do is dispatch a non-async action after a period of time. Here's an example of a standalone one that calls the regular increment action after 1 second:

```js
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload },
  },
});

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(counterSlice.actions.increment())
  }, 1000)
}
```

Because this is referencing another action thats originally declared in the slice, the best way is to write it outside of `createSlice()`.

### Hooks

The hooks that you're used to using inside components stay the same. This includes both `useSelector()` and `useDispatch()`.


### Pure reducer functions

- RTK uses a thing called immer that allows you to write impure functions

### intermediate

convert [redux todos](https://github.com/joinpursuit/FSW-Redux-Todos) into rtk

## Summary

Do a quick review at the end of the lesson to talk about what you covered.

### Resources

- [A link to relevant documentation](https://www.google.com/)
- Or another [free practice resource](https://www.google.com/)
- etc.
