import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/hero'
import LatestCollection from '../components/latestCollection'
import BestSeller from '../components/bestSeller'
import OurPolicy from '../components/ourPolicy'
import Newsletter from '../components/Newsletter'
import { ShopContext } from '../context/shopContext'

const Home = () => {
  const { token } = useContext(ShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <Newsletter />
    </div>
  )
}

export default Home