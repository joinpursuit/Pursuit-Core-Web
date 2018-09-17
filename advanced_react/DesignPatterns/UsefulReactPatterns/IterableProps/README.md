# Iterable Props

In react, we are able to convert iterable props into JSX using popular **functional** array methods such as:

* **Map**
* **Filter**

For instance, suppose we had the following list of Todo items to render for our TodoList app:

```js
const list = [
	'wake up',
	'brush teeth',
	'shower',
	'get dressed',
];
```

It is possible to render this list into for instance a stateless component by:

```js
const ListItems = props => {
	return <ul>
		{props.list.map((todoItem, index) => {
			return <li key={index}>{todoItem}</li>
		})}
	</ul>
}

listItems(list); // from the const list above
```

For loops are not easily achievable in JSX however instead we can always use the **map()** method of array to *transform* our array of literally anything into an array of JSX elements (in the case of above, LI JSX elements) which *is* properly rendered.

Also note that the **key** property is required when looping through list items in JSX, typically it is sufficient to set this prop to be the **index** of the array item in the loop. The **key** prop is used by React to keep track of individual items in a JSX array collection.

Also note that this pattern is particularly useful for iterating through the **props.children** property of JSX, which is always an array. For example:

```js
<ListItems>
	<div>Wake up</div>
	<div>Brush Teeth</div>
</ListItems>
```

In the example above, the **Listitems.props.children** property would be an array with **two** DIV JSX elements. We could within the **ListItems** component definition take advantage of this **props.children** property to convert the **divs** provided into a more complex HTML component, for instance something with a checkbox (for completion) and some formatted text. To demonstrate a simple example:

```js
const ListItems = (props) => {
	return <ul>
		{props.children.map((todoItem, index) => {
			return <li key={index}>
				{todoItem}
				<input type="checkbox"/>
			</li>
		})}	
	</ul>
}
```

In this example, we convert the passed along children divs of **ListItem** into listitems (**`<li>`**) that also include a checkbox tag.

As a final note, suppose our `list` array now looked like this:

```js
const list = [{
	item: 'wake up',
	isCompleted: true,
	due: [some date],
}, {
	item: 'brush teeth',
	isCompleted: true,
	due: [some date],
}, {
	item: 'shower',
	isCompleted: false,
	due: [some date],
}, {
	item: 'get dressed',
	isCompleted: false,
	due: [some date],
}];
```

With a more complex array of objects like above (which is typical, since most react apps are interfacing with some sort of database output) we can now implement methods like **Array.filter** to achieve more useful results, such as:

```js
const ItemsCompleted = ({list}) => { // note example of Props Destructuring!
	return <ul>
		{list
			.filter(listItem => listItem.isCompleted)
			.map((listItem, index) => {
				return <li key={index}>{listItem.item}</li>
			}))
	</ul>
}
```
In this example, we first filter our collection down to only the items that are completed and *then* we apply our mapping logic from above.


**Potential Usecases**
Iterating over collections is done **ALL** the time in react. As such, it is useful to familiarize yourself with the **map**, **filter**, etc array functions. Chances are you'll be using them often!

**Challenge**
How would you iterate over a collection of list items if the list was stored as an object literal instead of an array?
```js
const list = {
	'guid1': {
		item: 'wake up',
		isCompleted: true,
		due: [some date],
	}, 
	'guid2': {
		item: 'brush teeth',
		isCompleted: true,
		due: [some date],
	}, 
	'guid3': {
		item: 'shower',
		isCompleted: false,
		due: [some date],
	}, 
	'guid4': {
		item: 'get dressed',
		isCompleted: false,
		due: [some date],
	}
};
```
