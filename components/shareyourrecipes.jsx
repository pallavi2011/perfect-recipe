import React from 'react'


const ShareRecipes = () => {
  return (
    <section id="shareRecipes" className='w-full mt-20 md:mt-20'>
        <div className='flex flex-col justify-between items-center gap-y-4 md:flex-row md:justify-between md:items-center px-8 md:px-10 lg:px-14  md:py-16 md:gap-x-20 py-8'>
                <img src={"/images/sharerecipe.jpg"} className='w-80 h-80'/>
                <div className='flex flex-col gap-y-4 justify-center items-center'>
                    <span className='text-black font-medium text-2xl md:text-3xl lg:text-4xl whitespace-nowrap'>Share Your <span className='text-primary'>Recipes</span></span>
                    <p className='font-normal text-gray-2 text-lg md:text-xl lg:text-xxl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae enim pharetra, venenatis nunc eget, finibus est. Proin veli</p>
                    <button className='bg-primary text-white rounded-lg px-3 py-1.5 justify-center font-medium'>Create New Recipe</button>
                </div>
        </div>
    </section>
  )
}

export default ShareRecipes