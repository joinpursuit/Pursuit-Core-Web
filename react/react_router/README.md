# React Router

## Resources

- [React Router - Official Website](https://reacttraining.com/react-router/)
- [React Router - github](https://github.com/ReactTraining/react-router)
- [react-router-dom - github](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- [A Simple React Router v4 Tutorial - Paul Sherman](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
  - [Live Example](https://codesandbox.io/s/vVoQVk78)
- [All About React Router 4 - CSS Tricks](https://css-tricks.com/react-router-4/)

## Introduction

Today, we will learn about _client-side routing_ in React. Client-side routing is a way to make a single-page application function more like a multi-page application. Client-side routing changes the URL in the address bar and then loads specific content/components based on that URL. Really, the application is only **one page** - the routing allows us to specify what content we want displayed. In React, we don't have routing functionality out-of-the-box. Therefore, client-side routing is most frequently implemented using a library called [React Router](https://reacttraining.com/react-router/).

## [Personal Website](https://codesandbox.io/s/1r165o97o7)

Let's start with an example. This is about as simple as a personal website can get. This app consists of several files:

![project structure + dependencies](assets/project_structure.png?raw=true)

Of these, `About.js`, `Skills.js` and `Welcome.js` are functional components, each representing a "page" in the website. `index.js` is where the routing logic happens. Note that we are also adding `react-router-dom` as a dependency to our project via NPM.

In addition to importing the `React` library and the `render` function from the `react-dom` library, we are importing `BrowserRouter`, `Route` and `Link` from `react-router-dom`:

```js
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
```

And then we are passing that `BrowserRouter` component to our `render` function, wrapping our `App` component:

```jsx
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

The `BrowserRouter` is a component imported (along with `Route` and `Link`) from the `react-router-dom` library. 

Everything that's returned by a component's `render` functions (or `return` values in the case of functional components) will be passed to `BrowserRouter`, which will choose what to return based on our routes and conditions. Since `BrowserRouter` is the root component, whatever it returns will be passed to `ReactDom.render` and rendered as HTML. In order to define our routes and conditions, we will use two other components from the `react-router-dom` library: `Route` and `Link`.

## `Route` and `Link`

In our personal website, the routes are defined inside `App` using `Route` and `Link`:

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      {"  "}
      <Link to="/about">About Me</Link>
      {"  "}
      <Link to="/skills">Skills</Link>
    </nav>
    <div>
      <Route exact path="/" component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/skills" component={Skills} />
    </div>
  </div>
);
```

### `Link`

The `Link` component works in a similar fashion to an `<a>` element, except that it **does not** result in a page reload. Instead, with React Router, the `Link` updates the URL in the address bar, which then tells `BrowserRouter` which component to display. The page **does not** do a full reload.

Note that when you click on any of the rendered links, the route changes. This may be easier to see on the [live app](https://1r165o97o7.codesandbox.io/) without the text editor. Click that and inspect.

Every click results in a re-render, each of our components will be able to access the new `url`. The `Route` components read this URL and determine what will get rendered.

### `Route`

The following lines in the `App` component determine what will get rendered, based on the window's current `path`:

```jsx
  <Route exact path="/" component={Welcome} />
  <Route path="/about" component={About} />
  <Route path="/skills" component={Skills} />
```

Note that each route receives a string for `path` as props and a React component for `component`. If the current `url` matches the string defined in path, the provided component will be rendered.

_Discussion question: What do you think would happen if we removed `exact` from the first path?_

### Matching paths and using `exact`

The default matching algorithm for `path`s will match **complete and partial strings**. This means that `<Route path="/a" component={MyComponent}/>` will render `MyComponent` if the URL is any string that starts with the letter `a`, such as `/about`. This will immediately be problematic in case of `/`, since all routes start with `/`, and we don't necessarily want to render `Welcome` on all of our paths. In our example, we avoid this problem by providing the `exact` keyword as a prop to this `Route` for `/`.

### Inclusive Routing

Also note that the routing is inclusive by default. This means that any number of routes can be rendered. If we remove the `exact` keyword from the home route and click on `About`, _both_ the `Welcome` and `About` components will be rendered.

### Wildcards

Although our personal website app doesn't show this, we can utilize wildcards to define flexible routes. For example:

```js
<Route path="/posts/:id" component={SinglePost} />
```

This component would render for `mywebsite.com/posts/1`, for `/posts/2`, and for `/posts/blah`. Critically, it also makes your individual wildcard value available in `props`, specifically in `props.match.params`.

So, for example, if you wanted to make an AJAX request using the post ID in `mywebsite.com/posts/1`, and your route was set up with the wildcard `:id` in the path, then you could write `props.match.params.id` in your component and you'd get 1. You could then use this ID to make your AJAX request and render your information.

## Exclusive Routing Using `Switch`

We touched on how `Route` components are naturally includsive - that is, if the window's location matches two routes' `path`s, both routes will render. This isn't always desirable. We've already seen how `exact` can help us resolve this issue, but there's another tool in our toolbox - `Switch`:

```jsx
import { Link, Switch, Route } from "react-router-dom";

  ...
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/pets" component={Pets} />
  </Switch>
  ...
```

We can use `Switch` when we want to make absolutely sure only one `Route` renders.

# Conclusion

React router provides us with powerful tools to create a full-fledged website using the React component structure and JSX we're already familiar with. Whether we're using it for top-level routing, or as a tool to render components conditionally based on what's in the URL, the sky is the limit on what we can create.