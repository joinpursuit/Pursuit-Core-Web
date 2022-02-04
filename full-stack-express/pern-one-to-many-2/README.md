# 13 PERN Stack: One to Many - Part 2 Front-end

## Important

Make sure all your routes work as expected. It does not matter how amazing your front-end code is, it cannot repair a broken back end.

It's important to test all your routes with something like Postman to be sure you know what the expected responses are. It is critical that when you encounter a bug you can clearly and easily isolate whether the issue is coming from the back-end or front-end.

## Onwards

We're going to be adding views of reviews only to the `BookmarkDetails` view

- Keep your backend running
- make sure you are at the root of your react-app (same level as its `package.json`)
- `touch src/Components/Review.js`
- `touch src/Components/Reviews.js`
- `touch src/Components/ReviewForm.js`

## Reviews All

**src/Reviews.js**

```js
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

const API = process.env.REACT_APP_API_URL;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios.get(`${API}/bookmarks/${id}/reviews`).then((response) => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, [id, API]);
  return (
    <section className="Reviews">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </section>
  );
}

export default Reviews;
```

**src/Review.js**

```js
function Review({ review }) {
  return (
    <div className="Review">
      <h4>
        {review.title} <span>{review.rating}</span>
      </h4>
      <h5>{review.reviewer}</h5>
      <p>{review.content}</p>
    </div>
  );
}

export default Review;
```

**src/BookmarkDetails.js**

Import `Reviews`

```js
import Reviews from "./Reviews";
```

After the buttons and closing `div`s (right above the closing `article` tag):

```js
<Reviews />
```

<details><summary>Reviews Added</summary>

![](./assets/reviews-read.png)

</details>

**src/index.css**

Let's add a little CSS to highlight our new components

```css
.Reviews {
  background-color: whitesmoke;
  padding: 1em;
  box-shadow: 2px 2px 4px silver;
}

.Reviews > div {
  padding: 1em;
  box-shadow: 0px 0px 2px silver;
  background-color: ghostwhite;
}
.Reviews div:nth-child(odd) {
  background-color: aliceblue;
}
```

## Review Form

We are going to handle the form differently than we did with the bookmarks form. We are going to keep the new form on the same page as the bookmarks/reviews.

Additionally, we are going to reuse this form for new and editing bookmarks.

In the interest of time during lecture, let's copy paste this code and talk about what is going on.

Notable details:

When we press submit, we want to update the list of reviews to reflect the changes to the database. For new, we want to add a new review to the reviews list, for edit we want to update the review inside the list. That means we will have to change state in the `Reviews` component and pass the functions that do that down.

Depending on whether we want to add a new review or update a review, `handleSubmit` will run a different function. We'll see how the pieces come together as we build the rest out.

We want to be able to pre-fill the data if it is the edit form. We can `useEffect` to check if there is data being passed down and update the form inputs.

If it is the new form, we want to display an extra `h3` to inform the users this is the form to create a new review. We will do this by using `props.children`

**src/ReviewForm.js**

```js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ReviewForm(props) {
  let { id } = useParams();
  const { reviewDetails } = props;

  const [review, setReview] = useState({
    reviewer: "",
    title: "",
    content: "",
    rating: "",
    bookmark_id: id,
  });

  const handleTextChange = (event) => {
    setReview({ ...review, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    if (reviewDetails) {
      setReview(reviewDetails);
    }
  }, [id, reviewDetails, props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(review, id);
    if (reviewDetails) {
      props.toggleView();
    }
    setReview({
      reviewer: "",
      title: "",
      content: "",
      rating: "",
      bookmark_id: id,
    });
  };
  return (
    <div className="Edit">
      {props.children}
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviewer">Name:</label>
        <input
          id="reviewer"
          value={review.reviewer}
          type="text"
          onChange={handleTextChange}
          placeholder="Your name"
          required
        />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={review.title}
          onChange={handleTextChange}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          name="rating"
          min="0"
          max="5"
          step="1"
          value={review.rating}
          onChange={handleTextChange}
        />
        <label htmlFor="content">Review:</label>
        <textarea
          id="content"
          type="text"
          name="content"
          value={review.content}
          placeholder="What do you think..."
          onChange={handleTextChange}
        />

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

export default ReviewForm;
```

## Add New Review Functionality

**src/Reviews.js**

Here are the new pieces of code. Be sure to place them in their appropriate locations(along the top, inside the function, inside the return..)

```js
import ReviewForm from "./ReviewForm";

const handleAdd = (newReview) => {
  axios
    .post(`${API}/bookmarks/${id}/reviews`, newReview)
    .then(
      (response) => {
        setReviews([response.data, ...reviews]);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};

return (
  <section className="Reviews">
    <h2>Reviews</h2>
    <ReviewForm handleSubmit={handleAdd}>
      <h3>Add a New Review</h3>
    </ReviewForm>
    {reviews.map((review) => (
      <Review key={review.id} review={review} />
    ))}
  </section>
);
```

## Add Delete Functionality

```js
const handleDelete = (id) => {
  axios
    .delete(`${API}/bookmarks/${id}/reviews/${id}`)
    .then(
      (response) => {
        const copyReviewArray = [...reviews];
        const indexDeletedReview = copyReviewArray.findIndex((review) => {
          return review.id === id;
        });
        copyReviewArray.splice(indexDeletedReview, 1);
        setReviews(copyReviewArray);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};
```

// in the return

```
<Review key={review.id} review={review} handleDelete={handleDelete} />
```

Notice, we have the option of pulling data and functions out of props in the function definition, alternatively, we could access them through `props` or use destructuring as its own line of code.

All three syntaxes do the same thing. Being familiar with these options will help strengthen your understanding of React.

**src/Review.js**

```js
function Review({ review, handleDelete }) {
  return (
    <div className="Review">
      <h4>
        {review.title} <span>{review.rating}</span>
      </h4>
      <h5>{review.reviewer}</h5>
      <p>{review.content}</p>
      <button onClick={() => handleDelete(review.id)}>delete</button>
    </div>
  );
}
```

## Add Edit Functionality

The way we will approach is to add a button to edit, this will toggle the view from a `review` to a `reviewForm` by using conditional rendering with a ternary operator. It will end up looking like this example:

```js
{
  viewEditForm ? <ShowIfValueIsTrue /> : <ShowIfValueIsFalse />;
}
```

<br />

Let's code it:

**Components/Review**

```js
import ReviewForm from "./ReviewForm";

function Review({ review, handleDelete, handleSubmit }) {
  const [viewEditForm, toggleEditForm] = useState(false);

  const toggleView = () => {
    toggleEditForm(!viewEditForm);
  };

  return (
    <div className="Review">
      <button onClick={toggleView}>edit this review</button>
     {viewEditForm ? () : ()}

      <div>
        <h4>
          {review.title} <span>{review.rating}</span>
        </h4>
        <h5>{review.reviewer}</h5>
        <p>{review.content}</p>
      </div><button onClick={() => handleDelete(review.id)}>delete</button>
    </div>
  );
}
```

Add the Review form, then add parenthesis and cut and paste the review details into the statement

```
{
  viewEditForm ? (
    <ReviewForm reviewDetails={review} />
  ) : (
    <div>
      <h4>
        {review.title} <span>{review.rating}</span>
      </h4>
      <h5>{review.reviewer}</h5>
      <p>{review.content}</p>
    </div>
  )
}
```

Now you should be able to click the `edit this review` button and toggle between the two components.

### Adding the Edit Functionality

When thinking in react, when we edit, we want to return to the view of the review back from the form. And we want to be sure we've updated the list of reviews. Again that means we are going to have to put state in the `reviews` component and pass it down and then [lift state up](https://reactjs.org/docs/lifting-state-up.html)

**src/Reviews.js**

```js
const handleEdit = (updatedReview) => {
  axios
    .put(`${API}/bookmarks/${id}/reviews/${updatedReview.id}`, updatedReview)
    .then((response) => {
      const copyReviewArray = [...reviews];
      const indexUpdatedReview = copyReviewArray.findIndex((review) => {
        return review.id === updatedReview.id;
      });
      copyReviewArray[indexUpdatedReview] = response.data;
      setReviews(copyReviewArray);
    })
    .catch((c) => console.warn("catch", c));
};

//further down

<Review
  key={review.id}
  review={review}
  handleSubmit={handleEdit}
  handleDelete={handleDelete}
/>;
```

**src/Review.js**

We'll have to continue to pass the `handleSubmit` function down. Passing props down two or more times can be referred to as `props drilling`. A little bit of props drilling is ok. However, if your app grows to be large, there end up being solutions that fit better for a larger application.

```js
<ReviewForm
  reviewDetails={review}
  toggleView={toggleView}
  handleSubmit={props.handleSubmit}
/>
```

**BONUS**: Where else could we pull `handleSubmit` out of `props`?

And that should be it! One way to do full CRUD on a second model that is a one to many relationship .

### Bonus

Can you figure out a way that _when_ the viewEditForm is visible the button would say `see review`, but if the value is toggled back to false, the button would say `edit this review` instead?

## New Bookmarks Bonus Challenges/Lab time

Looking for a challenge?

BONUS FORM change category to options of already created categories, then allow for a new category option where a user will enter a new category

Add functionality that the categories are always lowercase, including new entries

Alternatively, if you have finished the requirements of the Tuner lab, you can go ahead and implement a `playlist` model. Where a `playlist` will have many songs.

HINT: If you delete a playlist do you want the songs to be deleted as well? This will likely be a different use case than what we did with bookmarks.
