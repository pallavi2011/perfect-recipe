"use client";

import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/constants";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePreviousPath } from "@/context/PreviousPathContext";

const Page = () => {
    const prevPath = usePreviousPath();

  const user = useCurrentUser()
  const router = useRouter();

  if (!user) {
    router.push("/sign-in");
  }

    
    

  return (
    <div className="px-10 md:px-16 lg:px-20 mt-15">
       <span className="text-gray-3 text-sm"> {prevPath === "/" ? "Home" : prevPath}</span><span className="text-black text-sm font-medium">{'>'}Recipes</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-10">
            {
                recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))
            }
            

        </div>
        
    </div>
  );
};

export default Page;