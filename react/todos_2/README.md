# React Todos 2

* [Todos v2 - CodeSandbox](https://codesandbox.io/s/6j50498k8k)

## Introduction

Using the properties of objects and state, we can start doing more complex things on the frontend than simply render information. Let's make a to-do app that tracks whether the user has completed it or not.

## [Todos v2: Toggle Completed](https://codesandbox.io/s/6j50498k8k)

Let's build on the first version of our app and add a boolean `completed` property that the user can toggle for each of our to-dos.

First, let's modify the `newTodo` object that we are creating in the `addTodo` method of the `TodoApp` component:

```js
  ...
  const { textInput, todos } = this.state;
  const newTodo = {
    text: textInput,
    completed: false,
    id: this.generateId()
  };
  ...
```

Now, whenever we create a new todo, it will have a completed property set to `false`. Next, we will create a `toggleCompleted` method for the `TodoApp` component. This method will take as input the `id` of the to-do we wish to toggle:

```js
toggleCompleted = id => {
  const { todos } = this.state;
  const newTodos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    } else {
      return todo;
    }
  });

  this.setState({
    todos: newTodos
  });
};
```

As before, we will avoid modifying the existing `todos` array. Instead, we will create a _new_ to-dos array by mapping over the existing one. For each `todo` we will check if its `id` is equal to the one passed as an argument:

* If the `id`s are _not_ equal, we will simply return the existing `todo`.
* If the `id`s _are_ equal, we will pass back a new object:
  * This object will contain all properties of the existing `todo`, except that the value of its `completed` property will be flipped (`true` becomes `false` and vice versa).

## Todos And The Object Spread

Notice that object spread operator in the above function. As we iterate over the existing `todos` array an map it to a new array, once we encounter the `todo` with the `id` we've been looking for, we can return the following:

```js
{ ...todo, completed: !todo.completed }
```

Which is exactly what we wanted to do: this object will contain all properties of the existing `todo`, except that the value of its `completed` property will be the inverse of the current todo.

## Passing the `id`

The last bit we need to do is to use the id of each todo when calling `toggleCompleted`. This does not mean we must make our `TodoItem` components stateful. What we will do instead is utilize the id and the function together in an anonymous function call for the `onClick` of each of our `Todo`s:

```jsx
const TodoItem = ({ todo, toggleCompleted }) => {
  const { id, text, completed } = todo;
  const complete = completed ? "completed" : "";

  return (
    <li className={complete} onClick={() => toggleCompleted(id)}>
      {text}
    </li>
  );
};
```

Remember, the above syntax in `onClick` prevents our app from calling `toggleCompleted` immediately, resetting the state, and causing an infinite loop.

Alternatively, we can redefine the `onClick` function inside the `TodoList` component as we pass props:

```jsx
const TodoList = ({ todos, toggleCompleted }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem todo={todo} toggleCompleted={() => toggleCompleted(todo.id)} />
      ))}
    </ul>
  );
};
```

And keep our `TodoItem` component simpler:

```jsx
const TodoItem = ({ todo, toggleCompleted }) => {
  const { id, text, completed } = todo;
  const complete = completed ? "completed" : "";

  return (
    <li className={complete} onClick={toggleCompleted}>
      {text}
    </li>
  );
};
```

### The `completed` className

Finally, to create the `line-through` effect, we define a css class `.completed`:

```css
.completed {
  text-decoration: line-through;
}
```

add the css class conditionally to each `TodoItem`.

```jsx
const TodoItem = ({ todo, toggleCompleted }) => {
  const { id, text, completed } = todo;
  const complete = completed ? "completed" : "";

  return (
    <li className={complete} onClick={() => toggleCompleted(id)}>
      {text}
    </li>
  );
};
```
