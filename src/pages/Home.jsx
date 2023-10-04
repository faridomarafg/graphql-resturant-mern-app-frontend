import React from 'react'
import Slider from '../components/slider/Slider'
import Foods from './dashboard/Foods'

const Home = () => {
  return (
    <div className='flex flex-col w-full min-h-scree bg-zinc-700'>
      <Slider/>
      <Foods/>
    </div>
  )
}

export default Home