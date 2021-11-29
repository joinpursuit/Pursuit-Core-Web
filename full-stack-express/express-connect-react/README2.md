# Express Connect React

## Continue

So far, we have added functionality to our React app to complete requests and get responses for Index.

Let's get the Show page, New, and Edit forms working

|  #  | Action |         URL         | HTTP Verb |   CRUD   |              Description               |
| :-: | :----: | :-----------------: | :-------: | :------: | :------------------------------------: |
|  1  | Index  |     /bookmarks      |    GET    | **R**ead | Get a list (or index) of all bookmarks |
|  2  |  Show  |   /bookmarks/:id    |    GET    | **R**ead | Get an individual view (show one log)  |
|  3  |  New   |   /bookmarks/new    |    GET    | **R**ead | Get a list (or index) of all bookmarks |
|  4  |  Edit  | /bookmarks/:id/edit |    GET    | **R**ead | Get an individual view (show one log)  |

### Loading a Bookmark on Page Load (Show Page)

If we click on the `pencil` it will take us to our show view in our React app.

<details><summary>Show Page Empty</summary>

![](./assets/show-empty.png)

</details>

Let's request one bookmark from our API from the show page.

**src/Components/BookmarkDetails.js**

At the top:

```js
import axios from "axios";
```

```js
import { apiURL } from "../util/apiURL";

const API = apiURL();
```

Our function for show will be very similar. However, we'll add an error message in case the particular bookmark cannot be found:

Remember, the structure of the `.then()` function is that it takes two arguments, both callbacks. The first argument is what happens when the promise is successfully resolved (successful API call). The second is when the promise is rejected (unsuccessful API call) . The second callback is optional, but can be very helpful for debugging.

This code is typically split across several lines it can be hard to read. Here is the basic structure:

```js
.then(()=>{}, ()=>{})
```

Additionally, if the function only has one line of code, the curly braces can be skipped and the code can be shortened to:

```js
.then(response => response.data, error => error )
```

However, this style is very limiting, we can't add any extra lines of code. Se we'll write out the request in a a longer format that is easier to maintain.

**src/Components/BookmarkDetails.js**

```js
useEffect(() => {
  axios.get(`${API}/bookmarks/${index}`).then(
    (response) => {
      setBookmark(response.data);
    },
    (error) => {
      history.push(`/not-found`);
    }
  );
}, [index, history]);
```

<details><summary>Show Page Loaded</summary>

![](./assets/show-loaded.png)

</details>

<br />

### Using the Create Form to Create a new Bookmark

<br />

Remember, we want to be able to update the list of bookmarks. That means we have to put state all the way up in the shared component of the bookmark form and the list of bookmarks, which is App.js

**src/BookmarkNewForm.js**

```js
const addBookmark = (newBookmark) => {
  axios
    .post(`${API}/bookmarks`, newBookmark)
    .then(
      () => {
        history.push(`/bookmarks`);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};
```

<details><summary>Index page being buggy?</summary>

You may notice that after submitting a new bookmark, the index page does NOT have the new bookmark- sometimes.

If it is only happening sometimes then there is an asynchronous issue some code is executing sooner than expected.

In this case, it may be in the bookmarks api.

What is happening is that the res.json function is being called before `bookmarks.push()` has completed, thus sending out the old array.

We need to await the completion of `bookmarks.push()` in order to be sure we are responding with the right json.

**controllers/bookmarksController.js**

```js
// CREATE
bookmarks.post("/", async (req, res) => {
  const updatedArray = await bookmarkArray.push(req.body);
  res.json(updatedArray[updatedArray.length - 1]);
});
```

</details>

<br>

### Using the Edit Form to Create a new Bookmark

The edit form is very similar to the create form. However, for better user experience, it should be pre-filled with the values, rather than requiring the user to type everything from scratch.

**src/Components/BookmarkEditForm.js**

At the top:

```js
import axios from "axios";
```

```js
import { apiURL } from "../util/apiURL";

const API = apiURL();
```

```js
useEffect(() => {
  axios.get(`${API}/bookmarks/${index}`).then(
    (response) =>
      setBookmark(() => {
        return response.data;
      }),
    (error) => history.push(`/not-found`)
  );
}, [index, history]);
```

Now, your form should be pre-loaded with the bookmark data.

<details><summary>Edit Form Loaded</summary>

![](./assets/edit-form-loaded.png)

</details>

Let's add the edit functionality in App.js so our app can properly update

**src/App.js**

```js
const updateBookmark = (updatedBookmark, index) => {
  axios
    .put(`${API}/bookmarks/${index}`, updatedBookmark)
    .then(
      (response) => {
        setBookmark(response.data);
        history.push(`/bookmarks/${index}`);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};
```

## Adding Delete Functionality

For delete, we can just add a form on the show page. No separate page is needed.

**src/Components/BookmarkDetails.js**

```js
const handleDelete = () => {
  axios
    .delete(`${API}/bookmarks/${index}`)
    .then(
      () => {
        history.push(`/bookmarks`);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};
```
