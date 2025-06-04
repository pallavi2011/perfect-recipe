import React from 'react'
import {
    Card,
    CardContent,
    
  
  } from "@/components/ui/card"

const BlogCard = ({blog:{title, image, description}}) => {
  return (
    <Card className="w-[500px] md:w-[300px] lg:w-[500px] border-none pb-2">
    <CardContent className="flex flex-col">
    <img src={image} className='w-full h-[15rem] object-cover'/>

    <div className='flex flex-col text-center'>
            <span className='text-black font-medium text-base lg:text-xxl p-1 line-clamp-1'>{title}</span>
            <p className='font-normal text-gray-2 text-xs lg:text-sm line-clamp-2 overflow-ellipsis p-1'>{description}</p>

        </div>
    </CardContent>
    
  </Card>
  )
}

export default BlogCard