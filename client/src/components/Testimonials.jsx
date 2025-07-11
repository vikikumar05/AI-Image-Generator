import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

const Testimonials = () => {
    return (
        <div className='flex flex-col items-center justify-center my-20 py-12 md:px-28'>

            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer testimonials</h1>
            <p className='text-neutral-950 mb-12'>What Our Users Are Saying</p>

            <div className='flex flex-wrap gap-6'>
                {testimonialsData.map((testimonial, index)=>(
                    <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                        <div className='flex flex-col items-center'>
                            <img src={testimonial.image} className='rounded-full w-14'/>
                            <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                            <p className='text-neutral-900 mb-4'>{testimonial.role}</p>

                            <div className='flex mb-4'>
                                {Array(testimonial.stars).fill().map((item, index)=>(
                                    <img key={index} src={assets.rating_star}/>
                                ))}
                            </div>

                            <p className='text-center text-sm text-gray-900'>{testimonial.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials
