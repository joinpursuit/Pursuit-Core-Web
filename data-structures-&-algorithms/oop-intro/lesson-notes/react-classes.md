# React Classes

If you've used React, you may have either written or seen code with classes

```js
class MyDiv extends React.Component {
  constructor(props) {
    super(props);
  }

  myFunc() {
    console.log("when you click the div, this should log");
  }

  render() {
    return <div onClick={myFunc}>My Div</div>;
  }
}
```

What parts of this code can you now explain this code based on what you've learned?
