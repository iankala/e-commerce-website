import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import { assets } from '../assets/frontend_assets/assets'

const ReviewSection = ({ productId }) => {
    const { token, addReview, getProductReviews } = useContext(ShopContext)
    const [reviews, setReviews] = useState([])
    const [averageRating, setAverageRating] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchReviews = async () => {
        const reviewData = await getProductReviews(productId)
        if (reviewData) {
            setReviews(reviewData.reviews)
            setAverageRating(reviewData.averageRating)
            setTotalReviews(reviewData.totalReviews)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [productId])

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        if (!token) {
            alert("Please login to add a review")
            return
        }

        setLoading(true)
        const success = await addReview(productId, rating, comment)
        if (success) {
            setRating(5)
            setComment('')
            setShowReviewForm(false)
            fetchReviews()
        }
        setLoading(false)
    }

    const renderStars = (rating, interactive = false) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <img
                        key={star}
                        src={star <= rating ? assets.star_icon : assets.dull_icon}
                        alt="star"
                        className={`w-4 ${interactive ? 'cursor-pointer' : ''}`}
                        onClick={() => interactive && setRating(star)}
                    />
                ))}
            </div>
        )
    }

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <div className="flex items-center gap-2 mt-1">
                        {renderStars(Math.round(averageRating))}
                        <span className="text-sm text-gray-600">
                            {averageRating.toFixed(1)} ({totalReviews} reviews)
                        </span>
                    </div>
                </div>
                {token && (
                    <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-all"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {showReviewForm && (
                <div className="border p-4 mb-6">
                    <h4 className="font-medium mb-3">Share Your Experience</h4>
                    <form onSubmit={handleSubmitReview}>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-2">Rating</label>
                            {renderStars(rating, true)}
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-2">Your Review</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full border p-2 text-sm"
                                rows="3"
                                placeholder="Tell us about your experience with this product..."
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 disabled:opacity-50"
                            >
                                {loading ? 'Submitting...' : 'Submit Review'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowReviewForm(false)}
                                className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="border-b pb-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-sm">{review.userName}</span>
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ReviewSection
