# Postgres & Express.js with `pg-promise`

## Objectives

- Explain what problem pg-promise solves
- Use `pg-promise` to query for information
- Use `pg-promise` to persist information

## Resources

- [pg-promise: Learn by Example](https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example)
- [pg-promise: Docs](https://github.com/vitaly-t/pg-promise/blob/master/README.md)

## Project Link

- [pg-promise intro](https://github.com/joinpursuit/Pursuit-Core-Web-pg-promise-Intro/tree/master)

# 1. Combining Postgres + Express

In previous lessons, we've explored two main ideas:

- Setting up a local server that we can query for data
- Building a database that can persist information

In this lesson, we'll learn how to combine these two elements to build a database that we can host and use to persist information in a web application.

In order to link them, we will make use of the [pg-promise](https://github.com/vitaly-t/pg-promise) library.

`pg-promise` is a **PostgreSQL interface for Node.js**. It provides an interface for easily communicating with our database from Node.js.

In this lesson, we will build an application that adds new users to be persisted to a database, and displays a list of those users.

# 2. Configuring the database

First, let's configure our database using postgres.  Our data will have the following structure:

- Users (_table_)
  - `id` (_column_): integer, **primary key**
  - `firstname`: string
  - `lastname`: string
  - `age`: integer

- Posts
  - `id`: integer, **primary key**
  - `poster_id`: integer, **foreign key** referencing the column `id` in Users.
  - `body`: string

Let's create and [seed our Database](https://en.wikipedia.org/wiki/Database_seeding):
> Seeding a database is a process in which an initial set of data is provided to a database when it is being installed.

Use the following `sql` code to create and seed your database.  Save it in a file as `facebook_db.sql`.


```sql
DROP DATABASE IF EXISTS facebook_db;

CREATE DATABASE facebook_db;

\c facebook_db;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    age INT
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    poster_id INT REFERENCES users (id) ON DELETE CASCADE,
    body VARCHAR
);

-- Add some users
INSERT INTO users(firstname, lastname, age)
    VALUES('Adam', 'Addams', 40),
          ('Beth', 'Brown', 51),
          ('Cal', 'Cassady', 14),
          ('Don', 'Donner', 33),
          ('Eve', 'Edwards', 83);

-- Add some posts
INSERT INTO posts (poster_id, body)
    VALUES(1, 'I am Adam! Hello!'),
          (1, 'I like pancakes'),
          (2, 'I am Beth! Welcome to my blog.'),
          (2, 'My zodiac sign is Gemini'),
          (3, 'I am Cal! This is my first post :)'),
          (4, 'I am Don! Hello world!'),
          (4, 'I enjoy long walks on the beach'),
          (5, 'I am Eve! Welcome!'),
          (5, 'I like turtles'),
          (5, 'My favorite number is 8');

-- Let's verify that the users and posts were inserted 
SELECT * FROM users;
SELECT * FROM posts;
```

Then execute the `facebook_db.sql` file with `psql`:  

```
psql -f facebook_db.sql
```

Once you verify that your tables are correct, let's continue on to build the Express app that will connect with our database.

# 3. Building the Express app

Now that our database is seeded with information, we need to build an API that will allow users to access and add to our database.  For now, let's focus on creating two routes:

- `/users/all`
- `/users/register`

To begin, let's create an `app.js` file where our Express server will live.  We will need to install the following pakages:

* express
* cors`

**Exercise:** With your neighbor discuss what are this packages used for and why do we need this packages.

## Steps

### 1. Initialize an `npm` project/app

In a folder called `server` or `backend` whichever your prefer. Initialize an npm project with:
```
npm init -y
```

### 2. Install dependencies
Install two packages `express` & `cors` with:
```
npm install express cors
```

### 3. Code a simple Express.js Server
Let's put together an Express server that listens on port 3000.

```js
const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
```

### 4. Set up the users router
We promised above that we will have a `routes` directory that contains our `users` routes.  Go ahead and create that file so that you have the following structure:

```
.
├── app.js
└── routes/
    └── users.js
```

First, let's create the routes to view all users and register a particular user:

```js
const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  // Get users from the database
});

router.post('/register', (req, res) => {
    const user = req.body;
    console.log(user);
    // Create a user in the database from the req.body
});

module.exports = router;
```

### 5. Setup `pg-promise`
In order to connect the database, we'll need to bring in the new `pg-promise` library:

```
npm install pg-promise
```

Then we can get a reference to our database.  To do so, we will tell `pg-promise` to connect to our database:

```js
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/facebook_db"
const db = pgp(connectionString);
```

There are a few different ways you can connect to your database with `pg-promise`. See [alternative ways here](https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax).

The variable `db` now has a reference to the database, we can query it for information.  Let's get all the users first.  `db` has a method called `.any` which takes a SQL string as an argument.  It will then query the database using the SQL command, and return "any" number of responses that it gets back.  

Below we get all the users:

```js
router.get('/all', (req, res) => {
    db.any('SELECT * FROM users')
    .then(function(data) {
        const response = {
            users: data
        }
        res.send(response);
    })
    .catch(function(error) {        
        res.send('An error occurred: ' + error);
    });
});
```

For inserting values, we usually use the `.none` method of `db`.  We call `.none` with two arguments:

1. A `sql` string
2. Query formatting parameters. This will contain any values you want to use in your `sql`.

`pg-promise` separates these to protect against SQL injection attacks.  The placeholder values (eg. `$1`) in the SQL string can only reflect simple values.

```js
router.post('/register', (req, res) => {
    const user = req.body;
    db.none('INSERT INTO users(firstname, lastname, age) VALUES($1, $2, $3)', [user.firstname, user.lastname, user.age])
    .then(() => {
        let response = {
            addedUser: req
        }
        res.send(response)
    })
    .catch(error => {
        res.send("An error occurred: " + error)
    });
});
```

Other methods besides `.none` and `.any` exits. Explore their use and [reasoning here](http://vitaly-t.github.io/pg-promise/Database.html#any)

The completed file:
<details>
<summary>Expand</summary>

```js
const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'facebook_db',
}
const db = pgp(connection);

router.get('/all', (req, res) => {
    db.any('SELECT * FROM users')
    .then(function(data) {
        const response = {
            users: data
        }
        res.send(response);
    })
    .catch(function(error) {        
        res.send('An error occurred: ' + error);
    });
});

router.post('/register', (req, res) => {
    const user = req.body;
    db.none('INSERT INTO users(firstname, lastname, age) VALUES($1, $2, $3)', [user.firstname, user.lastname, user.age])
    .then(() => {
        let response = {
            addedUser: req
        }
        res.send(response)
    })
    .catch(error => {
        res.send("An error occurred: " + error)
    });
});

module.exports = router;
```
</details>

With our server complete, run it with `nodemon app.js` or `node app.js`

# 4. Building the front-end

Now, we can build a simple front end for interacting with our server and database:

index.html
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="index.js"></script>
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <h2>Add New User</h2>
    <form id="addUserForm">
        <p>First Name: <input type="text" id='firstNameInput'></p>
        <p>Last Name: <input type="text"id='lastNameInput'></p>
        <p>Age: <input type="number", id='ageInput'></p>
        <button>Submit</button>
    </form>
    <h2>All users</h2>
    <ul id="usersList">
    </ul>
</body>
</html>
```

index.js
```js
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    const form = document.querySelector('#addUserForm');
    form.addEventListener('submit', addUserFormSubmitted);
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/users/all`);
    response.data.users.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    loadUsers();
}
```

Open `index.html` and you should see a list of users.  Submitting the form will add a new user to the list.  Close and reopen `index.html` and your list will have all the information you added before.  The power of persistence!

### Exercise

As a next step, consider what happens when you submit the form with all the fields blank.  What's a good way to prevent the current behavior?  Two options to consider are:

- Client-side validation (Don't let them click on the button if a field is blank)
- Server-side validation (Don't persist null entries)
