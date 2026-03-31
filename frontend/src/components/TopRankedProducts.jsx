import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './title'
import ProductItem from './ProductItem'
import axios from 'axios'

const TopRankedProducts = () => {
    const { backendUrl } = useContext(ShopContext)
    const [topProducts, setTopProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTopRankedProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/review/top-ranked?limit=8`)
            if (response.data.success) {
                setTopProducts(response.data.products)
            }
        } catch (error) {
            console.error("Error fetching top ranked products:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTopRankedProducts()
    }, [])

    // Filter products that have rankings and sort by ranking
    const rankedProducts = topProducts
        .filter(product => product.ranking && product.ranking > 0)
        .sort((a, b) => a.ranking - b.ranking)
        .slice(0, 8)

    if (loading) {
        return <div className="my-10 text-center">Loading top products...</div>
    }

    if (rankedProducts.length === 0) {
        return null
    }

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'TOP '} text2={'RANKED'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover the highest-rated products in our collection, ranked by customer satisfaction, review count, and popularity. These are the customer favorites that consistently deliver exceptional quality and style.
                </p>
            </div>
            
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    rankedProducts.map((item, index) => (
                        <ProductItem 
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            averageRating={item.averageRating}
                            totalReviews={item.totalReviews}
                            ranking={item.ranking}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TopRankedProducts
