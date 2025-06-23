"use client"

import React, { useState, useEffect } from 'react'
import { FaRegBookmark } from "react-icons/fa6";
import RatingReview from './RatingReview';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,

} from "@/components/ui/card"
import { getUserDetails } from '@/actions/profile';
import { useCurrentUser } from '@/hooks/use-current-user';
import Link from 'next/link';
import { deleteRecipeById } from '@/actions/recipes';


const RecipeCard = ({recipe:{id, title,image, rating, nutrition}}) => {
  const user = useCurrentUser();

  const [currentUser, setCurrentUser] = useState(user);

  const deleteRecipe = (id) => {
    deleteRecipeById(id)
      .then((response) => {
       console.log('Recipe deleted successfully:', response);
      })
      
      .catch((error) => {
        console.error('Error deleting recipe:', error);
      })
      .finally(() =>{
          window.location.reload();
      });
  }
  useEffect(() => {
    getUserDetails(user.id)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
  })}, []);
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
              {user.id === currentUser.id ? (
                <>
               <Link className='text-xs md:text-sm font-normal  text-primary cursor-pointer' href={`recipes/edit/${id}`}>Edit</Link>
               <button className='text-xs md:text-sm font-normal text-primary cursor-pointer' onClick={() => deleteRecipe(id)}>Delete</button>
               </>
              ):(
                <>
                 <div className='flex gap-x-3'>
                  <img src={pic} className='w-7 h-7'/>
                  <span className='text-xs md:text-sm font-normal text-nowrap'>{user}</span>
                </div>
            <div className='px-2 py-0.5 flex items-center gap-x-1 border-solid border-[0.5px] border-gray-2 rounded-lg'>
                  <img src={"/icons/fire.png"} className='w-4 h-4'/>
                  <span className='text-gray-2 text-xs'>{nutrition?.calories ?? ""} cals</span>
                </div>
                </>
              )}
           
            </CardFooter>
          </Card>
        )
      }
    

export default RecipeCard;
