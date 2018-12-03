# Express 5: Nested Routing & App Structure

# Topics
- Why nest routes?
- `express.Router()` and creating modular routing systems
- Intro to Application Structure

# Lesson

## Why nest routes?

Many times our applications/servers will handle many different feature sets. We've been working with simple examples so far, but in the real world, in production ready application there are usually many complex functionalities siloed. As good developers we need to be able to modularize our applications. 

#### Working with others

Often times building products take team work. You may have two or more developers on your team, each working on a seperate system. To avoid merge conflicts and to prevent stepping on each other's toes it is best practice to divide up the project accordingly.

#### Quick Example

Let's say we are building an online shopping application like Amazon. Here are a few features we may need:

1. **Product System:** Showcasing all the products available for purchase on the system. 
2. **User System:** User account making purchase. Login / Registration. 
3. **Order System:** Accounting system to keep track of all the purchases and who purchased what.
4. **Review System:** User's leaving reviews on products.

As you can see each of these systems all require unique care and have many endpoints from their end. Let's try to design a couple:

```javascript
// Product System
GET myshop.com/products?page=1
GET myshop.com/products/:product_id

// User System
GET myshop.com/users/all?page=1
GET myshop.com/users/:user_id
POST myshop.com/users/register

// Order System
GET myshop.com/orders/:user_id/purchases

// Review System
GET myshop.com/reviews/:product_id
POST myshop.com/reviews/:product_id
```

As you can see we have *FOUR* unique base routes that have routes nested in them to produce some sort of result. It would get too hectic to do all of this in our single `app.js` file, but let's give it a shot.

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Products System
app.get('/products', (req, res) => {
  res.send('Sending list of all products!')
});

app.get('/products/:product_id', (req, res) => {
  res.send('Sending specific product!')
});

// User System
app.get('/users/all', (req, res) => {
  res.send('Sending all users!')
});

app.get('/users/:user_id', (req, res) => {
  res.send('Sending specific user!')
});

app.post('/users/register', (req, res) => {
  res.send('Creating new user!')
});

// Order System
app.get('/orders/:user_id', (req, res) => {
  res.send('Sending specific users orders!')
});

// Review System
app.get('/reviews/:product_id', (req, res) => {
  res.send('Sending specific reviews of a product!')
});

app.post('/reviews/:product_id', (req, res) => {
  res.send('Creating new review on a product!')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

PHEW. Now that is LONG. Imagine how much longer it will get if we actually implement functionality into those callbacks. The `app.js` file can easily become gigantic and hard to maintain. Not to mention if multiple developers are working on different systems. It creates chaos and we probably won't even be able to complete it!

This is why we MODULARIZE our routes while nesting them!

## `express.Router()` and creating modular routing systems

The `express.Router` class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

We can essentially say each "System" deserves it's own router. We can now divide up our application into multiple files. 

We will create a new Folder in our application directory. Call it `routes` and we will name each of our Router files based off the feature. Let's convert our code above using this technique:

### ./routes/products.js

```javascript
/*
  products.js : This file will serve as the router for our Product features
*/

var express = require('express');
// Initializing our Router Class
var router = express.Router();

// Instead of setting our request methods on app, we are setting it on our router
router.get('/', (req, res) => {
  res.send('Sending list of all products!')
});

// Notice how we aren't writing /product/:product_id
// This is because we are nesting and in app.js we will already have the first part
router.get('/:product_id', (req, res) => {
  res.send('Sending specific product!')
});


// Export the router like any other NodeJS module
module.exports = router;
```

### ./routes/users.js

```javascript
/*
  users.js : This file will serve as the router for our User features
*/

var express = require('express');
var router = express.Router();

router.get('/all', (req, res) => {
  res.send('Sending all users!')
});

router.get('/:user_id', (req, res) => {
  res.send('Sending specific user!')
});

router.post('/register', (req, res) => {
  res.send('Creating new user!')
});

module.exports = router;
```

### ./routes/orders.js

```javascript
/*
  orders.js : This file will serve as the router for our Order features
*/

var express = require('express');
var router = express.Router();

router.get('/orders/:user_id', (req, res) => {
  res.send('Sending specific users orders!')
});

module.exports = router;
```

### ./routes/reviews.js

```javascript
/*
  reviews.js : This file will serve as the router for our Review features
*/

var express = require('express');
var router = express.Router();

router.get('/:product_id', (req, res) => {
  res.send('Sending specific reviews of a product!')
});

router.post('/:product_id', (req, res) => {
  res.send('Creating new review on a product!')
});

module.exports = router;
```

Awesome! Now we have all our features broken down into their own router files. Now developers only need to touch the file they are working on. But, we still need to somehow reflect this on our `app.js`. 

So now, let's refactor our `app.js` file:

```javascript
const express = require('express');
const app = express();
const port = 3000;

// 1 - First we need to import our routers!
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const reviewsRouter = require('./routes/reviews');

// 2 - Attach the Router as middleware
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/reviews', reviewsRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

1. **Step 1:** We are importing each router file just like any other NodeJS module. Please refer back to each router file and notice how we are module exporting the router object.
2. **Step 2:** Each imported router object is a Middleware! Express built it this way! So we are globally assigning these middleware using `use()`. We are stating the route for each router. Any routes we define in the router will automatically be nested within these routes.

## Intro to Application Structure

Structuring your application properly can really help you design scalable products. It's important understand the needs of your poject. 
- What are the moving pieces? 
- How many developers are working on this project?
- Does each piece need to be scalable and modularized?
- Will we need to refactor systems in the future?

Let's break down the project structure from the code above:

```
project/
  app.js
  routes/
    products.js
    users.js
    orders.js
    reviews.js
```

This is a good start for small Express applications! You have a main application file that routes to each specific functionality. You also broke up each feature to it's own router. 

But what if we wanted to move things to even more specific components? 

## Service Based Architecture

```
project/
  app.js
  routes/
    products.js
    users.js
    orders.js
    reviews.js
  services/
    products.js
    users.js
    orders.js
    reviews.js
```

## MVC Based Architecture

```
project/
  app.js
  controllers/
    products.js
    users.js
    orders.js
    reviews.js
  models/
    products.js
    users.js
    orders.js
    reviews.js
  views/
    products.js
    users.js
    orders.js
    reviews.js
```

There's many ways of designing your application. It all depends on your needs and the types of problems you will be solving.