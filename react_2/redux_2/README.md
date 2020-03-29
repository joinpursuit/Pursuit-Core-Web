# Redux 2

## Objectives

- Build a more complex Redux app using the JSON Placeholder API

## Resources

- [React Redux Beginner Tutorial](https://www.valentinog.com/blog/redux/) - Take this with a grain of salt and you don't have to read *all* of it, but this is a great little walkthrough of an example project that's pretty close to our preferred Redux architecture.


# 1. JSON Placeholder API App Introduction

Now that we've implemented our traditional Counter app, let's go ahead and build an app using the JSON Placeholder API. Today, we're going to build the basic infrastructure for our app, render a list of post titles, and add functionality to add new posts via a form.

## [Our Posts App](https://github.com/joinpursuit/react_redux_example/tree/Redux2)

Clone this repo, npm install, and start. You can see a basic unstyled homepage, with a navigation between "Home" and "Posts". Navigating to the `/posts` route, you can see all the post titles from the JSON Placeholder API. At the top of the screen, there's an option to add a new post.

Clicking that link takes you to a different route: `/posts/new`. A form renders. You add a title, click `Submit`, and the form clears. When you navigate back (re-mounting the other component) you can see your new post at the top of the list.

If we stored our Posts in the component rendered by `/posts`, this wouldn't be possible. However, with the magic of Redux, we can go anywhere we want and our new post will be preserved. Yes lifting state could also allow us to do this without using Redux, but in a larger more complex project that could become a burdon. 

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
- `reducers/`
  - `rootReducer.js`
  - `postsReducer.js`
- `store/`
  - `index.js`
- `index.js`


# 3. `store/` and `index.js`

While we could create our store inside of `index.js`, it's nicer to create it in advance and import it - it just looks better, especially because now we're wrapping our `App` with `BrowserRouter` *and* `Provider`. Inside of our `store` index file, you can see us importing the root reducer, creating a store, and then immediately exporting:

```js
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

const store = createStore(rootReducer);

export default store;
```

Not *too* bad, eh?

But where does our reducer come from?

# 4. `reducers/`

While we are still only using one reducer, `postsReducer`, we thought it'd be good for us to start this app off the proper way. `rootReducer` inside this folder imports `postsReducer` and then uses `combineReducers` - meaning, if we wanted to, we could import more than one reducer and combine them all into one big state for our store.

Let's take a look at our `postsReducer` for a moment:

```js
import { ADD_POST, ADD_POSTS } from "../actions/actionTypes";

const _defaultState = {}

const normalize = (arr) => {
  arr = Array.isArray(arr) ? arr : Object.values(arr);
  let output = {};
  arr.forEach(el => {
    output[el.id] = el;
  })
  return output; 
}

const postsReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_POST:
      return { ...{[action.payload.id]: action.payload }, ...state}
    case ADD_POSTS:
      return {...normalize(action.payload), ...normalize(state)}
    default: 
      return state;
  }
};

export default postsReducer;

```

Our `postsReducer` contains two actions - types imported from `actionTypes` - and processes them in the body of the function. Our initial state is an empty object, which we are going to fill with objects representing posts. We're using the normalize function so that we'll have an instant lookup reference to any individual posts. If the action we submitted to our reducer was `ADD_POST` (for a single post), then we add our payload into our state. If it was `ADD_POSTS`, then we add all the new posts on our payload into our state.

Object.freeze is there because that will ensure that we do not **mutate** state. Reducers must be Pure Functions meaning that given the same input they will always do the same thing, and they have NO side effects.

Notice that we aren't using **any** dangerous methods here - `push` is a no-no. Just like our React states, we aren't ever going to directly modify our Redux state. We copy it, apply changes, and then reset it with our newly modified copy.

Where are these actions coming from, though?

# 5. `actions/`

`actionTypes.js` is a two-liner, so we aren't going to get into that too much. Just remember that the reason we do what we're doing in `actionTypes` is to make absolutely sure we're applying the right actions to our reducers. If wrote each action as a string where it's needed there is a potential for a mispelling. This would cause something in our app to fail silenty. Errors don't tell us when we've mispelled something. 

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

Even though these functions called **Action Creators** just return objects, creating functions for them is still the preferred method for calling them in our React apps. Think of this (again) like Express - these action types could be seen as routes, of sorts, for common actions we'd like to perform on our centralized state. Sure, we *could* make the object these functions return, import `ADD_POST`, and apply a payload every time we wanted to add a new post. But why don't we just call `addPost` and let our functions take care of this work for us?

The usefulness of this pattern will be more apparent when we get into the React side of our application. Which - wouldn't you know it! - is happening now:

# 6. `Posts` 

 Any component that requires access to our Redux store we can now use the hook `useSelector` from `react-redux`. 
 useSelector takes a callback as it's argument. That callback takes our application state as it's argument and should return whichever `slice` of state you choose to take from the entire application state.  

  In order to fire actions to update our application store we use the hook `useDispatch`. 
```js
  const posts = useSelector(state => Object.values(state.posts));
  // our state looks like this right now: {
  //                                      posts: { 
  //                                               1: {id: 1, title: first post},
  //                                               2: {id: 2, title: second post},
  //                                            }
  //                                       }
  
  const dispatch = useDispatch();

    useEffect(() => {
    const fetchPosts = async () => {
      if (!posts.length) {
        let res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        dispatch(addPosts(res.data)); 
      }
    };
    fetchPosts()
  }, [])
```

**Something to Note:**  Before Hooks were common practice and things were still done in class components, the way we connected our components to Redux was slightly different. You would use the `connect` function from `react-redux`. connect took in two arguments mapStateToProps (this behaived alot like useSelector does), and mapDispatchToProps (this behaived alot like useDispatch). connect returned a function that you would also invoke; that function took a component in as it's argument and passed everything from mapStateToProps and mapDispatchToProps into the component as props. This connection file was ofter reffered to as a components container. 
  
```
const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts)
  }
}

const mapDispatchToProps = () => {
  return {
    addPosts: (posts) => dispatch(posts)
  }
}

connect(mapStateToProps, mapDispatchToProps)(Posts)

```

