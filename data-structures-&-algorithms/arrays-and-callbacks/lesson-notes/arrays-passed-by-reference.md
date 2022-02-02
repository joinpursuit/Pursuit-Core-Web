# Arrays Passed by Reference

## Looking at What Passed by Reference Means

Let's look at a code example:

```js
const seasons = ["Spring", "Summer", "Fall", "Winter"];

const reverseSeasons = seasons.reverse();

console.log("reverse seasons", reverseSeasons);
console.log("seasons", seasons);
```

We notice that when we have reversed the seasons, even though we tried to store them in a variable, it changed the original `seasons` array.

This is because we did not make a new copy of the array, instead we created a new variable that `points` to the original array. Therefore, when we change one array, we change the other, because they are the same array in memory, but now there are two different ways to access this array

### Copying an Array

We can use the spread operator to safely copy an array that does not have nested items (objects within objects within more arrays)

```js
const seasonsAgain = ["Spring", "Summer", "Fall", "Winter"];

// make a copy using the spread operator
const copySeasonsAgain = [...seasonsAgain];

console.log("copy seasons again", copySeasonsAgain);

copySeasonsAgain.reverse();

console.log("seasons again", seasonsAgain);

console.log("copied season again", copySeasonAgain);
```
