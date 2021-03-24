# The Component Lifecycle

## Resources
* [New Lifecycle Methods](https://blog.logrocket.com/the-new-react-lifecycle-methods-in-plain-approachable-language-61a2105859f3/)
* [React Documentation](https://reactjs.org/docs/react-component.html)
* [Interactive lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Terms
* Component Lifecycle
* Lifecycle Methods

## Objectives
* Explain the lifecycle methods that a React component goes through
* Explain why you have access to those methods
* Build an app that showcases key React component lifecycle methods

## Sample App

- [https://codesandbox.io/s/clever-curie-8t9l1](https://codesandbox.io/s/clever-curie-8t9l1)

# Introduction

The component lifecycle is a term that refers to a React component's timeline in your browser. Components are created, render content, update that content, and are destroyed. At each of these stages, you may want to influence or change the behavior of your component. By default, React has its own behavior for what it will do at each of these stages. However, it provides methods to the `React.Component` class that hook into each individual event. You can use these methods to change how your component will behave.

# Understanding the Lifecycle's Flow

![lifecycle](./assets/lifecycleMethods.png)


There are two *phases* during a component's lifecycle: the `Render phase` and the `Commit phase`.

## Render Phase

The render phase is responsible for establishing the changes that you want to make to the DOM. The methods in the render phase are called in a way known as *pure*. This means that, while React may call these methods multiple times in between committing changes, and the result should be the same as calling them once. Because of this convention, and because it can lead to nasty side effects, you should make sure that these methods won't have unexpected behavior if called multiple times. After the render phase is completed, React has established the changes that it wants to make.

## Commit Phase

During the commit phase, React takes the changes identified during the render phase, and actually manipulates the DOM to make the UI reflect the created, removed or updated components. Once the updated UI is fully visible to the user, it's usually safe to trigger changes that will cause a **re-render**, initiating this process over again.

## Lifecycle Methods

Lifecycle methods cut across both phases. They are divided into 3 main categories:

1. Mounting
1. Updating
1. Unmounting

Let's take a look at each category to understand when these methods are really firing, when you would want to add functionality to them, and why.

# Mounting

Mounting refers to a component being created and inserted into the DOM. There are 3 main lifecycle methods that get called during the mounting stage:

1. constructor()
1. render()
1. componentDidMount()

## [constructor()](https://reactjs.org/docs/react-component.html#constructor)

The constructor is called for a component before it is mounted. Most commonly, you set the initial state inside the constructor:

```js
constructor(props) {
  super(props);
  this.state = { displayValue: 0 }  
}
```

## [render()](https://reactjs.org/docs/react-component.html#render)

`render` is the The only **required** lifecycle method. As we've seen in previous lessons, `render` typically will return a React element created with JSX (such as `<div />`). The following are also valid to return in the `render` method:

- Arrays and [fragments](https://reactjs.org/docs/fragments.html)
- [portals](https://reactjs.org/docs/portals.html)
- Strings and numbers (render as text nodes)
- Booleans and null (render nothing)

`render` is called automatically during the mounting phase after our `constructor()`.

## [componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)

After `render` has been called, the DOM is updated and `componentDidMount` is called. This is a good time to do things that we might need to update in the initial state of our components. For example, we could fire off a network request to get some data, then call `setState` to render it to the user. We could also set up event listeners here.

You may be wondering: Why don't we do this initial work in the `constructor`? Remember: `constructor` is fired during the render phase, and therefore shouldn't fire off functions that might change what's being rendered. It is best practice to ensure that lifecycle methods in the render phase don't generate side effects, because they may be called by React multiple times.

# Updating

Once your component has been mounted, you may want to change how it looks to user. For example, clicking a button on a calculator app, or updating with real-time weather data from a network request. If anything in the component needs to change, you want the display to **update** after the component mounts.

## [render()](https://reactjs.org/docs/react-component.html#render)

`render` belongs in this stage, too. After the component has been mounted, there are three ways that `render()` can be called. Either:

1. The props change
2. `setState()` is called
3. `forceUpdate()` is called (do not use this)

Any of these will automatically call the `render` method.

## [componentDidUpdate()](https://reactjs.org/docs/react-component.html#componentdidupdate)

After rendering, `componentDidUpdate` will be called. This is not called after the first render, when `componentDidMount` is called. Think of it as a `componentDidMount` that fires whenever the component is re-rendered. This is an opportunity to do things like make additional network calls. From the React documentation:

```js
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Notice here that React gives us an argument for this method: `prevProps`. If a change in props caused this component to re-render, this can be confirmed by comparing `prevProps` with the current props. Then, we can make our component respond to the change in props. In the above case, after confirming we have a new user ID, we're making a network request.

>You may call setState() immediately in componentDidUpdate() but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance.

# Unmounting

Components are unmounted when they removed from the DOM during [reconciliation](https://reactjs.org/docs/reconciliation.html). Right before a component is removed, you can implement a lifecycle method to do any required cleanup.

## [componentWillUnmount()](https://reactjs.org/docs/react-component.html#componentwillunmount)

Inside this method, you should remove subscriptions, cancel ongoing network requests, and invalidate timers. If those don't apply to your component, then you don't need to implement this method.

Note that you shouldn't call `setState()` here. The component is about to unmount, so it will never be re-rendered.

*Other uncommon and deprecated lifecycle methods can be read about (here)[./bonus.md].*
