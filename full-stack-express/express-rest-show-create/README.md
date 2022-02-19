# Express RESTful Routes, Middleware: Show and Create

#

## Intro

So far, we've learned a little about the MVC pattern for organizing and maintaining our code. We're going to keep building our app, with a very loose adaptation of this pattern.

You may encounter other code libraries or frameworks like Ruby on Rails. Ruby on Rails follows a principle of convention over configuration - meaning if you follow the rules of RoR, things will work _automagically_. ExpressJS is about thinking about what your app needs and organizing it in a sensible way for what you have built. There is no one true way to organize an ExpressJS app, and you have to configure each step. Configuration gives you a lot more control of how to build your app.

## RESTful Routes

We are going to learn about RESTful routes - which is a pattern for naming our `routes` that will help us create an easy to use API.

We'll also need to use `middleware` which is functionality that we want to apply to either multiple or all our routes.

Finally, we'll work on showing a view of a single bookmark and then creating new one.

### Organization of routes

Imagine you are in charge of maintaining a website for a school. Your task is to create pages for all the cancellations/delays to to snow storms/inclement weather.

**~5 Minute In-class activity**

How would you create the routes? Here are some examples, think about the following details:

- Are the routes stable, if the number of routes grow, is there a maintainable pattern to follow?
- Are the routes organized in a way that make sense?
- Are the routes as simple as possible?
- Can you reorganize them in a (relatively) easy way?
- Can both creators and users understand what is going on?

- `/January-Events/20/2019/Snow`
- `/Snowstorms/Cancellations/Tomorrow`
- `/Info/Events/Important/inclementWeather`

How would you continue to build out the routes if following events happened?

- December 18, 2018 - early dismissal
- February 13, 2020 - half day
- May 4, 2016 - windstorm/county power outage

Taking a moment to think about it, we'll realize it's hard to organize. So challenging in fact, a computer scientist named Roy Fielding ended up doing his dissertation on [Architectural Styles and the Design of Network-based Software Architectures](https://en.wikipedia.org/wiki/Representational_state_transfer). He took feedback from over 500 developers in order to hone down a model to a core set of principles that are now called REST.

REST stands for **Re**presentational **S**tate **T**ransfer - the technical meaning can take a while to study and learn and gets much deeper than we need to worry about today. However, we can easily utilize the pattern of routes in order to start building basic apps that use these best practices.

### Restful Routes

|  #  |   Action   |      URL       | HTTP Verb |    CRUD    |                Description                 |
| :-: | :--------: | :------------: | :-------: | :--------: | :----------------------------------------: |
|  1  | **Create** |   /bookmarks   |   POST    | **C**reate |           Create a new bookmark            |
|  2  |  _Index_   |   /bookmarks   |    GET    |  **R**ead  |   Get a list (or index) of all bookmarks   |
|  3  |  **Show**  | /bookmarks/:id |    GET    |  **R**ead  | Get an individual view (show one bookmark) |
|  4  |   Update   | /bookmarks/:id |    PUT    | **U**pdate |             Update a bookmark              |
|  5  |  Destroy   | /bookmarks/:id |  DELETE   | **D**elete |             Delete a bookmark              |

**Note** This pattern of routes is similar across many technical stacks. If you ever need a refresher, you can easily google it and find a resource [like this one](https://guides.rubyonrails.org/routing.html#crud-verbs-and-actions).

In our app, we've already build the `index` route.

Today we'll build the `show` and `create` routes.

## Getting Started

- Return to your `bookmarks` app
- Make sure you are on the same directory level as your `package.json` (`ls` to check)
- Check `/` and `/bookmarks` routes to confirm your app is still working as expected

## Show Route

| Action |      URL       | HTTP Verb |   CRUD   |                Description                 |
| :----: | :------------: | :-------: | :------: | :----------------------------------------: |
|  Show  | /bookmarks/:id |    GET    | **R**ead | Get an individual view (show one bookmark) |

**controllers.js**

When we connect to a database, we'll use the `id` (a unique number./identifier for each item in the database). But for now, we will just use the index position of the array to mock the behavior.

Create a show route based on the array position:

```js
// SHOW
bookmarks.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  res.json(bookmarksArray[arrayIndex]);
});
```

**Error Handling:** A large part of making a good application is handling errors and giving users feedback so they can use the app with confidence and ease. We'll demonstrate some simple error handling. In the interest of time we won't cover all the ways to handle errors, but as you work on your projects, you should continue to spend time improving error handling.

```js
// SHOW
bookmarks.get("/:arrayIndex", (req, res) => {
  if (bookmarkArray[req.params.arrayIndex]) {
    res.json(bookmarkArray[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});
```

## Create Route

| Action |    URL     | HTTP Verb |    CRUD    |      Description      |
| :----: | :--------: | :-------: | :--------: | :-------------------: |
| Create | /bookmarks |   POST    | **C**reate | Create a new bookmark |

So far, all our requests have used the `GET` verb. GET requests can only pass data through the URL (request header) - as we've seen with request parameters and query strings.

Eventually, we want to be able to allow users to add data via an HTML form. HTML form data comes through in the `body` of a request.

We will use a new verb `POST` that will allow us to pass data through the response body.

Since we are working with an array that is stored in memory, we are just going to push our new data onto the array. The problem is, every time we restart the server our changes will disappear. Later, we'll learn about persisting our data with a database.

**controllers.js**

Let's add a route that will take the data from the request body and push it onto the `bookmarksArray`

```js
// CREATE
bookmarks.post("/", (req, res) => {
  bookmarksArray.push(req.body);
  res.json(bookmarkArray[bookmarkArray.length - 1]);
});
```

How do we make a POST request? We can't use the browser URL like we've done.

We can use a command line tool called [cURL](https://curl.se) - cURL stands for cleint URL.

Let's try a simple get request

- `curl http://localhost:3003/bookmarks`

Nice! We can see our data in terminal.
 
We can also `POST` data using cURL

- `curl -H "Content-Type: application/json" -X POST -d '{"name":"AV Club", "url": "https://www.avclub.com"}' localhost:3003/bookmarks`

Or, if you have the lastest version of curl:

- `curl --json '{"name":"AV Club", "url": "https://www.avclub.com"}' -X POST localhost:3003/bookmarks`

We should get a message that the route was found and returns the new bookmark

<details><summary>Breaking down the cURL request</summary>

Commands in terminal are a bit like sentences.

- `cURL` the application we want to run
- `-` this is noting that a `flag` is being added. It allows us to add options to our command, we can add multiple flags in a command
- `-H` means headers. Remember, a request is made up of a header and a body. [A list of request fields for the header](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields). In our case, we want to inform the server that we will be sending `JSON` as opposed to plain text, or possibly URL encoded text etc.
- `-X` what kind of action are we going to send? `GET`, `POST`, `PUT`, `DELETE` or other
- `-d` is for data, the next thing will be some valid JSON wrapped in single quotes, that is the data we are sending, inside of a web application in a front end, the user would enter this information into a form and then submit it
- And finally, the location where we are sending the request, in our case, it is `localhost:3003/bookmarks`

  
For more info on the [--json flag](https://daniel.haxx.se/blog/2022/02/02/curl-dash-dash-json/)
  
</details>

Let's make a get request back to our index:

- `curl http://localhost:3003/bookmarks`

Uh oh! Rather than putting in our data, we ended up getting a property of null.

The body of the request can come in as a number of formats such as JSON, url-encoded, binary etc. formats. We need to write code that will `parse` the incoming request body and give us the data we are trying to get. Typically, our data will be collected from a form.

If we are using a traditional HTML form, it is likely the request will come in as url-encoded. But if we are using a front-end app like React, we will likely be sending our data as JSON.

We could write the logic to take the incoming data and parse it. But since it is such a common problem, express already has a way to parse the code for us. We just need to configure it properly.

We are going to use some `middleware` in order to parse all incoming JSON.

**app.js**

Make sure you put this ABOVE your routes

```js
// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON
```

Now we should be able to run our cURL commands and see our new data (don't forget you can scroll through previous commands in terminal by using the up arrow)

- `curl -H "Content-Type: application/json" -X POST -d '{"name":"AV Club", "url": "https://www.avclub.com"}' localhost:3003/bookmarks`

- `curl http://localhost:3003/bookmarks`

We should also be able to see this change in our browser. Let's visit http://localhost:3003/bookmarks and we should see our new bookmark at the bottom of the list.

## Middleware in more depth

Middleware is code that "runs in the middle" of a request and response. We have a third parameter called `next`. Next is a function that will allow the app to know when it is time to move to the next callback.

It can be set up to run for every route:

**app.js** Above other routes

```js
app.use((req, res, next) => {
  console.log("This code runs for every request");
  next();
});
```

Check terminal to see this `console.log` - it should run every time you make a browser request.

Or you can add middleware to certain routes only

**controllers/bookmarksController.js**

```js
const validateURL = (req, res, next) => {
  console.log(
    "This function checks the validity of the URL entered by the user"
  );
};
```

Add this function to `CREATE`

```js
// CREATE
bookmarks.post("/", validateURL, (req, res) => {
  bookmarksArray.push(req.body);
  res.json(bookmarkArray[bookmarkArray.length - 1]);
});
```

Now you can test this again by using the up arrow in terminal and rerunning the cURL request and see that it works...almost. We forgot to add the next function

```js
const validateURL = (req, res, next) => {
  console.log(
    "This function checks the validity of the URL entered by the user"
  );
  next();
};
```

Now it should let us complete the Post request.

### Code Organization

In our file full of routes, suddenly there is a function to validate an input.

If this is our only function, it isn't a big deal to leave it here. But if our app kept growing, this would become hard to manage.

Let's put it in its own file. We can put the file anywhere (inside the `controllers `folder, on the same level as the `package.json` file, we can make a new file etc.), but we'll just put it in the `models` folder, `models` have to do with data, and we are validating incoming data. Again, there are a lot of different ways to organize an express app. We'll just focus on simple patterns to practice.

Make sure you are on the same level as `package.json` in terminal

- `touch models/validations.js`

Cut and paste the `validateURL` function into this file and export it:

```js
const validateURL = (req, res, next) => {
  console.log(
    "This function checks the validity of the URL entered by the user"
  );
  next();
};

module.exports = { validateURL };
```

**controllers/bookmarkController.js**

```js
const { validateURL } = require("../models/validations.js");
```

And now check that the functionality (console log runs on a POST request works)

### Validate URL Logic

Right now, our function doesn't really check for anything.

Let's take a few minutes to write some pseudocode on how to check if the URL entered starts with `http` or `https` and share it as a class.

It is important to work on your problem solving skills and come up with your own way to solve it. Try not to peek until you have come up with your own plan first.

<details><summary>One possible way to do it</summary>

```js
const validateURL = (req, res, next) => {
  if (
    req.body.url.substring(0, 7) === "http://" ||
    req.body.url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
  }
};
```

</details>

### Bonus 1 - Using A Regular Expression

We have not learned about regular expressions yet. But here is a different approach using them.

<details><summary>Another way to test for http or https</summary>

You could also use the JavaScript function `.match()`, which will test for a matching string, you can use a simple string or a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

So it would look like this

```js
req.body.url.match(/https?:\/\//);
```

[learn more about regular expressions](https://regexone.com/)

</details>
