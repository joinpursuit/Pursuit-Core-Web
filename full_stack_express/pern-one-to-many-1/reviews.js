// DEPENDENCIES
const db = require("../db/dbConfig.js");

// QUERIES

/* INDEX */
const getAllReviews = async () => {
  try {
    const allReviews = await db.any("SELECT * FROM reviews");
    return allReviews;
  } catch (e) {
    return e;
  }
};

/* SHOW */
const getReview = async (id) => {
  try {
    const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id);
    return oneReview;
  } catch (e) {
    return e;
  }
};

// CREATE
const newReview = async (review) => {
  try {
    const newReview = await db.one(
      `
      INSERT INTO reviews
      (reviewer, title, content, rating, bookmark_id)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        review.bookmark_id,
      ]
    );
    return newReview;
  } catch (e) {
    return e;
  }
};

/* UPDATE */
const updateReview = async (id, review) => {
  try {
    const updatedReview = await db.one(
      `
      UPDATE reviews
      SET reviewer=$1, title=$2, content=$3, rating=$4, bookmark_id=$5
      WHERE id=$6
      RETURNING *
      `,
      [
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        review.bookmark_id,
        id,
      ]
    );
    return updatedReview;
  } catch (e) {
    return e;
  }
};

/* DELETE */
const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      `
      DELETE FROM reviews
      WHERE id=$1
      RETURNING *
      `,
      id
    );
    return deletedReview;
  } catch (e) {
    return e;
  }
};

// EXPORTS
module.exports = {
  getAllReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
};
