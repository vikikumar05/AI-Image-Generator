import React from 'react'
import { assets, plans } from '../assets/assets'

const BuyCredit = () => {
  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>

      <button className='border border-gray-500 px-10 py-2 rounded-full mb-6'>Our Plans</button>

      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the Plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index)=>(
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-400'>
            <img src={assets.logo_icon}/>
            <p>{item.id}</p>
            <p>{item.desc}</p>
            <p>₹{item.price} / {item.credits} credits</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default BuyCredit
