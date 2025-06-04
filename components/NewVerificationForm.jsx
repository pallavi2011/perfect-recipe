"use client"

import React, {useCallback, useEffect, useState} from 'react'
import { Card } from './ui/card'
import {BeatLoader} from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import {
   Form,
    FormMessage,
  } from "@/components/ui/form";
  import { redirect } from 'next/navigation'

const NewVerificationForm = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = useCallback(async (e) => {
        if(!token) {
            setError("Token not found")
            return
        }

        newVerification(token)
        .then((data) => {
            setSuccess(data.success)
            setError(data.error)
           
        })

        .catch(() => {
            setError("Something went wrong")
        })
    }, [token])

    useEffect(() => {
        onSubmit();
        setTimeout(() => {
            redirect('/sign-in')
        },5000)
        
    },[onSubmit])
  return (
    <Card className="w-full max-w-sm p-6 space-y-4">
        <div className='flex flex-col items-center justify-center space-y-5'>
            <h1>Confirming your email verification</h1>
            <BeatLoader color="#000" size={20} />
             
                            {error && <span className="p-3  bg-red-300 text-red-500 rounded-md">{error}</span>}
                            {success && <span className="text-green-500">{success}</span>}

                            
                                
                         
            </div>
        </Card>
  )
}

export default NewVerificationForm