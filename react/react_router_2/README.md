# React Router 2

## Resources

* [My Pets' Website - CodeSandbox](https://codesandbox.io/s/8yq0ly3708)
* [A Simple React Router Tutorial - Paul Sherman](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)

## Introduction

In this lesson we will expand react-router to more complex use cases.

## Recap

In the previous lesson we learned about the following React components, provided to us by the `react-router-dom` library:

* `Link`
  * Works in a similar fashion to the `<a>` element, except that it does not trigger a page reload.
* `Route`
  * When providing a string for the `path` prop and a React component for the `component` prop: the component will be rendered if the current `url` matches the provided `path`.
  * The above will be true for partial matches (i.e. path `/a` would be a match for url `/apple`) unless with the `exact` keyword is provided as a prop.
  * The routing is **inclusive**: if the same url route matches the `path` for multiple `Route`s, _all_ of the corresponding components will be rendered.

## [My Pets' Website](https://codesandbox.io/s/8yq0ly3708)

In this lesson we will explore more routing concepts through the _My Pets' Website_ example.

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
