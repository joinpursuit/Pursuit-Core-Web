# Conditional Rendering

Inline conditional rendering on the JSX level can sometimes be useful, a few of the possible patterns are demonstrated via example below:

### if conditional

```js
{condition && <div>this will display if condition is true</div>}
```

### fallback conditional

```js
{condition || <div>this will display if condition is NOT true</div>}
```

### if-else conditional

```js
{condition 
	? <div>this will display if condition is true</div> 
	: <div>this will display if condition is NOT true</div>
}
```

In situations such as above (for the **if-else conditional** considerations), it is probably a LOT more preferable to do something like:

```js
const TruthyComp = () => <div>true!</div>
const FalsyComp = () => <div>false!</div>

const CompToDisplay = condition ? TruthyComp() : FalsyComp();

<CompToDisplay />
```

In the example above, we combine our stateless components pattern with the ternary operator to define an output component that is essentially the **TruthyComp** or the **FalsyComp**, dependent on condition. This composite pattern is slightly easier to read, albeit more lines of code.

**Potential Usecases**
Conditionals within JSX are used **all** the time in React apps for managing how to render bits of the application based off of state or prop changes. Generally, if the conditional is complex **OR** the renderable JSX is complex, prefer to opt for using the **Stateless** component pattern technique displayed above.
