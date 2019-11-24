# Git and GitHub Collaboration Workflow Tutorial

## Objectives
* Lean how to collaborate using Git and GitHub
* Learn about git branching
* Learn how to create Pull Requests
* Learn how to merge(combine) code
* Learn to solve merge conflicts
* Learn how to pull code

## Intro 
We are going to work on collaborating to create our own simple Math module. In groups of 4:
* Pick one and only one team member. You will be known as **The Repo Owner**
  * Create a GitHub repo called `myMathModule`
  * Take note of the url to your repo GitHub gives you a.k.a **remote url**. It would look something like this: `git@github.com:yourName/myMathModule.git` or `https://github.com/yourName/myMathModule.git`
  * Create a local `git` repo 
  ```
  mkdir myMathModule
  cd myMathModule
  git init
  ```
  * Connect your local `git` repo to your GitHub repo using your **remote url**.
  ```
  git remote add origin https://github.com/yourName/myMathModule.git
  ```

  * Create a file called `index.js` and add the following content to it.
    ```js
    /* 
      myMathModule

      This is a collaboratively made Math module with support for basic math operations.
      Feel free to use it for you basic math needs.
    */
    const Math = {
      PI: 3.141592653589793 // Mathematical constant defined as the ratio of a circle's circumference to its diameter.
    }

    module.exports = Math
    ```

  * `git add .`. For git to `stage` (keep track of) everything in your current folder(`.`), including your file. 
  * `git commit -m 'math module start'`. To snapshot and record the content of everything that is `staged` (that was added) in its current state.
  * `git push -u origin master` to upload your code to your remote repo n GitHub.
  * Go to your repo on GitHub and verify that your code was uploaded by refreshing you GitHub's repo page.
  * Go to the settings of your repo. (Tab on the top right corner) to [invite your team mates as collaborators](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository)

* Everyone else
  * Check for a GitHub invitation that was sent to your e-mail coming from **The Repo Owner** and join as collaborators.
  * Go to **The Repo Owner**'s repo and clone it so that you get a local copy. (Note that we are not forking here)
  * `cd` into the repo folder `myMathModule` and verify you have the same content as **The Repo Owner**
  * Because you were added as a collaborator you have full access to your Team's repo, that is you can `push` code, create branches etc.

* You are about to collaborate with your peers and each one of you will implement a different Math function.

## Branching
Once you have a copy of the repo you will be collaborating in, you will be, by default on what is known as the `master` [branch](https://git-scm.com/book/en/v1/Git-Branching-What-a-Branch-Is). The `master` branch is where we have been coding up until now. We have been using only the `master` branch because we have been coding by ourselves and not really collaborating. We want to create branches so that we can work independently and combine our work later without conflicting with whatever somebody else is working on. Nobody should be directly committing and pushing code to the `master` branch

There are a few standards that you should keep in mind when creating branches:
* Use branches to develop a very specific thing/feature of your app.
* Branches should be short lived. Not too much development should happen on any single branch.
* Name the branch according to the feature of the app/project you are working on. e.g `sumFunction-branch`

To create a branch `sumFunction-branch`:
```
git checkout -b sumFunction-branch
```

You can see what branch you are on with:
```
git branch
```

## Hands on Code:

### Functions to implement
* `sum(a, b) // Return the sum of a and b`
* `sub(a, b) // Return a minus b`
* `mul(a, b) // Return the product of a times b`
* `div(a, b) // Return the result of a divided by b`

For our simple Math module each one of you:

* Pick a different function you want to implement let's say `sum`.
* Create a branch where you will develop your function: `git checkout -b sumFunction-branch`.
* In a file with the same name of your function e.g. `sum.js` write and and then export with `module.exports = sum` your function. 
* `git add` all your code and push to your own branch with `git push origin sumFunction-branch`.

## Pull Request (PR)
Before you create a PR you want to make sure you are up to date with the code in the `master` branch, that is, the main branch of the project. You want to incorporate any changes that were made to `master` to verify that you code works with those/their changes.

To incorporate the code from `master` with yours you pull:
```
git pull origin master
```
>`git pull` gets/fetches the code from `origin master` and `merge`/combines it with our branch's code.

Whenever you are combining a.k.a `merge`ing code it is likely to have [merging conflicts](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/resolving-a-merge-conflict-using-the-command-line). You might get a **merge conflict** when a change was introduced to the `master` branch that affected the same file and line of code you were working on or when you modified something that was also modified in the `master` branch. To resolve merge conflicts you need to look at your code and their code an reconciliate things. This might require a conversation with both parties involved or the entire team as to what changes to accept or how to combine the changes made.

If you don't have any merge conflicts you are good to create a PR on GitHub to get your code reviewed and combined with everyone else'.

## Code Review
Once a PR has been opened somebody from your team needs to review it. You should all review each other's code to catch bugs or problems your eyes couldn't. In this process it migh happen that your reviewer asks you to change something or fix any bugs. You fix those and notify your reviewers.

## Merging
Once the code passes the review process, the reviewers approave and hit the green `merge` button on your Pull Request to `merge`/combine your code with their code. 

## Extra Practice
Repeat the flow for implementing the following functions. Add them to you Math module.
* `power(base, exponent)`
* `grater(a, b)`
* `lesser(a, b)`
* `sqrRoot(n)`

## Resources
* [learngitbranching](https://learngitbranching.js.org/)


