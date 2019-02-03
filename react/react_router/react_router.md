# React Router 1

## Resources

- [React Router - Official Website](https://reacttraining.com/react-router/)
- [React Router - github](https://github.com/ReactTraining/react-router)
- [react-router-dom - github](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- [A Simple React Router v4 Tutorial - Paul Sherman](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
  - [Live Example](https://codesandbox.io/s/vVoQVk78)
- [All About React Router 4 - CSS Tricks](https://css-tricks.com/react-router-4/)
- [Composition vs Inheritance - React Docs](https://reactjs.org/docs/composition-vs-inheritance.html)

## Introduction

Today we will learn about _client-side routing_ in React. Client-side routing in React is a way to make a single-page application function more like a multi-page application. Client-side routing changes the URL in the address bar and then loads specific content/components based on that URL. Really, the application is only **one page**--the routing allows us to specify what information we want displayed. In React, client-side routing is most frequently implemented using a library called [React Router](https://reacttraining.com/react-router/).

## [Personal Website](https://codesandbox.io/s/1r165o97o7)

We will start with an example of a simple personal website. This app consists of several files:

![project structure + dependencies](assets/project_structure.png?raw=true)

Of these, `About.js`, `Skills.js` and `Welcome.js` are stateless components, each representing a "page" in the website. `index.js` is where the routing logic happens.

Note that we are also adding `react-router-dom` as a dependency to our project via the NPM packages.

In addition to importing the `React` library and the `render` function from the `react-dom` library, we are importing `BrowserRouter`, `Route` and `Link` from `react-router-dom`:

```js
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
```

Note that we are passing something different than usual to the `render` function:

```jsx
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

The `BrowserRouter` is a component imported (along with `Route` and `Link`) from the `react-router-dom` library. What we are seeing above is an instance of [component composition](https://reactjs.org/docs/composition-vs-inheritance.html).

### Review: Component Composition

Component composition is similar to function composition, in which the output of one function is given as input to another:

```js
const add = (n1, n2) => n1 + n2;
const square = n => n * n;
square(add(2, 1) /* => 3 */); // => 9
```

In React, we compose components by nesting one within the other. The value returned by the nested (or _child_) component's render function will be passed to the _parent_ component. Let's see it in action in the [following example](https://codesandbox.io/s/pk7wn5vvoj).

### [Fancy Border](https://codesandbox.io/s/pk7wn5vvoj)

This example features a simple welcome message surrounded by a border (defined in the css `fancy-border` class). The component that renders the border is called `FancyBorder`:

```jsx
const FancyBorder = props => (
  <div className="fancy-border">{props.children}</div>
);
```

Note that this component only does two things:

1. Declare a div with the class `fancy-border`.
2. Render the `props.children`

The `props.children` in `2` will be the output of the render function of a child component. The `FancyBorder` class does not need to know in advance what that class is going to be. In our example, we are using the `App` component to return `WelcomeDialog` as a child component of `FancyBorder`:

```jsx
const App = () => (
  <FancyBorder>
    <WelcomeDialog />
  </FancyBorder>
);
```

Where `WelcomeDialog` returns some `JSX` elements:

```jsx
const WelcomeDialog = () => (
  <div>
    <h1>Welcome</h1>
    <p>Thank you for visiting our website!</p>
  </div>
);
```

All of this results in the following HTML:

```html
<div id="root">
  <div class="fancy-border">
    <div>
      <h1>Welcome</h1>
      <p>Thank you for visiting our website!</p>
    </div>
  </div>
</div>
```

Now, let's go back and see how this applies to react-router.

## Back to the [Personal Website](https://codesandbox.io/s/1r165o97o7)

As we've seen above, to make react-router work we define `BrowserRouter` as the root component in our app:

```jsx
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

Everything that's returned by component's `render` functions (or components _themselves_ in case of functional components) will be passed to `BrowserRouter`, which will choose what to return based on our routes and conditions. Since `BrowserRouter` is the root component, whatever it returns in its `render` function will be passed to `ReactDom.render` and rendered as HTML. In order to define the routes and conditions, we will use two other components from the `react-router-dom` library: `Route` and `Link`.

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

The `Link` component works in a similar fashion to an `<a>` element, except that it **does not** result in a page reload. Instead, with React Router, the link simply changes the URL in the address bar which then tells Browser Router which component to display. The page **does not** do a full reload.

Note that when you click on any of the rendered links, the route changes. This may be easier to see on the [separate-page live-code](https://1r165o97o7.codesandbox.io/). Click that and inspect.

Every click still results in a re-render, and as a result our components will be able to access the new `url`. The `Route` components are the ones that determine what will get rendered.

### `Route`

The following lines in the `App` component determine what will get rendered, based on the `path`:

```jsx
  <Route exact path="/" component={Welcome} />
  <Route path="/about" component={About} />
  <Route path="/skills" component={Skills} />
```

Note that each route receives a string for `path` as props and a React component for `component`. If the current `url` matches the string defined in path, the provided component will be rendered.

_What do you think would happen if we removed `exact` from the first path?_

#### Matching paths and using `exact`

The default matching algorithm for `path`s will match not only complete strings but also partial ones. This means that `<Route path="/a" component={MyComponent}/>` will render `MyComponent` if the URL is any string that starts with the letter `a`, such as `"about"`. This will immediately be problematic in case of the home route `/`, since this will match any other route (all routes start with `/`). In our example, we provided the `exact` keyword as a prop to the `Route` for `/` in order to only match if the route is exactly `/`:

```jsx
<Route exact path="/" component={Welcome} />
```

#### Inclusive Routing

Also note that the routing is inclusive by default. This means that any number of routes can be rendered. If we remove the `exact` keyword from the home route and click on `About`, _both_ the `Welcome` and `About` components will be rendered. We will see as we go further how to render only a single `<Route />`, and when the possibility of rendering multiple `<Route />`s be to our advantage.

#### Wildcards

Although our personal website app doesn't show this, we can utilize wildcards to define flexible routes. For example:

```js
<Route path="/posts/:id" component={SinglePost} />
```

This component would render for `mywebsite.com/posts/1`, for `/posts/2`, and for `/posts/blah`. Critically, it also makes your individual wildcard value available in `props`, specifically in `props.match.params`.

So, for example, if you wanted to make an AJAX request using the post ID in `mywebsite.com/posts/1`, and your route was set up with the wildcard `:id` in the path, then you could write `props.match.params.id` in your component and you'd get 1.
