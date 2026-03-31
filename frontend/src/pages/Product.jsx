import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/relatedProducts'
import axios from 'axios'

const Product = () => {
  
    const {productId} =  useParams()
    const {products, currency, addToCart, token, backendUrl} = useContext(ShopContext)
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [size, setSize]= useState('')
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')

    const fetchProductData = () => {
        const foundProduct = products.find(
            item => item._id === productId
        );

        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/review/product/${productId}`);
            if (response.data.success) {
                setReviews(response.data.reviews);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!token) {
            alert('Please login to add a review');
            return;
        }
        
        try {
            const response = await axios.post(
                `${backendUrl}/api/review/add`,
                { productId, rating, comment },
                { headers: { token } }
            );
            
            if (response.data.success) {
                alert(response.data.message);
                setRating(5);
                setComment('');
                fetchReviews();
            }
        } catch (error) {
            console.log(error);
            alert('Failed to add review');
        }
    };

    useEffect(()=>{
        fetchProductData();
        fetchReviews();
    },[productId])
    
    return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/*product data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>

        {/* Product Images */}
        <div className='flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                {
                    productData.image.map((item, index)=>(
                        <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                    ))
                }
            </div>
            <div className='w-full sm:w-[70%]' >
                <img className='w-full h-auto' src={image} alt="" />
            </div>
        </div>
        {/*product info*/}
        <div className='flex-1'>
            <h1 className='items-stretch font-medium text-2xl mt-2' >{productData.name}</h1>
            <div className='flex flex-items-center gap-1 mt-2'>
                <img className='w-6' src={assets.star_icon} alt="" />
                <img className='w-6' src={assets.star_icon} alt="" />
                <img className='w-6' src={assets.star_icon} alt="" />
                <img className='w-6' src={assets.star_icon} alt="" />
                <img className='w-6' src={assets.star_dull_icon} alt="" />
                <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
                <p>Select Size</p>
                <div className='flex gap-2'>
                    {productData.sizes.map((item,index)=>(
                        <button onClick={()=> setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item ===  size ? 'border-orange-500' : ''}`} key = {index}>{item}</button>
                    ))}
                </div>
            </div>
                <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
                <hr className='mt-8 sm:w-4/5'/>
                <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                    <p>- 100% Original product.</p>
                    <p>- Cash on delivery is available on this product.</p>
                    <p>- Easy return and exchange within 7 days.</p>
                </div>
            </div>
        </div>
        {/* description and review section */}
        <div className='mt-20'>
            <div className='flex'>
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className='border px-5 py-3 text-sm cursor-pointer hover:bg-gray-50'>Reviews ({reviews.length})</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                <p>{productData.description}</p>
            </div>
            
            {/* Review Form */}
            {token && (
                <div className='border px-6 py-6'>
                    <h3 className='text-lg font-medium mb-4'>Write a Review</h3>
                    <form onSubmit={submitReview} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium mb-2'>Rating</label>
                            <select 
                                value={rating} 
                                onChange={(e) => setRating(Number(e.target.value))}
                                className='border p-2 w-full'
                            >
                                <option value={5}>5 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={2}>2 Stars</option>
                                <option value={1}>1 Star</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium mb-2'>Your Review</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className='w-full border p-2'
                                rows='3'
                                placeholder='Share your experience with this product...'
                                required
                            />
                        </div>
                        <button 
                            type='submit' 
                            className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800'
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            )}
            
            {/* Reviews List */}
            <div className='border px-6 py-6'>
                <h3 className='text-lg font-medium mb-4'>Customer Reviews</h3>
                {reviews.length === 0 ? (
                    <p className='text-gray-500'>No reviews yet. Be the first to review this product!</p>
                ) : (
                    <div className='space-y-4'>
                        {reviews.map((review) => (
                            <div key={review._id} className='border-b pb-4'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <span className='font-medium text-sm'>{review.userName}</span>
                                    <div className='flex gap-1'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <img 
                                                key={star} 
                                                className='w-4 h-4' 
                                                src={star <= review.rating ? assets.star_icon : assets.star_dull_icon} 
                                                alt="star" 
                                            />
                                        ))}
                                    </div>
                                    <span className='text-xs text-gray-500'>
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-700'>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>              

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
