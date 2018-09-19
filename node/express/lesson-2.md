# Express 2: Basic Routing

# Topics
- What is Routing?
- What are HTTP Request Methods?
- Postman
- Components of Routing with Express
- Basic Routing


# Lesson

## What is Routing?

### Endpoints

Routing is one of the most fundemental concepts in server side development. A server can have a wide variety of functionality, but how does the server know which one to run? That's through `endpoints`.

`Endpoints` tell the  server which part of the server or website we are attempting to request.

```bash
https://example.com/this-is-an-endpoint
https://example.com/another/endpoint
https://example.com/some/other/endpoint
https://example.com/login
https://example.com/user
https://example.com/cart/items
```

Endpoints come in all shapes and sizes. They are made to be HUMAN READABLE and intuitive. 

For example let's say we want to access a certain Instagram user:

```
https://www.instagram.com/:username
```

We would pass in the username:

```
https://www.instagram.com/nba // Returns NBA Instagram profile
```

## What are HTTP Request Methods?

HTTP defines a set of request methods to indicate the desired action to be performed for a given resource. Although they can also be nouns, these request methods are sometimes referred as HTTP verbs. Each of them implements a different semantic.

### Types of Request Methods:

1. `GET`: The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
2. `POST`: The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
3. `PUT`: The PUT method replaces all current representations of the target resource with the request payload.
4. `DELETE`: The DELETE method deletes the specified resource.

Whenever we submit a URL into our browser that is a `GET` request.

### Testing Requests using Postman

There is a very important tool we use as server side developers. It is known as [Postman](https://www.getpostman.com/). Please download it and install it on your systems.


## Components of Routing with Express

One of Express's strengths is the ability to seamlessly create routes as you need it. 

Route definition takes the following structure:

```app.METHOD(PATH, HANDLER)```

1. `app` is an instance of express.
2. `METHOD` is an HTTP request method, in lowercase.
3. `PATH` is a path on the server.
4. `HANDLER` is the function executed when the route is matched.

The following examples illustrate defining simple routes:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/', (req, res) => {
  res.send('Got a POST request')
});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

Test these out using [Postman](https://www.getpostman.com/)!

