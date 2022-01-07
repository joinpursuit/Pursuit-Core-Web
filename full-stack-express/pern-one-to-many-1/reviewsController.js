const express = require("express");
const bookmarks = express.Router();
const {
  getAllBookmarks,
  getBookmark,
  newBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks");

const validateURL = (req, res, next) => {
  if (
    req.body.url.substring(0, 7) === "http://" ||
    req.body.url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
  }
};

const reviewsController = require("./reviewsController.js");
bookmarks.use("/:bookmarkId/reviews", reviewsController);

// INDEX
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});
// SHOW
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  if (bookmark) {
    res.json(bookmark);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// UPDATE
bookmarks.put("/:id", validateURL, async (req, res) => {
  const { id } = req.params;
  if (!req.body.name) {
    res.status(400).json({ error: "You must include a name" });
  } else {
    const updatedBookmark = await updateBookmark(req.body);
    if (updatedBookmark.id) {
      res.status(200).json(updatedBookmark);
    } else {
      res.status(404).json("Bookmark not found");
    }
  }
});

bookmarks.post("/", validateURL, async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "You must include a name" });
  } else {
    const bookmark = await newBookmark(req.body);
    res.status(200).json(bookmark);
  }
});

// DELETE
bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookMark = await deleteBookmark(id);
  if (deletedBookmark.id) {
    res.status(200).json(deletedBookMark);
  } else {
    res.status(404).json("Bookmark not found");
  }
});

// TEST JSON NEW
// {
//     "reviewer":"Lou",
//      "title": "Fryin Better",
//      "content": "With the great tips and tricks I found here",
//      "bookmark_id": "2",
//      "rating": "4"
// }

module.exports = bookmarks;
