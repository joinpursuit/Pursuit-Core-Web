# PERN Many to Many

Here we will be adding users to our app. Our users can have many bookmarks, and bookmarks can belong to many users.

We are only going to implement this functionality on the back-end in this lesson.

If we add a model `users`

We can say that `users` have many `reviews`. `reviews` can only belong to one `user` a one to many relationship we've seen with `bookmarks` and reviews.

However, `bookmarks` can have many `users` and `users` can have many `bookmarks` - thus creating a `many to many relationship`.

We can imagine seeing a list of bookmarks, maybe by category, allowing users to 'favorite' or add them to their collection of bookmarks. If a user no longer likes a bookmark, we would like to remove that bookmark from the `users` list, but we would not want to delete that bookmark.

As we can see, the relationship of `bookmarks` and `users` has different functions than `bookmarks` and `reviews`. Which means the way we set up the routes will be different.

Designing an API, once there are more than two models, begins to become complex. There are a lot of considerations needed, building every possible permutation of routes/resources is not a good use of time, nor would it be easy to maintain.

What we might want to do is spend some time drawing some ERD/UML diagrams and also user stories.

For example:

- ✅ a user can see all of their reviews
- ❓ see all the users associated with a bookmark (depends on the goal(s) of our app)
- ❌ see all the reviews that belong to a user, but without knowing which bookmark the reviews belong to (how would this be useful?)

Since our focus is a short, simple, demonstrative lesson that you can use as a reference. These are the users stories we would like to build

- A user can create/update/delete/see details of their user info
- A user can see a list of bookmarks they have
- A user can add/remove bookmarks from their collection
- A user can see a list of all their reviews (with information about which bookmark the reviews belong to)

|     | Action  |         URL          | HTTP Verb |    CRUD    |                  Description                   |
| :-: | :-----: | :------------------: | :-------: | :--------: | :--------------------------------------------: |
|  1  | Create  |        /users        |   POST    | **C**reate |               Create a new user                |
|  2  |  Index  |        /users        |    GET    |  **R**ead  |       Get a list (or index) of all users       |
|  3  |  Show   |      /users/:id      |    GET    |  **R**ead  |     Get an individual view (show one user)     |
|  4  | Update  |      /users/:id      |    PUT    | **U**pdate |                 Update a user                  |
|  5  | Destroy |      /users/:id      |  DELETE   | **D**elete |                 Delete a user                  |
|  6  |  Index  | /users/:id/bookmarks |    GET    |  **R**ead  | Get a list (or index) of all bookmarks by user |
|  7  | Create  | /users/:id/bookmarks |   POST    | **C**reate |      Add a bookmark to a user collection       |
|  8  | Destroy |      /users/:id      |  DELETE   | **D**elete |                 Delete a user                  |
|  9  |  Index  |  /users/:id/reviews  |    GET    |  **R**ead  |  Get a list (or index) of all reviews by user  |

### Users CRUD (Routes 1 - 5 from above table)

`users` basic CRUD is the same as `bookmarks` and `reviews`, there is no new considerations we must make yet

- `touch controllers/usersController.js`
- `touch queries/users.js`

**db/schema.sql**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    admin BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT false
);



DROP TABLE IF EXISTS users_bookmarks;

CREATE TABLE users_bookmarks (
    created TIMESTAMP DEFAULT NOW(),
    bookmark_id INTEGER,
    user_id INTEGER
);
```

We may think about adding a password here for eventual login functionality. But we are not doing that now, so let's not add things we won't use. We can always alter the table. As a complete aside, we would want to be careful to encrypt the passwords and follow good security practices - which is an entirely different topic.

**db/seed.sql**

```sql
INSERT INTO users (username, admin, verified)
VALUES
('Evan', true, true),
('Juliana', true, true),
('David', false, true),
('Mr. Mingo', false, true),
('Alison', false, true),
('Hannah', false, true),
('Gabi', false, true);



INSERT INTO users_bookmarks( bookmark_id, user_id)
VALUES
(1,1),
(2,1),
(3,1),
(2,2),
(1,3),
(2,4),
(2,5),
(3,6),
(2,7);
```

Run the command for initializing and seeding the database
e.g. `psql -U postgres -f db/seed.sql`

**queries/users.js**

<details><summary>
code

</summary>

```js
const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");

    return allUsers;
  } catch (err) {
    return err;
  }
};

const getUser = async (id) => {
  try {
    const oneUser = await db.any("SELECT * FROM users WHERE id=$1", id);
    return oneUser;
  } catch (err) {
    return err;
  }
};

const newUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (username, verified, password, admin) VALUES($1, $2, $3, $4) RETURNING *",
      [user.username, user.verified, user.password, user.admin]
    );
    return newUser;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      id
    );
    return deletedUser;
  } catch (err) {
    return err;
  }
};

const updateUser = async (user) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET username=$1, verified=$2, password=$3, admin=$4 where id=$5 RETURNING *",
      [user.username, user.verified, user.password, user.admin, user.id]
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};
module.exports = {
  getAllUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
};
```

</details>

**controllers/usersController.js**

<details><summary>
code

</summary>

```js
const express = require("express");

const { getBookmark } = require("../queries/bookmarks.js");
const users = express.Router({ mergeParams: true });
const {
  getAllUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
} = require("../queries/users");

users.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();

    res.json(allUsers);
  } catch (err) {
    res.json(err);
  }
});

// SHOW
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user.length > 0) {
    res.json(user[0]);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// UPDATE
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(req.body);
  res.status(200).json(updatedUser);
});

users.post("/", async (req, res) => {
  const user = await newUser(req.body);
  res.json(user);
});

// DELETE
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  res.status(200).json(deletedUser);
});

// TEST JSON NEW
// {
// "userer":"Lou",
// "title": "Fryin Better",
// "content": "With the great tips and tricks I found here",
// "bookmark_id": "2",
// "rating": "4"
// }
module.exports = users;
```

</details>

**app.js**

```js
const usersController = require("./controllers/usersController.js");
app.use("/users", usersController);
```

### Users Relations, Remaining to be built

|     | Action  |           URL            | HTTP Verb |    CRUD    |                  Description                   |
| :-: | :-----: | :----------------------: | :-------: | :--------: | :--------------------------------------------: |
|  6  |  Index  |   /users/:id/bookmarks   |    GET    |  **R**ead  | Get a list (or index) of all bookmarks by user |
|  7  | Create  | /users/:id/bookmarks/:id |   POST    | **C**reate |      Add a bookmark to a user collection       |
|  8  | Destroy | /users/:id/bookmarks/:id |  DELETE   | **D**elete |     Delete a bookmark from user collection     |
|  9  |  Index  |    /users/:id/reviews    |    GET    |  **R**ead  |  Get a list (or index) of all reviews by user  |

### Index of all Bookmarks by User

We are going to join our bookmarks table with our users table with the join/lookup table `users_bookmarks` - we already created it and seeded some data in it. So let's just start by trying to `read` a list of `bookmarks` by users

The route will be GET `/users/:id/bookmarks`

Our sql query will be

```sql
SELECT
    *
FROM
    users_bookmarks
JOIN
    users
ON
    users.id = users_bookmarks.user_id
JOIN
    bookmarks
ON
    bookmarks.id = users_bookmarks.bookmark_id
WHERE
    users_bookmarks.user_id = 1;
```

We can add these to `users queries` and `usersController`

Let's code it out

**queries/users.js**

```js
getAllBookmarksForUser = async (id) => {
  try {
    const bookmarksByUser = await db.any(
      `
        SELECT
            *
        FROM
            users_bookmarks
        JOIN
            users
        ON
            users.id = users_bookmarks.user_id
        JOIN
            bookmarks
        ON
            bookmarks.id = users_bookmarks.bookmark_id
        WHERE
            users_bookmarks.user_id = 1;
      `,
      id
    );
    return bookmarksByUser;
  } catch (err) {
    return err;
  }
};

// don't forget to export the function at the bottom
//   getAllBookmarksForUser,
```

**controllers/usersController.js**

```js
// don't forget to import the function at the top
//   getAllBookmarksForUser,

users.get("/:userId/bookmarks", async (req, res) => {
  const { userId } = req.params;
  const userBookmarks = await getAllBookmarksForUser(userId);
  res.json(userBookmarks);
});
```

test with postman http://localhost:3333/users/1/bookmarks

```js
    {
        "created": "2021-07-12T16:00:19.537Z",
        "bookmark_id": 1,
        "user_id": 1,
        "id": 1,
        "username": "Evan",
        "password": null,
        "admin": true,
        "verified": true,
        "name": "MDN",
        "url": "https://developer.mozilla.org/en-US/",
        "category": "educational",
        "is_favorite": true
    },
```

We get a lot of extra data, including all the info on the user in every single object, which becomes redundant. Let's limit what we return

**queries/users.js**

Change

```sql
SELECT
  *
FROM
```

To

```sql
SELECT
  bookmark_id, user_id, name, is_favorite, category
FROM
```

### Add bookmark to user collection

The route will be POST `/users/:id/bookmarks/:bookmarks_id`

We will be adding to the join/lookup table

**queries/users.js**

```js
addNewBookmarkToUser = async (userId, bookmarkId) => {
  try {
    let add = await db.none(
      `INSERT INTO users_bookmarks (user_id, bookmark_id) VALUES ($1, $2)`,
      [userId, bookmarkId]
    );
    // return a value of true since it was successful, db.none always returns null
    return !add;
  } catch (err) {
    return err;
  }
};
```

**controllers/usersController.js**

```js
// Add to a user's bookmark collection
users.post("/:userId/bookmarks/:bookmarkId", async (req, res) => {
  const { userId, bookmarkId } = req.params;
  const successfulAdd = await addNewBookmarkToUser(userId, bookmarkId);
  if (successfulAdd) {
    res.status(201).json({ message: "ok" });
  } else {
    res.status(400).json({ info: successfulAdd });
  }
});
```

#### Bonus Challenge

How can you check that duplicate bookmarks are not added?

### Remove bookmark from user collection

The route will be DELETE `/users/:id/bookmarks/:bookmarks_id`

We will be deleting from the join table

**queries/users.js**

```js
deleteBookmarkFromUser = async (userId, bookmarkId) => {
  try {
    let remove = await db.none(
      `
      "DELETE FROM users WHERE user_id = $1 AND bookmark_id=$2",
    `,
      [userId, bookmarkId]
    );
    return !remove;
  } catch (err) {
    return err;
  }
};
```

**controllers/usersController.js**

```js
// Remove from a user's bookmark collection
users.delete("/:userId/bookmarks/:bookmarkId", async (req, res) => {
  const { userId, bookmarkId } = req.params;
  const successfulDelete = await deleteBookmarkFromUser(userId, bookmarkId);
  if (successfulDelete) {
    res.status(202).json({ message: "ok" });
  } else {
    res.status(400).json({ info: successfulDelete });
  }
});
```

### See a list of reviews by user

The route will be GET `/users/:id/reviews` - which will show us a list of reviews by user. The new piece of this route, is that simply seeing the review without the name of the bookmark, will not be useful to the user

ie

- User
  - review 1
  - review 2
  - review 3

We want to also add the bookmark

- User
  - bookmark title, review 1
  - bookmark title, review 2
  - bookmark title, review 3

Also, the way our project is set up, the user doesn't have to have added the bookmark to their collection in order to be able to add to it, nor if they would want to remove their bookmark from their collection, we would not want to automatically delete their review

- get user
- get reviews - use username as the foriegn key
- get bookmarks using the reviews id

Ready to code it? Let's do it!

**queries/users.js**

There are three queries we have to make, let's just do one, test it, and then add more.

Let's get the user first:

```js
getUserReviews = async (id) => {
  // get user info based on id
  // get reviews connected on username reviewer
  // get bookmark that matches on foreign key in reviews

  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);

    return user;
  } catch (err) {}
};
```

**controllers/usersController.js**

```js
// See a list of user's reviews
users.get("/:userId/reviews", async (req, res) => {
  const { userId } = req.params;
  const userReviews = await getUserReviews(userId);
  res.json(userReviews);
});
```

Don't forget to export/import functions as needed

http://localhost:3333/users/2/reviews

See the user data? Yay! Let's try to grab those reviews

**queries/users.js**

There are three queries we have to make, let's just do one, test it, and then add more.

Let's get the user first:

```js
getUserReviews = async (id) => {
  // get bookmark that matches on foreign key in reviews

  try {
    // get user info based on id
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    return user;
  } catch (err) {}
};
```

Now let's add the reviews

```js
getUserReviews = async (id) => {
  // get bookmark that matches on foreign key in reviews

  try {
    // get user info based on id
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    // get reviews connected on username reviewer
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE reviewer=$1",
      user.username
    );

    return user;
  } catch (err) {}
};
```

We run into a small problem. We can only return one thing. Those are the rules of JavaScript.

So, we instead can make a new object of data that will hold the user object and an array of reviews objects

```js
getUserReviews = async (id) => {
  // get bookmark that matches on foreign key in reviews

  try {
    // get user info based on id
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    // get reviews connected on username reviewer
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE reviewer=$1",
      user.username
    );

    const data = {
      user,
      reviews,
    };
    return data;
  } catch (err) {}
};
```

Finally, let's fetch the bookmark. We don't need all the bookmark data, so let's just us the name, bookmark.id and the category.

We can use the reviews as a lookup/join table.

We are going to join bookmarks and reviews on the foreign key. We did this already! It's totally ok to look at your old code to see how you did something to give you a boost!

It's also a great idea to hop in a psql shell and test each part of this query one by one, get the query from reviews, then add the join to bookmarks, then add the join on users, finally add the `WHERE` clause, until you have the query you want and expect.

We are also joining the users and the reviews by the `users.username` and `reviews.reviewer`

Note: we are choosing `db.one()` - because we expect one row. If we get any other amount (none, many) it will throw an error.

We are choosing `db.any()` because a user can have no reviews, one review, or many reviews. The same with bookmarks.

```js
getUserReviews = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE reviewer=$1",
      user.username
    );
    const bookmark = await any(
      `
    SELECT
      name, category, bookmarks.id
    FROM
      reviews
    JOIN
      bookmarks
    ON
      bookmarks.id = reviews.bookmark_id
    JOIN
      users
    ON
      reviews.reviewer = users.username
    WHERE
      users.id = $1
    `,
      id
    );

    const data = {
      user,
      bookmark,
      reviews,
    };
    return data;
  } catch (err) {
    console.log(err);

    return err;
  }
};
```

## Future Considerations

Now that we have a backend with this functionality, how would we incorporate it into the front-end?

Currently, there are a number of limitations of our app:

- anyone can add a review and use anyone's name
- anyone can edit/delete any bookmark/review/user

What would be useful, would be the ability to create a user session that would store the information about the logged in user. That way, a logged in user could only create/edit/delete reviews that they've written.

Additionally, we may only want the initial creator of a bookmark, or someone with admin privileges to be able to edit/delete a bookmark.
