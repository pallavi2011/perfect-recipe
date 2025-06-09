"use client";

import React,{useTransition, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { NewPasswordSchema } from "@/schemas";
import { newPassword } from "@/actions/new-password";

import Link from "next/link";



const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
        
          password: "",
         
          
        },
      });

     
     

  function onSubmit(values) {
    setError("");
    setSuccess(""); 
    console.log(values)

    startTransition(() => {
    newPassword(values, token)
    .then((data) => {
      setError(data.error);
      setSuccess(data.success);
    })
  })
}

  return (
    <section className='shadow-md border-[0.3px] border-gray-5 justify-center place-items-center mt-32 md:mx-20 bg-white'>
     <div className='grid grid-cols-1 md:grid-cols-2 w-full bg-white overflow-hidden'>
     <img src={"/images/signup.png"} className='md:w-full lg:w-[30rem] md:min-h-screen hidden md:block'/>
     <div className='flex flex-col px-5 w-full'>
              <h4 className='text-black text-wrap text-xl md:text-2xl font-medium text-center md:text-left'>
               Reset your Password!
              </h4>
             
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-3 border-[0.5px] border-gray-3 rounded-md mt-5 w-full p-5'>
            
            
           
            {/* password Input */}
            <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
              <div className='relative w-full'>
                  <input
                   disabled={isPending}
                    {...field}
                    type="password"
                    className='text-gray-3 text-xs md:text-base w-full h-[2.5rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black'
                    placeholder='Enter your new password'
                    required
                  />
                  
                </div>
              </FormControl>
              
              
            </FormItem>
          )}
        />


              
              
              <button type="submit" 
                disabled={isPending}
              className='bg-primary text-white text-xs md:text-base w-[10rem] h-[2rem] rounded-md mt-3 cursor-pointer'>Reset password</button>
             <Link href="/sign-in" className="text-xs text-black mt-2 underline">Back to login</Link>
              
              
              <FormMessage className="text-xs  mt-2">
            
                {error && <span className="p-3 w-[50rem] bg-red-300 text-red-500 rounded-md">{error}</span>}
                {success && <span className="text-green-500">{success}</span>}
              </FormMessage>
              </form>
            </Form>
            </div>
               
    </div>
    </section>
  );
};

export default page;