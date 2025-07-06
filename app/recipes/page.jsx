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
import { Input } from "@/components/ui/input";

const RECIPES_PER_PAGE = 8; 

const Page = () => {
    const prevPath = usePreviousPath();

  const user = useCurrentUser()
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
 const [selectFilter, setSelectedFilter] = useState("Select");
 const [search, setSearch] = useState("");
 const [currentPage, setCurrentPage] = useState(1);

  const getFilteredRecipes = () => {
  let filtered = recipes;

  // Filter by search
  if (search.trim() !== "") {
    filtered = filtered.filter(recipe =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort by selected filter
  if (selectFilter === "A to Z") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectFilter === "Newest") {
    filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (selectFilter === "Top rated") {
    filtered = [...filtered].sort((a, b) => {
      const avgRatingA = a.ratings.length > 0 ? a.ratings.reduce((acc, curr) => acc + curr.value, 0) / a.ratings.length : 0;
      const avgRatingB = b.ratings.length > 0 ? b.ratings.reduce((acc, curr) => acc + curr.value, 0) / b.ratings.length : 0;
      return avgRatingB - avgRatingA;
    });
  }
  return filtered;
};

  const filteredRecipes = getFilteredRecipes();
  
  // Pagination logic
   const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );


  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
    const data = getAllRecipes()
    .then((data) => {
      setRecipes(data);
      console.log(data)
    })

     if (window.innerWidth < 768) {
    setSelectedFilter("Sort By");
  } else {
    setSelectedFilter("Select");
  }
    
      
},[]);

 useEffect(() => {
    setCurrentPage(1);
  }, [search, selectFilter]);
  //   const formattedPath =
  // prevPath === "/"
  //   ? "Home"
  //   : prevPath.replace(/^\//, "").charAt(0).toUpperCase() + prevPath.replace(/^\//, "").slice(1);
    

  return (
    <div className="px-10 md:px-16 lg:px-20 mt-15">
      <div className="flex justify-between items-center mb-5">
        <div className="flex">
           {/* <span className="text-gray-3 text-sm">{formattedPath}</span>
           <span className="text-black text-sm font-medium">{'>'}Recipes</span> */}
            <span className="text-black text-lg font-medium hidden sm:block">Recipes</span> 
        </div>
        <Input className="w-[50%] md:w-[30%] border-2 border-primary text-black focus:outline-none focus-visible:ring-0 focus:ring-0" placeholder="Search recipes..."
        value={search}
        onChange={e => setSearch(e.target.value)}/>
        
      <div className="flex items-center gap-2">
         <span className="hidden md:block">Sort By:</span>
        <DropdownMenu>
  <DropdownMenuTrigger className="border-[1.5px] border-primary px-6 py-1 rounded-md focus:outline-none focus:ring-0 focus:border-primary">
     <span className="hidden md:inline">{selectFilter === "Sort By" ? "Select" : selectFilter}</span>
  <span className="inline md:hidden">{selectFilter === "Select" ? "Sort By" : selectFilter}</span>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white">
     <DropdownMenuItem onClick={() => setSelectedFilter("Select")} className="hidden md:block">Select</DropdownMenuItem>
     <DropdownMenuItem onClick={() => setSelectedFilter("Sort By")} className="flex md:hidden">Sort By</DropdownMenuItem>
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