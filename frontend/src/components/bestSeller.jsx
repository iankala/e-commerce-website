import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { ShopContext } from '../context/shopContext';
import Title from './title';


const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller]=useState([])

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestSeller || item.bestseller))
        setBestSeller(bestProduct.slice(0,5))
    },[products])
    return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
        <Title text1={'BEST '} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Explore our top-rated products that customers love and trust. These best-selling items have earned their popularity through exceptional quality, style, and customer satisfaction. Join thousands of satisfied shoppers who have made these their go-to fashion choices.</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
            {
                bestSeller.map((item, index)=>(
                    <ProductItem 
                    key={index} 
                    id={item._id} 
                    name={item.name} 
                    image={item.image} 
                    price={item.price}/> 

                ))
            }


        </div>

        </div>
  )
}



export default BestSeller
