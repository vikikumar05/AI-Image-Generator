import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-5 py-3 mt-20'>
      <img src={assets.logo} width={150}/>
      <p className=' item-center text-black max-sm:hidden'>All rights reserved</p>

      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} width={35}/>
        <img src={assets.twitter_icon} width={35}/>
        <img src={assets.instagram_icon} width={35}/>
      </div>
    </div>
  )
}

export default Footer
