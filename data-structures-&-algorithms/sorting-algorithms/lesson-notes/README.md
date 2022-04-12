# Sorting Algorithms Part 1

## Learning Objectives

- Explain why there are so many sorting algorithms
- Review breaking the problem down into smaller parts
- Sort an array of numbers using bubble sort

## There are Many Sorting Algorithms

 
Sorting is often an important part of a good number of applications. For example on a website, you might want to sort a list of shoes by price. If you are working on the front end, you usually have a limited amount of items to sort on a page (less than 100), and so developers would just rely on the built-in `.sort()` function, which is an implementation of a sorting algorithm.

Which algorithm does JavaScript use? [It's complicated](https://www.tutorialspoint.com/which-algorithm-does-the-javascript-arrayhashsort-function-use), and can depend on which browser one is using. The engineers who build JavaScript in the browser are the ones who take the time and effort to choose the best algorithm for general use.

A large part of determining the right algorithm goes back to the concepts of Big O and choosing the right one in terms of time and space efficiency. There are other factors that are also considered, like how likely is what is being sorted already somewhat sorted or very random? [Here is a visualization of the performance of a few sorting algorithms and different types of sorted data sets](https://www.toptal.com/developers/sorting-algorithms)

Today we'll look at one of the the simpler sorting algorithms: Bubble sort.

## Simplifying the Problem

For the pre-lesson, you were asked to sort an array of numbers. You were given a lot of extra code to sort through and think about/try to ignore. This typically makes solving a problem much harder.

When you are working on a project with a lot of other code/features/complications it is easy to get lost in the code. Implementing a new feature can feel overwhelming and complicated.

You always have a choice of creating a little coding sandbox, you can do this with just plain js/html/css files on your computer, on codepen, or with create-react-app to quickly start a new project.

You can also create a git repo and then create multiple branches to try different solutions out without worrying you will lose progress as you try new ideas.

Let's create our own sandbox by creating a new random array that represents a possible output from our Deck Of Cards

```js
const cards = [10, 3, 10, 8, 10, 11, 7, 10, 9, 6, 5, 2, 4];
```

### Bubble Sort

Bubble sort compares two elements that are next to each other,

- If they are in the correct order, it moves along to the next pair
- If they are in the wrong order, they are swapped and then it moves along to the next pair
- It repeats this process over and over again until no swaps have been made, until it has completed its sorting

Let's code it:

```js
const bubbleSort = (arr) {
    for let (i = 0; i < arr.length; i++) {
        // iterate over the array
    }
}

```

```js
const bubbleSort = (arr) {
    for (let i = 0; i < arr.length; i++) {
        // compare if the first item is larger than the one next to it, if yes, then swap the positions
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
    return arr
}

console.log(bubbleSort(cards))

```

The above just takes us through one iteration,

```js
[3, 10, 8, 10, 10, 7, 10, 9, 6, 5, 2, 4, 11];
```

But we need to keep iterating until the algorithm makes it through the loop without swapping

```js
const bubbleSort = (arr) => {
  do {
    swapped = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
};

console.log(bubbleSort(cards));
```

Thought question: Why are we using a `do while` loop instead of a `while` loop?

Determine Big O on your own then check:

<details><summary>Big O</summary>

Runtime: O(n^2)

 Memory O(1)

</details>

## Further Reading

Go back to the resources in the pre-lesson and review them.

Google `bubble sort JavaScript` and read through a few explanations and versions. You'll notice some small differences in the approaches, whether it is syntax or choosing a for loop instead of a while loop. Take your time reviewing so that you can be sure you can implement bubble sort using your own pseudo code, without having to look up a possible solution.

Go back to your own attempt at sorting the cards. Was it similar to bubble sort? If it was different, take time to compare and contrast your approach.
