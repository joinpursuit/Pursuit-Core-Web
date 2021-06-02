# Express RESTful Routes: Update & Delete

## POSTMAN

Even though the command line is powerful and you can do amazing things like this: `curl -s -L http://bit.ly/10hA8iC | bash` ( <kbd>control</kbd> <kbd>c</kbd> to cancel it), it can end up being a LOT of typing, especially when one wants to thoroughly test a back-end.

So, some developers got together and built a GUI (Graphical User Interface) to allow developers to test their back-ends.

If you haven't already, [download Postman](https://www.postman.com/downloads/)

Once you open the app, it will ask you to log in. However, if you look very carefully, you can find a `skip` option in tiny letters.

Postman is a very robust tool with a lot of functionality. We'll just be using it in a very simple way for now, and we'll learn a bit more useful things as we keep building out our app.

## Test Current Routes

|  #  |   Action   |      URL       | HTTP Verb |    CRUD    |                Description                 |
| :-: | :--------: | :------------: | :-------: | :--------: | :----------------------------------------: |
|  1  | **Create** |   /bookmarks   |   POST    | **C**reate |           Create a new bookmark            |
|  2  | **Index**  |   /bookmarks   |    GET    |  **R**ead  |   Get a list (or index) of all bookmarks   |
|  3  |  **Show**  | /bookmarks/:id |    GET    |  **R**ead  | Get an individual view (show one bookmark) |

## Delete

| Action  |      URL       | HTTP Verb |    CRUD    |    Description    |
| :-----: | :------------: | :-------: | :--------: | :---------------: |
| Destroy | /bookmarks/:id |  DELETE   | **D**elete | Delete a bookmark |

Let's add delete functionality. Again, this functionality will only be availble to us via form. So we'll use Postman to test it.

We are going to use the index position of the array item and we wil splice out the deleted item, which will remove the item at that array position. Then, we will redirect it back to the full list

```js
// DELETE
bookmarks.delete("/:indexArray", (req, res) => {
  bookmarkArray.splice(req.params.indexArray, 1);
  res.status(303).redirect("/bookmarks");
});
```

### TEST WITH POSTMAN

## Update

| Action |      URL       | HTTP Verb |    CRUD    |    Description    |
| :----: | :------------: | :-------: | :--------: | :---------------: |
| Update | /bookmarks/:id |    PUT    | **U**pdate | Update a bookmark |

We will take the array position of the item we want to update. We will set the value to be the incoming `req.body`

```js
// UPDATE
bookmarks.put("/:arrayIndex", (req, res) => {
  bookmarkArray[req.params.arrayIndex] = req.body;
  res.status(303).redirect(`/bookmarks/${req.params.arrayIndex}`);
});
```
