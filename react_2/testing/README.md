[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Testing in and out of React

Testing non-React and React code with Jest!

### Learning Objectives

- Understand why testing is important
- Understand the different types of testing
- Be able to integrate testing into any project

### Prerequisites

- Javascript
- React
- Express

---

## Outline
* What is testing
  * Why do it

* Types of testing
  * unit
  * integration
  * E2E

## What is testing

Testing is the practice of writing code to verify that your other code is doing what you think it is.

Test code executes your code, passes in various values (that you define) and ensures that it returns the right value.

Testing is an incredibly broad concept with a lot of different thoughts and opinions surrounding it. There are many different testing frameworks available in different languages, but for the most part they are all trying to achieve the same thing: code correctness.

Today we'll look at a popular Javascript testing framework called [Jest](https://jestjs.io/docs/en/getting-started)

## Why should I test my code

Testing is incredibly important for a number of reasons that are amplified when working on larger projects, or with multiple people working on the same project. Testing also benefits you, working alone on a smaller project.

* It helps ensure that when you make changes in one area of an application, other parts aren't affected without you knowing.
* It forces you to write more maintanable and understandable code. If you write code that cannot be tested easily, it's probably not good code and should be changed.
* In the long run, it saves you development & debugging time and helps your project remain stable.


## Types of testing

There are many different types of testing, but here are the most common ones:

### Unit Testing

Unit testing means verifying the code at the smallest possible unit - usually by testing each function individually. In the that classes exist, this can be mean testing the whole class, or testing the class's methods separately.

Most commonly, unit testing is done _by the developer_ while they are writing the application code. 

In many companies that build software, unit tests are the most foundational type of testing that exists. Many places have a requirement that your pull request will be rejected unless it passes all existing unit tests, in order to prevent merging of code that will break something.

### Integration Testing

Integration testing operates at a slightly higher level - it verifies the **contract** between pieces of code. In many cases this means testing that the front end and back end are communicating correctly, like by sending requests and ensuring that the response is what's expected.

It can also mean verifying the interoperability between components, whether that means specific React components, node modules, or any other logical separation of code. In general, integration testing is making sure that several pieces of your program are functioning together properly.

### System or end-to-end (E2E) testing

E2E testing involves verifying that your application works from a user level. This can look something like the following:

* Logging in 
* Creating a record in the database
* Deleting a record from the database
* Logging out

In many cases, this is done by spinning up a virtual web browser, automatically typing into the login form and clicking submit, then automatically clicking on different parts of the interface.

There are many tools that let you write E2E tests, but here are some popular ones:

* https://www.cypress.io/
* https://www.selenium.dev/

### How much of each type of test should I write?

In general, you want more unit tests than integration tests, and more integration tests than E2E tests. See [this article](https://martinfowler.com/articles/practical-test-pyramid.html#TheTestPyramid) for more on this topic.

There is no hard rule about any of this, but think about it this way:

* Unit tests are small, easiest to write, and are the most isolated / granular.
* Integration tests are more comprehensive, and cover more ground. Therefore they are less granular, and more likely to be harder to change if needed.
* E2E tests are the largest and also take the longest to run. So they should be written less often.

## Jest basics

Enough with the talk, we'll set up jest in a new project and write some test code.

```bash
# cd to whatever directory you want
mkdir jesting
cd jesting
npm init -y
npm install --save-dev jest
touch functions.js
code .
```

Now in your `functions.js` file, create a simple function that multiplies two numbers, and export it in an object:

```js 
function multiply(a, b) {
  return a * b
}

module.exports = {
  multiply
}
```

Now we'll create a test file for it!

```bash
touch functions.test.js
```

> Note that we just took the name of the file we want to test and put `.test.` in the middle of it. This is the convention that jest wants us to follow.

In our newly created test file:

```js
const multiply = require('./functions').multiply

test("Multiplies two numbers", () => {
  expect(multiply(10, 2)).toBe(20)
})
```

Great! So how do we run it?

We can't just do `node functions.test.js`, because the `test()` function doesn't mean anything on its own. We have to run it using the `jest` CLI command.

Open up `package.json` and edit the `scripts.test` value:

```diff
{
  "scripts": {
+   "test": "jest"
-   "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "jest": "^25.2.7"
  }
}
```

Then run `npm test` and you should see something output!

```
PASS  ./functions.test.js
  ✓ Multiplies two numbers (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.051s
Ran all test suites.
```

Great! We've created our first tests. This is the basic idea behind testing - we write code to verify that our program is doing what we want it to do. Generally this is how we do it, but there are ways to make it more robust.

Go back to your `functions.js` file and change the `multiply()` function to this:

```js
function multiply(a,b){
  return 20
}
```

Now run the test again. Does it still work? How come?

The code is doing exactly what we're testing it to do, but it's not really "correct" is it? This is the tricky part about testing - we can use it to verify our assumptions, but it's not foolproof.

Let's add another test case to make our testing code more robust.

```js
test("Multiplies two numbers", () => {
  expect(multiply(10, 2)).toBe(20)
  expect(multiply(5, 5)).toBe(25)
})
```

Now the test should fail! This is more like it.

When a test fails, the output in the terminal is super useful to help us debug why.

```
FAIL  ./functions.test.js
  ✕ Multiplies two numbers (4ms)

  ● Multiplies two numbers

    expect(received).toBe(expected) // Object.is equality

    Expected: 25
    Received: 20

      3 | test("Multiplies two numbers", () => {
      4 |   expect(multiply(10, 2)).toBe(20)
    > 5 |   expect(multiply(5, 5)).toBe(25)
        |                          ^
      6 | })

      at Object.<anonymous> (functions.test.js:5:26)
```

We can see that the test wanted the function to return 25, but it returned 20 instead.

> Why did it return 20? What can we do to fix it?

### Exercise (20 mins)

There are many ways we can evaluate whether our code is doing what we want it to. Jest has a LOT of different methods to test for various types of values.

Spend 5 minutes and read through the [using matchers](https://jestjs.io/docs/en/using-matchers) guide in the documentation. You can also consult the [expect() reference](https://jestjs.io/docs/en/expect) for this next part.
 
Add two new test cases (in their own `test()` blocks, with descriptions) that verify the following:

* `multiply()` always returns something - it should never return `undefined`
* `multiply()` returns `null` when either one of the parameters passed in is not a number

You will also have to change the behavior of `multiply()` to make these tests pass. Make sure all 3 cases pass!

## Grouping test cases

As our application grows, we will probably want to develop a better way of organizing our tests. Imagine having several hundred or several thousand tests all running at the top level! Sounds difficult to keep track of and it'll likely reduce our willingness to write tests.

Let's add another function to our original file. Make sure you export it.

```js
function squareArray(arr) {
  return arr.map(v => v*v)
}

module.exports = {
  multiply, 
  squareArray
}
```

> What is this function doing?

Since `squareArray` is a little more complicated than a simple multiply, we want to test for a couple of things:

* If a parameter is passed in that is NOT an array, return null
* When an array is passed in, the function DOES return an array
* The array is the same length as the one that was passed in
* Finally, it returns the right value

These are four test cases that are all related to the `squareArray()` function. So we should group them! I present to you: the `describe()` function.

```js
describe("square an array", () => {
  test("Rejects non-arrays, returns null", () => {})

  test("Returns an array", () => {})

  test("Returns an array that's the same length as the one passed in", () => {})

  test("Returns the right value", () => {})
})
```

Now, when you run `npm test`, you'll see the tests grouped by their `describe()` blocks. 

Go ahead and wrap your three `multiply()` test cases with a `describe()` as well.

### Exercise (20 minutes)

Fill out the test cases! The descriptions should tell you what you want to try to do. 

Here are a couple matchers that you may find useful:

* `.toBeInstanceOf(Array)`
* `.toBe()`
* `.toEqual()`

> What's the difference between `toBe()` and `toEqual()`? They don't do exactly the same thing.

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

- [Jest documentation](https://jestjs.io/docs/en/getting-started)
- [Jest expect reference](https://jestjs.io/docs/en/expect)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro)
