# Layout Component

The layout component is useful for asserting CSS grid/column structures around other react components that handle data rendering.

Consider the following example:

```js

import {Component} from 'react'

class HorizontalSplit extends Component {
  shouldComponentUpdate() {
    // this is only a container component as therefore should never
    // actually need to update itself
    return false
  }

  render() {
    <FlexContainer>
      <div>{this.props.leftSide}</div>
      <div>{this.props.rightSide}</div>
    </FlexContainer>
  }
}


<HorizontalSplit
  leftSide={<SomeSmartComponent />}
  rightSide={<AnotherSmartComponent />}
/>

```
(^^^ [example copied from here](https://reactpatterns.com/#layout-component))

In this example, the **HorizontalSplit** component is literally just a container - one that never "reacts" thanks to the `shouldComponentUpdate` lifecycle method.

Note we could also write it as follows:

```js

const HorizontalSplit = props => {
  return <FlexContainer>{props.children}</FlexContainer>
}
<HorizontalSplit>
  <SomeSmartComponent />
  <AnotherSmartComponent />
</HorizontalSplit>
```

The main difference here is that here, HorizontalSplit is leveraging the `props.children` to display the smart components.

**Potential Usecases**
Use this pattern when there's a strict grid layout that your app adheres to. In such settings, the top level components would always be layout components that render the "smart" components as children.
