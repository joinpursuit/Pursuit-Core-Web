# Redux 2

## Objectives

- Build a more complex Redux app using the JSON Placeholder API

## Resources

- [React Redux Beginner Tutorial](https://www.valentinog.com/blog/redux/) - Take this with a grain of salt and you don't have to read *all* of it, but this is a great little walkthrough of an example project that's pretty close to our preferred Redux architecture.


# 1. JSON Placeholder API App Introduction

Now that we've implemented our traditional Counter app, let's go ahead and build an app using the JSON Placeholder API. Today, we're going to build the basic infrastructure for our app, render a list of post titles, and add functionality to add new posts via a form.

## [Our Posts App](https://github.com/joinpursuit/react_redux_example/tree/Redux2)

Clone this repo, switch to the "Redux2" branch, npm install, and start. You can see a basic unstyled homepage, with a navigation between "Home" and "Posts". Navigating to the `/posts` route, you can see all the post titles from the JSON Placeholder API. At the bottom of the screen, there's an option to add a new post.

Clicking that link takes you to a different route: `/posts/new`. A form renders. You add a title, click `Submit`, and the form clears. When you navigate back (re-mounting the other component) you can see your new post at the bottom of the list.

If we stored our Posts in the component rendered by `/posts`, this wouldn't be possible. However, with the magic of Redux, we can go anywhere we want and our new post will be preserved.

# 2. App Architecture

To see how we accomplish this, let's take a look at our architecture. The `src/` folder's structure is as follows:

- `actions/`
  - `actionTypes.js`
  - `postActions.js`
- `components/`
  - `App.js`
  - `Form.js`
  - `Navbar.js`
  - `Posts.js`
- `containers/`
  - `FormContainer.js`
  - `PostsContainer.js`
- `reducers/`
  - `index.js`
  - `postsReducer.js`
- `store/`
  - `index.js`
- `index.js`
- `reduxUtils.js`

# 3. `store/` and `index.js`

While we could create our store inside of `index.js`, it's nicer to create it in advance and import it - it just looks better, especially because now we're wrapping our `App` with `BrowserRouter` *and* `Provider`. Inside of our `store` index file, you can see us importing the root reducer, creating a store, and then immediately exporting:

```js
import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

export default store;
```

Not *too* bad, eh?

But where does our reducer come from?

# 4. `reducers/`

While we are still only using one reducer, `postsReducer`, we thought it'd be good for us to start this app off the proper way. `index` inside this folder imports `postsReducer` and then uses `combineReducers` - meaning, if we wanted to, we could import more than one reducer and combine them all into one big state for our store.

Let's take a look at our `postsReducer` for a moment:

```js
import { ADD_POST, ADD_POSTS } from "../actions/actionTypes";

const initialState = {
  posts: []
};

const postsReducer = (state = initialState, action) => {
  let newState = { ...state };

  if (action.type === ADD_POST) {
    newState.posts = newState.posts.concat(action.payload);
  }
  if (action.type === ADD_POSTS) {
    newState.posts = [...newState.posts, ...action.payload];
  }

  return newState;
};

export default postsReducer;
```

Our `postsReducer` contains two actions - types imported from `actionTypes` - and processes them in the body of the function. Our initial state is an empty array, which we are going to fill with objects representing posts. If the action we submitted to our reducer was `ADD_POST` (for a single post), then we concat our payload onto our state. If it was `ADD_POSTS`, then we reassign `posts` using object destructuring to combine our old array and our new array provided by `action.payload`.

Please notice that we aren't using **any** dangerous methods here - `push` is a no-no. Just like our React states, we aren't ever going to directly modify our Redux state. We copy it, apply changes, and then reset it with our newly modified copy.

Where are these actions coming from, though?

# 5. `actions/`

`actionTypes.js` is a two-liner, so we aren't going to get into that too much. Just remember that the reason we do what we're doing in `actionTypes` is to make absolutely sure we're applying the right actions to our reducers.

It's `postActions` that we'd like to look at:

```js
import { ADD_POST, ADD_POSTS } from "./actionTypes";

export const addPost = payload => {
  return { type: ADD_POST, payload };
};

export const addPosts = payload => {
  return { type: ADD_POSTS, payload };
};
```

Even though these functions just return objects, creating functions for them is still the preferred method for calling them in our React apps. Think of this (again) like Express - these action types could be seen as routes, of sorts, for common actions we'd like to perform on our centralized state. Sure, we *could* make the object these functions return, import `ADD_POST`, and apply a payload every time we wanted to add a new post. But why don't we just call `addPost` and let our functions take care of this work for us?

The usefulness of this pattern will be more apparent when we get into the React side of our application. Which - wouldn't you know it! - is happening now:

# 6. `Posts` and `PostsContainer`

On the React side, we have a really interesting new pattern for our component architecture and organization. Every component requires access to our Redux store we now separate into *two* components - a container component and a presentational component. In fact, right now, *all of our components* in the `components/` folder are stateless.

Whenever we *need* to access information in a component, we now let a container do it for us. Take a look at `PostsContainer` for a moment:

```js
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux-utils";

import Posts from "../components/Posts";

class PostsContainer extends Component {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    if (!this.props.posts.length) {
      axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
        this.props.addPosts(res.data);
      });
    }
  };

  render() {
    const { posts } = this.props;

    return <Posts posts={posts} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsContainer);
```

Fascinating - we aren't referring to state *at all* in this component! But I thought this component was supposed to interact with Redux's centralized state! Wouldn't we call it - you know - **state**??

In terms of the way that React sees and processes this information, well, no. Remember, **the main way we pass information to React components on the frontend is by way of props**. Redux has to play by those rules - which is why we utilize the functions `mapStateToProps` and `mapDispatchToProps` to make our Redux store (`mapState`) and actions (`mapDispatch`) available on the component's `props` object. These functions can be found in `reduxUtils.js` in our root `src/` file, but they aren't that interesting - we're just importing these methods, expecting state, and returning objects representing what we hope our `props` object looks like. The magic (and it is, sort of, magic) happens in `react-redux`'s own `connect` function, which does most of the heavy lifting to hook this stuff up for real. It grabs the Redux store's state, passes it as an argument to `mapStateToProps`, connects the actions in `mapDispatchToProps` up to our reducers, and sticks all of that stuff on `this.props`.

This is a lot of boilerplate, but the advantage shines through in this `PostsContainer` component. Instead of doing a bunch of complicated processing and setting the state from `fetchPosts`, once the axios request is complete, we can simply call `this.props.addPosts` with our payload - the list of posts from the JSON Placeholder API - passed in as an argument. Redux adds the posts to our Redux store by way of the `postsReducer`, and then our component re-renders without having to set the state directly - React-Redux's `connect` triggers a re-render whenever it sees a difference in the state it receives from the store.

Our stateful logic handled, we can then pass this information down to our functional `Posts` component, which keeps our concerns separate and our code sleek and easy to navigate:

```js
import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map(el => {
        return <li key={el.id}>{el.title}</li>;
      })}

      <Link to="/posts/new">Add New Post</Link>
    </>
  );
};

export default Posts;
```
