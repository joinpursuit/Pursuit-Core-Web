# Spreading Props / Proxy Component

It is possible to write an uber generic component that can apply an arbitrary number of prop attributes. Consider the following example:

```js
const GenericButton = props => {
	return <button {...props} />
}
```

To use this component:

```js
<GenericButton className="foobar" type="submit">Hello!</GenericButton>
```

^^^ The above will render as:

```js
<button class="foobar" type="submit">Hello!</button>
```

This pattern is useful when there are default button styles that should be honored across the app but there are also instances of button types that are slightly different.

Here's a more full fledged example of this pattern in action:

```js

const GenericButton = props => {

	const defaultClassNames = ['btn'];
	
	const {classNames} = props;
	
	// merge props classnames with defaultClassNames
	const allClassNames = defaultClassNames.concat((classNames || "").split(" ")).join(" ")
	
	return <button {...props} classNames={allClassNames}/>

}
```

Now, from the example above we can now do a few things:

```js
// Generic button is now super simple
<GenericButton>Hello!</GenericButton>
// renders as: <button class="btn">Hello!</button>

// A "danger" button
<GenericButton className="btn-danger">Danger</GenericButton>
// renders as: <button class="btn btn-danger">Hello!</button>

// A clickable button
<GenericButton className="btn-primary" onClick={()=>alert()}>Say Hello!</GenericButton>
// renders as: <button class="btn btn-primary" onclick="...">Hello!</button>
```

As a side note, the pattern of defining generic components with passthrough props as demonstrated above is called the **Proxy Component** pattern.

**Potential Usecases**
Use this pattern if you want to define generic app components like buttons, cards, etc - stuff that you want to be able to drop in to places easily but may have a few variations in style or functionality depending on context. The ability to passthrough props means you can configure your Proxy Component to behave or look slightly differently based on the props passed in - which can be super useful to rendering different versions of this component based on state changes like user click or invalid form inputs.
