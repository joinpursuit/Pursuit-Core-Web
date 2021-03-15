# Personal Webpage

Let's get back into the HTML/CSS groove, with a little React flavor. For this project, we'd like for you to do a little bit of pre-work:

* Create a codesandbox account.
* Fork [this project](https://codesandbox.io/s/xl58lnoo8p).
* Take a look at what's there.

Not much, right? Yeah, we've even removed the boilerplate code from `index.js`. All you should see is:

```js
import React from "react";
import ReactDOM from "react-dom";
```

Your task today is to make a **personal website** front page. You should have a header with your name and at least three sections describing different things about you.

## Section 1: Getting Started

First, however, you should make sure that your React DOM renders something. Make your React DOM render a `p` tag with the text `hello world!`. Try to do this by inserting HTML **directly into a `ReactDOM.render` method**. See if you can get your JSX to render directly!

Okay, so obviously, even though we *can* render JSX directly, components are still useful - at the very least for separating out information and keeping ourselves organized. Let's create a file called `Home.js` in our `src` folder. Make sure to import React, call your component function `Home`, and see if you can render your name in an `h1` tag.

Don't forget to import `Home` into `index.js` and put it in your `ReactDOM.render` method!

## Section 2: Next Steps

Okay, so we've rendered a `h1` tag from our `Home` component. Let's see if we can render a `p` tag with some important information. Add a `p` tag after your `h1` and put some text about yourself in there...

...What? It's not working! Or, at least, it shouldn't be.

This is because **a React component can only render one element at a time.** We are trying to render an `h1` and a `p` tag at the same time, which is a no-go. Try wrapping both of these elements in a `div` tag, or in a fragment: `<> </>`. You should see the error disappear and your lovely JSX compile!

## Section 3: Finishing your site

Alright, now that we've wrapped everything in a `div`, we have the ability to add however many elements we'd like. Add a few sections (with `h2` tags for the title and `p` tags for the body of each section).

Looking bare? Well, that's because we have no styling. Add CSS to accomplish the following:

* Import three fonts from [Google Fonts](https://fonts.google.com/) for your `h1`, `h3`, and `p` tags, respectively.
* Choose a background color. Ensure that your text has a color that appropriately differentiates itself from your background.
* Center all content on the page and make sure that each section is properly spaced from each other section. For this, you may use Flexbox, CSS Grids, or regular old padding and spacing.

## Bonus

Can a component render another component? Find out. Make each section its own component, and try to import and render them in your `Home` component.
