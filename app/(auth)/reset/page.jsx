"use client";

import React,{useTransition, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { ResetSchema } from "@/schemas";
import { reset } from "@/actions/reset";

import Link from "next/link";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


const page = () => {
  
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
        
          email: "",
         
          
        },
      });

     
     

  function onSubmit(values) {
    setError("");
    setSuccess(""); 
    console.log(values)

    startTransition(() => {
    reset(values)
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
               Forgot Password!
              </h4>
             
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-3 border-[0.5px] border-gray-3 rounded-md mt-5 w-full p-5'>
            
            
           
            {/* Email Input */}
            <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
              <div className='relative w-full'>
                  <input
                   disabled={isPending}
                    {...field}
                    type="email"
                    className='text-gray-3 text-xs md:text-base w-full h-[2.5rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black'
                    placeholder='Enter your email'
                  />
                  <img src={"/icons/message.png"} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' alt="Message Icon" />
                </div>
              </FormControl>
              
              
            </FormItem>
          )}
        />


              
              
              <button type="submit" 
                disabled={isPending}
              className='bg-primary text-white text-xs md:text-base w-[10rem] h-[2rem] rounded-md mt-3 cursor-pointer'>Send reset mail</button>
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