import React from 'react'

const StayInTouch = () => {
  return (
    <section id="#contact" className='max-container bg-light justify-center items-center mt-10 md:mt-20 '>
            <div className='flex flex-col justify-center items-center px-20 lg:px-64 md:px-32 py-10 gap-y-5'>
                <h2 className='text-2xl font-medium md:text-3xl text-black text-nowrap'>Let's Stay In Touch!</h2>
                <p className='text-base text-gray-2 font-normal md:text-2xl text-center'>Join our newsletter, so that we reach out to you with our news and offers.</p>
                <div className='flex flex-col md:flex-row gap-y-5 justify-center items-center'>
                    <input className='text-gray-3 text-base w-[20rem] h-[2.3rem] bg-white rounded-md border-solid border-[0.3px] focus:border-solid  border-gray-3 focus:border-2 focus:border-primary focus:outline-none focus:ring-0' placeholder='   Enter Your Email'/>
                    <button className='bg-primary text-white text-base rounded-lg px-4 py-1 ml-6'>Subscribe</button>

                </div>
            </div>
    </section>
  )
}

export default StayInTouch