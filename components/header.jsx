"use client";

import React from 'react'
import { navLinks } from '@/constants'
import Link from 'next/link'
import {useCurrentUser} from "@/hooks/use-current-user";
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";

const header = () => {
    const user = useCurrentUser();
    const router = useRouter();
     const onClick = () =>{
          signOut({
            callbackUrl: "/",
          });
        }
  return (
    <header className='px-8 md:px-10 lg:px-14 py-4 top-0 sticky bg-white w-full z-12'>
  <nav className='flex relative justify-between items-center max-container'>
    <a href="/">
      <div className='flex items-center'>
        <img src={"/images/logo.png"} width={33} height={33}/>
        <h4 className='text-black leading-normal text-2xl font-medium'>
          Perfect<span className='text-primary'>Recipe</span>
        </h4>    
      </div>
    </a>
    <ul className='flex-1 flex justify-center items-start gap-16 max-lg:hidden'>
      {navLinks.map((link) => (
        <li key={link.title}>
          <Link href={link.href || "#"} className='font-roboto leading-normal text-base font-medium text-black text-nowrap'>{link.title}</Link>
        </li>
      ))} 
    </ul>
    <DropdownMenu>
  <DropdownMenuTrigger className="focus-visible:ring-0 focus:outline-none focus:ring-0">
    <div className='hidden max-lg:block'>
      <img src={"/icons/hamburger.png"} alt="hamburger" width={32} height={24}/>
    </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white">
   
    <DropdownMenuItem asChild><Link href="/">Home</Link></DropdownMenuItem>
    <DropdownMenuItem asChild><Link href="/recipes">Recipes</Link></DropdownMenuItem>
    <DropdownMenuItem asChild><Link href="/add-recipe">Add Recipe</Link></DropdownMenuItem>
     <DropdownMenuItem asChild><Link href="/blog">Blog</Link></DropdownMenuItem>
    <DropdownMenuItem asChild><Link href="/about">About Us</Link></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    
    {user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='bg-blue-100 rounded-full text-center size-10 border-[1.5px] border-white lg:block hidden'>
            <img src={user.image} className='w-full h-full rounded-full object-cover' alt="User Profile" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
         
          <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
           <DropdownMenuItem onClick={onClick} className="cursor-pointer">Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <div className='flex max-lg:hidden justify-between items-center gap-2'>
        <Link href="/sign-in" className='block bg-white text-xs text-black px-2.5 py-1 ring-1 ring-black rounded-lg font-medium'>Log in</Link>
        <Link href="/sign-up" className='block text-xs bg-primary text-white px-2.5 py-1 ring-1 ring-primary rounded-lg font-medium'>Sign up</Link>
      </div>
    )}
  </nav>
</header>
  )
}

export default header