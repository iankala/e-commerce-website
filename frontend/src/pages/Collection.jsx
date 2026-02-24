import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  
    const { products } = useContext(shopContext);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory]= useState([]);

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCategory(prev=> prev.filter(item=> item !== e.target.value))
        }
        else{
            setCategory(prev => [...prev, e.target.value])
        }
    }

 

    const toggleSubcategory = (e) =>{
        if (subcategory.includes(e.target.value)){
            setSubcategory(prev=> prev.filter(item=> item!== e.target.value))
        }
        else{
            setSubcategory(prev=> [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();
        if (category.length > 0 ){
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }
        if (subcategory.length >0 ){
            productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory))
        }
           setFilterProducts(productsCopy  )
    }

       useEffect(()=>{
    setFilterProducts(products)   
    },[products])

    useEffect(()=>{
        applyFilter()
    },[category, subcategory])

    return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t '>
        
        {/* filter options */}        
        <div className='min-w-60'>
            <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl items-center cursor-pointer gap-2' >FILTERS
                <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
            </p>
            {/* category filter*/}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block` }>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
                    </p>
                     <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
                    </p>
                     <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
                    </p>
                </div>
            </div>
            {/* Subcategory filter */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block` }>
                <p className='mb-3 text-sm font-medium'>TYPE</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input className='w-3' onChange={toggleSubcategory } type="checkbox" value={'Topwear'} />Topwear
                    </p>
                     <p className='flex gap-2'>
                        <input className='w-3' onChange={toggleSubcategory } type="checkbox" value={'Bottomwear'} />Bottomwear
                    </p>
                     <p className='flex gap-2'>
                        <input className='w-3' onChange={toggleSubcategory } type="checkbox" value={'Winterwear'} />Winterwear
                    </p>
                </div>
            </div>
        </div>

    {/*Right side */}
    <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1 ={'ALL '} text2={' COLLECTIONS'} />
            {/**Product sort */}
            <select className='border-2  border-gray-300 text-sm px-2'>
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>
        {/* Map products */}
        <div className='grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
                filterProducts.map((item , index)=>(
                    <ProductItem 
                        key={index}
                        id={item._id} 
                        name={item.name} 
                        image={item.image} 
                        price ={item.price}/>
                ))
            }
        </div>
    </div>

    </div>
  )
}

export default Collection
