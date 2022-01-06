# PERN Stack: CRUD

# Express Connect React - REVIEW

## Intro

By now we have a nicely working back-end with full CRUD using express. Unfortunately, it isn't the best user experience for non-developers. We need to build a front-end.

When you stack **P**ostgres, **E**press, **R**eact, and **N**ode, it is often referred to as the `PERN` Stack.

There are many different technology stacks, you may see some when you start looking for jobs, like Ruby on Rails, LAMP, MEAN, Django, Laravel - generally these stacks refer to a backend language/framework, a database and some way of rendering views. As you encounter these stacks, just google them, as needed. It will be highly unlikely that you will have worked with every technology listed in a stack. In tech, it's more important to be ready to learn what you need, as you build, than to try to learn everything first.

## REVIEW: The Seven RESTful Routes

The seven RESTful routes are often the classic example of a RESTful pattern. Despite the different tech stacks listed above, many will still follow this pattern, and often some version of MVC.

While this pattern is classic and we will follow it exactly for learning fundamentals, you will see many variations in the wild. These variations are to meet specific needs of functionality and/or to improve user experience.

We have built the first 5 routes in Express:

|  #  | Action  |      URL       | HTTP Verb |    CRUD    |              Description               |
| :-: | :-----: | :------------: | :-------: | :--------: | :------------------------------------: |
|  1  |  Index  |   /bookmarks   |    GET    |  **R**ead  | Get a list (or index) of all bookmarks |
|  2  |  Show   | /bookmarks/:id |    GET    |  **R**ead  | Get an individual view (show one log)  |
|  3  | Create  |   /bookmarks   |   POST    | **C**reate |           Create a new book            |
|  4  | Destroy | /bookmarks/:id |  DELETE   | **D**elete |             Delete a book              |
|  5  | Update  | /bookmarks/:id |    PUT    | **U**pdate |             Update a book              |

<br />

The next four are ones that we will build in our front-end:

|  #  | Action |         URL         | HTTP Verb |   CRUD   |                Description                 |
| :-: | :----: | :-----------------: | :-------: | :------: | :----------------------------------------: |
|  1  | Index  |     /bookmarks      |    GET    | **R**ead |   Get a list (or index) of all bookmarks   |
|  2  |  Show  |   /bookmarks/:id    |    GET    | **R**ead | Get an individual view (show one bookmark) |
|  3  |  New   |   /bookmarks/new    |    GET    | **R**ead |    Get a form to create a new bookmark     |
|  4  |  Edit  | /bookmarks/:id/edit |    GET    | **R**ead |      Get a form to update a bookmark       |

Which two are new and which ones have we built with express?

## Getting Started

- Go to your bookmarks app and get it started with `nodemon`
- Open a new tab in terminal, do not shut down your bookmarks app
- `cd ..` (or similar navigation) to the root of this project (where `back-end` folder is) **IMPORTANT** NOT inside the `back-end` folder, but one level above it
- Fork this [Starter code](https://github.com/joinpursuit/bookmarks-react-pg-starter)
- `git clone` the forked repository
- `mv bookmarks-react-pg-starter front-end` to change the name of this folder to something more appropriate
  - You should now have to folders `back-end` and `front-end` on the same level
- `cd front-end`
- `rm -rf .git` - this will remove the git files that track this starter code. This code will now be tracked along the back-end in one `mono-repo`
- `npm install` to install dependencies that are already included in the `package.json`
- `touch .env`

**.env**

```
REACT_APP_API_URL=http://localhost:3003
```

- `git add -A`
- `git commit -m 'add front end starter code'`

- `npm start`

## Index

<details><summary>Landing Page</summary>

![](./assets/landing-page.png)

</details>

Let's click on `Bookmarks` in the navigation to go to `/bookmarks`

<details><summary>Index Page Empty</summary>

![](./assets/index-empty.png)

</details>

We can see that we have a view for our index page. But, we need to connect this app to our back-end. We can do so using `axios` much like we did when we were using third party APIs.

## Setting Up the App to Make Requests

### Loading the Bookmarks Index on Page Load

#### A Small Note

Since the initial build, the Bookmarks app was reviewed by the team. The had made several suggestions to improve the code. Here you'll note some code reorganization and updates to make the code easier to read and more maintainable.

Can you spot the differences? Can you talk about why you think the changes have improved the app?

### Building the Index Page Functionality

With React, we sometimes have to think about _when_ things happen. For us, we want to make an API call to get our data AFTER the component has been fully loaded (mounted in the DOM) and then update state.

If we made the API call first and the DOM was not fully loaded and state was updated first, we would risk not seeing our data, even though the API call was successful.

React has a built-in function called `useEffect` that is going to control _when_ the functions inside are called.

This is where we are going to add our initial API call in order to get all the bookmarks.

The `useEffect` function is already in **app.js**, but it is empty. Let's add some code

- Make a `get` request using axios. `Then` when there is a `response` do something. In our case, we want to update state using hooks by using the `setBookmarks` that was declared at the beginning of the `App` component. The state will be updated to be our array of bookmark objects.

**src/Components/Bookmarks.js**

```js
useEffect(() => {
  axios.get(`${API}/bookmarks/${id}`);
}, []);
```

Now we are able to make our API call, but `then` what should happen?

We'll chain two functions:

`then` which is where we'll put our code for what should happen after the axios call occurs.

There are three things that can happen

- the response is resolved (first callback parameter)
- the response is rejected (second callback parameter)
- something has failed (catch function)

The code will still work without the second `then` parameter and the `catch`, but when you are coding, it's a good idea to include at least one of these as the error messages can be very helpful in debugging your code.

Work outside in. Build the outer functions first.

```js
useEffect(() => {
  axios
    .get(`${API}/bookmarks/${id}`)
    .then(() => {})
    .catch(() => {});
}, []);
```

Add in the functionality in the right places:

```js
useEffect(() => {
  axios
    .get(`${API}/bookmarks`)
    .then((response) => setBookmarks(response.data))
    .catch((c) => console.warn("catch", c));
}, []);
```

## Show

Let's build out the show page

![](assets/show-loaded.png)

First, let's start with the JSX, then we'll go back and add functionality. This is the recommended approach, based on the docs: [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

We are going to hard-code values, so we can see our components and make sure things are set up and organized as we want. Then, we'll go back and add more functionality.

**src/Components/BookmarkDetails.js**

Let's set up the `article` container and add an `h3`. There will be conditional rendering using a ternary operator.

Next to it, let's hard code the bookmark name.

```js
import { useState } from "react";

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  return (
    <article>
      <h3>{true ? <span>⭐️</span> : null} bookmark.name</h3>
    </article>
  );
}
```

Let's add the link for the actual bookmark page

```js
function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  return (
    <article>
      <h3>{true ? <span>⭐️</span> : null} bookmark.name</h3>
      <h5>
        <span>
          <a href={bookmark.url}>bookmark.name</a>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bookmark.url
      </h5>
      <h6>bookmark.category</h6>
      <p>bookmark.description</p>
    </article>
  );
}
```

What is `&nbsp;`?

Let's add the buttons for edit, delete and back

```js
import { Link } from "react-router-dom";

// Further down inside the component

return (
  <article>
    <h3>{true ? <span>⭐️</span> : null} bookmark.name</h3>
    <h5>
      <span>
        <a href={bookmark.url}>bookmark.name</a>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bookmark.url
    </h5>
    <h6>bookmark.category</h6>
    <p>bookmark.description</p>
    <div className="showNavigation">
      <div>
        <Link to={`/bookmarks`}>
          <button>Back</button>
        </Link>
      </div>
      <div>
        <Link to={`/bookmarks/id/edit`}>
          <button>Edit</button>
        </Link>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </div>
  </article>
);
```

## Adding Functionality

We want to load the bookmark details on page load. We are going to shorten the JSX in the code snippets,( but don't delete or change it) for now so we can focus on the functionality.

We'll need to make an API call on page load.

`useEffect` is a built-in function in React that will make the API all after the component has been loaded on the page.

The second argument is the dependencies. This is what React will be 'watching', if there are changes, it will call use effect again. If you forget to add the `[]` as the second argument, you run the risk of having useEffect run on an infinite loop

```js
import { useState, useEffect } from "react";

// inside the BookmarkDetails function....

  useEffect(() => {
},[]);
  return <article>...</article>;
});

```

We are going to, also, require a bit more information from our app in order to make the API call. We need to know where to make the API call and we need the `id` of the bookmark. The `id` of the bookmark will come from the URL.

We will add the `id` and the `API` variables as the dependencies to useEffect. If you are not sure what to put, usually the console in the browser will recommend what variables you should put in there.

```js
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

// inside the BookmarkDetails function....
function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios.get(`${API}/bookmarks/${id}`)
  },[id, API]);

  // rest of the component...

});
```

```js

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios.get(`${API}/bookmarks/${id}`)
      .then(()=> {}).catch(() =>{})
  },[id, API]);

  // rest of the component...


});

```

Add the catch statement

```js
useEffect(() => {
  axios
    .get(`${API}/bookmarks/${id}`)
    .then(() => {})
    .catch((c) => {
      console.error("catch", c);
    });
}, [id, API]);
```

Add the response

```js
useEffect(() => {
  axios
    .get(`${API}/bookmarks/${id}`)
    .then((response) => {
      console.log(response.data);
      setBookmark(response.data);
    })
    .catch((c) => {
      console.warn("catch", c);
    });
}, [id, API]);
```

Now that it works as we expect let's go in and add the actual values where we've put our placeholders

```js
return (
  <article>
    <h3>
      {bookmark.is_favorite ? <span>⭐️</span> : null} {bookmark.name}
    </h3>
    <h5>
      <span>
        <a href={bookmark.url}>{bookmark.name}</a>
      </span>{" "}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {bookmark.url}
    </h5>
    <h6>{bookmark.category}</h6>
    <p>{bookmark.description}</p>
    <div className="showNavigation">
      <div>
        {" "}
        <Link to={`/bookmarks`}>
          <button>Back</button>
        </Link>
      </div>
      <div>
        <Link to={`/bookmarks/${id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </div>
  </article>
);
```

## Delete Functionality

From this view, we want to be able to delete a bookmark. It's pretty common to name a function that handles an event (like a click or hover `handle`)

```js
const handleDelete = () => {
  console.log("button clicked");
};
```

Let's add a click event

```js
<div>
  <button onClick={handleDelete}>Delete</button>
</div>
```

Click the button to check that your click handler works as expected.

We're going to use another `axios` call to make a request for the database to delete the bookmark.

When the delete is completed on the back-end, we can think about the user experience. A reasonable way to handle it is to take the user back to the Index page, so they can see that their bookmark has been successfully deleted.

We can do this by using `useNavigate` from React Router.

```js
// Top of file
import { Link, useParams, useNavigate } from "react-router-dom";

let navigate = useNavigate();

// Inside BookmarkDetails function
const deleteBookmark = () => {
  axios
    .delete(`${API}/bookmarks/${id}`)
    .then(
      () => {
        navigate(`/bookmarks`);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};
```

Finally, let's call this function:

```js
const handleDelete = () => {
  deleteBookmark();
};
```

#### Full Code

```js
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/bookmarks/${id}`).then((response) => {
      setBookmark(response.data);
    });
  }, [id, navigate, API]);
  const deleteBookmark = () => {
    axios
      .delete(`${API}/bookmarks/${id}`)
      .then(() => {
        navigate(`/bookmarks`);
      })
      .catch((c) => console.error("catch", c));
  };
  const handleDelete = () => {
    deleteBookmark();
  };
  return (
    <>
      <article>
        <h3>
          {bookmark.is_favorite ? <span>⭐️</span> : null} {bookmark.name}
        </h3>
        <h5>
          <span>
            <a href={bookmark.url}>{bookmark.name}</a>
          </span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {bookmark.url}
        </h5>
        <h6>{bookmark.category}</h6>
        <p>{bookmark.description}</p>
        <div className="showNavigation">
          <div>
            {" "}
            <Link to={`/bookmarks`}>
              <button>Back</button>
            </Link>
          </div>
          <div>
            <Link to={`/bookmarks/${id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </article>
      <Reviews />
    </>
  );
}

export default BookmarkDetails;
```
