# Container Component

The container component is useful for fetching data from an external source and passing that data along to children components. Typically, the data fetched is stored within state.

```js
import {Component} from 'react'

const ListItem = props => {
  return <div>{props.todo}</div>
}

class TodoListContainer extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  } // constructor
  componentDidMount() {
    // fetch data
    ApiCallMethod()
      .then(data => {
        this.setState({todos: data});
      })
  } // componentDidMount
  render() {
    return <div>
      {this.state.todos.map(todo => {
        return <ListItem todo={todo} />
      })}
    </div>
  }
} // render
```

In this example, we have a stateless component - **ListItem** - that simply gets a todo and renders it. The T**odoListContainer** component fetches data from some API call and simply passes this data along to **ListItem**. The result is a tidy separation of concern between how we *fetch* data and how we **display** data. What's neat here is that the **ListItem** component could then be used for other purposes in another part of the app.

**Potential Usecases**
Use this pattern when the app renders data from disaparate / multiple data sources. This is especially useful to keeping react code modular and avoiding repetition.
