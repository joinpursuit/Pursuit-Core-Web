# Props and Component Structuring

## Resources
* [Components and Props](https://reactjs.org/docs/components-and-props.html)
* [Thinking In React](https://reactjs.org/docs/thinking-in-react.html)
* [Container Components](https://medium.com/@learnreact/container-components-c0e67432e005)
* [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)

## Vocabulary
* Props
* Functional Components
* Stateful Components
* Container Components
* Display Components

## Objectives
* Understand what props are and what problem they solve
* Build an application that uses props
* Pass functions through props to manipulate state
* Articulate the distinction between container and display components

# 1. Introduction to props

In pervious lessons, we've seen how to build React components and display them on a website.  However, we had no way to make two different versions of the same component.  For example, we should be able to create a `UserProfile` component with the name "Robert Kahn", then create a separate `UserProfile` component with the name "Vinton Cerf".

Another example of this is Amazon's product search. Take a look at, say, a search for t-shirts:

![amazon](./assets/amazon_screen.png)

Each of these t-shirts represents a separate instance of the **exact same component**. This component is reused in many different places in the application.

In order to have the same component display different information, we can use **props**.

## Props

Just like React Components have a `state` property, they also have a `props` property.  Props allow components to render other components and to **pass information to those components**.  Components can use props to accurately display information as the state of its parent changes.

Props also allow us to intelligently divide responsibilities between components. We can create components whose only job is to make AJAX requests and store state, and we can have components whose only job is to receive props and render information.

Returning to our Amazon search page example, let's say our components (`ProductItem`) are the *child components* of a component for the entire page (`ProductPage`). `ProductPage` makes one large AJAX request on the first render of the page, getting an array with fifty products. It then sets a part of state (`this.state.products`) with this array. We map through the array and send each individual product to a `ProductItem` component by way of props, which processes the product's information into something user-facing.

Let's take a look at a small-scale example of this:

# 2. Building an app using props

## [Example](https://codesandbox.io/s/zlo5z05w7x)

Here, we will build a simple application that uses props to display a list of shoes.

![reactPropsAppOne](./images/reactPropsAppOne.png)

### `ProductPage.js`

```js
constructor() {
  super();
  this.state = {
    products: [
      { name: "Ultra Boost", manufacturer: "Adidas", price: 160 },
      { name: "Air Force One Low", manufacturer: "Nike", price: 100 },
      { name: "Classic Leather", manufacturer: "Reebok", price: 120 },
      { name: "Sk8-Hi", manufacturer: "Vans", price: 60 }
    ]
  };
}
```

In our constructor, you can see that we have a part of state called `products`. This contains an array of objects, each with certain consistent traits: `name`, `manufacturer`, and `price`.

We then use this state inside our `render` function:

```js
render() {
  const { products } = this.state;
  const listItems = products.map(product => {
    return (
      <ProductItem
        name={product.name}
        manufacturer={product.manufacturer}
        price={product.price}
      />
    );
  });
  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}
```

First, we're breaking out `products` from our state. Then, we're creating a variable called `listItems`, which maps through our `products` part of state and returns... React components called `ProductItem`.

These components have certain attributes, but at first glance, they don't really make sense to us - there's no `className`, no `onChange`, nothing that we've really used before. That's because, **while these items share the same syntax, they don't translate directly to HTML attributes.** Instead, they represent *props* that we're passing down to our `ProductItem` component.

Think of props as arguments for a component. They compile into an object called `props`, which the child component can key into and use to render stuff. In this case, for each item in our `products` part of state, we're inputting the name, manufacturer, and price into our `ProductItem` component. In fact, you can literally write a component that doesn't need to store state **as a function**. We call this a functional component, and `ProductItem` is our first example.

### `ProductItem.js`

```js
import React from "react";

const ProductItem = props => {
  return (
    <li>
      {" "}
      {props.name} - {props.manufacturer} - ${props.price}
    </li>
  );
};

export default ProductItem;
```

This is the entire `ProductItem` component. Pretty clean, right? However, there's a lot of stuff we haven't seen before. Let's break this down.

First, we're importing React. Even if we aren't technically extending React's Component class explicitly, we're using JSX, so we have to include it.

Then, we're invoking `ProductItem` as a **functional component**. We are defining it as an anonymous function that takes its `props` as an argument. Then, it breaks out those *same three props that we put in the `ProductPage` component* and puts them in an `li` tag, which it returns.

Importantly, what you're seeing on the right-hand side of the sandbox is **four separate instances** of this component, each with different props. We create those instances in our `map` method in our parent component.

# 3. Component Architecture

In our previous example, you might have noticed that our `ProductPage` component doesn't really render much of anything independently. Its main purpose is to handle its state and send props down to child components. It's only when we get to the `ProductItem` components that we actually render something on the page.

This is a design philosophy called **separation of concerns**, which means that we should break out different functionalities into different parts of our app.

Why is this important? Well, let's go back to our Amazon example. Components for small product items can show up on a search page **or** as a recommended/related item on a product page. If we simply have `SearchPage` and `ProductPage` components that handle everything, we'll have to re-write the same JSX to render the same product previews. Much easier and more efficient to make a `ProductItem` or `ProductThumbnail` component and use it across the site.

Additionally, if we have a parent component that does a single AJAX request and passes the result down as props to several different components, as we saw above, we can avoid a situation where each separate component fires an AJAX request, which would be taxing to our backend server or remote API.

Finally, it keeps us organized and it keeps our app consistent. The higher up in our component structure we can store state, and the more components share the same state, the more consistently we present information to the user, and the less we have to update the same information in different places.

At the end of the day, a full-fledged app should have this kind of component structure:

![diagram](./assets/props_diagram.png)

# 4. Changing state using child components

While the architectural pattern above has many advantages, we can no longer use `setState` in the way that we're used to. Functional components can't independently use `setState`, and therefore, will never re-render.  (Note that this has changed with [React hooks](https://reactjs.org/docs/hooks-state.html) which we will see later).

In order to have our functional components manipulate state, we will use the strategy of **passing functions between components**.

For this architecture, it will help to understand the distinction between **container components** and **display components**.

## Display Components

**Display components** do not have their own state. They react to events by calling functions that have been passed as props.  They do not own logic for manipulating state, only for displaying information and passing events up the chain to parent components.

## Container Components

**Container components** store the state *and* functions to edit that state. They will then pass their state and, if necessary, those functions to their lower-order *display* components.

Once those functions fire, the *container*, parent component will re-render, triggering a re-render of all components the container is rendering - with **new props** based on the function that was fired.


Let's look at this in action:

# 5. Building a app with that passes functions through props

## [Props Example 2](https://codesandbox.io/s/rly61lv97p)

We will return to our app from earlier, this time adding a `quantity`, and `purchase` button that decrements the quantity as long as it is greater than zero.  In order to change the quantity number, we will use the strategy of passing a function as props from a container component to a display component.

![reactPropsAppTwoGif](./images/reactPropsAppTwoGif.gif)

## `ProductPage.js`

In our state we add a key, `quantity`, to each product. Then, we create the function `buySingleProduct`:

```js
buySingleProduct = name => {
  let newStateProducts = this.state.products.map(product => {
    if (product.name === name && product.quantity > 0) {
      return {
        name: product.name,
        manufacturer: product.manufacturer,
        price: product.price,
        quantity: product.quantity - 1
      };
    } else {
      return product;
    }
  });

  this.setState({
    products: newStateProducts
  });
};
```

Our function accepts an argument, `name`, which refers to the name of the product we want to buy.

Using the name, we then map through each product in our state, creating a new object. If the product's name is the name we input as our argument, and if the product's quantity is above 0 (can't sell stock we don't have), we decrease the product's `quantity` value by 1. Otherwise, we simply return the product unchanged. Then, we update our state.

Where do we call this function? It wouldn't make a whole lot of sense to call it in this component - this component isn't rendering anything, and it's a tall order to ask our user to click on something that isn't there. So, we don't. We pass the *function itself*, un-invoked, as a prop to each `ProductItem` component.

Remember that `listItems` map we did in the previous example? This can be found there:

```js
const listItems = products.map(product => {
  return (
    <ProductItem
      name={product.name}
      manufacturer={product.manufacturer}
      price={product.price}
      quantity={product.quantity}
      buySingleProduct={this.buySingleProduct}
    />
  );
});
```

Let's take a look at our other component, `ProductItem`:

### `ProductItem.js`

Let's just look at `ProductItem` in its entirety:

```js
import React from "react";

const ProductItem = props => {
  const { name, manufacturer, price, quantity, buySingleProduct } = props;
  return (
    <li>
      {" "}
      {name} - {manufacturer} - ${price} - {quantity} remaining{" "}
      <button
        onClick={() => {
          buySingleProduct(name);
        }}
      >
        Purchase
      </button>
    </li>
  );
};

export default ProductItem;
```

We're immediately doing something different here, using object deconstruction to break out our props in the same way we might break out parts of state.

Then, we make sure to include an area for displaying `quantity` to the user. Finally, we add a `button` tag. This `button` contains an anonymous function defined inside its `onClick` attribute.

*Question: Why might this be? Why not simply call buySingleProduct directly as in the example below?*

```
<button onClick=buySingleProduct(name)</button>
```

<details>
<summary>Solution</summary>

In order to add an argument to the function (in this case, the product's name), we have to invoke the function. However, we don't want to invoke the function as soon as the page loads - if we did, it'd call `setState` over and over and cause an infinite loop. Whenever we have arguments to pass in an `onClick` or `onChange` function, therefore, we hide it inside an anonymous function declaration. This means it will trigger, only on click.

</details>

**Let's review what happens when a user clicks on our button:**

* The `onClick` function is called with the product's name as an argument. `buySingleProduct` is called in the parent (`ProductPage`) component.
* Using the `name` argument, `buySingleProduct` maps through the state, finds the product the user clicks on, and creates a new state where that particular quantity is decreased by 1.
* `setState` is called with the new object.
* The `ProductPage` component re-renders, also triggering a re-render of **all** `ProductItem` child components.
* The user sees the product's quantity decrease by 1.

## Conclusion

Clearly, there's a lot of syntax we're introducing to you here, but there's also a lot of creative work that goes into deciding exactly what information should be stored in which component, which component should display what, and so on. We highly recommend thinking about this stuff as early as possible when you get around to building your own full-scale React projects!
