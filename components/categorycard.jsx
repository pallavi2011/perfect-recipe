import React from 'react'

const CategoryCard = ({category:{img, title}}) => {
  return (
    <category className="flex flex-col">
        <a href="/"><img src={img} className='w-36 h-36 mb-10'/>
        <span className='text-lg text-black text-center'>{title}</span>
        </a>

    </category>
  )
}

export default CategoryCard