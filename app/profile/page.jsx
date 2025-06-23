"use client";

import React, {useEffect, useState} from 'react'
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePreviousPath } from "@/context/PreviousPathContext";
import { FaRegUser } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"
import { CiUser } from "react-icons/ci";
import { CiAt } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { BsPencil } from "react-icons/bs";
import { LuChefHat } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import UploadExample from '@/components/upload';
import { saveProfileBio, getUserDetails, getRecipesCount, saveProfilePicture,saveProfileDetails } from "@/actions/profile";
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const page = () => {
     const user = useCurrentUser()
     const form = useForm({
  defaultValues: { image: user?.image || "" }
});

 
    const prevPath = usePreviousPath();
    const formattedPath =
  prevPath === "/"
    ? "Home"
    : prevPath.replace(/^\//, "").charAt(0).toUpperCase() + prevPath.replace(/^\//, "").slice(1);
    
    const [bio, setBio] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const [recipeCount, setRecipeCount] = useState(0);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const form1 = useForm({
  defaultValues: { name: userDetails.name,
    email: userDetails.email,
    experience: userDetails.experience || "",
   }
});

const handleChange = (e) => {
  setBio(e.target.value);
  if (typingTimeout) clearTimeout(typingTimeout);
  setTypingTimeout(setTimeout(() => {
    saveProfileBio(e.target.value, user.id)
      .then(() => {
        console.log("Bio saved successfully");
      })
      .catch((error) => {
        console.error("Error saving bio:", error);
      });
  }, 1000)); // 1 second after typing stops
};

const handleEditProfile = async (data) => {
  console.log(data);
 
  try {
    const updatedUser = await saveProfileDetails(data, user.id);
    console.log("Profile updated successfully", updatedUser);
    setUserDetails(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}


const handleProfilePicSubmit = async (data) => {
  console.log(data.image)
  if (!data.image) {
    alert("Please upload an image before saving.");
    return;
  }
  await saveProfilePicture(data.image, user.id);
    console.log("Profile picture updated successfully");
    form.reset();
};

     useEffect(() => {
        if (!user) {
          router.push("/sign-in");
        }

        getUserDetails(user?.id)
        .then((data) => {
          console.log(data);
          setUserDetails(data);
          setBio(data.bio); // 
          form1.reset({
        name: data.name || "",
        email: data.email || "",
        experience: data.experience || "",
      });
          
        })

        getRecipesCount(user?.id)
        .then((count) => {
            setRecipeCount(count);
          console.log("Number of recipes:", count);
        })
          
    },[user]);
  return (
    <div className="px-10 md:px-16 lg:px-25 mt-15">
       <span className="text-gray-3 text-sm">{formattedPath}</span><span className="text-black text-sm font-medium">{'>'}Profile</span>

    
       <div className='mt-5 mx-auto'>

           { /* Profile picture goes here */}
       <div className='flex flex-col justify-center items-center relative'>
                <div className='w-22 h-22 rounded-full border-2 border-gray-300 flex justify-center items-center'>
                {userDetails && userDetails.image ? (
                        <img src={userDetails.image} alt="Profile" className='w-full h-full rounded-full border-2 border-gray-300 object-cover aspect-auto' />
                ):(
                    
                    <FaRegUser className='w-8 h-8 text-primary' />
                   
                )}
                 </div>
              
              <img src={"/icons/chef_cap.png"} alt="edit" className='size-15 absolute top-[-19%] right-[51%] cursor-pointer' />
                

        <Dialog>
        
        <DialogTrigger asChild>
          <span className='flex text-primary text-base text-normal justify-end cursor-pointer mt-2'>Edit Profile Picture</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
       <form onSubmit={form.handleSubmit(handleProfilePicSubmit)}>
      <DialogHeader>
        <DialogTitle className="text-primary">Edit profile Picture</DialogTitle>
        {user?.image && (
          <img src={user.image} alt="Current Profile" className="w-20 h-20 rounded-full mx-auto my-4" />
        )}
        <UploadExample form={form} />
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" className="cursor-pointer">Save changes</Button>
      </DialogFooter>
    </form>
</DialogContent>
      
    </Dialog>

                <div className='flex items-center gap-x-6 mt-2'>
                    <div className='flex flex-col items-center '>
                        <span className='text-gray-2 text-sm'>Followers</span>
                        <span className='text-black text-sm '>2k</span>
                    </div>
                    <div className='w-[0.9px] h-10 bg-gray-3'/>
                     <div className='flex flex-col items-center'>
                        <span className='text-gray-2 text-sm'>Experience</span>
                        <span className='text-black text-sm '>{userDetails.experience}</span>
                    </div>
                  <div className='w-[0.9px] h-10 bg-gray-3'/>
                    <div className='flex flex-col items-center '>
                        <span className='text-gray-2 text-sm'>Recipes</span>
                        <span className='text-black text-sm '>{recipeCount}</span>
                    </div>
                </div>
              
       </div>

       <Separator className='my-5 w-full bg-gray-3 mt-5' />
        
        {/* {user details} */}

    <div className='w-full'>
           
        <div className="w-full flex flex-col gap-y-8">
  {/* First row: Full Name & Username */}
        <div className="flex flex-col gap-y-4 md:flex-row gap-x-8">
            <div className="flex-1 flex flex-col gap-y-2">
            <span className='text-gray-2 text-base font-medium'>Full Name</span>
            <span className='flex items-center gap-x-4'><CiUser className='size-6'/>{userDetails.name}</span>
            <div className='h-[1.8px] w-full bg-gray-3'/>
            </div>
            <div className="flex-1 flex flex-col gap-y-2">
            <span className='text-gray-2 text-base font-medium'>Username</span>
            <span className='flex items-center gap-x-4'><CiAt className='size-6'/> {userDetails.name}</span>
            <div className='h-[1.8px] w-full bg-gray-3'/>
            </div>
        </div>
        
        {/* Second row: Email & Password */}
        <div className="flex flex-col gap-y-4 md:flex-row gap-x-8">
            <div className="flex-1 flex flex-col gap-y-2">
            <span className='text-gray-2 text-base font-medium'>Email</span>
            <span className='flex items-center gap-x-4'><CiMail className='size-6'/> {userDetails.email}</span>
            <div className='h-[1.8px] w-full bg-gray-3'/>
            </div>
            <div className="flex-1 flex flex-col gap-y-2">
            <span className='text-gray-2 text-base font-medium'>Password</span>
            <span className='flex items-center gap-x-4'><CiLock className='size-6'/> ********</span>
            <div className='h-[1.8px] w-full bg-gray-3'/>
            </div>
        </div>

        

          <Dialog>
            
        <DialogTrigger asChild>
          <span className='flex text-primary text-base font-medium justify-end cursor-pointer'>Edit Profile</span>
        </DialogTrigger>
       
        <DialogContent className="sm:max-w-[425px] bg-white">
           <form onSubmit={form1.handleSubmit(handleEditProfile)}>
          <DialogHeader>
            <DialogTitle className="text-primary">Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" 
              {...form1.register("name")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" 
              {...form1.register("email")}name="email" />
            </div>
             <div className="grid gap-3">
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" 
              {...form1.register("experience")}
              name="experience" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      
    </Dialog>

    


</div>
 <span className='text-gray-2 text-base font-medium mt-5'>Bio</span>
    <div className="relative w-full">
  <Input
    value={bio}
    onChange={handleChange}
    className="w-full border-0 focus:border-0 focus-visible:border-b-2 rounded-b-none focus:ring-0 focus-visible:ring-0 border-b-2 border-gray-3 pr-10"
  />
  <BsPencil className='size-5 text-gray-2 absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer' />
</div>

<div className='flex flex-col gap-y-2 mt-10 md:flex-row md:gap-x-4'>
    {/* my recipes and fav recipes card */}
    <div className='flex flex-col gap-y-3 border-2 border-gray-3 rounded-lg p-3 w-full md:w-1/2'>
        <div className='flex justify-between'>
            <span className='text-black text-base'>My Recipes</span>
            <LuChefHat className='size-5 text-gray-2' />
        </div>

        <div className='flex justify-between'>
            <span className='text-gray-2 text-xs'>Recipes you shared</span>
            <Link href="/myrecipes" className='text-primary text-xs'>Show & Manage</Link>
        </div>
        
    </div>

        {/* favorite recipes card */}
     <div className='flex flex-col gap-y-3 border-2 border-gray-3 rounded-lg p-3 w-full md:w-1/2'>
        <div className='flex justify-between'>
            <span className='text-black text-base'>Favorite Recipes</span>
            <CiBookmark className='size-5 text-gray-2' />
        </div>

        <div className='flex justify-between'>
            <span className='text-gray-2 text-xs'>Recipes added to favorites</span>
            <Link href="/favrecipes" className='text-primary text-xs'>Show & Manage</Link>
        </div>
        
    </div>
   
    </div>


        </div>
       </div>
    </div>
  )
}

export default page