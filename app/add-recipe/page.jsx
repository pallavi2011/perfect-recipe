"use client";

import React, {useEffect, useState, useTransition} from 'react'
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Input } from "@/components/ui/input";
import { NewRecipeSchema } from '@/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from '@/components/ui/label';
import UploadExample from '@/components/upload';
import { addRecipe } from '@/actions/add-recipe';

const LOCAL_STORAGE_KEY = "addRecipeForm";

const Page = () => {

      const user = useCurrentUser()
      const router = useRouter();
    
     
      const getInitialFormValues = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  };

  const initial = getInitialFormValues();
      
   const [ingredients, setIngredients] = useState(
  Array.isArray(initial.ingredients) ? initial.ingredients.map(i => i ?? "") : [""]
);
const [instructions, setInstructions] = useState(
  Array.isArray(initial.instructions) ? initial.instructions.map(i => i ?? "") : [""]
);
    const [isPending, startTransition] = useTransition();
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
    console.log(ingredients)
  };

   const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstruction = [...instructions];
    updatedInstruction[index] = value;
    setInstructions(updatedInstruction);
    console.log(instructions)
  };


   const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };


  const form = useForm({
          resolver: zodResolver(NewRecipeSchema),
          defaultValues: {
           title: initial.title || "",
          image: initial.image || "",
      description: initial.description || "",
      ingredients: Array.isArray(initial.ingredients) ? initial.ingredients.map(i => i ?? "") : [""],
    instructions: Array.isArray(initial.instructions) ? initial.instructions.map(i => i ?? "") : [""],
      servings: initial.servings || "",
      cookingTimeHours: initial.cookingTimeHours || "",
      cookingTimeMinutes: initial.cookingTimeMinutes || "",
      PrepTimeHours: initial.PrepTimeHours || "",
      PrepTimeMinutes: initial.PrepTimeMinutes || "",
      cuisine: initial.cuisine || "",
      calories: initial.calories || "",
      protein: initial.protein || "",
      fats: initial.fats || "",
      carbohydrates: initial.carbohydrates || "",
      fiber: initial.fiber || "",
      netCarbs: initial.netCarbs || "",
      sodium: initial.sodium || "",
      cholesterol: initial.cholesterol || "",
          },
        });

        console.log(form.formState.errors);

        useEffect(() => {
  form.setValue("ingredients", ingredients, { shouldValidate: true });
}, [ingredients, form]);

useEffect(() => {
  form.setValue("instructions", instructions, { shouldValidate: true });
}, [instructions, form]);

        function onSubmit(values) {
            console.log("submit", values)
            setError("");
            setSuccess(""); 
        
            startTransition(() => {
        const cookingTimeTotalMinutes =
        (parseInt(values.cookingTimeHours || "0", 10) * 60) +
        parseInt(values.cookingTimeMinutes || "0", 10);
        
        const PrepTimeTotalMinutes =
        (parseInt(values.PrepTimeHours || "0", 10) * 60) +
        parseInt(values.PrepTimeMinutes || "0", 10);

            const fullData = {
        ...values,
        cookingTime: cookingTimeTotalMinutes,
        prepTime: PrepTimeTotalMinutes,
        ingredients,
        instructions,
      };
      console.log(fullData);
      addRecipe(fullData, user.id)
            .then((data) => {
              setError(data.error);
              setSuccess(data.success);
            })
          })
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        }

       useEffect(() => {

            if (!user) {
            router.push("/sign-in");
            }

            const savedForm = form.watch((values) => {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({
                ...values,
                ingredients,
                instructions,
                })
            );
    });
    return () => savedForm.unsubscribe();
  }, [form, ingredients, instructions, user, router]);

  useEffect(() => {
    const values = form.getValues();
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...values,
        ingredients,
        instructions,
      })
    );
  }, [ingredients, instructions]);

  return (
    <div className='flex flex-col mt-5'>
         
        <div className='w-full border-solid border-[0.8px] mb-5 border-gray-4'/>
        <div className='flex justify-between items-center px-8 md:px-16 lg:px-14'>
            <span className='text-xl md:text-2xl font-medium'>Create new recipe</span>
           
        </div>
        <div className='w-full border-solid border-[0.8px] mb-5 border-gray-4 mt-5'/>
    
        <div className='px-5 md:px-32 lg:px-48 mt-10 flex flex-col space-y-3'>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                            <div className='flex flex-col gap-y-4'>
                            <label className='text-lg'>Recipe Title:</label>
                            <Input {...field}
                        disabled={isPending} type="text" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder='  Enter Your Recipe name'/>
                        </div>

                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                {/* recipe image */}
                
                 <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                            <UploadExample form={form}/>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                {/* description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                              <div className='flex flex-col gap-y-4'>
                            <label className='text-lg'>Description:</label>
                            <Input type="text" 
                            {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' Introduce your recipe' maxLength={100}/>
                        </div>


                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                {/* ingredients */}
                <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                               <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Ingredients:</label>
            {ingredients.map((ingredient, idx) => (
        <Input
          key={idx}
          type="text"
          className='mb-2 w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus:ring-0 focus-visible:ring-0'
          placeholder={`Ingredient ${idx + 1}`}
          value={ingredient ?? ""}
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

                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />
                
              
      

        {/* instructions */}
         <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                               <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Instructions:</label>
            {instructions.map((instruction, idx) => (
        <Input
          key={idx}
          type="text"
          className='mb-2 w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus:ring-0 focus-visible:ring-0'
          placeholder={`Instruction ${idx + 1}`}
          value={instruction ?? ""}
          onChange={e => handleInstructionChange(idx, e.target.value)}
        />
      ))}

       <button
        type="button"
        className="bg-primary text-white rounded-md px-4 py-1 text-sm mt-2"
        onClick={addInstruction}
      >
        + Add Instruction
      </button>
            
        </div>

                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

        {/* servings */}
        <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                              <div className='flex flex-col gap-y-4'>
            <label className='text-lg'>Servings:</label>
            <Input type="text" {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>
            <span className='text-gray-3 text-[12px]'>How many portions does this recipe make ?</span>
        </div>


                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                {/* cookingTime */}
                <div className="flex flex-col gap-y-4">
          <label className="text-lg">Cooking Time:</label>
          <div className="flex gap-x-5">
            <FormField
              control={form.control}
              name="cookingTimeHours"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="0"
                  className="w-full h-10 border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0"
                  placeholder="Hours"
                />
              )}
            />
            <FormField
              control={form.control}
              name="cookingTimeMinutes"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="0"
                  max="59"
                  className="w-full h-10 border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0"
                  placeholder="Minutes"
                />
              )}
            />
          </div>
          <span className="text-gray-3 text-[12px]">
            How long does it take to cook this recipe?
          </span>
        </div>


        {/* prep time */}

        
        <div className="flex flex-col gap-y-4">
          <label className="text-lg">Prep Time:</label>
          <div className="flex gap-x-5">
            <FormField
              control={form.control}
              name="PrepTimeHours"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="0"
                  className="w-full h-10 border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0"
                  placeholder="Hours"
                />
              )}
            />
            <FormField
              control={form.control}
              name="PrepTimeMinutes"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="0"
                  max="59"
                  className="w-full h-10 border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0"
                  placeholder="Minutes"
                />
              )}
            />
          </div>
          <span className="text-gray-3 text-[12px] mb-5">
            How long does it take to prep for this recipe?
          </span>
        </div>

        {/* cuisine */}
        <Label className='text-lg mb-2 font-normal '>Cuisine:</Label>
        <FormField
  control={form.control}
  name="cuisine"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Select
          value={field.value}
          onValueChange={field.onChange}
        >
          <SelectTrigger className="w-[180px] focus-visible:ring-0 ">
            <SelectValue placeholder="Select Cuisine" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem className="data-[state=checked]:text-primary" value="Italian">Italian</SelectItem>
              <SelectItem value="Banana" className="data-[state=checked]:text-primary">Chinese</SelectItem>
              <SelectItem value="Blueberry" className="data-[state=checked]:text-primary">Indian</SelectItem>
              <SelectItem value="Grapes" className="data-[state=checked]:text-primary">Lebanese</SelectItem>
              <SelectItem value="Pineapple" className="data-[state=checked]:text-primary">Thai</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

    {/* Nutrition */}
    <div className='flex flex-col gap-y-3 mt-5 mb-5'>
    <label className='text-lg'>Nutrition Facts:</label>
    <div className='grid grid-cols-4 gap-x-3 gap-y-3'>
        <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                             <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Calories</label>
            <Input type="number" min="0" {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>

                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />


                 <FormField
                    control={form.control}
                    name="carbohydrates"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Carbohydrates</label>
            <Input {...field} min="0" type="number" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                 <FormField
                    control={form.control}
                    name="protein"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                       <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Protein</label>
            <Input type="number" min="0" {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                  <FormField
                    control={form.control}
                    name="fats"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                       <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>fats</label>
            <Input type="number" min="0" {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />


                 <FormField
                    control={form.control}
                    name="fiber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>fiber</label>
            <Input type="number" min="0" {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />


                 <FormField
                    control={form.control}
                    name="netCarbs"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Net Carbs</label>
            <Input type="number" min="0" {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                 <FormField
                    control={form.control}
                    name="sodium"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Sodium</label>
            <Input type="number" {...field} min="0" className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />

                  <FormField
                    control={form.control}
                    name="cholesterol"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <div className='flex flex-col gap-y-2'>
            <label className='text-[12px] text-gray-3'>Cholesterol</label>
            <Input type="number" min="0" {...field} className='w-full h-10  border-gray-3 rounded-md border-[0.5px] text-gray-3 text-sm focus:outline-none focus:border-[1.5px] focus:border-primary focus-visible:ring-0' placeholder=' #'/>

        </div>
                        </FormControl>
                         
                        <FormMessage />
                        </FormItem>
                )}
                />     
    </div>
</div>     


 <button type="submit" 
disabled={isPending} className='bg-primary text-white rounded-md px-10 py-[5.5px] mt-5 text-sm font-medium md:text-md cursor-pointer'>Save</button>
               
         </form>
        </Form> 
</div>
</div>
   
  )
}

export default Page