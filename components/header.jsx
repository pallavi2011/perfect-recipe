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

const header = () => {
    const user = useCurrentUser();
     const onClick = () =>{
          signOut({
            callbackUrl: "/",
          });
        }
  return (
    <header className='px-8 md:px-10 lg:px-14 py-4 top-0 sticky bg-white w-full z-10'>
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
    <div className='hidden max-lg:block'>
      <img src={"/icons/hamburger.png"} alt="hamburger" width={32} height={24}/>
    </div>
    {user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='bg-blue-100 rounded-full text-center size-6 border-[1.5px] border-black lg:block hidden'>
            P
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onClick} className="cursor-pointer">Sign Out</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
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