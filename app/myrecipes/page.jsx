"use client";

import RecipeCard from "@/components/RecipeCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePreviousPath } from "@/context/PreviousPathContext";
import { getRecipesById } from "@/actions/get-recipes";

const Page = () => {
    const prevPath = usePreviousPath();

  const user = useCurrentUser()
  const router = useRouter();
  const [myrecipes, setMyRecipes] = useState([]);

 

  useEffect( () => {
    if (!user) {
      router.push("/sign-in");
    }

     getRecipesById(user.id)
    .then((data) => {
      setMyRecipes(data);
      console.log(data)
    })
    
      
},[]);
    const formattedPath =
  prevPath === "/"
    ? "Home"
    : prevPath.replace(/^\//, "").charAt(0).toUpperCase() + prevPath.replace(/^\//, "").slice(1);
    

  return (
    <div className="px-10 md:px-16 lg:px-20 mt-15">
       <span className="text-gray-3 text-sm">{formattedPath}</span><span className="text-black text-sm font-medium">{'>'}Recipes</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-10">
            {
                myrecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))
            }
            

        </div>
        
    </div>
  );
};

export default Page;