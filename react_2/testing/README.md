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

In many companies that build software, unit tests are the most foundational type of testing that exists. Many places have requirements that your pull request will be rejected unless it passes all existing unit tests, in order to prevent merging of code that will break something.

### Integration Testing

Integration testing operates at a slightly higher level - it verifies the **contract** between pieces of code. In many cases this means testing that the front end and back end are communicating correctly. It can also mean verifying the interoperability between components, whether that means specific React components, node modules, or any other logical separation of code.

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




## Summary

Do a quick review at the end of the lesson to talk about what you covered.

### Resources

- [Jest documentation](https://jestjs.io/docs/en/getting-started)
- 
