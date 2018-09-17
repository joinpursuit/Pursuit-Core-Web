# Stateless Components

React components that do not handle any kind of state can be expressed much more simply:

```js
const TitleBar = () => <h1>MyWebsiteTitleLOL</h1>
```

Yes, this is essentially a normal function that returns JSX. We are able to pass in props and a context object as well, should we choose to:

```js
const TitleBar = (props, context) => {
	return <h1>{props.websiteTitle}</h1>
}
```


These components are particularly useful if you want to define a series of app components that simple display information without much additional logic.

As a side note, it is possible to assert `propTypes` on stateless components:

```js
const TitleBar = (props, context) => {
	return <h1>{props.websiteTitle}</h1>
}

TitleBar.propTypes = {
  websiteTitle: PropTypes.string
}
TitleBar.defaultProps = {
  websiteTitle: "MyWebsiteTitleLOL"
}
```

**Potential Usecases**
Use stateless components when you just want to display data from props generically (ie: this component is resuable because it shows up often in your app). Remember since you are able to pass along props, you *can* pass along click events, etc into these components as well.
