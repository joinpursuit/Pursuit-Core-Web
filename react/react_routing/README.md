# React Routing with React Router

## Resources

- [React Router - Official Website](https://reacttraining.com/react-router/)
- [React Router - github](https://github.com/ReactTraining/react-router)
- [react-router-dom - github](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- [A Simple React Router v4 Tutorial - Paul Sherman](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
  - [Live Example](https://codesandbox.io/s/vVoQVk78)
- [All About React Router 4 - CSS Tricks](https://css-tricks.com/react-router-4/)
- [Composition vs Inheritance - React Docs](https://reactjs.org/docs/composition-vs-inheritance.html)
- [A Simple React Router Tutorial - Paul Sherman](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)

## Objectives

- Explain what client-side routing does and why its useful
- Use React Router to build a simple app with different routes using `Link` and `Route`
- Use React Router to build a more complex app with `Switch`

# 1. Introduction

In this lesson we will learn about _client-side routing_ in React. Client-side routing in React is a way to make a single-page application function more like a multi-page application. Client-side routing changes the URL in the address bar and then loads specific content/components based on that URL. Really, the application is only **one page**--the routing allows us to specify what information we want displayed. In React, client-side routing is most frequently implemented using a library called [React Router](https://reacttraining.com/react-router/).

# 2. Review: Component Composition

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

# 3. Building a Personal website using React Router

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

Everything that's returned by component's `render` functions (or components _themselves_ in case of functional components) will be passed to `BrowserRouter`, which will choose what to return based on our routes and conditions. Since `BrowserRouter` is the root component, whatever it returns in its `render` function will be passed to `ReactDom.render` and rendered as HTML. In order to define the routes and conditions, we will use two other components from the `react-router-dom` library: `Route` and `Link`.

## `Link` and `Route`

In our personal website, the routes are defined inside `App` using `Link` and `Route`:

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

# 4. React Routes

_What do you think would happen if we removed `exact` from the first path in the example above?_

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

# 5. Building an application with more complicated routing

## [My Pets' Website](https://codesandbox.io/s/8yq0ly3708)

Here, we will explore more routing concepts through the _My Pets' Website_ example.

First, note the folder structure:

<pre>

- Pets
  + Pets.js
  + Pet.js
  + PetList.js
  + petAPI.js
+ App.js
+ Home.js
+ index.js
+ index.html

</pre>

As we go through this project step by step, both the location and the purpose of each file will begin to make sense.

## `index.js`

This is starting point for the app:

```jsx
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

As you can see above, this file's only purpose is to call `ReactDom`'s _render_ function, providing as an argument the `App` component nested within the `BrowserRouter` component.

#### `App.js`

The `App.js` component is responsible for:

* Rendering the navigation bar.
* The initial routing.

As we will see in a bit, when using `react-dom-router`, the routing functionality is often spread out between different components.

`App.js` renders two links:

* `/`
* `/pets`

When rendering routes, it uses the `<Switch>` component to perform _exclusive_ routing:

```jsx
import { Link, Switch, Route } from "react-router-dom";

  ...
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/pets" component={Pets} />
  </Switch>
  ...
```

#### Exclusive Routing using `<Switch>`

If we want only one of multiple `Route`s to be rendered, we can use the `Switch` component provided by the `react-router-dom` library. The `Switch` component will _pick_ only one of the child `Route` components - whichever one matches the url first. For our `App` component, unless we provide the `exact` keyword for the Route where the `path` is `/`, it will always match (because of partial matching) and none of the other components would ever be rendered. It is possible to put the `Route` with that path last. However, it is better to be explicit regardless of the `Route` order and provide the `exact` attribute either way.

#### `Home.js`

Looking through the `Routes` in `App.js`, we can observe that the component with the `/` path will be rendered by default, or when _Home_ in the navbar is clicked. This component is only a few lines long:

```jsx
import React from "react";

const Home = () => (
  <div>
    <h1>My Pets' Website</h1>
  </div>
);

export default Home;
```

Despite its brevity, it is still preferable to keep this component separate. This will make the project easier to maintain as it grows, since we may decide to add more content to this component later on.

The second `Route` from `App` will render the `Pets` component if the URL matches the `/pets` path.

#### `Pets/Pets.js`

There are fours files inside the `Pets` directory. Out of these, we could call `Pets.js` our _main_ component. This component has two roles:

##### 1. Rendering the routes `/pets/` and `/pets/:id`

Note that we are using the full route every time, even from within the `Pets` component:

```jsx
  ...
  <Switch>
    <Route path="/pets/:id" render={this.renderPet} />
    <Route exact path="/pets" render={this.renderPetList} />
  </Switch>
  ...
```

We will learn in later lessons how to define path with partial routes.

##### 2. Contacting the Pet API

For this project, we are using a _mock_ (or _fake_) API. This mock API is contained in the `petAPI.js` file.

##### `PetAPI.js`

In order to focus on routing, we do not use AJAX nor promises in this project. Our `petAPI.js` file holds an array of objects:

```js
const pets = [
  { id: "a234", name: "Oreo", species: "cat" },
  { id: "a345", name: "Luna", species: "dog" },
  { id: "b234", name: "Bell", species: "cat" },
  ...
]
```

Where each object represents a pet, with an `id`, a `name` and a `species`. This file exports two methods that allow us to access the array:

```js
const getAll = () => pets;

const getOne = id => pets.find(pet => pet.id === id);
```

The `getAll` method returns all the pets, and the `getOne` method returns a single pet based on an `id` (it may return `undefined` if the pet doesn't exist). In order to prepare for future projects, where we will mostly use external sources for our data, we will at be using these methods to access the data, rather than accessing the `pets` array directly.

#### `Pets.js`: `renderPet`

Going back to the `Pets` component, you will notice that each `Route` has a `render` prop instead of a `component` prop. While the `component` prop will result in rendering a Component, the `render` prop will result in invoking the provided function. As is the case with the `component` prop, this function will be called if the provided `path` matches the url.

In this case, we're using `render` because we want to pass our components props, which is not possible using `component`.

The function provided to `render` will be automatically passed a `props` object as an argument. The most important piece of this `props` object is the `match.params` property, which is an object that contains any parameters contained in the url. In the case of the `/pets/:id` route, we need to access the `props.match.params.id` property in order to access the `id` of the pet that needs to be rendered.

```jsx
  renderPet = props => {
    const { id } = props.match.params
   ...
```

Once we have the `id`, we use the `petAPI` to get the pet with this id. As there is no guarantee that a pet will be found (the user is able to enter any random id in the address bar) - the returned value may be `undefined`:

```jsx
renderPet = props => {
  const { id } = props.match.params;
  const pet = petAPI.getOne(id);
  if (!pet) {
    return <div> could not find pet </div>;
  } else {
    return <Pet name={pet.name} species={pet.species} />;
  }
};
```

If the returned value is `undefined`, we render a `div` element with a message `"could not find pet"`. Otherwise, if the pet _was_ found, we render a `Pet` component with the pet's name and species as _props_.

#### `Pets.js`: `renderPetList`

The other route - `/pets` - is simpler in that we do not need any params from the URL. Even though the `renderPetList` function is defined as if no arguments are passed to it, the `props` argument will still be passed. But `props.match.params` will be an empty object, since there are no params to the `url`. So in this case we ignore the passed-in `props` completely. All we need to do is fetch all the pets from our `petAPI` and render a `PetList` component with the pets as a prop.

```jsx
renderPetList = () => {
  const pets = petAPI.getAll();
  return <PetList pets={pets} />;
};
```

#### `Pets/PetList.js`

While the `Pets` component does most of the heavy lifting, both the `Pet` and `PetList` are similar the functional components we've seen before. The only difference is that we're using the `Link` component from `react-router-dom`:

```jsx
const PetList = ({ pets }) => (
  <ul>
    {pets.map(pet => (
      <li key={pet.id}>
        <Link to={`/pets/${pet.id}`}>
          {pet.id}: {pet.name}
        </Link>
      </li>
    ))}
  </ul>
);
```

The `PetList` component iterates over the `pets` array given to it as a prop, and for each item displays a link with the pet's `id` and `name`. The url itself requires some knowledge on our part: we know that the route for a single pet is defined as`/pets/:id`.

#### `Pets/Pet.js`

The `Pet` component takes as an argument a `props` object with `name` and `species`, and displays a header with each of these. It also includes a `Link` back to `/pets`.

```jsx
const Pet = ({ name, species }) => (
  <div>
    <div>
      <h1>{name}</h1>
      <h2> Species: {species}</h2>
      <Link to="/pets">Back</Link>
    </div>
  </div>
);
```

#### A mental model for navigation and `Links`

Even though there is no page reload when we click on a link render by a `Link` component, the app itself gets re-rendered from the root. Take as an example, clicking on one of the pets in the list: `a234: Oreo`.

* The url becomes: `/pets/a234` and we are back at the `App` component.
* We matching the `/pets` route, which renders the `Pets` component.
* Inside the `Pets` component, we match the `/pets/:id` route, calling the `renderPet` function.
* This function gets the pet's id via `props.match.params`, fetches the `pet` object via the `petAPI`, and renders the `Pet` component.
* The `Pet` component displays headers with the pet's name and species.
