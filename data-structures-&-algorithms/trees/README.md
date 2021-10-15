# Trees

In computer science, the tree data structure is one of the most useful because it allows us to quickly find information that is correctly sorted. As you will see, organizing your data into a tree can drastically reduce the number of operations required to access the data.

### Setting intent

> Take it slow and understand fully.

Many of the algorithms and data structures you are working on have solutions to them. Studying the solutions is not a bad technique, however it can be easy to read a solution and think you understand what is going on when you do not.

For this lesson in particular, take your time going through each line of code and ensuring you understand what is happening. Try adding a comment above each line of code, describing what is happening as fully as possible.

When going slow, it can be easy to beat yourself up about not understanding sooner. Focus on the goal (i.e. understanding) as opposed to how long it's taking you to get there. Speed will come through practice!

## Trivia Questions

1. Take a look at the following code and then guess what will be printed to the console.

   ```js
   const name = {
     first: "Eleanor",
     last: "Willows",
   };
   const address = {
     line1: "493 Poplar St.",
     line2: "Apt. 3A",
     city: "New York City",
     state: "NY",
   };

   console.log({ name, ...address });
   console.log({ ...name, address });
   console.log({ ...name, ...address });
   ```

1. Take a look at the following code and then guess what will be printed to the console.

   ```js
   const people = [
     { first: "Owen", last: "Knight" },
     { first: "Raelynn", last: "Navarro" },
     { first: "Demi", last: "Porter" },
     { first: "Joe", last: "Davies" },
   ];

   const friends = [];
   friends.push(people.pop());
   friends.push(people[1]);
   people[1].first = "Rae";

   console.log(friends);
   console.log(people);
   ```

## Main Problem

Watch the following two videos and answer the questions below each one.

1. [Introduction to Trees](https://www.youtube.com/watch?v=qH6yxkw0u78)

   - "Arrays and linked lists are linear data structures while a tree is not." What does this statement mean?

   - Define the following terms: root, node, link, edge, children, parent, sibling, leaf node, internal nodes, ancestor, descendant, depth, height

   - "Trees are recursive data structures." What does this statement mean?

   - What kind of data is best stored in trees?

1. _(Only watch up until the point where the code is on the screen, about four minutes.)_ [Data Structures: Trees](https://www.youtube.com/watch?v=oSWTXtMglKE)

   - How is a binary _search_ tree different than a binary tree?

   - How can a binary search tree become unbalanced?

   - What is a benefit of using a balanced binary search tree when looking for data?

Next, complete the two exercises below this.

1. Insert the numbers inside of the following array _in order_ using the website linked below. Before you press the "insert" button, make a guess as to where each number will appear.

   ```js
   [11, 9, 13, 10, 7, 12, 14, 8, 3, 4, 6, 15, 5];
   ```

   - [Visualize Binary Search Tree](https://www.cs.usfca.edu/~galles/visualization/BST.html)

1. Consider the following questions about the array and the tree you created above:

   - If you were to search the array using linear search, how many operations are required to find the number 10?

   - If you were to search on the array using binary search, how many operations are required to find the number 10?

   - How many operations are needed to find the number 10 in the tree?

   - Answer the same questions above for the number 15. How do your answers compare?

## Lab

- [Complete this repository and submit to Canvas](https://github.com/joinpursuit/m6-trees-introduction-lab)

## More problems

To get better with trees, build a binary search tree. Follow the [tutorial here](https://adrianmejia.com/data-structures-for-beginners-trees-binary-search-tree-tutorial/) to see how to make one. To ensure you understand how the methods work, describe what each line of code does in comments above each line. Make sure to use your own words as opposed to copying and pasting.
