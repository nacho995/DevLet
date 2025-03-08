const express = require('express');
const router = express.Router();
const {
  getReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// Rutas para /api/reviews
router.route('/')
  .get(getReviews)
  .post(createReview);

// Rutas para /api/reviews/:id
router.route('/:id')
  .get(getReviewById)
  .put(updateReview)
  .delete(deleteReview);

module.exports = router; 