"use client";

import RecipeCard from "@/components/RecipeCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePreviousPath } from "@/context/PreviousPathContext";
import { getFavoritesByUserId } from "@/actions/favorites";

const RECIPES_PER_PAGE = 8;

const Page = () => {
    const prevPath = usePreviousPath();

  const user = useCurrentUser()
  const router = useRouter();
  const [myFavorites, setMyFavorites] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
 

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
  //   const formattedPath =
  // prevPath === "/"
  //   ? "Home"
  //   : prevPath.replace(/^\//, "").charAt(0).toUpperCase() + prevPath.replace(/^\//, "").slice(1);

   const totalPages = Math.ceil(myFavorites.length / RECIPES_PER_PAGE);
  const paginatedFavorites = myFavorites.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );

  // Reset to first page if favorites change
  useEffect(() => {
    setCurrentPage(1);
  }, [myFavorites]);
    

  return (
    <div className="px-10 md:px-16 lg:px-20 mt-15">
       {/* <span className="text-gray-3 text-sm">{formattedPath}</span><span className="text-black text-sm font-medium">{'>'}My Favorite Recipes</span> */}
       <span className="text-black text-lg font-medium">My Favorite Recipes</span> 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-10">
            {
                paginatedFavorites.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe?.recipe} />
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