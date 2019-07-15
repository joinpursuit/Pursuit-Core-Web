# Local Setup

## Resources
* [`create-react-app`](https://github.com/facebook/create-react-app)
* [Babel Docs](https://babeljs.io/docs/en)
* [Webpack Docs](https://webpack.js.org/concepts/)
* [Webpack/Babel Tutorial (don't worry about the React stuff)](https://www.valentinog.com/blog/react-webpack-babel/)

## Introduction

Thus far, we've been using Codesandbox to create and structure our React applications. This has been good - Codesandbox is a great, user-friendly resource for creating simple React applications. However, as developers, we've got to learn how to create React applications locally.

There's just one problem. Browsers know how to read HTML, CSS, and JavaScript, but they are a bit behind the times. Specifically, they don't know how to handle most ES6 code. Also, full-scale React apps are big file structures which don't necessarily download well in the browser. Ideally, we want something to **translate our ES6 code into ES5 and condense it all into one, easily-downloadable file**.

We're going to teach you a couple of ways to do that:

* `create-react-app` - This NPM module is a great resource for getting up and running quickly. Originally conceived as a tool for hobbyists and developers looking to experiment, it's recently been re-prioritized by its developers as a tool that's capable of handling full-scale production applications. Most of the time, unless you're looking to do specific configurations/optimizations, we're going to be using this module to quickly generate, compile, and run React applications.
* From scratch, using Webpack and Babel - `create-react-app` utilizes Webpack and Babel behind the scenes, but it's still a good idea to understand, at least generally, what these modules are and how they work.

Let's get into it:

## `create-react-app`

So, in order to use `create-react-app`, start by going to your terminal and typing:

`npm install -g create-react-app`

This will install `create-react-app` globally on your machine. Then, all you should have to do is go to the directory that you want to generate an app in in your terminal and write:

`npx create-react-app my-app`

Where `my-app` is whatever you'd like your app to be named. `create-react-app` will then install and configure everything you need, including React, all accompanying modules, and Webpack and Babel, bundled in `create-react-app`'s version as `react-scripts`.

It'll also outline starting scripts for you, so all you should need to do is `cd` into your new app and type:

`npm start`

Now go to `localhost:3000` and see that sweet, sweet new app! At this point, you should be good to start developing - `create-react-app` updates as you save your work, so you shouldn't have to restart your server after `npm start`-ing.

### A Note on File Organization

After you create an app, go ahead and open it up in the text editor of your choice. We'd like you to notice the file structure here. You've got your `package.json`, `.gitignore`, and `README` files at the root level of the file structure, but beyond that, there isn't much. We've got two folders here: `src`, which contains all of our components, and `public`, which contains our single HTML file and any CSS that we might need.

There's not much more to it than that, but we wanted you to notice that, as it's a very common way to start organizing your React files - separating out your components into their own space is a good idea.

## Webpack and Babel

If you'll remember, at the beginning of these notes we outlined the problems with putting a React app in the browser. One of these was translating our ES6 code to code that's readable by Chrome or Firefox. The other was condensing our code into one file so that it can be easily downloaded. Webpack and Babel are our solutions to each of those problems:

* **Babel** is a tool that automatically converts code that you've written in ES6 to ES5. It's that simple. Some of the things we've been doing are even more advanced than ES6, so we might have to tweak it slightly, but largely, it just works.
* **Webpack** is a tool that bundles your entire project - including all of your modules, code, etc. - into small, easily-downloadable files. These files look ugly to us as developers, but they're nicer for browsers.

### [Example Webpack/Babel App](./webpack-app)

This app is a cloned version of our ice cream checkbox app that runs locally. Feel free to download it and poke around. We're focusing on three files today:

#### `package.json`

```js
{
  "name": "webpack-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --open --mode development",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/core": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.2",
    "css-loader": "^1.0.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "react": "^16.5.0",
    "react-dom": "^16.5.0",
    "style-loader": "^0.23.0",
    "webpack": "^4.18.0",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.8"
  }
}
```

We added a log of dependencies here! There's a lot that's bundled into `react-scripts` that we have to have in order to run Webpack ourselves. We also added a `start` script that runs `webpack-dev-server`, which refreshes our server when we make changes, and a `build` script, which shows us what our code would look like when it compiles in the browser. You shouldn't have to use `build` too often, but it's nice to have.

#### `.babelrc`

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

This file contains a very small configuration scheme for Babel. We've added a few presets such that Babel knows that it's dealing with React code, and we've added a plugin which allows us to use JavaScript classes and add functions to them in ES6 notation, which normally wouldn't allow them to use `this` properly.

#### `webpack.config.js`

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};
```

In this file, we're telling Webpack how to bundle each file type that it might encounter. If you're working with other filetypes (say, images), you might have to add more `rules` to this object. Then, we use `HtmlWebPackPlugin` to indicate to Webpack where our actual HTML file is to be found.

## Takeaway: One Size Does Not Fit All

If all of this seems confusing to you, know that in the majority of cases, especially in this class, it's alright to use `create-react-app`. Webpack, especially, is a notoriously convoluted tool to configure, and depending on your needs, you might not need to get too deep into it. If you come out of this able to create your own React apps locally, no matter which strategy you use, you're doing just fine.
