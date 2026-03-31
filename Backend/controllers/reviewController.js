import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';

// Add a review to a product
const addReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;
        
        // Get user information
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Get product
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Check if user already reviewed this product
        const existingReviewIndex = product.reviews.findIndex(
            review => review.userId.toString() === userId.toString()
        );

        const reviewData = {
            userId,
            userName: user.name,
            rating: Number(rating),
            comment,
            date: Date.now()
        };

        if (existingReviewIndex !== -1) {
            // Update existing review
            product.reviews[existingReviewIndex] = reviewData;
        } else {
            // Add new review
            product.reviews.push(reviewData);
        }

        // Calculate average rating
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        product.averageRating = totalRating / product.reviews.length;
        product.totalReviews = product.reviews.length;

        await product.save();

        res.json({ 
            success: true, 
            message: existingReviewIndex !== -1 ? "Review updated successfully" : "Review added successfully",
            averageRating: product.averageRating,
            totalReviews: product.totalReviews
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add review" });
    }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const product = await productModel.findById(productId).select('reviews averageRating totalReviews');
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ 
            success: true, 
            reviews: product.reviews.sort((a, b) => b.date - a.date),
            averageRating: product.averageRating,
            totalReviews: product.totalReviews
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to get reviews" });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.body;
        
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Remove review
        product.reviews = product.reviews.filter(
            review => review._id.toString() !== reviewId
        );

        // Recalculate average rating
        if (product.reviews.length > 0) {
            const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
            product.averageRating = totalRating / product.reviews.length;
        } else {
            product.averageRating = 0;
        }
        product.totalReviews = product.reviews.length;

        await product.save();

        res.json({ 
            success: true, 
            message: "Review deleted successfully",
            averageRating: product.averageRating,
            totalReviews: product.totalReviews
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to delete review" });
    }
};

// Update product rankings based on ratings and sales
const updateRankings = async (req, res) => {
    try {
        const products = await productModel.find({});
        
        // Calculate ranking score based on average rating, total reviews, and best seller status
        const productsWithScore = products.map(product => {
            const ratingScore = product.averageRating * 20; // Max 100 points for rating
            const reviewCountScore = Math.min(product.totalReviews * 2, 50); // Max 50 points for review count
            const bestSellerBonus = product.bestSeller ? 30 : 0; // Bonus for best sellers
            const totalScore = ratingScore + reviewCountScore + bestSellerBonus;
            
            return {
                ...product.toObject(),
                score: totalScore
            };
        });

        // Sort by score and update rankings
        productsWithScore.sort((a, b) => b.score - a.score);
        
        for (let i = 0; i < productsWithScore.length; i++) {
            await productModel.findByIdAndUpdate(
                productsWithScore[i]._id,
                { ranking: i + 1 }
            );
        }

        res.json({ success: true, message: "Rankings updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to update rankings" });
    }
};

// Get top ranked products
const getTopRankedProducts = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        
        const products = await productModel.find({})
            .sort({ ranking: 1, averageRating: -1 })
            .limit(parseInt(limit))
            .select('name image price averageRating totalReviews ranking bestSeller');

        res.json({ success: true, products });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to get top ranked products" });
    }
};

export { addReview, getProductReviews, deleteReview, updateRankings, getTopRankedProducts };
