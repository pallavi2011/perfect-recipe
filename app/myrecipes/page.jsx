"use client";

import RecipeCard from "@/components/RecipeCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePreviousPath } from "@/context/PreviousPathContext";
import { getRecipesByUserId } from "@/actions/get-recipes";

const RECIPES_PER_PAGE = 8; 

const Page = () => {
    const prevPath = usePreviousPath();

  const user = useCurrentUser()
  const router = useRouter();
  const [myrecipes, setMyRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

   const filteredRecipes = myrecipes;

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );


  useEffect(() => {
      setCurrentPage(1);
    }, [myrecipes]);


 

  useEffect( () => {
    if (!user) {
      router.push("/sign-in");
    }

     getRecipesByUserId(user.id)
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
       {/* <span className="text-gray-3 text-sm">{formattedPath}</span><span className="text-black text-sm font-medium">{'>'}Recipes</span> */}
       <span className="text-black text-lg font-medium">My Recipes</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-10">
            {
                paginatedRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))
            }
            

        </div>

        
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className="px-3 py-1 rounded border border-primary text-primary disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded border ${currentPage === idx + 1 ? "bg-primary text-white" : "border-primary text-primary"}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded border border-primary text-primary disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
        
    </div>
  );
};

export default Page;