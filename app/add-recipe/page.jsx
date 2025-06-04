"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";


const Page = () => {

      const user = useCurrentUser()
      const router = useRouter();
    
      if (!user) {
        router.push("/sign-in");
      }
      
      const [ingredients, setIngredients] = useState([""]);

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  return (
    <div className='flex flex-col mt-5'>
        <div className='w-full border-solid border-[0.8px] mb-5 border-gray-4'/>
        <div className='flex justify-between items-center px-8 md:px-16 lg:px-14'>
            <span className='text-xl md:text-2xl font-medium'>Create new recipe</span>
            <button className='bg-primary text-white rounded-md px-4 py-[0.5px] text-sm md:text-base'>Save</button>
        </div>
        <div className='w-full border-solid border-[0.8px] mb-5 border-gray-4 mt-5'/>
    
    <div className='px-5 md:px-32 lg:px-48 mt-10 flex flex-col gap-y-8'>
        <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Recipe Title:</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder='  Enter Your Recipe name'/>
        </div>

        {/* recipe image */}
        <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Recipe Image:</label>
            <div className='flex flex-col items-center gap-y-3 px-10 py-10 md:px-16 md:py-16 lg:px-20 lg:py-20 border-[0.9px] rounded-md border-gray-3'>
                <label className='text-lg text-nowrap'>Upload Your Recipe Image</label>
                <label for="file-upload" class="border-[0.8px] inline-block px-2 py-[1.5px] rounded-md text-center cursor-pointer border-primary max-w-[150px]">+ Upload </label>
               
                <input id="file-upload" type="file" className='hidden'/>
                <span className='text[10px] text-gray-3 text-nowrap'>Max file size 20 MB I Supports: JPG, PNG</span>

            </div>

            <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Description:</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' Introduce your recipe' maxLength={100}/>
        </div>

    {/* ingredients */}
        <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Ingredients:</label>
            {ingredients.map((ingredient, idx) => (
        <Input
          key={idx}
          type="text"
          className="mb-2 w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary"
          placeholder={`Ingredient ${idx + 1}`}
          value={ingredient}
          onChange={e => handleIngredientChange(idx, e.target.value)}
        />
      ))}

       <button
        type="button"
        className="bg-primary text-white rounded-md px-4 py-1 text-sm mt-2"
        onClick={addIngredient}
      >
        + Add Ingredient
      </button>
            
        </div>

        {/* instructions */}
        <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Instructions:</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' Write Instruction'/>
        </div>

        <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Servings:</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>
            <span className='text-gray-3 text-[12px]'>How many portions does this recipe make ?</span>
        </div>

        <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Cooking Time:</label>
            <div className='flex gap-x-5'>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' Hours 0'/>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' Minutes 0'/>
            </div>
           
            <span className='text-gray-3 text-[12px]'>How long does it take to cook this recipe?</span>
        </div>

        <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Prep Time:</label>
            <div className='flex gap-x-5'>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' Hours 0'/>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' Minutes 0'/>
            </div>
           
            <span className='text-gray-3 text-[12px]'>How long does it take to prep for this recipe?</span>
        </div>

    {/* cuisine */}
        <div className='flex flex-col gap-y-4 mb-10'>
            <label className='text-lg'>Cuisine:</label>
            <div class="relative inline-block text-left ">
                <div>
                <button type="button" class="inline-flex justify-between items-center  rounded-md bg-white w-[55%] md:w-[30%] text-sm p-2 font-normal text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                Options
                <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
                </button>
            </div>
            <div class="absolute mx-auto z-10 mt-2 w-[16.4rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">

            {/* cuisine dropdown options */}
    <div class="py-1" role="none" className='hidden'>
    
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
      <form method="POST" action="#" role="none">
        <button type="submit" class="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
      </form>
    </div>
  </div>
</div>

{/* Nutrition facts */}
<div className='flex flex-col gap-y-3 mt-5 mb-5'>
    <label className='text-lg'>Nutrition Facts:</label>
    <div className='grid grid-cols-4 gap-x-3 gap-y-3'>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Calories</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Carbohydrates</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Protein</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>fats</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>fibre</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Net Carbs</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Sodium</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>
        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Cholesterol</label>
            <input type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary' placeholder=' #'/>

        </div>

    </div>
</div>

<div className='flex flex-col gap-y-4 mb-5'>
            <label className='text-lg'>Collection:</label>
            <div class="relative inline-block text-left ">
                <div>
                <button type="button" class="inline-flex justify-between items-center  rounded-md bg-white w-[55%] md:w-[30%] text-sm p-2 font-normal text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                select collection
                <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
                </button>
            </div>
            <div class="absolute mx-auto z-10 mt-2 w-[16.4rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">

            {/* cuisine dropdown options */}
    <div class="py-1" role="none" className='hidden'>
    
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Cookbook</a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">My Recipe</a>
     
    </div>
  </div>
</div>
</div>
</div>
        

    </div>
    </div>
    </div>
  )
}

export default Page