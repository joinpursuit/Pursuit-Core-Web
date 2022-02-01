# Intro to Data Structures & Algorithms

## Learning Objectives

By the end of this lesson you should be able to:

- Define the term algorithm
- Define the term data structures
- Understand how you approach problem solving
- Use Polya's problem solving technique to solve a problem

## What are Algorithms and Data Structures?

Take a few minutes to answer for yourself either on paper, or as a note to yourself in slack:

- What is an algorithm
- What is a data structure
- Have you worked with any data structures in the course so far?

Once you have your answers, compare and then take a few minutes to refine your answer:

- [intro to algorithms](https://github.com/joinpursuit/8-0-technical-curriculum/tree/main/01-fundamentals/introduction-to-algorithms)
- [data structures](https://en.wikipedia.org/wiki/Data_structure)

## Why Are We Learning about Algorithms and Data Structures

You've been working with and building algorithms throughout this course, however, you've likely been more focused on the big picture of building apps. Now we're going to focus on improving and refining your algorithm skills. This will help prepare you for technical interviews and help you improve as a developer

This program has focused on building skills through project based learning. When you go on a job interview, there will be other candidates who have gotten a degree in computer science (or similar), so it is possible that the kinds of technical questions you receive will be geared towards CS majors. Our goal will be to give you an introduction to common data structures and algorithms that come up in interviews.

Technical interviews vary tremendously in what is expected there are a few common styles though:

- White Boarding - this is when you are asked to write pseudocode/flow charts/other visuals to explain your thought process in solving a problem, you may write some code snippets (ie, for loop, if/else), but you won't be writing full code

- Code Challenge - you are given a particular problem and asked to solve it in front of/with the people interviewing you. It is important to demonstrate your thought process by talking out loud/to your interviewer(s) about how you are solving the problem. It may unimportant to fully solve the problem in order to pass - the interest can be geared towards giving you a really had problem and seeing how you make progress with it.

- Project - you are given a **small** project (build a weather app that shows today's forecast) and given some time to complete it. Then you turn it in and talk through your code with the person/people interviewing you

- Rapid Fire Trivia - this is usually over a phone screen where the interviewer ask you a bunch of trivia (is CSS case-sensitive? What is the difference between HTML and HTML5? Is JavaScript a dynamic language?).

**Note:** Be wary of projects that require more than 1-2 days of work. You may be given a few days or a week, but the overall project should be small (no bigger than a module 1-4 project). Taking on projects that require a week or more of full-time++ work are not fair to your time, and anecdotally, don't actually lead to getting hired and could possibly be taking advantage of your coding abilities.

## Emotional Framing

We are going to be giving you problems to solve. A number of problems are classics like Fizz Buzz. While you can google "Fizz Buzz" and copy-paste the [exact solution](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition) you found to
"just get it done" - this will not be an acceptable strategy on a job interview. Therefore, it is better to make an earnest effort and set yourself up as if you were actually on an interview.

Also, in terms of classics, when you first start out, it may seem very boring or pointless to solve a problem you already have solved, again. However, coding is a skill - just as an artist would not just play a song once to learn it, or draw just one cat, practicing the same or similar things does help you improve. Therefore making it worthwhile.

When using Code Wars, you may take 40 lines of code to solve a problem. When you've solved it, the answers are unlocked and you may see a single line solution and your joy for solving it may fall away and you may find yourself feeling crestfallen and wondering if you'll ever get better. You will get better! Every time you solve a problem and analyze another solution you are adding knowledge and skill. Speed and elegance comes with practice, it's ok to go slow and have messy code at first, the only way to get better is to keep trying.

Don't get too hung up on success - each coding problem is an opportunity to learn new things. You don't need to solve the problem in order to have learned things. There is a high level of satisfaction in sticking through and solving a problem, but if you don't get there, take time to realize what you have learned along the way.

When you get to the actual interview process, the same principal extends. You will be challenged to learn new things. You'll be more motivated to really dig into the material, you'll be asked to try to solve things you haven't solved before. Each interview is an opportunity to meet new people and learn new things. Each interview will make you stronger and better for your next interview and job.

You should try problems that are you believe are "too hard" - problems that you think "I could never solve this!" Because through trying you'll grow. If you only stick to problems that you think are 'doable' you will not get the same opportunity to level up. Additionally, you'll never learn the skills you need to level up and how to approach challenges that require you to grow a lot in order to accomplish them.

On the job, you won't be building anything that already has a solution. You are there to create solutions. So all this practice and effort is to help you get to the place where you can start creating solutions.

## Getting started

Beyond the main learning techniques, starting writing code is really hard. You can always get started in a really simple way. Remember to work outside-in rather than left to right when building code.

Try to write the absolute least code possible that you can test. Writing many lines of code at once, without testing it can lead to many errors that can feel a lot more overwhelming to work through.

- write the function

```js
const someFunction = () => {};
```

- console log something in that function

```js
const someFunction = () => {
  console.log("hi");
};
```

- call the function

```js
someFunction;

const someFunction = () => {
  console.log("hi");
};
```

- Oops! It doesn't work. Take a moment to evaluate where you went wrong. Mistakes are normal, no matter how long you've been coding

- Talk through your mistake, understand what went wrong and correct it

```js
const someFunction = () => {
  console.log("hi");
};

someFunction;
```

- Uh oh, still doesn't work, again evaluate why it doesn't work and try to solve it
- It's ok, just try again

```js
const someFunction = () => {
  console.log("hi");
};

someFunction();
```

- Celebrate small victories! You figured out what was wrong and worked through it
- Try to pass a value and log that

```js
const someFunction = (name) => {
  console.log("hi", name);
};

someFunction("A.C.");
```

Now you have a strong start to keep building and you no longer have a blank slate.
You have

- defined a function
- called the function
- passed in an argument
- confirmed that the argument is being passed in correctly.

## In Small Groups

- Discuss past interviews (from any field of work you have done)
- Bring up what makes you most anxious
- How can you work on making yourself a stronger candidate?

## Homework

Watch:

[The Secret Rules of Modern Living Algorithms](https://www.youtube.com/watch?v=kiFfp-HAu64)

And answer the following questions on Canvas:

- Describe the algorithm to win the chocolate, and not the chili
- Name 2 types of sorting algorithms discussed in the video
- Name the algorithm used to help find matches for people who needed a kidney
- What animal deals with the Traveling Salesman problem in its daily life?
