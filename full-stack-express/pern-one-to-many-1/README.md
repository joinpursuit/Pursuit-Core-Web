# 13 PERN Stack: One to Many - Part 1 

**Note:** due to the size of this README.md there is a README2.md that continues this lesson. It is in this folder/linked at the bottom. 

## Adding a Second Model

### Intro & Considerations

So far, we've just worked with one model, when you get to a professional project, there will be many models. There are many considerations when adding models, including relationships and whether full CRUD is needed.

**For example:**

- A weather station reporting to a central server/database - we likely don't want to be able to edit or delete the data coming in, so we probably would not build out full CRUD in a user interface
- An online store - it's important to retrieve the index and show pages as quickly as possible, since that is the majority of the db calls that users will make. Updates and deletes of the products don't have to be as fast, so you may design how you build the **r**ead routes differently than **u**pdate and **d**elete
- If you have students in a class, but the class is cancelled, you don't want to delete the students from the database, even though **one** class will have **many** students
- In contrast, if you have **many** reviews for **one** product, if the product is deleted from the database, you would likely want to delete all the reviews that went with it, because the reviews don't make sense without the product

Luckily for us, we are just building simple apps in order to learn, we do not yet have to consider what happens if we have thousands or millions of users. We're just going to focus on syntax and code examples that are simple, so you can have a strong foundation to build on, so that when you encounter new challenges you can build on your foundation.

It's very important to not try to optimize things too quickly. This is because:

- it takes longer (possibly much much longer) than a simple solution
- it may be overly complex
- it may solve for use cases you actually won't have

You should strive for iterations of your apps:

- First do it
- Then do it right
- Then do it better
  - Addy Osmani

## Bookmarks and Reviews

**One** bookmark can have **many** reviews.

How did we set up this relationship in SQL?

<details><summary>Answer</summary>

We added foreign keys (the primary key `id` of the `one` to the `many`)

</details>

## Create Full CRUD with a New Model Reviews

- `cd` into your bookmarks app that you've been building

Let's add a new table for reviews. We want to add a couple of constraints.

- We only want reviews to be between 0 and 5
- We want to add the `REFERENCES` constraint, that means that reviews cannot be created without a bookmark `PRIMARY KEY` that exists in the `bookmarks` table
- We also want to delete all the reviews for a bookmark, if the bookmark is deleted.

### SQL Part

Let's set up our tables and insert some seed data

**db/schema.sql**

```sql
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer TEXT,
    title TEXT,
    content TEXT,
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <= 5),
    bookmark_id INTEGER REFERENCES bookmarks (id)
    ON DELETE CASCADE
);
```

```bash
psql -U postgres -f db/schema.sql
```

And insert some reviews. Note, since we are dropping the bookmarks table as well, when we insert the bookmarks again into a new table, we should get bookmarks with `id` of 1, 2 and 3

**db/seed.sql**

Copy and paste these:

```sql
INSERT INTO reviews (bookmark_id, reviewer, title, content, rating )
VALUES
('1', 'Evan', 'My Favorite', 'This website crushes it when it comes to awesome explainations', 3),
('2', 'Evan', 'My Favorite', 'This website crushes it when it comes to inspiring me', 3),
('3', 'Evan', 'My Least Favorite', 'This website crushes it when it comes to destroying my patience', 5),
('2', 'Juliana', 'I Love Going Here', 'I finally learned how to properly fold a fitted sheet', 5),
('2', 'David', 'Cool Site', 'But I got way into adding decorative pillows everywhere', 1),
('2', 'Mr. Mingo', 'So Helpful', 'I got some awesome recommendations for a ceiling fan and some spoons', 3),
('2', 'Alison', 'A lifesaver!','Helped me get my stove cleaner than I ever imagiend possible!', 4),
('3', 'Hannah', 'Insert Confetti Emoji Here', 'I survived 6 hours at the DMV!', 4),
('3', 'Gabi', 'My Friend Hannah', 'Gets a discount if I leave a positive review, so here it is', 5);
```

```bash
psql -U postgres -f db/seed.sql
```

**Remember** bookmark_id is a foreign key. It is the id of the bookmark that this review belongs to. An `id` for each review will be automatically generated, so we don't have to create it.

### Express/PG-promise

Let's create the RESTful routes for reviews and test them

|     | Action  |     URL      | HTTP Verb |    CRUD    |               Description                |
| :-: | :-----: | :----------: | :-------: | :--------: | :--------------------------------------: |
|  1  | Create  |   /reviews   |   POST    | **C**reate |           Create a new review            |
|  2  |  Index  |   /reviews   |    GET    |  **R**ead  |   Get a list (or index) of all reviews   |
|  3  |  Show   | /reviews/:id |    GET    |  **R**ead  | Get an individual view (show one review) |
|  4  | Update  | /reviews/:id |    PUT    | **U**pdate |             Update a review              |
|  5  | Destroy | /reviews/:id |  DELETE   | **D**elete |             Delete a review              |

- `touch controllers/reviewsController.js`
- `touch queries/reviews.js`

Everything in these two files should be quite familiar - the complete code is in the folder along with this README [reviews.js](./reviews.js) [reviewsController.js](./reviewsController.js) - if you need a reference, as your instructor codes out these routes with you; in case you get stuck. Your instructor will demonstrate this in a certain order that allows for testing the code often.

You should test all of the routes with Postman before moving on

Don't forget to add this to your `app.js`

**app.js**

```js
// Reviews ROUTES
const reviewsController = require("./controllers/reviewsController.js");
app.use("/reviews", reviewsController);
```

### Don't forget to Test All Your routes

Here is a sample object

```js
{
    "reviewer":"Lou",
     "title": "Fryin Better",
     "content": "With the great tips and tricks I found here",
     "bookmark_id": "2",
     "rating": "4"
}
```

Be sure to git add and commit.

Super! We now have two models with full CRUD. But how do we connect them?

[README2.md](./README2.md)
