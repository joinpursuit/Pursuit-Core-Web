# Express & SQL w. PG Seed & Read

## Adding a Database to our Express App

## Rebuild Bookmarks

Earlier in this module, we built two apps: Bookmarks back-end and bookmarks front-end.

We're going to rebuild our Bookmarks API in order to review express and learn how to add a database in.

Sometimes, rebuilding something can seem less exciting than trying something new. However, being able to compare and contrast the differences will help solidify what you have already learned and what parts are new.

## Recommendation

All the code blocks are here to help guide you and help you, if you get stuck.

You will gain the best understanding if you try to type everything out. Even though it takes longer and can feel frustrating, there is much more benefit in trying to do so.

## Getting Started

- navigate to your Desktop or other convenient folder
- `git status` to make sure you are not already in a `git` repository
- `mkdir bookmarks`
- `cd bookmarks`
- `touch .gitignore`

**.gitignore**

```
node_modules
.env
.DS_Store
```

- `git init`
- `git add -A`
- `git commit -m 'first commit'`

- `mkdir back-end`
- `cd back-end`
- `touch server.js`
- `npm init -y` (this will automatically say yes to all the npm default settings - this is fine for tutorials, small test builds, etc.)
- `touch app.js .env`
- `npm install express dotenv cors`

**Thought question** - Why is it important to add and commit after setting up the .gitignore?

Follow up question - How would you fix adding and committing folders and files you did not mean to add?

**Review Questions:**

- What did the above steps do? Try to put it in your own words. It's important to learn to talk about code.

**.env**

```
PORT=3003
```

**Review Questions:**

- What does this file and set up do?

**app.js**

```js
// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// EXPORT
module.exports = app;
```

**Review Questions:**

- What does this file and set up do?
- What is middleware?
- What does `app.use(cors())` do?
- What does `app.use(express.josn())` set up?
- What does `app.get()` do?
- What is `req` short for?
- What is `res` short for?
- What is `module.exports` what does it do?

**server.js**

```js
// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
```

Test that your app works: http://localhost:3003

**Review Questions:**

- What does this file and set up do?
- What is `app`? what does it do?

## Bookmarks Controller

Use <kbd>command</kbd> <kbd>t</kbd> to open a new terminal tab so you can continue your work without having to shut your server down (please note that changes to configuration files do require a hard reset of your server).

**Terminal**

- `mkdir controllers`
- `touch controllers/bookmarkController.js`

**controllers/bookmarksController.js**

```js
const express = require("express");
const bookmarks = express.Router();

// INDEX
bookmarks.get("/", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = bookmarks;
```

**Review Questions:**

- What is the URL one needs to go to to see this message?
- Why doesn't it work, yet?
- Why don't we see a 404 message either?

**app.js**

```js
// Bookmarks ROUTES
const bookmarksController = require("./controllers/bookmarkController.js");
app.use("/bookmarks", bookmarksController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});
```

Now try: http://localhost:3000/bookmarks

Why did we name our route `/bookmarks`? Is there a reason we name our route(s) this way?

What would happen if we put this code ABOVE the middleware set up?

## Setting up The Database

We need to create a database and table for our bookmarks in Postgres.

We could just open up a shell and do it. However, it can be helpful to store our commands for reuse.

When might we want to reuse them?

- When collaborating on a group project and you need your partner(s) to have the same set up
- When you deploy your app in the cloud and want to be sure your db/tables are set up exactly the same way
- When you want to test your database with CircleCi or other automated testing
- When you get a new computer and want to set up the project on your new computer

**GOTCHA**: Do not name a database and a table the same name

E.g.: database `bookmarks` & table `bookmarks` - this will cause errors.

We will call our database `bookmarks_dev` and our table `bookmarks`

### SQL Files

We will create two files

- **schema**: which is the representation of your data model and will also contain db/table(s) set up
- **seed**: This is some starter data we can insert into the database

- `mkdir db`
- `touch db/schema.sql`
- `touch db/seed.sql`

**db/schema.sql**

```sql
DROP DATABASE IF EXISTS bookmarks_dev;
CREATE DATABASE bookmarks_dev;

\c bookmarks_dev;

CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT,
    category TEXT,
    is_favorite BOOLEAN
);

```

Run this command

```
psql -U postgres -f db/schema.sql
```

This says, run the app `psql` use the `U`ser `postgres` and run the `f`ile `db/schema.sql`.

**Success** should look something like this

![](./assets/success-db-init.png)

<hr />

**db/seed.sql**

```sql
\c bookmarks_dev;

INSERT INTO bookmarks (name, url, category, is_favorite) VALUES
('MDN', 'https://developer.mozilla.org/en-US/', 'educational', true),
('Apartment Therapy', 'https://www.apartmenttherapy.com', 'inspirational', true),
('DMV', 'https://dmv.ny.gov', 'adulting', true);
```

Run this command

```

psql -U postgres -f db/seed.sql

```

**Success** should look something like this

![](./assets/success-seed.png)

## Adding Postgres/pg-promise

We're going to use an npm package called `pg-promise`, pg-promise is going to make it simple for us to connect to our Postgres database and allow us to write SQL commands that return JSON to us that we can then send out.

The server will now make requests to the database and the database will send back a response, very much like the request/response cycle we've already seen between clients and servers

![](./assets/server-db.png)

We will need to install it and configure it

- `npm install pg-promise`
- `touch db/dbConfig.js`

Currently, we'll be running our app on our own computer, but later, we'll want to deploy it. So we will want to set up our own environmental variables. Reminder - this (`.env`) is not a JavaScript file, do not use semi-colons or quotes.

When we installed Postgres, it set up to, by default, run on localhost with a port of 5432. We are going to keep these defaults. We can always check them with the Postgres App

![](./assets/postgres-config.png)

The database `bookmarks_dev` doesn't exist yet, we'll create it next

**.env**

```
PORT=3003
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=bookmarks_dev
PG_USER=postgres
```

<br />

**db/dbConfig.js**

We can go to [the docs](http://vitaly-t.github.io/pg-promise/index.html) and see how to set it up (we will keep the default configuration and not pass any arguments)

```js
const pgp = require("pg-promise")();

module.exports = db;
```

Now, we have to set up the connection. We will pass an object with the necessary information in order to connect our server with our database. We'll bring in the variables from our `.env` file

[Connection Object](https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object)

Finally, we must open the connection with `const db = pgp(cn);`

- `cn` - is short for connection

```js
const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
};

const db = pgp(cn);

module.exports = db;
```

## Querying the Database

We are going to separate our SQL queries from our routes. For organizational purposes, let's make a folder called `queries`

- `mkdir queries`
- `touch queries/bookmarks.js`

**queries/bookmarks.js**

First, let's bring in our connection to the database and immediately export it (so we don't forget to do this later)

```js
const db = require("../db/dbConfig.js");

module.exports = {};
```

Next let's write our first function that will hae a SQL query

**IMPORTANT** - this will be an async function. We need to be sure we wait for the response from the database before we try to return a value.

```js
const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {};

module.exports = { getAllBookmarks };
```

**Note**: with `module.exports` we are returning an object, because we are going to return more than one function, therefore, we will store it in an object.

Next, we want to set up a `try/catch` block, so that if we have a problem, we can (likely) get a more informative error.

```js
const getAllBookmarks = async () => {
  try {
  } catch (error) {
    return error;
  }
};
```

Finally, let's add our query.

`db.any()` is a function that takes a string as a first argument.

[.any()](https://github.com/vitaly-t/pg-promise#methods) - means it will accept any return from the database, no rows, one row, or many rows of data.

Be sure to export this function

```js
const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any("SELECT * FROM bookmarks");
    return allBookmarks;
  } catch (error) {
    return error;
  }
};
```

**controllers/bookmarkController.js**

require `getAllBookmarks` function and update `bookmarks.get()` index route to be `async`

```js
const express = require("express");
const bookmarks = express.Router();
const { getAllBookmarks } = require("../queries/bookmarks");

// INDEX
bookmarks.get("/", async (req, res) => {});

module.exports = bookmarks;
```

Let's create a new variable `allBookmarks` which will be an array of bookmark objects. Remember we have to `await` for the value to come back from the database.

Then, we'll send it as JSON to the browser.

```js
// INDEX
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  res.json(allBookmarks);
});
```

Let's do a little error handling

```js
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});
```

## Test it

How can you test this route?

## Save it

- `git add -A`
- `git commit -m 'index route complete'`

## Lab time!

[Link to Lab](https://github.com/joinpursuit/tuner-full-stack-app)
