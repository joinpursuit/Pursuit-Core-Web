# Creating RESTful APIs using Express and Postgres

## Topics

- What are the three "layers" of our stack?
- Why would we want to segment out our stack?
- How do we set up Express and Postgres together?

## Lesson

At this point, we should have all the tools to put together a complete RESTful API, with a SQL database and everything. Unlike the previous apps we've been making, this API should be able to update, delete, and (most importantly) **save** new data.

The advantage to this system comes back to a foundational programming concept: **separation of concerns**. We have three different layers to our stack, each performing a very specific set of tasks:

- **Databases** store, update, and organize data.
- **Server applications** access, manage, and serve database information to the frontend.
- **Client applications** receive and represent that information to the user.

In this lesson, we are going to handle the first two layers of our stack - we are going to build out an API **without considering our frontend**. This is fine! Many APIs are built without a specific frontend in mind- and many APIs serve to several clients all over the world.

But how? What does an Express app with a SQL database look like? How do we integrate our SQL queries into JavaScript?

Well, another major layer to our Express function means another folder in our Express apps. We'll put this one next to our `routes` folder, and we'll call it `db`.

This folder will contain all of the queries that we're going to use to connect to our database. We'll set up queries inside functions that describe what we're looking to get out of (or put into) the database- for example, `getAllUsers` or `addSingleUser`. We'll then connect these functions to the files in our `routes` folder, so that they can quickly and efficiently interact with our database.

In order to parse SQL in our Express apps, we're going to use a module called `pg-promise`. Pg-promise connects to our database and produces an object, which we'll assign to a variable called (again) `db`. On this object are several functions which create Promises when invoked with a SQL query as the argument. These Promises produce the result of that SQL query.

Here's an example of a file that might be inside of our `db` folder:

```javascript
// Here we initialize pg-promise. On the first line, we invoke it with an empty object to indicate that we're using default setup options. Then we connect it to our locally-hosted database URL.
const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/puppies");

// Here's an example query to get all pups from the database table "pups."
function getAllPuppies(req, res, next) {
  db.any("select * from pups")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL puppies"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

// Export all of our connections to the database.
module.exports = {
  getAllPuppies: getAllPuppies
};
```

`any` is one of several functions `db` makes available to us. What it means is that we expect **any number of rows** from the table we're querying. This is a way to produce good errors in your application. If, for example, each pup has a unique ID, then `getOnePup` should only return one puppy- no less, no more. Therefore, we'd use `db.one`, which produces an error if we get many, or zero, rows from our database. A full list of functions available can be found in the "Methods" section of pg-promise's npm page [here](https://www.npmjs.com/package/pg-promise).

Here's an example of how the `puppies.js` file in our `routes` folder might receive and use this function:

```js
var express = require("express");
var router = express.Router();
var db = require("../db/queries");

router.get("/", db.getAllPuppies);

module.exports = router;
```

Notice that, because `getAllPuppies` returns a Promise, we can chain `.then` immediately afterwards and utilize the data in our response.

## Away From "Get"

We chatted about the different HTTP keywords of RESTful APIs in the previous lesson (e.g. `POST`, `PATCH`, `DELETE`, etc.), but now we have the opportunity to implement those keywords in Express routes and make meaningful SQL statements to accompany them.

### `POST`

Post requests add one or more rows to the relevant table in our database. Hopefully, there is a harmony between the HTTP route, request type, and table name in our database. For example, a POST request on `/users` should add a user.

Here is an example of a post request to add a new puppy:

```js
const createPuppy = (req, res, next) => {
  req.body.age = parseInt(req.body.age);
  db.none(
    "INSERT INTO pups(name, breed, age, sex)" +
      "VALUES(${name}, ${breed}, ${age}, ${sex})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Inserted one pup"
      });
    })
    .catch(err => {
      return next(err);
    });
};
```

There are a few things to notice here:

- We are using a new pg-promise function: `db.none`. This means that we don't expect a response from our database, which makes sense, because we're adding a new user, not getting one.
- Despite not using backtics (e.g. ```) we are still using the interpolation syntax (`${}`) for passing in data. This is because, while pg-promise supports string interpolation, it doesn't recognize backtics as valid string syntax.
- You can see that `db.none` accepts two arguments. The first is our string containing our SQL statement, and the second is an object containing all of the data we need to interpolate into that string. Each value passed in to our SQL statement (for example, `${name}`) is referencing a key in our object (e.g. req.body.name).

Inside our routes for "Puppies," we simply add:

```js
router.post("/", db.createPuppy);
```

### `PATCH`/`PUT`

All of these routes are going to look pretty similar.

```js
const updatePuppy = (req, res, next) => {
  db.none(
    "UPDATE pups SET name=${name}, breed=${breed}, age=${age}, sex=${sex}  WHERE id=${id}",
    {
      name: req.body.name,
      breed: req.body.breed,
      age: parseInt(req.body.age),
      sex: req.body.sex,
      id: parseInt(req.params.id)
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        messsage: "Updated Puppy"
      });
    })
    .catch(err => {
      return next(err);
    });
};
```

Notice the SQL statement here - that's basically the only thing that's different.

### `DELETE`

```js
const removePuppy = (req, res, next) => {
  let pupId = parseInt(req.params.id);
  db.result("DELETE from pups WHERE id=$1", [pupId])
    .then(result => {
      res.status(200).json({
        status: "success",
        message: `Removed ${result.rowCount} puppy`
      });
    })
    .catch(err => {
      return next(err);
    });
};
```

There are a couple of differences here. We're using the function `db.result` to return the full result object, not just the rows from the table. This allows us to get the attribute `rowCount`, which we're using in our response.

Additionally, instead of keying into an object, our second argument is an array, and our string interpolation (`$1`) refers to indices in our array.
