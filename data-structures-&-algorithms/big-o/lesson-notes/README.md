# Big O

## Learning Objectives

-

# Big O Notation

![](https://i.imgur.com/AHLnEHd.png)
image from: https://www.bigocheatsheet.com

We are going to be introducing more computer science concepts. These will suit you the best for interviews and further into your career. It's important to study and learn them and a number of these concepts are rather complicated and will take time to come together for you. Our focus is projects and skills first, rather than focusing on theory. We believe building things is one of the best way to learn to code and become a developer. However, it's important to set aside some time to learn core computing concepts so that you can continue to grow as a developer.

What may be a little confusing is that we are going to start talking about optimization. But as you like remember, one of the biggest pieces of advice we likely have been giving is: Don't optimize too early! This is still true for your work. Focus on building first and then optimization.

Still: what does optimization mean? We're going to look at what it means through the lens of Big O this morning.

One of the things computer scientists are trained to do is to find ways to make things faster, smaller, cheaper and more precise. One way to approach such problems is to consider the worst case scenario. Big O Notation is a way to denote the best/average/worst case scenario.

Big O comes from the discipline of math and is used to describe the relationship between two functions based on their growth rates.

Big O of Algorithms is measured by:

- **Time complexity** - the amount of time it takes to execute. It is measured in the number of steps an algorithm takes rather than measures of time like seconds or minutes.
- **Space complexity** - the amount of memory (RAM) required an algorithm needs to run.

Each complexity can be described with notation like O(n): Where n represents the number of elements.

Additionally, Big O can be represented visually with the execution time/memory on the y-axis and input size on the x-axis.

![](https://i.imgur.com/SmB6APr.png)

As the input size increases the execution time can change, based on the algorithm being used.

For our introduction, we'll only consider time complexity and worst case scenarios. In your studies, as you continue to learn, you should learn and consider space complexity and other scenarios as well.

We will look at 5 classes of complexity.

### Constant `O(1)`

```js
const getFirstSongFromPlaylist = (array) => {
  console.log(array[0]);
};
```

This algorithm has a Big O complexity of `constant`. No matter the size of the array 1 or 1 million, this always takes the same amount of time and memory to execute.

This type of complexity is considered highly efficient.

![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/8-Input-Size-Run-Time-Graph.png)

### Linear `O(n)`

```js
const printSongs = (array) => {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
};
```

This algorithm has a Big O complexity of `linear`. For each added song to the array, the amount of time it takes to complete this is increased by 1 step.

If the array (or playlist) has 1 item, it will take 1 step to complete. If the array has a million items it will take a million steps to complete.

This type of complexity is considered pretty good efficiency.

![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/6-Input-Size-Run-Time-Graph.png)

### Quadratic Complexity `O(n^2)`

```js
const PrintSongsWithinAlbums = () => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i][j]);
    }
  }
};
```

This algorithm has a Big O complexity of `quadratic`. For each added item to the array, the amount of time it takes to complete this is increased by n to the n power!

Imagine you wanted to print every song by an artist. The above function would loop through each album and then within each album, loop through each song. For each album the complexity doesn't increase just by 1 step, but by each album times each song on the album.

As we think of the worst case scenario if every album has ten songs, if we have 10 albums, we go through the steps 10 times for the albums and then times for each song so for a collection of 10 albums we go through the algorithm 100 times. If we had 100 albums and still 10 songs, we'd go through this algorithm 1000 times...

If we were to also have to go through artists, and now every artist has 10 albums and each album has 10 songs.

More complexity:

```js
const PrintSongsWithinAlbumsByArtist = () => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      for (let k = 0; k < arrarray[i][j].length; k++) {
        console.log(array[i][j]);
      }
    }
  }
};
```

Now we have a collection of artists, as we gain each artist with 10 albums and ten songs each artist will have 10 albums. Each time we add an artist we get 10 songs and 10 albums. With 10 artists we get 10 x 10 x 10 = 1000 steps.

This type of complexity is considered inefficient. It is also important to note, that if we are just looping over a small amount of data (one artist and their albums) this is fine! Most artists have, at most, tens of albums and never hundreds of thousands or more. Remember Big O is interested in code that needs to continually be scaled up. So it is not important to create complex solutions for a little more efficiency and sometimes inefficient functions are the only option.

![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/10-Input-Size-Run-Time-Graph.png)

### Logarithmic Complexity `O(log(n))`

Imagine we are calling out to our favorite voice assistant to play a song for us. There are millions of songs out there. Let's say we're looking for `I Can't Get No Satisfaction`

How is our assistant finding our song?

Is it going randomly through every single song in the database?

Is it looking by artist then by song (again without any organization)?

In either scenario, you'd have to consider the worst-case scenario which is that the song you ask for is always the absolute last song found.

What if the songs were organized alphabetically?

Then we could perform a binary search.

We would start at the middle and then check if there is a match. If it matches we're done!

But with Big O we're always thinking about the worst case scenario and that our song will be the last song found.

So we start in the middle, let's say that this middle is songs that start with the letter `M`, if our song starts with the letter `I` we can eliminate all the songs that start with M or further in the alphabet. Now we've cut down the number of items we must search by half.

Let's set our next midpoint to be the middle of the remaining songs, and we get songs that start with the letter `F`. Since our song starts with the letter `I`, we can stop searching through songs starting with A - F, and have again, cut our search down by half.

We would keep repeating, removing half of the songs we are looking through until we found our song. This more complicated process is more efficient than looking through every single song and can be represented

```js
function binarySearch(arr, item, first = 0, last = null) {
  if (!last) last = arr.length;
  let midpoint = Math.floor((last - first) / 2) + first;
  if (arr[midpoint] === item) return midpoint;
  if (arr[midpoint] > item) return binarySearch(arr, item, first, midpoint);
  if (arr[midpoint] < item) return binarySearch(arr, item, midpoint, last);
}
```

In this way, if we have 16 songs, the number of steps would be 4 Log(2) of 16 = 4.

If we have about 1.126 million songs, the number of steps would be just 50!

This type of complexity is considered highly efficient.

![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/9-Input-Size-Run-Time-Graph.png)

### Factorial Complexity `O(n!)`

Factorial means the product of all positive integers less than or equal to n.

Examples

- 3 factorial is 3 x 2 x 1
- 7 factorial is 7 x 6 x 5 x 4 x 3 x 2 x 1

The complexity of an algorithm that is factorial increases faster than any other example. While there are real world examples of these types of algorithms, due to their complexity, they are not typically asked in coding interviews for jr positions and thus we won't include an example.

This type of complexity is considered inefficient.

![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/7-Input-Size-Run-Time-Graph.png)

## Summary

We can look at this chart in myGA to look at how efficincy changes as input increases across the different types of classes of complexity.

![](https://i.imgur.com/CExCK8P.png)

Again, we can see that in most cases, when we are looking at 600 or less items, our computers can work through them quickly and our primary concern in this course should not be efficiency or optimization.

Early optimization is problematic because it can be overwhelming to think about as you start to solve a problem or build an app and can prevent you from building a prototype in a reasonable amount of time.

Additionally, as you build your app with optimization in mind you will inevitably try to solve problems you won't really have, which is bad for things like deadlines. And also since you don't yet know what all your problems will be, you must build in order to learn what you'll need to solve.

We'll be having a lesson on agile development; which is an approach to developing software where requirements and solutions evolve through short deadlines and small goals. This allows developers to account for the necessary pivots as they develop applications.

The approach that will serve you best in this course, and likely well into your career is by a quote from Addy Osmani

```
First do it,
then do it right,
then do it better
```

Again focusing on just solving your problem first and foremost. Then going and finding the right way to do it and finally, finding ways to do it better.

## Next

Feeling like you need to hear it all again?

- Go to myGA and study

Ready to work through figuring out some Big O?

- See the `big-o-activity` markdown
