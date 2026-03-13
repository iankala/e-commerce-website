import React from 'react'
import Title from '../components/title'
import { assets } from '../assets/frontend_assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div className='px-4 md:px-10'>
        <div className='text-2xl text-center pt-8 border-t'>
            <Title text1={'ABOUT '} text2={'US'}/>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />

            <div className='flex flex-col justify-center gap-5 md:w-2/4 text-gray-600'>
                <p>
                    Welcome to Dripped Cloth Store, a modern fashion destination dedicated to providing stylish and comfortable clothing for everyday wear. Our collection is inspired by urban streetwear trends, helping you stay confident and fashionable wherever you go.
                </p>

                <p>
                    At Dripped Cloth Store, we focus on quality, affordability, and simplicity. Our goal is to make it easy for you to find clothing that matches your personality and lifestyle without compromising comfort.
                </p>

                <b className='text-gray-800'>Our Mission</b>

                <p>
                    We are committed to delivering excellent customer service, maintaining product quality, and continuously evolving our collections to reflect modern street and urban fashion.
                </p>
            </div>
        </div>

        <div className='text-xl py-4'>
            <Title text1={'WHY '} text2={'CHOOSE US'} />
        </div>

        <div className='flex flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
                <b>Quality Assurance:</b>
                <p className='text-gray-600'>
                    We carefully select materials and inspect products to ensure durability, comfort, and excellent finishing before delivery to our customers.
                </p>
            </div>
             <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
                <b>Convenience:</b>
                <p className='text-gray-600'>
                   Our store is designed to make shopping for fashion simple and convenient. Customers can easily explore our collection, choose their preferred styles, and complete their purchase through a smooth and user-friendly online experience.

                </p>
            </div>
             <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
                <b>Exceptional Customer Service: </b>
                <p className='text-gray-600'>
                    We are committed to providing exceptional customer service by responding to customer inquiries promptly, assisting with product selection, and ensuring a smooth and satisfying shopping experience for every customer.
                </p>
            </div>
        </div>

        <Newsletter />
    </div>
  )
}

export default About