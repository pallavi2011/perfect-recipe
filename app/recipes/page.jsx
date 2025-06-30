"use client";

import RecipeCard from "@/components/RecipeCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePreviousPath } from "@/context/PreviousPathContext";
import { getAllRecipes } from "@/actions/get-recipes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Page = () => {
    const prevPath = usePreviousPath();

  const user = useCurrentUser()
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
 const [selectFilter, setSelectedFilter] = useState("Select");
 

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
    const data = getAllRecipes()
    .then((data) => {
      setRecipes(data);
      console.log(data)
    })
    
      
},[]);
    const formattedPath =
  prevPath === "/"
    ? "Home"
    : prevPath.replace(/^\//, "").charAt(0).toUpperCase() + prevPath.replace(/^\//, "").slice(1);
    

  return (
    <div className="px-10 md:px-16 lg:px-20 mt-15">
      <div className="flex justify-between items-center mb-5">
        <div className="flex">
           <span className="text-gray-3 text-sm">{formattedPath}</span><span className="text-black text-sm font-medium">{'>'}Recipes</span>
        </div>
        
      <div className="flex items-center gap-2">
         <span>Sort By:</span>
        <DropdownMenu>
  <DropdownMenuTrigger className="border-[1.5px] border-gray-2 px-6 py-1 focus:ring-0 focus-outline:none focus-visible:border-0 focus rounded-md">{selectFilter}</DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white">
    <DropdownMenuItem onClick={() => setSelectedFilter("A to Z")}>A to Z</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setSelectedFilter("Newest")}>Newest</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setSelectedFilter("Top rated")}>Top rated</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
        
      </div>
      
        <div className=" grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-4
    mt-10">
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