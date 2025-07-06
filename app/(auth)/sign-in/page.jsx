"use client";

import React,{useTransition, useState, useEffect} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
 import { useSession } from 'next-auth/react'
 


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { SignInSchema } from "@/schemas";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


const page = () => {
  const searchParams = useSearchParams();
   const { data: session, status } = useSession()
  const router = useRouter()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use" : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
        
          email: "",
          password: "",
          
        },
      });

      const onClick = (provider) => {
        if (provider === "google") {
          signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          });
        } else if (provider === "facebook") {
          signIn("facebook");
        }
      };
     

  function onSubmit(values) {
    setError("");
    setSuccess(""); 

    startTransition(() => {
     signIn("credentials", {
    ...values,
    redirect: false, // Prevent automatic redirect
  }).then((res) => {
    
    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  });
  })
}

useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
    }
  }, [status, router])

  return (
    <section className='shadow-md border-[0.3px] border-gray-5 justify-center place-items-center mt-10 md:mx-20 bg-white'>
     <div className='grid grid-cols-1 md:grid-cols-2 w-full bg-white overflow-hidden'>
     <img src={"/images/signup.png"} className='md:w-full lg:w-[30rem] md:min-h-screen hidden md:block'/>
     <div className='flex flex-col px-5 w-full'>
              <h4 className='text-black text-wrap text-xl md:text-2xl font-medium text-center md:text-left'>
               Welcome Back!
              </h4>
              <span className="mt-2 mb-5 text-xs text-gray-2 max-md:text-center">Enter your email & password to log in</span>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-3 border-[0.5px] border-gray-3 rounded-md mt-3 w-full p-5'>
            
            
           
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
           
            {/* Password Input */}
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
                    placeholder='Enter your password'
                  />
                  <img src={"/icons/lock.png"} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' alt="Lock Icon" />
                </div>
  
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
            
               
               
                

                <div className='flex items-center mt-3'>
                <input type="checkbox" id="terms" className='form-checkbox h-4 w-4  border-primary checked:bg-primary
                checked:border-primary' />
                <label htmlFor="terms" className='ml-2 text-gray-3 text-xs'>I agree to the terms & policy</label>
              </div>

              
              <button type="submit" 
                disabled={isPending}
              className='bg-primary text-white text-xs md:text-base w-[10rem] h-[2rem] rounded-md mt-3 cursor-pointer'>Sign In</button>
              <button className="px-0 text-primary underline m-0 cursor-pointer"><Link href="/reset">Forgot Password?</Link></button>
              
              
              <FormMessage className="text-xs  mt-2">
                {urlError && <span className="p-3 w-[50rem] bg-red-300 text-red-500 rounded-md">{urlError}</span>}
                {error && <span className="p-3 w-[50rem] bg-red-300 text-red-500 rounded-md">{error}</span>}
                {success && <span className="text-green-500">{success}</span>}
              </FormMessage>
              </form>
            </Form>
               <div className='flex flex-col gap-y-3 mt-5'>
                                <span className='text-xs text-gray-2'>Or you can join with</span>
                                <div className='flex gap-x-2'>
                                <button className='bg-white text-gray-2 text-xs md:text-base  h-[2rem] rounded-md mt-3 flex p-2 items-center justify-center border border-gray-300 font-normal w-full text-nowrap cursor-pointer' onClick={() => onClick("google")}>
                                <FcGoogle className='mr-2 ml-3' /> <span className="md:hidden lg:block">Sign in with Google</span>
                              </button>
                              <button className='bg-white text-gray-2 text-xs md:text-base  h-[2rem] rounded-md mt-3 flex items-center justify-center border p-2 border-gray-300 font-normal w-full text-nowrap cursor-pointer' onClick={() => onClick("facebook")}>
                                <FcGoogle className='mr-2 ml-3' /> <span className="md:hidden lg:block">Sign in with Facebook</span>
                              </button>
                            </div>
                            
                            {/* don't have an account? */}
                            <span className='text-xs text-gray-2'>Don't have an account? <Link href="/sign-up" className='text-primary '>sign up</Link></span>

  
                  
              </div>
              <a href="/" className='flex justify-end items-end mt-16'>
                  <div className='flex items-center'>
                  <img src={"/images/logo.png"} width={14} height={14}/>
                  <h4 className='text-black leading-normal text-base font-medium'>Perfect<span className='text-primary'>Recipe</span></h4>    
                  </div>
                  
                  </a>
            
            </div>
    </div>
    </section>
  );
};

export default page;