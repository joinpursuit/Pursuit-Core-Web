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
