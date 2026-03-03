import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const Searchbar = () => {
  
    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const location = useLocation();
    const [visible, setVisible] = useState(false)

    useEffect (()=>{
        if(location.pathname.includes('collection')){
                setVisible(true)
        } 
        else{
            setVisible(false)
        }  
    }, [location])
  
  return showSearch && visible ? (
    <div className='border-t  bg-gray-50 text-center py-5'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <img className='w-4 mr-2' src={assets.search_icon} alt="" />
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className='flex-1 outline-none bg-inherit text-sm' 
                type="text" 
                placeholder='Search' 
            />
            <img 
                onClick={() => setShowSearch(false)} 
                className='inline w-3 cursor-pointer ml-2' 
                src={assets.cross_icon} 
                alt="" 
            />
        </div>
    </div>
) : null
}

export default Searchbar
