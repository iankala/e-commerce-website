import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import {Link} from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'

const ProductItem = ({id, image, name, price, averageRating, totalReviews, ranking}) => {

    const {currency} = useContext(ShopContext)      

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden relative'>
            {ranking && ranking <= 10 && (
                <div className='absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10'>
                    #{ranking}
                </div>
            )}
            <img className='hover:scale-110 transition ease-in-out' src={image[0] } alt="" />
        </div>
      <p className='pt-1 pb-1 text-sm'>{name}</p>
      {averageRating && (
        <div className='flex items-center gap-1 mb-1'>
            <div className='flex gap-0.5'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <img 
                        key={star} 
                        className='w-3 h-3' 
                        src={star <= Math.round(averageRating) ? assets.star_icon : assets.dull_icon} 
                        alt="star" 
                    />
                ))}
            </div>
            <span className='text-xs text-gray-500'>({totalReviews || 0})</span>
        </div>
      )}
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
