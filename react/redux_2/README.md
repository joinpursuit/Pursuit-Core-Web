# Posts App with Redux and React

In this lesson we will be building a more complex Redux app with React using the JSON Placeholder API for seed data. See the [redux-posts repo](https://github.com/joinpursuit/redux-posts-solution) to view the full implementation described in this lesson.

## Objectives

- Demonstrate Pure function implementation best practices when working with arrays and objects
- Learn how [`spread, concat, slice, and map`](https://egghead.io/lessons/react-redux-avoiding-array-mutations-with-concat-slice-and-spread) allow us to reassign object key values without mutating state

## JSON Placeholder API App Introduction

Our primary goal in building the Posts app is to demonstrate the utility of Redux in large scale applications. Using the JSON Placeholder API, we'll build the basic infrastructure for an app that renders a list of posts and allows users to add new posts via a form.

### User Stories

A user can:

- Navigate between "Home" and "Posts".
- Navigate to the `/posts` route, and see all the post titles from the JSON Placeholder API
- Add a new post at the bottom of the Posts list
- Click a 'add a new post' link and be redirected to `/posts/new`
- See a rendered form at the `/posts/new` route with an input for 'title'
- Click a `Submit` button in the form at `/posts/new` to add a new post and clear the form
- Navigate to `/posts` and see the new post at the end of the list

## Getting Started

```
Clone this repo
`npm install`
`npm start`
```

# App Architecture

To see how we accomplish this, let's take a look at our app's architecture. The other folders include our standard Create React App utilities. We're interested in the `src/` folder's structure, which is as follows:

- `actions/`
  - `actionTypes.js`
  - `postActions.js`
- `components/`
  - `App.js`
  - `Form.js`
  - `Navbar.js`
  - `Posts.js`
- `reducers/`
  - `rootReducer.js`
  - `postsReducer.js`
- `store/`
  - `index.js`
- `index.js`

## `store/` and `index.js`

While we could create our store inside of `index.js`, it's nicer to create it in advance and import it - it looks nice, especially because now we're wrapping our `App` with `BrowserRouter` _and_ `Provider`. It also future-proofs our app as it gets more complex - we don't want a bloated `index` file that obscures how our app initializes. Inside of our `store` index file, you can see us importing the root reducer, creating a store, and then immediately exporting:

```js
import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { devToolsEnhancer } from "redux-devtools-extension";

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
```

Not _too_ bad, eh?

But where does our reducer come from?

## `reducers/`

While we are still only using one reducer, `postsReducer`, we thought it'd be good for us to start this app off the proper way. `rootReducer` inside this folder imports `postsReducer` and then uses `combineReducers` - meaning, if we wanted to, we could import more than one reducer and combine them all into one big state for our store.

Let's take a look at our `postsReducer` for a moment:

```js
import { ADD_POST, ADD_POSTS } from "../actions/actionTypes";

const initialState = [];

const post = (post) => {
  return {
    userId: null,
    id: post.id,
    title: post.title,
    body: null,
  };
};

const posts = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_POST:
      return [...state, post(action.payload)];
    case ADD_POSTS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default posts;
```

Our `postsReducer` contains two actions - types imported from `actionTypes` - and processes them in the body of the function. Our initial state is an empty object, which we are going to fill with objects representing individual posts.

Remember that actions can include a `type` and a `payload`? We see the utility of `action.payload` here. If the action we submitted to our reducer was `ADD_POST` (for a single post), then we add our action's payload (i.e. the post itself) into a new state object. If it was `ADD_POSTS`, then we add all the new posts on our action's payload into this new state.

`Object.freeze` is there because that will ensure that we do not **mutate** state. Reducers must be **Pure Functions**, meaning that given the same input they will always do the same thing, without side effects.

Notice that we aren't using **any** dangerous methods here - `push` is a no-no. Just like our React states, we aren't ever going to directly modify our Redux state. We copy it, apply changes, and then reset it with our newly modified copy. While we haven't written anything that will mutate the state here, `Object.freeze` gives us one more layer of protection.

Where are these actions coming from, though?

## `actions/`

`actionTypes.js` is a two-liner, so we aren't going to get into that too much. Just remember that the reason we do what we're doing in `actionTypes` is to make absolutely sure we're applying the right actions to our reducers. If wrote each action as a string where it's needed, there is the potential that a misspelling will cause our app to fail silently. Errors don't tell us when we've mispelled a word in a string - they tell us when we've referred to a variable wrong.

Let's look at `postActions`:

```js
import { ADD_POST, ADD_POSTS } from "./actionTypes";

export const addPost = (payload) => {
  return { type: ADD_POST, payload };
};

export const addPosts = (payload) => {
  return { type: ADD_POSTS, payload };
};
```

Even though these functions, called **Action Creators**, just return objects, creating functions for them is still the preferred method for calling them in our React apps. Think of this (again) like Express - these action types could be seen as routes, of sorts, for common actions we'd like to perform on our centralized state. Sure, we _could_ make the object these functions return, import `ADD_POST`, and apply a payload every time we wanted to add a new post. But why don't we just call `addPost` and let our functions take care of this work for us?

The usefulness of this pattern will be more apparent when we get into the React side of our application. Which - wouldn't you know it! - is happening now:

## `PostsContainer`

Any component that requires access to our Redux store can now access it via the hook `useSelector` from `react-redux`. `useSelector` takes a callback as its argument. That callback exposes our application's state as its argument, and can return whichever part of state you'd like to use.

In order to fire actions to update our application store we use the hook `useDispatch`.

```js
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addPosts } from "../actions/postActions";

import Posts from "../components/Posts";

const PostsContainer = () => {
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!posts.length) {
        let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        dispatch(addPosts(res.data));
      }
    };
    fetchPosts();
  }, []);

  return <Posts posts={posts} />;
};

export default PostsContainer;
```

Note that the second argument of `useEffect` is an empty array - this makes sure we only fetch all of these posts on the component's mount.

## `FormContainer` and `Form`

Just like `Posts`, `Form` is interacting with our global Redux state, and therefore needs its own container.

But wait! `FormContainer` holds state in React! How can this be? I thought Redux was handling **all** of our state?

Well, not quite. Until a user submits a form, we usually don't need to pass their input to any other components. In fact, it can be better to store user input information in React state, so we don't muddy our Redux state with tons of temporary input sections. Better to let the user put together the form, make sure their inputs are right, and _then_ update our Redux state.

Which is exactly what we're doing:

```js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../actions/postActions";

import Form from "../components/Form";

const FormContainer = () => {
  const [title, setTitle] = useState("");
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    dispatch(addPost({ title, id }));
    setTitle("");
  };

  return (
    <Form
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      title={title}
    />
  );
};

export default FormContainer;
```

You can see here that `handleChange` is updating the React component's state, whereas `handleSubmit` is calling the Redux method `dispatch` on `addPost` with a new post object as an argument. Then, it calls our `setTitle` method, defined in our `useState` hook, to reset the input.

Finally, we're passing all of this down as props to our `Form` component and rendering JSX there:

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

# Conclusion: Why Redux?

With the magic of Redux, we can go anywhere we want inside the app, unmounting and remounting any component, and our new post should be preserved. While lifting the state to the top level of our component hierarchy could also allow us to do this without using Redux, in a larger more complex project that would lead to a lot of prop drilling -- which is quite clunky.

So, any project with a low level of complexity probably doesn't benefit much from Redux. Even in this example, it's a bit much. However, as our apps grow in size, Redux is a great tool to make sure we don't get lost in state management/prop passage shenanigans.

**Something to Note:** While we recommended using Hooks to connect React with Redux, connecting React components to Redux using Lifecycle Methods may be done using the [`connect` API](https://react-redux.js.org/tutorials/connect).
