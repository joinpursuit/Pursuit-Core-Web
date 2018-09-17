# Props and Component Structuring

## Resources
* [Container Components](https://medium.com/@learnreact/container-components-c0e67432e005)
* [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)

## Key Terms

* Props
* Functional vs. Stateful Components
* Container Components vs. Display Components

## Introduction

So. Thus far, we've been making apps using single components. These components have been doing everything - they've been collecting and processing information, they've been listening for events, and they've been rendering content to the user.

This is OK for small projects, but it isn't fully taking advantage of what React's component structure is good at. Namely, components are *reusable*. You can make one component and re-use it dozens of times on a single page!

The best real-world example of this is Amazon's product search. Take a look at, say, a search for t-shirts:

![amazon](./assets/amazon_screen.png)

Each of these t-shirts represents a separate instance of the **exact same component**. This component (probably called `ProductItem` or something like that) is used in the search, in product recommendations, possibly in advertisements on other sites - it's used everywhere.

*Wait,* you might say. *Isn't it inefficient to render several components like this, especially if each one is sending an AJAX request?*

Well, insightful theoretical student, you're right. It isn't feasible to send fifty AJAX requests whenever a page loads, even if you're Amazon.

Luckily, we don't have to. Enter **props**.

## Props

In order to discuss props, first we've got to talk about state. State, as you know, is a way for us to store, update, and re-render information inside a component. Props allow components to render other components and to **pass information to those components**. Props don't replace state, per se - we still need to store the information somewhere, and props don't store information.

However, props can allow us to intelligently divide responsibilities between components. We can have components whose only job is to make AJAX requests and store state, and we can have components whose only job is to receive props and render information.

Let's go back to our Amazon search page example. Our `ProductItem` components are the *child components* of a component called, say, `ProductPage`. `ProductPage` makes one large AJAX request on the first render of the page, getting an array with fifty products. It sets a part of state, perhaps `this.state.products`, with this array. Each individual product is then sent down to a `ProductItem` component by way of props, which processes the product's information into something that looks nice for the user.

Let's take a look at a small-scale example of this:

## [Props Example](https://codesandbox.io/s/zlo5z05w7x)

Okay, so let's discuss first how this is different from what we described above:

* There's no AJAX request. We are simply pre-populating the state with an array of products. This is just skipping that step - imagine we made an AJAX request and used `setState` to get our `products` default state.
* There isn't fifty products. There's four. Four versus fifty shouldn't change anything, but it's worth noting.

Besides that, this is more-or-less an unstyled version of exactly we were describing above. Let's look at the `ProductPage` component first:

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

What? Okay, let's break this down. First, we're breaking out `products` from our state. Then, we're creating a variable called `listItems`, which maps through our `products` part of state and returns... React components called `ProductItem`.

These components have certain attributes, but at first glance, they don't really make sense to us - there's no `className`, no `onChange`, nothing that we've really used before. That's because, **while these items share the same syntax, they don't translate directly to HTML attributes.** Instead, they represent *props* that we're passing down to our `ProductItem` component.

Think of props as arguments for a component. They compile into an object called `props`, which the child component can key into and use to render stuff. In this case, for each item in our `products` part of state, we're inputting the name, manufacturer, and price into our `ProductItem` component. In fact, you can literally write a component that doesn't need to store state **as a function**. We call this a functional component, and `ProductItem` is our first example.

### `ProductItem`

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

Then, true to our word, we're invoking `ProductItem` as a **functional component**. We are defining it as an anonymous function that takes its `props` as an argument. Then, it breaks out those *same three props that we put in the `ProductPage` component* and puts them in an `li` tag, which it returns.

Importantly, what you're seeing on the right-hand side of the sandbox is **four separate instances** of this component, each with different props. We create those instances in our `map` method in our parent component.

## Component Architecture

In our previous example, you might have noticed that our `ProductPage` component doesn't really render much of anything independently. In fact, its main purpose is to handle its state and send props down to child components. It's only when we get to the `ProductItem` components that we actually render something on the page.

It turns out, this is a good thing! It follows a design philosophy called **separation of concerns**, which basically means that, as much as we can, we should break out different functionalities into different parts of our app.

Why is this important? Well, let's go back to our Amazon example. Components for small product items can show up on a search page **or** as a recommended/related item on a product page. If we simply have `SearchPage` and `ProductPage` components that handle everything, we'll have to re-write the same JSX to render the same product previews. Much easier and more efficient to make a `ProductItem` or `ProductThumbnail` component and use it across the site.

Additionally, if we have a parent component that does a single AJAX request and passes the result down as props to several different components, as we saw above, we can avoid a situation where each separate component fires an AJAX request, which would be taxing to our backend server or remote API.

Finally, it keeps us organized and it keeps our app consistent. The higher up in our component structure we can store state, and the more components share the same state, the more consistently we present information to the user, and the less we have to update the same information in different places.

At the end of the day, a full-fledged app should have this kind of component structure:

![diagram](./assets/props_diagram.png)

## Identifying and Overcoming Architectural Problems

Okay, so this architectural pattern has tons of advantages. What are the drawbacks? Well, the main one is that we can no longer use `setState` in the way that we're used to. Functional components can't independently use `setState`, and therefore, will never re-render.

**Or will they?**

The only example of props we've given you so far uses props to pass data between components. But what about **passing functions between components**? It's not as weird as you might think!

So, in this next example, we're going to be as explicit as possible about **container components** versus **display components**.

**Container components** will store the state *and* functions to edit that state. They will then pass their state and, if necessary, those functions to their lower-order *display* components. These components can then include `onClick` or `onChange` functions in their JSX that *fire the functions that were passed as props* in order to change the state of their parents.

Once those functions fire, the *container*, parent component will re-render, triggering a re-render of all components the container is rendering - with **new props** based on the function that was fired.

Let's look at this in action:

## [Props Example 2](https://codesandbox.io/s/rly61lv97p)

At face value, this looks pretty similar to our previous example. However, we've implemented product stock quantities, and the functionality for our user to buy a product and see the stock decrease. Let's observe a few key differences:

### Difference 1: `ProductPage` stores product quantity and function to decrease quantity, passing that function to our `ProductItem` components

So, first in our state we add a key, `quantity`, to each product. Then, we create the function `buySingleProduct`:

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

So this function might look a little intense, but let's break it down into smaller pieces. Critically, our function accepts an argument, `name`, which refers to the name of the product we want to buy.

Using the name, we then map through each product in our state, creating a new object. If the product's name is the name we input as our argument, and if the product's quantity is above 0 (can't sell stock we don't have), we decrease the product's `quantity` value by 1. Otherwise, we simply return the product unchanged. Then, we update our state.

But wait - where do we call this function? It wouldn't make a whole lot of sense to call it in this component - this component isn't rendering anything, and it's a tall order to ask our user to click on something that isn't there. So, we don't. We pass the *function itself*, un-invoked, as a prop to each `ProductItem` component.

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

Note that we don't have to
