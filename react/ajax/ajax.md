# React - AJAX

## Resources

* [AJAX Requests in React: How and Where to Fetch Data](https://daveceddia.com/ajax-requests-in-react/)
* [axios - github](https://github.com/axios/axios)
* [The Dog API](https://dog.ceo/dog-api/)

## Introduction

We've just learned about lifecycle methods - now we're going to use them to handle asynchronous requests to external APIs! This is where React really starts to show its power - when you can query an API and `setState` with the result of that query. This is what React was made for, and once you get the hang of it, it's a way nicer way to interact with APIs than plain JavaScript.

## [Random Dog Pictures v1](https://codesandbox.io/s/m4oz8yqlvx)

Remember our old friend the Dog API?

Let's make a React component that will fetch (no pun intended) a random dog picture and display it to the user. A picture will be fetched when the component loads on `componentDidMount`. After that point, the user can click a button and get a new random dog picture.

We will be making AJAX `GET` requests to the [/api/breeds/image/random](https://dog.ceo/api/breeds/image/random) route on this API to get a URL to a random dog picture. The response is a JSON object that looks likes this:

```JSON
{
  "status": "success",
  "message": "https://dog.ceo/api/img/bulldog-french/n02108915_618.jpg"
}
```

### Axios on CodeSandbox

Remember Axios? To review, it's a promise-based JavaScript library that is like `fetch`, but nicer.

To use Axios on CodeSandbox, we need add it as a dependency to our project. We do this in he left-hand side menu, by clicking on `dependencies` -> `Add Package`, typing _axios_ in the new window and clicking on the first result. Then, we import the _axios_ library to our project by adding a `require` statement:

```js
const axios = require("axios");
```

This is equivalent to writing, in a local React project, `npm install --save axios`.

### `RandomDogPic.js`

To get started with the random dog pictures project, we will define a state with a single property `imgURL`:

```jsx
class RandomDogPic extends Component {
  constructor() {
    super();

    this.state = {
      imgURL: ""
    };
  }
  ...
```

We will then define a method to make the AJAX call to get a random dog image. We use the axios `.get` method to make the request. This returns a promise, so we chain the `then` method to handle the response when it arrives. To get the content of the response using axios, we need to get the content of the response's `data` property. Recall that the Dog API returns a JSON object with two properties: `status`, which lets us know that the request was successful, and `message`, which contains the image URL.

```jsx
  getRandomImage = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then(response => {
        this.setState({
          imgURL: response.data.message
        });
      });
  };
```

Now that we've defined the `getRandomImage` method, we can define the `render` function:

```jsx
  render() {
    const { imgURL } = this.state;
    return (
      <div>
        <p> Random Dog Pictures v1 </p>
        <div>
          <img alt="" src={imgURL} />
        </div>
        <p>
          <button onClick={this.getRandomImage}> one more! </button>
        </p>
      </div>
    );
  }
```

Finally, we define the `componentDidMount` method to load an image as soon the component is mounted:

```js
componentDidMount() {
  this.getRandomImage();
}
```

### Dealing with AJAX Errors

An AJAX request can fail in many ways. Most of these errors can be handled by defining a `catch` method to our axios request. For now, we will simply log the error to our console.

```jsx
getRandomImage = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then(response => {
        this.setState({
          imgURL: response.data.message
        });
      })
      .catch(err => {
        console.log("error fetching image: ")
      })
  };
```

Later on, we will deal with errors in a more public way, so that the user can know that there was a network error. Otherwise, the user may assume that our website is not working correctly.

## Activity

Fork this sandbox. Add `debugger`s and/or `console.log`s throughout each method to visualize exactly what happens when.
