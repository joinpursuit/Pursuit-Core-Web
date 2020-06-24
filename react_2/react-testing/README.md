
[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Testing React Apps & Components

Let's learn how to test React Components in a user-centric way

### Learning Objectives

- Being able to integrate testing into any of your React Apps going forward
- Understand how to test simple individual React Components
- Learn to think about how to test more complex React Components
- How to test a React component using snapshots

## Intro

> The more your tests resemble the way your software is used, the more confidence they can give you. - [Testing Library: Guiding Principles](https://testing-library.com/docs/guiding-principles)

Testing your components can give you high confidence that they are working for your users as they are supposed to.
To accomplish this we will test our components with the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) which is part of the [Testing Library Project](https://testing-library.com/). 

![testing library diagram](assets/testing-library-diagram.png)

We want our tests to simulate as closely as possible what a user would see and do with our App components. 
the React Testing Library enables us to test our components for [**functionality** and not for **implementation**](https://testing-library.com/docs/intro); so that, if in the future
we refactor our components, say we move from react state to hooks (implementation) but functionality is unaffected our users should remain happy and our tests should still pass.

[What Is React Testing Library? - Video by LevelUpTuts](https://www.youtube.com/watch?v=JKOwJUM4_RM&feature=youtu.be)

### To Consider

* **Iteration speed vs Realistic environment**: Testing with the React Testing Library offer us a quick feedback loop between making a change and expecting a result. but it doesn’t model the browser behavior exactly. You must take into account that these tests run in `node` with mocked DOM ([jsdom](https://github.com/jsdom/jsdom)) and not in a browser. End to End (E2E) testing, on the other hand, done with a tool like [cypress](https://www.cypress.io/) offer us a real browser environment, but reduce the iteration speed and are flakier.

* **Components Unit vs Integration Testing**: With components, the distinction between a “unit” and “integration” test can be blurry. If you’re testing a form, should its test also test the buttons inside of it? Or should a button component have its own test suite? Should refactoring a button ever break the form test?

## Setup

### Clone Sample React App
Clone the repo [Testing-React-Apps Starter App](https://github.com/joinpursuit/Pursuit-Core-Web-Testing-React-Apps-Starter). You might remember the GoFundMe app from our React Props Lab

### Tools
* [Jest](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/)
* [jest-dom](https://github.com/testing-library/jest-dom) (comes with React Testing Library, but you will need the docs)
* [user-event](https://github.com/testing-library/user-event) (comes with React Testing Library, but you will need the docs)

Jest has been integrated into Apps made with `create-react-app` since long ago. The React Testing Library is also included in apps that were created with recent versions of `create-react-app` (v3.3.0 and above). 
You can verify by inspecting your dependencies in your `package.json`. 
Most likely you will never need to install them manually. 

If you are having trouble setting up or you need a custom setup make sure to take a look at the [docs](https://testing-library.com/docs/dom-testing-library/setup)

### Enable VScode Jest Autocompletion/Intellisense
Save the following snippet as `jsconfig.json` at the root of your app directory.
```json
{
  "typeAcquisition": {
    "include": [
      "jest"
    ]
  }
}
```

This will tell VScode to provide Autocompletion/Intellisense for your Jest expectations and matchers. See more info [here](https://code.visualstudio.com/docs/nodejs/working-with-javascript#__javascript-projects-jsconfigjson).


## App Review
Let's review the App we are going to test. This is a GoFundMe page replica.
This App is implemented as outlined in the screenshot below. Each rectangle is a separate React Component. 
![gofundme page mock screenshot](./assets/goFundMe.png)

For this App we end up with a component tree that could be represented as follows
![gofundme app component tree](./assets/component-tree.png)

## Hands On

### __tests__ Directory
Inside of `src/Components/` create a directory called `__tests__`. Here we will write our tests files. It is common practice to have a `__tests__` directory that contains all your tests.

### Testing DonationCard
Let's first test our component `DonationCard`. This is a simple component that is used as a list item in the **Recent Donations** section. By itself it takes a Donor's `name`, `message` and `amount` as props and displays them. Take a look at it bellow.

```jsx
// Components/DonationCard.js
import React from 'react';

const Donation = (props) => {
  return (
    <li className="media my-2">
      <div className="media-body">
        <h5 className="mt-0 mb-1">{props.name} donated ${props.amount}</h5>
        <p>{props.message}</p>
      </div>
    </li>
  )
}

export default Donation;
```

#### Test 
Let's test that when this component renders, it displays the information that was passed as props in the correct format.

Create a file `__tests__/DonationCard.test.js`
Let's read the test carefully, it should give us an idea of what it is doing.

```js
// __tests__/DonationCard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationCard from '../DonationCard';

test('DonorCard displays donor name, message and ammount', () => {

  // Render the component
  render(<DonationCard name="Alejo" message="Good Luck" amount="100" />)

  // Get elements by the expected text and assert they're displaying (in the document)
  const donationHeading = screen.getByText("Alejo donated $100")
  const donationMessage = screen.getByText("Good Luck")

  expect(donationHeading).toBeInTheDocument()
  expect(donationMessage).toBeInTheDocument()
})
```

##### Explanation
* React must always be in scope (context). That is why we need `import React from 'react';`
* We import `render` and `screen` from `@testing-library/react`.
  1. `render` lets us render a component
  2. `screen` lets us query to see if something is being rendered. `screen.getByText` is one of the queries we can use. `getByText` is a query that will return the first element in the screen that matches its argument string. There are many more queries available. See [Queries](https://testing-library.com/docs/dom-testing-library/api-queries) to learn more.
  3. `expect(donationHeading).toBeInTheDocument()`. Lets expect to have found a heading and a message being rendered and that they are in the document. `toBeInTheDocument` is a matcher that comes from `jest-dom`. Make sure to acquaint yourself with all [its matchers](https://github.com/testing-library/jest-dom), they will come very handy.

Run your test with `npm test` and check if it passes.

### Exercise
* Change something in DonationCard that would make your test fail.
* Share what you changed with the rest of the class or a neighbor


### Testing ProgressBar
Similar to how we tested `DonationCard` now you test the `ProgressBar` component. Take a look at `ProgressBar.jsx` and make sure you understand the component first.

Implement the following tests

```js
test('Displays the raised amount of total in the format: Raised $[amount] of $[total] in a heading', () => {})
test('Displays progress bar with proper percentage', () => {})
```

#### Displays the raised amount of total in the format: Raised $[amount] of $[total] in a heading

```js
describe('ProgressBar', () => {
  test('Displays the raised amount of total in the format: Raised $[amount] of $[total] in a heading', () => {
    const targetAmount = 1000
    const raisedAmount = 170

    render(<ProgressBar targetAmount={targetAmount} raisedAmount={raisedAmount} />)

    const statusHeading = screen.getByText(`Raised $${raisedAmount} of $${targetAmount}`)
    expect(statusHeading).toBeInTheDocument();
  })
})
```

This is most likely what you tried to do. However your test should be failing and giving you a hint as to why
```
Unable to find an element with the text: Raised $170 of $1000. 
This could be because the text is broken up by multiple elements. 
In this case, you can provide a function for your text matcher to make your matcher more flexible.
```
If we look into our component, we have a span with className `"text-muted"` insider our heading where we display the target amount. This is so that the target amount is styled with a different color. When our component is rendered we end up with our text being broken up by multiple elements. 
```html
<h2 class="mb-4" > Raised $ 170 of <span class="text-muted" > $1000 </span> </h2>
```

What we can do here is divide our check into two parts
```js
  const raised = screen.getByText(`Raised $${raisedAmount} of`)
  const target = screen.getByText(`$${targetAmount}`)

  expect(raised).toBeInTheDocument();
  expect(raised.tagName).toBe('H2')

  expect(target).toBeInTheDocument();
  expect(target.tagName).toBe('SPAN')
  expect(target.parentElement).toBe(raised)
```

<details>
  <summary> <strong>Another alternative</strong> </summary>

```js
  test('Displays the raised amount of total in the format: Raised $[amount] of $[total] in a heading', () => {
  const targetAmount = 1000
  const raisedAmount = 170
  const { getByRole } = render(<ProgressBar targetAmount={targetAmount} raisedAmount={raisedAmount} />)

  expect(getByRole('heading')).toHaveTextContent(`Raised $${raisedAmount} of $${targetAmount}`)
})
```
**Note**: Make sure to understand the `getByRole` query and `toHaveTextContent` matcher
</details>


#### Displays progress bar with proper percentage
```js
test('Displays progress bar with proper percentage', () => {
  const targetAmount = 1000
  const raisedAmount = 170
  render(<ProgressBar targetAmount={targetAmount} raisedAmount={raisedAmount} />)

  const progressText = (raisedAmount * 100 / targetAmount) + "%";
  const progressBar = screen.getByText(progressText);
  expect(progressBar).toBeInTheDocument()
  expect(progressBar.style.width).toBe(progressText)
})
```

##### Explanation
Note that this component has a bit of logic to it. It calculates a percentage based on the values for `targetAmount` and `raisedAmount`. How do we test that?

* Render the component as we have done in the past passing some props
* Do the math for what we expect to be displayed
* Get the progress bar element by the expected text what would display. 
* Expect that `progressBar` is in the document and that its width its the same as what is displaying.


### Testing Form.jsx

The Form component has four tests but we will focus on only two of them. To access the rest of the tests make sure to exmplore the [GoFundMe App Fully Tested: `tested-app` branch](https://github.com/joinpursuit/Pursuit-Core-Web-Testing-React-Apps-Starter/tree/tested-app)

#### Handles input changes with `handleFormInput` when typing or editing a value
Note that here we are going to test a function that gets passed as props: `handleFormInput`, and we want to check if that function is being called as a user would type text into the form fields. We will do so with [Jest mock functions](https://jestjs.io/docs/en/mock-functions.html)

```js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form';

describe('Form', () => {
  test('Handles input changes with handleFormInput when typing or editing a value', () => {
    const handleFormInputMock = jest.fn()

    render(<Form formDonor={""} formMessage={""} formAmount={""} handleFormInput={handleFormInputMock} />)

    const nameInput = screen.getByLabelText("Name")
    const messageInput = screen.getByLabelText("Message")
    const slider = screen.getByLabelText('Amount to Donate')

    userEvent.type(nameInput, "Bob")
    expect(handleFormInputMock).toHaveBeenCalled()
    expect(handleFormInputMock).toHaveBeenLastCalledWith("nameInput", "Bob")

    userEvent.type(messageInput, "Here to support")
    expect(handleFormInputMock).toHaveBeenLastCalledWith("messageInput", "Here to support")

    fireEvent.change(slider, { target: { value: 500 } })
    expect(handleFormInputMock).toHaveBeenLastCalledWith("amountInput", "500")
  })
})
```

##### Explanation
* **Arrange**
  * Create a Jest Mock function with `jest.fn()`. This will let us check if the function was ever called and with what arguments.
  * Render form and pass `handleFormInputMock` to our component as prop
  * Get input fields by their respective labels (as a user would be able to find them as well) with [`getByLabelText`](https://testing-library.com/docs/dom-testing-library/api-queries#bylabeltext). Make sure to review the [all possible queries](https://testing-library.com/docs/dom-testing-library/api-queries)
* **Act**
  * Using [`userEvent.type()`](https://github.com/testing-library/user-event#async-typeelement-text-options) simulate a user typing text in the fields
  * Using [`fireEvent.change()`](https://testing-library.com/docs/dom-testing-library/api-events) fire a change event on the slider to set it to `500`. 
  **Note**: `fireEvent` is under the hood of all `userEvent` methods. `userEvent` simulates a user better but it does not have a way to simulate moving a slider to a specific value yet. If you can't do it with `userEvent` try with `fireEvent`. To understand make sure to check their respective docs
* **Assert**
  * Check that `handleFormInputMock` was called with `expect(handleFormInputMock).toHaveBeenCalled()`
  * Check that the mock function was called with the expected arguments values last with `expect(handleFormInputMock).toHaveBeenLastCalledWith("nameInput", "Bob")`
  * Other mock [functions matchers](https://jestjs.io/docs/en/mock-functions.html#custom-matchers) are
    * `expect(mockFunc).toHaveBeenCalledWith(arg1, arg2)`

#### Handle form submission with handleSubmit
```js
test('Handle form submission with handleSubmit', () => {
  const handleSubmit = jest.fn()
  render(<Form handleSubmit={handleSubmit} />)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  expect(handleSubmit).toHaveBeenCalled()
})
```

###### Explanation
* **Arrange**:
  * Crete `handleSubmit` mock function
  * Render the form and pass `handleSubmit` mock function as prop
  * Get the rendered form with `getByTestId`. Note that this is necessary because there is no way to get a form with any of the other queries. This requires that in you component you pass form `data-testid="form"` attribute like so: `<form onSubmit={handleSubmit} data-testid="form">`. Use `data-testid` as a last resource when you cannot get an element by any of the other queries
* **Act**
  * Simulate submitting a form with `fireEvent.submit(form)`
* Assert
  * Check that the mock `handleSubmit` function was called `expect(handleSubmit).toHaveBeenCalled()`

**Notes** Read
* [How to test onSubmit in react-testing-library](https://kula.blog/posts/test_on_submit_in_react_testing_library/)

## Testing Mindset
99% of you tests you will always need tree steps: **Arrange**, **Act** & **Assert**

#### Arrange
Rendering, passing props and prepping your component to be tested
The `render` method renders a React element into the DOM and returns utility functions for testing the component.

#### Act
Fire events and simulate user interaction. The `fireEvent.*` methods and the `userEvent.*` methods allows us to fire events to simulate user actions.

#### Assert
Check with `expect` and matchers that given what was rendered and the user event simulated you got the expected results. For example after the user hits submit you expect a message to appear on the screen.

### Testing App.js
See the [GoFundMe App Fully Tested: `tested-app` branch](https://github.com/joinpursuit/Pursuit-Core-Web-Testing-React-Apps-Starter/tree/tested-app) `App.test.js`

## Snapshot testing with Jest and React
Snapshot testing is a way of testing react components, making sure that the components don't unpredictably change what they render. 

The basic idea behind a snapshot is:

* Write a test for a component that creates a snapshot
* Run the test. This creates a snapshot file, which looks a bit like JSON. The snapshot file will be committed with all our other code into git.
* The next time the test runs, we can compare it to the existing snapshot. If they are different, the test fails.

Snapshot testing is only one way of testing react components. It doesn't allow us to look for specific properties or values, only that the component hasn't changed unexpectedly. We'll talk about another method as well.

### Snapshot Setup

Clone down the [example repo here](https://github.com/joinpursuit/FSW-Jest-Testing-React). Install the dependencies with `npm install` and open it up in your code editor.

In order to make snapshots of our react components, we have to use a package called `react-test-renderer`, so you'll notice that it's already installed in `package.json` as a devDependency.

In `create react app` projects, the convention is to keep our tests in a folder with a funny looking name, called `__tests__`. Inside of that you'll see a similarly named folder called `__snapshots__`, which contains...you guessed it!

### Overview 

Look into the `__tests__` folder and open up the `ItemContainer.test.js` file. 

In the test case, we're rendering the actual component (passing in the required props) using `react-test-renderer` and saving it to a variable. That variable is actually an object, and then we call `.toJson()` on it and store that in a variable.

Then we write our actual assertion - we expect the stringified component to match what's in the snapshot. In this case, we already have a snapshot, but if we were writing this for the first time and ran the test, the snapshot would get created automatically.

So what does that snapshot look like? Go open it up. You'll see an html-like version of your react component. 

You should commit these snapshots into git alongside all your code. Because these snapshots are meant to be viewed by humans, both jest and git will tell you when they have changed. Let's see what that looks like.

### Changing components that have snapshots

In order to see what happens when the snapshot changes, we have to modify the way the component renders. In this case, we'll start super simple by just adding a class name to the `Item` component.

Let's run `npm test` first to make sure everything works!

```
PASS  src/__tests__/ItemContainer.test.js
  ✓ ItemContainer renders a title and count (10ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        0.925s, estimated 1s
Ran all test suites.
```

Fantastic.

Once that's done, add the `bold` class to the second paragraph tag.

```js
const Item = ({...props}) => {
  return (
    <div className="item">
      <p>{props.title}:</p>
      <p className="bold">{props.count}</p>
    </div>
  )
}
```

Now run `npm test` again and see what happens. You should see a message that the test failed, and if you scroll all the way up it'll show you where the snapshot differed. Pretty cool right!?

### Unexpected changes

So, this is pretty obvious - the snapshot changed because we changed how the component rendered. What about when something changes unexpectedly?

Let's pretend that the variable `{items}` that's beinge exported from `constants.js` is actually an axios call that returns an array of data from our backend. Since we're employed at a large company, we only work on the frontend and have no way of making changes to the backend (I know, very sad).

So far, we've been testing our code with the data that comes back from the API, because we've been working here for two years and it's never changed or caused any issues. But today something changed!

Go add a `delicious: true` property to one of the objects in `items` to emulate a change in the API response data. 

Now run `npm test` again and see that the test still fails, but also shows the new delicious property as being the change, in addition to the class we added.

#### Lessons

There are actually two lessons here.

1) Don't use real data to test your code. Always use `mock data` that you have complete control over, so you can predict what's going to happen. This topic could take up a whole separate lesson.
2) Snapshots aren't a perfect tool - you also probably need to write unit tests.

### Other react testing tools

[React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro) is a subset of `DOM Testing Library` but focused on React components. It allows you to _query_ different parts of your components to ensure they show up, kind of like how `querySelector` works. It's unit testing but for react specifically, and it's much more comprehensive than just using snapshots.

## Summary

Today we covered:

* What code testing is
* Why we should test our code
* 3 different types of software testing
* A medium dive into unit tests
* Snapshot testing

### Resources

* [GoFundMe App Fully Tested: `tested-app` branch](https://github.com/joinpursuit/Pursuit-Core-Web-Testing-React-Apps-Starter/tree/tested-app)
- [What Is React Testing Library? - Video by LevelUpTuts](https://www.youtube.com/watch?v=JKOwJUM4_RM&feature=youtu.be)
- [Testing React Components - React docs](https://reactjs.org/docs/testing.html)
- [Testing Library](https://testing-library.com/docs/react-testing-library/example-intro)
- [Jest documentation](https://jestjs.io/docs/en/getting-started)
- [Jest expect reference](https://jestjs.io/docs/en/expect)
- [Visual Regression Testing](https://applitools.com/blog/visual-regression-testing-developers/)
