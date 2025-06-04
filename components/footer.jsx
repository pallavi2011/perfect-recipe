import React from 'react'
import { FaEnvelope } from 'react-icons/fa';


const Footer = () => {
  return (
    <section id="about" className='px-10 md:px-16 mt-10 md:mt-20 bg-gray-3 h-full m-0'>
        <div className='py-10 px-5 w-full items-center flex justify-between gap-x-5 max-md:flex-col md:gap-y-6'>
                <div className='flex flex-col gap-y-5'>
                     <a href="/">
                                <div className='flex items-center'>
                                <img src="/images/logo.png" width={23} height={23}/>
                                <h4 className='text-black leading-normal text-xl md:text-2xl font-medium'>Perfect<span className='text-primary'>Recipe</span></h4>    
                                </div>
                                
                                </a>
                                <p className='text-gray-1 font-normal text-sm'>The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout</p>

                </div>

                <div className='flex gap-x-20 mt-5 md:gap-x-5'>
                    <div className='flex flex-col gap-y-4'>
                        <h4 className='text-black font-medium text-sm mb-3 text-nowrap'>Quick Links</h4>
                        <a href="/" className='text-sm font-normal text-gray-1'>Home</a>
                        <a href="/" className='text-sm font-normal text-gray-1'>Recipes</a>
                        <a href="/" className='text-sm font-normal text-gray-1'>Blog</a>
                        </div>

                        <div className='flex flex-col gap-y-4'>
                        <h4 className='text-black font-medium text-sm mb-3 text-nowrap'>Quick Links</h4>
                        <a href="/" className='text-sm font-normal text-gray-1 text-nowrap'>Share Recipes</a>
                        <a href="/" className='text-sm font-normal text-gray-1'>About us</a>
                        <a href="/" className='text-sm font-normal text-gray-1'>Contact</a>
                        </div>

                        <div className='flex flex-col gap-y-4'>
                        <h4 className='text-black font-medium text-sm mb-3'>Legal</h4>
                        <a href="/" className='text-sm font-normal text-gray-1  text-nowrap'>Terms Of Use</a>
                        <a href="/" className='text-sm font-normal text-gray-1'>Privacy & <br/> Cookies</a>
                       
                        </div>

                </div>
                <div className='flex-col gap-y-4 hidden lg:flex'>
                        <span className='font-medium text-lg text-black'>Newsletter</span>
                        <p className='text-gray-1 text-xs font-normal text-nowrap'>Subscribe to our newsletter to get more free tip </p>
                        <div className='relative w-full'>
            <input className='text-gray-3 text-xs w-full h-[2rem] bg-white rounded-md border-solid border-[0.3px] focus:border-solid border-gray-3 focus:border-2 focus:border-primary focus:outline-none focus:ring-0 pl-10' placeholder='Enter Your Email' />
            <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' />
          </div>
                       
                    <button className='bg-primary text-white text-base rounded-lg px-4 py-1'>Subscribe</button>
                </div>


        </div>
        
        <div className='w-full border-[0.5px] border-solid border-gray-1 h-[0.3px] m-3 max-md:hidden'/>
        <div className='flex justify-between items-center m-3 max-md:flex-col-reverse'>
            <span className='text-gray-1 text-xs'>&copy; 2025 ReceiptLogo. All Rights Reserved</span>
            <div className='w-full border-[0.5px] border-solid border-gray-1 h-[0.3px] m-3 max-md:block md:hidden'/>
            <div className='flex gap-x-3'>
                <a href='/'>
                <img src='/icons/spotify.png' className='w-4 h-4'/>
                </a>
                <a href='/'>
                <img src="/icons/twitter.png" className='w-4 h-4'/>
                </a>
                <a href='/'>
                <img src="/icons/facebook.png" className='w-4 h-4'/>
                </a>
                <a href='/'>
                <img src="/icons/insta.png" className='w-4 h-4'/>
                </a>
                <a href='/'>
                <img src="/icons/pinterest.png" className='w-4 h-4'/>
                </a>
            </div>

        </div>
    </section>
  )
}

export default Footer