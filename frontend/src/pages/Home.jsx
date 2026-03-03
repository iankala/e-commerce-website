import React from 'react'
import Hero from '../components/hero'
import LatestCollection from '../components/latestCollection'
import BestSeller from '../components/bestSeller'
import OurPolicy from '../components/ourPolicy'
import Newsletter from '../components/Newsletter'

const Home = () => {
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