"use client"

import React from 'react'
import RecipeCard from '../components/RecipeCard'
import {getAllRecipes} from '../actions/get-recipes'
import { useState, useEffect } from 'react'


const TrendingRecipes = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);

   
  useEffect(() => {
    getAllRecipes().then((data) => {
      console.log(data)
      setTrendingRecipes(data)
    })
  }
,[])
  return (
    <section id="#trending" className='px-16 mt-20 md:mt-20 md:px-20 mx-auto'>
        
        <span className='text-2xl md:text-3xl text-black font-medium'>Trending Recipes</span>
        <span className='flex justify-end items-end pr-20'><a href="/" className='text-primary text-lg font-medium hidden md:block'>View more</a></span>
        
       
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 max-w-5xl mx-auto'>
           {trendingRecipes
    .filter(recipe => {
      if (!recipe || !recipe.id || !recipe.ratings) return false;
      const avgRating = recipe.ratings.length > 0
        ? recipe.ratings.reduce((acc, curr) => acc + curr.value, 0) / recipe.ratings.length
        : 0;
      return avgRating >= 4;
    })
    .slice(0, 3)
    .map(recipe => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ))
}
        </div>

    </section>
  )
}

export default TrendingRecipes