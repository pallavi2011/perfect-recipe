"use client";

import RecipeCard from "@/components/RecipeCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePreviousPath } from "@/context/PreviousPathContext";
import { getFavoritesByUserId } from "@/actions/favorites";


const Page = () => {
    const prevPath = usePreviousPath();

  const user = useCurrentUser()
  const router = useRouter();
  const [myFavorites, setMyFavorites] = useState([]);

 

  useEffect( () => {
    if (!user) {
      router.push("/sign-in");
    }

     getFavoritesByUserId(user.id)
    .then((data) => {
      setMyFavorites(data);
      console.log(data)
    })
    
      
},[]);
    const formattedPath =
  prevPath === "/"
    ? "Home"
    : prevPath.replace(/^\//, "").charAt(0).toUpperCase() + prevPath.replace(/^\//, "").slice(1);
    

  return (
    <div className="px-10 md:px-16 lg:px-20 mt-15">
       {/* <span className="text-gray-3 text-sm">{formattedPath}</span><span className="text-black text-sm font-medium">{'>'}My Favorite Recipes</span> */}
       <span className="text-black text-lg font-medium">My Favorite Recipes</span> 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-10">
            {
                myFavorites.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe?.recipe} />
                ))
            }
            

        </div>
        
    </div>
  );
};

export default Page;