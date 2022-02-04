# 13 PERN Stack: One to Many - Continued

## Relating a Second Model

Right now, we've created the following routes:

|     | Action  |      URL       | HTTP Verb |    CRUD    |                Description                 |
| :-: | :-----: | :------------: | :-------: | :--------: | :----------------------------------------: |
|  1  | Create  |    /reviews    |   POST    | **C**reate |            Create a new review             |
|  2  |  Index  |    /reviews    |    GET    |  **R**ead  |    Get a list (or index) of all reviews    |
|  3  |  Show   |  /reviews/:id  |    GET    |  **R**ead  |  Get an individual view (show one review)  |
|  4  | Update  |  /reviews/:id  |    PUT    | **U**pdate |              Update a review               |
|  5  | Destroy |  /reviews/:id  |  DELETE   | **D**elete |              Delete a review               |
|  1  | Create  |   /bookmarks   |   POST    | **C**reate |           Create a new bookmark            |
|  2  |  Index  |   /bookmarks   |    GET    |  **R**ead  |   Get a list (or index) of all bookmarks   |
|  3  |  Show   | /bookmarks/:id |    GET    |  **R**ead  | Get an individual view (show one bookmark) |
|  4  | Update  | /bookmarks/:id |    PUT    | **U**pdate |             Update a bookmark              |
|  5  | Destroy | /bookmarks/:id |  DELETE   | **D**elete |             Delete a bookmark              |

But how do we relate these routes? How do we create a route that will show us a bookmark AND its reviews?

To see an individual bookmark we go to `/bookmark/:id`, to find reviews associated with this bookmark, we would write a SQL query like:

```sql
    "SELECT * FROM reviews WHERE bookmark_id=$1",
```

So we would nest the route:

|     | Action |          URL           | HTTP Verb |   CRUD   |                   Description                   |
| :-: | :----: | :--------------------: | :-------: | :------: | :---------------------------------------------: |
|  1  |  Read  | /bookmarks/:id/reviews |   GET    | **R**ead | See reviews all reviews belonging to a bookmark |

If we think about it, there isn't much use for just `/reviews` as a resource. Reviews without the bookmark don't provide us with helpful information.

So we would actually rather have the routes for **this project** be:

|     | Action  |                URL                | HTTP Verb |    CRUD    |                           Description                           |
| :-: | :-----: | :-------------------------------: | :-------: | :--------: | :-------------------------------------------------------------: |
|  1  | Create  |            /bookmarks             |   POST    | **C**reate |                      Create a new bookmark                      |
|  2  |  Index  |            /bookmarks             |    GET    |  **R**ead  |             Get a list (or index) of all bookmarks              |
|  3  |  Show   |          /bookmarks/:id           |    GET    |  **R**ead  |           Get an individual view (show one bookmark)            |
|  4  | Update  |          /bookmarks/:id           |    PUT    | **U**pdate |                        Update a bookmark                        |
|  5  | Destroy |          /bookmarks/:id           |  DELETE   | **D**elete |                        Delete a bookmark                        |
|  1  | Create  |      /bookmarks/:id/reviews       |   POST    | **C**reate |         Create a new review associated with a bookmark          |
|  2  |  Index  |      /bookmarks/:id/reviews       |    GET    |  **R**ead  | Get a list (or index) of all reviews associated with a bookmark |
|  3  |  Show   | /bookmarks/:id/reviews/:review_id |    GET    |  **R**ead  |       Get an individual review associated with a bookmark       |
|  4  | Update  | /bookmarks/:id/reviews/:review_id |    PUT    | **U**pdate |                        Update a review                          |
|  5  | Destroy | /bookmarks/:id/reviews/:review_id |  DELETE   | **D**elete |                        Delete a review                          |

<br />

**IMPORTANT** when it comes to nested resources, RESTful routes are still a useful guide, but there is a lot more decision-making to be made based on the use-cases for the resources/API

For example, if we had a `users` resource, we would probably want to be able to see resources for `users` without `bookmarks` and vice versa.

## Nesting Reviews Resource

In order to use `/bookmarks/:id/reviews` as a base route, we need to do two things

- pass an option to `express.Router()` to merge parameters from the bookmarks and reviews route
- import the reviews controller in the bookmarks controller

**controllers/reviewController.js**

```js
const reviews = express.Router({ mergeParams: true });
```

**controllers/bookmarkController.js**

```js
const reviewsController = require("./reviewsController.js");
bookmarks.use("/:bookmarkId/reviews", reviewsController);
```

Now we can go to: http://localhost:3333/bookmarks/2/reviews

We've made progress! However, instead of seeing the reviews for the bookmark with the `id` of 2 we see all the reviews

**controllers/reviewsController.js**

```js
reviews.get("/", async (req, res) => {
  const { bookmarkId } = req.params;

  try {
    const allReviews = await getAllReviews(bookmarkId);
    res.json(allReviews);
  } catch (err) {
    res.json(err);
  }
});
```

**queries/reviews**

```js
const getAllReviews = async (bookmark_id) => {
  try {
    const allReviews = await db.any(
      "SELECT * FROM reviews WHERE bookmark_id=$1",
      bookmark_id
    );
    return allReviews;
  } catch (err) {
    return err;
  }
```

## Cleaning up the Code

Now that we don't need `/reviews` we can remove it from `app.js`

**app.js**

```js
// REMOVE THIS CODE
const reviewsController = require("./controllers/reviewsController.js");
app.use("/reviews", reviewsController);
```

## Onwards

Let's build this in to our [front-end](./README2.md)
