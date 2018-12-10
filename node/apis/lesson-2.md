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
function getAllPuppies() {
  return db.any("select * from pups");
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

router.get("/", (req, res, next) => {
  db.getAllPuppies()
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
});

module.exports = router;
```

Notice that, because `getAllPuppies` returns a Promise, we can chain `.then` immediately afterwards and utilize the data in our response.
