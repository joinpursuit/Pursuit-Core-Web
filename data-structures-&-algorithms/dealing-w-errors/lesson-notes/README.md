# Dealing with Errors

With all the deadlines and big project ideas, it can feel like there is no time and it is best to go as fast as possible. Slowing down can help solve problems

- Make sure you are clear on what you expect from your code (a boolean, an update to a view on a webpage, etc.) - if you not sure what your code should be doing, it wil be impossible to write code that solves a problem you don't understand
- Take the time to read the error message
- Take a portion of the error message and copy/paste it into google/your search engine of choice

## Technical Debt

Technical debt is what happens when you build a temporary solution that will need be updated later. This can help you build faster in the moment, but will eventually catch up to you and your team.

Do your best to solve your problems in a maintainable way. A little bit of research and thought can go a long way.

## Best Practices

Best practices are ever-changing. Different companies have different best practices. Best practices should be your goal. The longer you work, the better you will get at implementing best practices.

To stay up to date on JavaScript, sign up for [JavaScript Weekly](https://javascriptweekly.com)

To stay up to date on HTML and CSS, sing up for [Front-end Focus](https://frontendfoc.us)

Both are weekly newsletters that are well-organized and with just a few minutes a week, you can learn about what is happening in the ever changing world of web development.

## Check the Official Documentation

This is the best place to start. This is where you will find best practices and the correct way to use the library/framework API. Many have error codes explained in greater depth. With front-end frameworks, you can often click a link in the error of the console log and it will take you to a more detailed description. In terminal there is often an `-h` or `--help` flag that will expand some docs, right in Terminal for you.

For basic JavaScript/HTML/CSS - use MDN or W3 schools.

Sometimes, the documentation is not clear, does not describe your error or is unhelpful in another way.

## Stack Overflow

This usually a great resource and can help you understand the problem and often gives code examples.

Read through a few answers. Sometimes the most upvoted answer is not the most helpful for your use case.

Be careful: check the date, some articles are top-voted but are old. Some libraries (like React) have updated syntax/best practices. Make sure that what you adding is correct for your version. You can cross check with documentation.

## An Obscure Website/Article on Medium/Reddit

**When it is useful**: you have a very peculiar bug and this addresses this bug that you have not seen elsewhere.

**When to Avoid:** - Most of the time.

Part of the industry encourages and pushes developers to write articles and publish tutorials. Some of these tutorials come from very inexperienced developers. While writing a tutorial is a great way to learn and solidify material, there is no guarantee the content is good, or even right.

## A Book

If you realize that your problem is that you lack fundamental understanding, a book can be a great resource. A few are free and online.

Books tend to be reviewed by many people and you can have more confidence that you are learning from a trusted and reviewed resource.

Additionally, they are put together in a cohesive order that can help fill in missing details. Starting a book from the start can be a great way to level up. It can also serve as a reference when you need to review or go deeper on a topic.

Online JavaScript:

[Eloquent JavaScript](https://eloquentjavascript.net)
[You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

HTML/CSS - no online version available:

[Learning Web Design](https://www.amazon.com/Learning-Web-Design-Beginners-JavaScript/dp/1449319270/ref=asc_df_1449319270/?tag=hyprod-20&linkCode=df0&hvadid=343276535408&hvpos=&hvnetw=g&hvrand=383578910993089816&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9004232&hvtargid=pla-504404111407&psc=1&tag=&ref=&adgrpid=74543737372&hvpone=&hvptwo=&hvadid=343276535408&hvpos=&hvnetw=g&hvrand=383578910993089816&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9004232&hvtargid=pla-504404111407)

[Web Design with HTML, CSS, JavaScript and jQuery](https://www.amazon.com/Web-Design-HTML-JavaScript-jQuery/dp/1119038634/ref=asc_df_1119038634/?tag=hyprod-20&linkCode=df0&hvadid=312114711253&hvpos=&hvnetw=g&hvrand=5405477493354581953&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9004232&hvtargid=pla-389468354338&psc=1)

## An Online Tutorial - Official

Official tutorials (linked by the official documentation) can be an excellent resource.

Tips with online tutorials:

- Build what they build:
  - Don't try to double up and use the tutorial to immediately build your project. Complete the tutorial and then use it as a reference to build your project
  - Follow the tutorial completely. Maybe there is something you don't like (variable names, they are using function declarations, instead of arrow functions...). If you improvise as you go, the further you get into the tutorial, it will be easier to get stuck. Also, there may be very good reasons a person is building the tutorial in a specific way, but it won't become clear until later.
- If you have built something by following an online tutorial, do not claim it as your own. Changing some CSS and some text, is not enough to reference it as your own work
- If you have used the build as a reference to build your own idea that is ok

## An Online Tutorial - Unofficial

These can be very hit or miss. There are some very high quality tutorials and some that are not good at all. As you get more experienced, you will be better able to determine the quality.

## A Word on New and Shiny

Application development is a very exciting field that changes often. However chasing the latest, shiniest, most hyped new thing can lead to `JavaScript Fatigue` (try googling it).

You don't have to learn every new thing. The more depth you gain in fundamentals the easier it will be to learn new technologies, as needed.

Older technologies, like jQuery, while not exciting or cool, can be very stable, useful and robust. You will be less likely to encounter a bug with the code base than when using a library that is only 6 months old.

jQuery is also used on over 78% of all websites (fall 2021), according to [W3techs](https://w3techs.com/technologies/details/js-jquery). While that number is very likely to change, it also demonstrates that web technologies can be stable.

In fact [Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Querying-by-Text-Content) is built with jQuery-like patterns and uses the older style of promises (rather than `async`/`await`) - many developers really like Cypress because it is quite stable, despite being fairly new. In part, this is because they used the right tools for their project, rather than building something entirely new from scratch.

So, pay attention to trends, but don't worry about learning every new thing. Choose things that truly interest you or that really are a good fit for what you are building.

## Further Reading

Eloquent JavaScript

[Chapter 8: Bugs and Errors](https://eloquentjavascript.net/08_error.html)
