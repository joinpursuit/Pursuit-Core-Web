# Express RESTful Routes, Middleware: Show and Create

#

## Intro

So far, we've learn about the MVC pattern for organizing and maintaining our code. We're going to keep building our app.

We are going to learn about RESTful routes - which is a pattern for naming our `routes` that will help us create an easy to use API.

We'll also need to use `middleware` which is functionality that we want to apply to all our routes.

Finally, we'll work on showing a view of a single bookmark and creating new one.

### Organization of routes

Imagine you are in charge of maintaining a website for a school. Your task is to create pages for all the cancellations/delays to to snow storms/inclement weather

How would you create the routes?

- `/January-Events/20/2019/Snow`
- `/Snowstorms/Cancellations/Tomorrow`
- `/Info/Events/Important/inclementWeather`

How would you continue to build out the routes if following events happened?

- December 18, 2018 - early dismissal
- February 13, 2020 - half day
- May 4, 2016 - windstorm/county power outage

Taking a moment to think about it, we'll realize it's hard to organize. So challenging, a computer scientist named Roy Fielding ended up doing his dissertation on [Architechtural Styles and the Design of Network-based Software Architectures](https://en.wikipedia.org/wiki/Representational_state_transfer) - he took feedback from over 500 developers in order to hone down a model to a core set of principles that are now called REST.

REST stands for **Re**presentational **S**tate **T**ransfer - the technical meaning can take a while to study and learn and gets much deeper than we need to worry about today. However, we can easily utilize the pattern of routes in order to start building basic apps that use best practices.

### Restful Routes

|  #  |  Action   |      URL       | HTTP Verb |    CRUD    |                Description                 |
| :-: | :-------: | :------------: | :-------: | :--------: | :----------------------------------------: |
|  1  |  Create   |   /bookmarks   |   POST    | **C**reate |           Create a new bookmark            |
|  2  | **Index** |   /bookmarks   |    GET    |  **R**ead  |   Get a list (or index) of all bookmarks   |
|  3  |   Show    | /bookmarks/:id |    GET    |  **R**ead  | Get an individual view (show one bookmark) |
|  4  |  Update   | /bookmarks/:id |    PUT    | **U**pdate |             Update a bookmark              |
|  5  |  Destroy  | /bookmarks/:id |  DELETE   | **D**elete |             Delete a bookmark              |

**Note** This pattern of routes is similar across many technical stacks. If you ever need a refresher, you can easily google it and find a resource [like this one](https://guides.rubyonrails.org/routing.html#crud-verbs-and-actions)

In our app, we've already build the `index` route.

Today we'll build `show` and `create`.

## Getting Started

- Return to your `bookmarks` app
- Make sure you are on the same directory level as your `package.json` (`ls` to check)
- Check `/` and `/bookmarks` routes to confirm your app is still working as expected

## Show Route

| Action |      URL       | HTTP Verb |   CRUD   |                Description                 |
| :----: | :------------: | :-------: | :------: | :----------------------------------------: |
|  Show  | /bookmarks/:id |    GET    | **R**ead | Get an individual view (show one bookmark) |

**controllers.js**

Create a show route based on the array position:

```js
// SHOW
bookmarks.get("/:arrayIndex", (req, res) => {
  res.json(bookmarksArray[req.params.arrayIndex]);
});
```

Error Handling:

```js
// SHOW
bookmarks.get("/:arrayIndex", (req, res) => {
  if (bookmarkArray[req.params.arrayIndex]) {
    res.json(bookmarksArray[req.params.arrayIndex]);
  } else {
    res.redirect("/404");
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
  res.status(303).redirect("/bookmarks");
});
```

How do we make a POST request? We can't use the browser URL like we've done.

We can use a command line tool called [cURL](https://curl.se) - cURL stands for cleint URL.

Let's try a simple get request

- `curl http://localhost:3003/bookmarks`

Nice! We can see our data in terminal.

We can also `POST` data using cURL

- `curl -H "Content-Type: application/json" -X POST -d '{"name":"AV Club", "url": "https://www.avclub.com"}' localhost:3003/bookmarks`

  We should get a message that the route was found and caused a redirect.

Let's make a get request back to our index:

- `curl http://localhost:3003/bookmarks`

Uh oh! Rather than putting in our data, we ended up getting a property of null.

The body of the request can come in as a number of formats such as JSON, url-encoded, binary etc. formats. We need to write code that will `parse` thd incoming request body and give us the data we are trying to get. Typically, our data will be collected from a form.

If we are using a traditional HTML form, it is likely the request will come in as url-encoded. But if we are using a front-end like React, we will be sending our data as JSON.

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

Middleware is code that 'runs in the middle' of a request and response. We have a third parameter called `next`. Next is a function that will allow the app to know when it is time to move to the next callback.

It can be set up to run for every route:

**app.js** Above other routes

```js
app.use((req, res, next) => {
  console.log("This code runs for every request");
  next();
});
```

Check terminal to see this `console.log` - it should run every time you make a browser request.

Or you can add it to certain routes only

**controller/bookmarksController.js** above bookmarks routes

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

<details><summary>Another way to test for http or https</summary>

You could also use the JavaScript function `.match()`, which will test for a matching string, you can use a simple string or a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

So it would look like this

```js
req.body.url.match(/https?:\/\//);
```

[learn more about regular expressions](https://regexone.com/)

</details>

Add this function to `CREATE`

```js
// CREATE
bookmarks.post("/", validateURL, (req, res) => {
  bookmarksArray.push(req.body);
  res.status(303).redirect("/bookmarks");
});
```
