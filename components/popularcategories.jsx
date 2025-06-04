import React from 'react'
import CategoryCard from '../components/categorycard'
import {categories} from '../constants'

const PopularCategories = () => {
  return (
    <section id="#popular" className='px-16 mt-20 md:mt-20 md:px-28 '>
         <span className='text-2xl md:text-3xl text-black font-medium text-nowrap'>Popular Categories</span>
         <span className='flex justify-end items-end pr-20'><a href="/" className='text-primary text-lg font-medium hidden md:block'>View more</a></span>
         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 max-w-6xl mx-auto'>
            {categories.map((category)=>{
            return(
              <CategoryCard key={category.id} category={category}/>
            )
            })}
         </div>
    </section>
  )
}

export default PopularCategories