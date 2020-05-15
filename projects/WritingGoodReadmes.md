# Writing Good Project Readmes

Adding clear and thorough documentation to your projects is very important both for yourself and for others. It is important for yourself so that when you revisit your code in the future, you have ways to remember the purpose, tooling, and development history of what you made. Documentation is also important for others because without it, no one will use or contribute to your code. From [A beginner’s guide to writing documentation](http://www.writethedocs.org/guide/writing/beginners-guide-to-docs/):

> If people don’t know why your project exists,
they won’t use it. 
> If people can’t figure out how to install your code,
they won’t use it.  
> If people can’t figure out how to use your code,
they won’t use it.  

In short, writing good documentation is a way for developers to transfer the *why* behind the code that they create. Code without documentation is not useful.

## Adding Documentation to a Repo
The first step to adding documentation to a project is to a create a `readme.md` file (sometimes capitalized as `README.md`) to the **root directory** of your project's repository. By using this naming convention, code hosting platforms such as GitHub will automatically detect this file, render it into HTML, and display it when users navigate to your repository.

This is especially important for portfolio projects! Anyone who visits your project repository should be able to read about the project, whether they are technical or not.

## Documentation Content
You want to provide your readers with all of the information that they need to know, but no more. Unlike some other forms of writing, documentation should be clear, concise, and to the point. Additionally, it should be written in a way to appeal both to normal users (who don't know or care how the code works) and developers (who may want to evaluate or contribute to your code).

Generally, a good `readme` will contain (or link to) *at least* the following sections:
- **Description**
  - What your project is / should be used for
  - What problem(s) your projects solves
- **Brief Example**
  - This could be a code snippet showing how your project should be used (if it is meant to be integrated into another app)
  - This could be a screenshot of your project running in the browser (if it is a stand-alone application)
- **List of Features**
  - This typically will be a short list of the features that you planned during the development phase of the project
  - To provide more detail, you can show how you categorized these features. List the features that make up the MVP, Silver, and Gold Levels (or whatever structure you designed) and indicate which features you completed / have yet to complete.
- **List of Technologies Used**
  - Often you will want to list the technologies you used to create the project.
  - This typically would consist of all primary languages, frameworks, and libraries your app is composed of
  - This is particularly important when it comes to recruiters scanning your projects for keywords
- **Installation Instructions / Getting Started**
  - This section should walk a reader, step by step, through the process of setting up your project
  - For a tool meant to be integrated into other projects, this would likely outline the process of installing and accessing this tool in your project, and some code examples.
  - For an application, this would likely outline the process of forking, cloning, and starting the app locally
- **Contribution Guidelines**
  - This section should offer guidance on where and how users can contribute to your code, identify bugs, and propose improvements

## Markdown

The `.md` extension on your `readme.md` stands for [Markdown](https://en.wikipedia.org/wiki/Markdown), which is a light-weight markup language that can be easily rendered into HTML (or other formats). However, its syntax is much simpler and faster to write than HTML, making it a good choice for writing up documentation.

Markdown is used widely across the internet for documentation.

If you've never written any (or much) markdown, take 15 minutes to complete this [Markdown Tutorial](http://www.markdowntutorial.com/)

### Bonus: GitHub Extended Markdown
When adding content to GitHub, you have access to some additional features in Markdown beyond the original syntax. These include...

- language-specific syntax highlighting and code formatting
- task lists
- tables
- references to specific commits, issues, or users

> A full guide on these GitHub-specific features can be found [here](https://guides.github.com/features/mastering-markdown/)

Of these, the most important one to use is the code formatting. Backticks <code>```</code> are part of Markdown's original syntax and should be used when adding code snippets to any readme, issue, or comment. GitHub adds language-specific syntax highlighting to code snippets in Markdown if you specify the language in the snippet. For example, this code in markdown:

<img alt="backticks example" style="max-width: 350px" src="./assets/backticks-example.png"/>

will be rendered as...

```js
function foo(arr) {
  arr.forEach((el) => {
    console.log(el)
    return bar(el)
  })
}
```

You can also specify a **diff** syntax by adding - or + before each line and setting the language to `diff`


<img alt="github diff example" style="max-width: 350px" src="./assets/gh-md-diff.png"/>

This will be rendered as...

```diff
-var x = function(a, b){ return a + b }
+const add = (firstNum, secondNum) => firstNum + secondNum
```

## Extras

You can also write plain html in your markdown and it will be rendered as you expect. The images above are written using `<img>` tags. 

Another useful thing is to use the solution tag to enable interactive dropdowns.

```html
<details>
    <summary>
        A summary label, click me
    </summary>

The rest of the content, only shown when expanded
</details>
```

<details>
<summary>
A summary label, click me
</summary>

The rest of the content, only shown when expanded
</details>

## Markdown Cheatsheet

See the [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for quick and easy reference!