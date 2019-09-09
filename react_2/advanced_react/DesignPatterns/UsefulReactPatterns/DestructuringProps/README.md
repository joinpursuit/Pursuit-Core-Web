# Destructuring Props

Props, which are essentially objects, can be destructured in a component definition.

```js
const Component = (props) => {
	return <div>{props.foo} | {props.bar}</div>
}
```

This can be **destructured** and written as:
```js
const Component = ({foo, bar}) => {
	return <div>{foo} | {bar}</div>
}
```

Because **foo** and **bar** are both **properties** of **props**, it is possible to destructure them in the params of the Component definition. Note this is also possible when passing along *any* objects from one function into another.

Also note that this pattern is possible:

```js
const Component = ({foo, bar, ...props}) => {
	console.log('all props', props)
	return <div>{foo} | {bar}</div>
}
```

In this example, we are leveraging the es6 **rest** operator to pass along the *rest* of the **props** but specifically calling out `foo` and `bar` properties of **prop** itself.

**Potential Usecases**
This is mainly syntax sugar - can be super useful if you want to make it easier to grok the props that a component requires. Remember, this is *also* possible using the **Component.PropTypes** proptery.
