# Express 4: Middleware

# Topics
- What is a Middleware?
- Basic Middleware in a Route
- App-wide Middleware

# Lesson

## What is a Middleware?

A server is basically just a computer program that takes in an input and returns an output. Middlewares are a series of functions in between the request and response.

Middlewares are functions executed in the middle after the incoming request then produces an output which could be the final output passed or could be used by the next middleware until the cycle is completed, meaning we can have more than one middleware and they will execute in the order they are declared. middleware A below will execute before middleware B, middleware Bbefore middleware C.We can pass variable from one middleware to another.

![Middleware](assets/middleware.png)

We've actually already used a middleware! Refer back to the `body-parser` library. 

## Basic Middleware in a Route

Consider this route:

```javascript
app.get('/', (req, res) => {
  res.send('Hello World');
});
```

Let's say we wanted to implement a middleware that logs to the console: `Middleware A`. How would we go on about doing that? Well, a middleware is just a function. Actually, it follows a very similiar pattern:

```javascript
// 1 - Function definition
const middlewareA = (req, res, next) => {
  console.log('Middleware A');
  // 2 - Calling Next
  next();
}
```

1. A middleware function is very similiar to the callback function we've been using for Routes. You can actually call that function a middleware too! The only thing extra is now you have the `next` parameter. `res` and `req` is the same objects you're used to. They travel through the middelware.
2. `next` is a invokable function. This tells Express that the job of this middleware is done and we can move onto the next middleware. This cycle continues down the chain until one middleware calls the `res` function.

```javascript
const middlewareA = (req, res, next) => {
  console.log('Middleware A');
  // 2 - Calling Next
  next();
}

app.get('/', middlewareA, (req, res) => {
  res.send('Hello World');
});
```

We can also write the same code above in the following two formats:

```javascript
const middlewareA = (req, res, next) => {
  console.log('Middleware A');
  // 2 - Calling Next
  next();
}

const middlewareB = (req, res) => {
  res.send('Hello World');
}

app.get('/', middlewareA, middlewareB);
```

```javascript
app.get('/', (req, res, next) => {
  console.log('Middleware A');
  next();
}, 
(req, res) => {
  res.send('Hello World');
});
```

At this point we are just passing around functions as variables!

## App-wide Middleware

Let's say we have an express application: 

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Home Screen');
});

app.get('/about', (req, res) => {
  res.send('About Us Screen');
});

app.get('/user', (req, res) => {
  res.send('User Screen');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

In this case we have many routes a user can possibly access. Let's say we have this middleware: 

```javascript
const currentTimeMiddleware = (req, res, next) => {
  console.log('Time:', Date.now());
  next();
}
```

How can we connect this to all our Routes? We can technically do the following: 

```javascript
const express = require('express');
const app = express();
const port = 3000;

const currentTimeMiddleware = (req, res, next) => {
  console.log('Time:', Date.now());
  next();
}

app.get('/', currentTimeMiddleware, (req, res) => {
  res.send('Home Screen');
});

app.get('/about', currentTimeMiddleware, (req, res) => {
  res.send('About Us Screen');
});

app.get('/user', currentTimeMiddleware, (req, res) => {
  res.send('User Screen');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

We can manually attach this middleware to every route in our app, but this seems tedious and repetitive doesn't it? Well that is why we have App-wide middlewares. We use the `app.user` keyword to indicate it's a global middleware. 

We can change the same code to the following:

```javascript
const express = require('express');
const app = express();
const port = 3000;

const currentTimeMiddleware = (req, res, next) => {
  console.log('Time:', Date.now());
  next();
}

app.use(currentTimeMiddleware);

app.get('/', (req, res) => {
  res.send('Home Screen');
});

app.get('/about', (req, res) => {
  res.send('About Us Screen');
});

app.get('/user', (req, res) => {
  res.send('User Screen');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```