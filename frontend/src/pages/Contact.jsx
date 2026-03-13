import React from 'react'
import Title from '../components/title'
import { assets } from '../assets/frontend_assets/assets'
import Newsletter from '../components/Newsletter'

const Contact = () => {
  return (
    <div>
        <div className='text-center text 2-xl pt-10 border-t'>
            <Title text1={'CONTACT '} text2={'US'} />
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
            <div className='flex flex-col justify-center ites-start gap-6'>
                <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                <p className='text-gray-500'>579836 St.bruv <br /> Nai, Ke</p>
                <p>Tel: +2345788765 <br /> getdripped@gmail.com</p>
                <p className='font-semibold text-gray-600' >Careers at Dripped</p>
                 <p className='text-gray-500'>Learn more about our teams and job openings.</p>
                 <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-600 '>Explore jobs</button>
            </div>
        </div>
        <Newsletter />
    </div>
  )
}

export default Contact