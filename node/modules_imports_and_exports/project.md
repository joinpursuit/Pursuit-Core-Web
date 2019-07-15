# Modules - Project

## Create a Module

Create a module with functions that you think would be useful to have when building various different apps. Try to think of functions that you find yourself using in different exercises, projects, code wars problems, etc. For example, would a `getRandomElem` function be useful to have in multiple different apps?

### Example

Here's an example of the beginning of a 'useful array methods' module. The goal would be to continue adding a bunch of other useful array methods (that don't already exist in JavaScript) to this module, so we could easily import them all into any of our projects.

'Useful array methods' is an example of a theme for a module, but you could choose any theme that you think would be personally useful.

```js
module.exports = {
  // returns the first element of the array
  first(arr) {
    return arr[0];
  }
  // returns the array minus the first item
  tail(arr) {
    return arr.slice(1);
  },
  // returns the last element of the array
  last(arr) {
    return arr[arr.length - 1]
  },
  // returns the sum of array elements
  sum(arr) {
    return arr.reduce((sum, curr) => sum + curr)
  }
}
```

### Test it

Try importing your module into some of your other projects. Can you successfully use your module functions with your pre-existing code?