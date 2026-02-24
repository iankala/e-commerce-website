import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext'
import Title from './title'
import ProductItem from './ProductItem';

const latestCollection = () => {

    const {products} = useContext(shopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10))
    },[])
    

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2 ={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text:sm md:text-base'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, temporibus modi obcaecati ea natus doloremque non qui dolorem a vitae delectus eius mollitia consectetur, possimus necessitatibus enim dolore? Fugiat, perferendis!</p>
        </div>
      
      {/* Rendering Products */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item, index)=>(
                <ProductItem 
                  key ={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}/>
            ))
        }
      </div>


    </div>
  )
}

export default latestCollection
