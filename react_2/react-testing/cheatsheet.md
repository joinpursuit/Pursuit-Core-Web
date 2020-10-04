# Testing React Apps Cheatsheet

## Setup

* No need to install anything if your app was created with `create-react-app`. Otherwise read [Setup](https://github.com/joinpursuit/Pursuit-Core-Web/tree/master/react_2/react-testing#setup)
* Create a folder called `__tests__` inside your `components/` folder

## Running Tests
* With `npm test` in the terminal

## Writing Tests
* For each test create a file in `__tests__/` for example `DonationCard.test.js`
* At the top of your test file make sure to import have the imports:
  ```jsx
  import React from 'react';
  import { render, screen } from '@testing-library/react';
  import MyComponent from '../MyComponent'; // Component to be tested e.g import Form from '../Form';
  ```

### Rendering a Component
Use the function `render()` imported from `@testing-library/react` for example:
```jsx
render(<Form propA={propAValue} propB={propBValue} />)
```

Pass props if needed.

### Getting Rendered Elements
Uses queries from the `screen` object imported from `@testing-library/react`. For example:
```jsx
const nameInput = screen.getByLabelText("Name")
```
#### Types of queries

##### Main Queries
* `getBy*` returns the first matching element or throw an error if no elements match or if more than one match is found.
* `queryBy*` returns the first matching element, and return null if no elements match. Helpful for asserting something is no longer being rendered
* `findBy*` returns a promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms.

##### Subqueries (* in the queries above)
* `ByLabelText` get an input by its label
* `ByPlaceholderText` get an input by its placeholder text
* `ByRole` get an element by its ARIA role like getting an `h1` whose role is `heading`. [List of roles here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)
* `ByText` get an element by a text
* [more in docs](https://testing-library.com/docs/dom-testing-library/api-queries)

Example:
```jsx
const nameInput = screen.getByLabelText("Name") //
```

### Firing User Events
Import `fireEvent` and `userEvent`
```jsx
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

Use `userEvent` for most events. Some are:
* `click()`
* `type()`
* `selectOptions()`
* [more in the docs](https://github.com/testing-library/user-event#table-of-contents)

Example:

```jsx
const nameInput = screen.getByLabelText("Name") // Get the element
userEvent.type(nameInput, "Bob") // Simulate user typing in the name input box
```

For more general events like moving a range slider or submitting a form and for which we don't have a way of doing with `userEvent` use `fireEvent`

```jsx
const slider = screen.getByLabelText('Amount to Donate') // Get element
fireEvent.change(slider, { target: { value: 500 } }) // Simulate moving the slider to value 500
```
💡 You need to pass a mock event object as the second argument

#### Submitting a Form
```jsx
const form = screen.getByTestId('form')
fireEvent.submit(form)
```
💡 `userEvent` uses `fireEvent` under the hood

### Mocking Axios and other 3rd Party modules
* See an [example here](https://github.com/joinpursuit/Pursuit-Core-Web-Testing-React-Apps-Starter/blob/tested-app/react-app/src/Components/__tests__/App.test.js)
* Read [Jest Mock Functions](https://jestjs.io/docs/en/mock-functions)
