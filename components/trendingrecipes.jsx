import React from 'react'
import RecipeCard from '../components/RecipeCard'
import {recipes} from '../constants'

const TrendingRecipes = () => {
  return (
    <section id="#trending" className='px-16 mt-20 md:mt-20 md:px-20 mx-auto'>
        
        <span className='text-2xl md:text-3xl text-black font-medium'>Trending Recipes</span>
        <span className='flex justify-end items-end pr-20'><a href="/" className='text-primary text-lg font-medium hidden md:block'>View more</a></span>
        
       
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 max-w-5xl mx-auto'>
           {recipes.map((recipe)=>{
            return(
              <RecipeCard key={recipe.id} recipe={recipe}/>
            )
           })}
        </div>

    </section>
  )
}

export default TrendingRecipes