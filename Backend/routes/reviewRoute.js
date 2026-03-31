import express from 'express';
import { addReview, getProductReviews, deleteReview, updateRankings, getTopRankedProducts } from '../controllers/reviewController.js';
import authUser from '../middleware/auth.js';

const reviewRouter = express.Router();

// Add review to product
reviewRouter.post('/add', authUser, addReview);

// Get product reviews
reviewRouter.get('/product/:productId', getProductReviews);

// Delete review
reviewRouter.post('/delete', authUser, deleteReview);

// Update rankings (admin only)
reviewRouter.post('/update-rankings', updateRankings);

// Get top ranked products
reviewRouter.get('/top-ranked', getTopRankedProducts);

export default reviewRouter;
