import React from 'react'
import { FaRegBookmark } from "react-icons/fa6";
import RatingReview from './RatingReview';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,

} from "@/components/ui/card"


export default function RecipeCard({recipe:{title,image, rating, calories, user, pic}}) {
        return (
          <Card className="w-[300px] border-none pb-2 relative">
            <CardContent className="flex flex-col">
            <img src={image} className='w-full p-0 h-[10rem] object-cover mb-3'/>
        
        <FaRegBookmark
                className='absolute top-2 right-2 w-8 h-8 p-1.5 bg-white rounded-md'
                style={{ color: "#B55D51" }}
            />
            <RatingReview rating={rating}/>
            <span className='text-xs md:text-base font-medium'>{title}</span>
              
            </CardContent>
            <CardFooter className="flex justify-between">
            <div className='flex gap-x-3'>
                  <img src={pic} className='w-7 h-7'/>
                  <span className='text-xs md:text-sm font-normal text-nowrap'>{user}</span>
                </div>
            <div className='px-2 py-0.5 flex items-center gap-x-1 border-solid border-[0.5px] border-gray-2 rounded-lg'>
                  <img src={"/icons/fire.png"} className='w-4 h-4'/>
                  <span className='text-gray-2 text-xs'>{calories} cals</span>
                </div>
            </CardFooter>
          </Card>
        )
      }

