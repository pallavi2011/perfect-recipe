import React from 'react'

const page = () => {
  return (
    <div className='mt-32 mx-auto px-10'>
        <div className='grid md:grid-cols-2 gap-2'>
            <img src='/images/verification_page_image.png' alt='verification' className='w-full h-full object-cover hidden md:block' />
            <div className='flex flex-col justify-center items-center p-5 space-y-3'>
                <h4 className='text-2xl font-medium'>Thank you Chef</h4>
                <p className='text-gray-2 text-sm'>We have sent a verification email to Activate your account</p>
                <span className='text-black font-normal text-sm'>Example@Nutritrack.com</span>
                <span className='text-gray-2 font-normal text-xs'>Didn’t receive email?</span>
                <a className='text-primary text-sm '>Resend email</a>

                <div className='flex justify-between items-center gap-4'>
                    <Link href="/sign-in" className='px-8 py-1 bg-primary text-white rounded-md'>back</Link>
                    <Link href="/" className='px-8 py-1 bg-gray-4 text-black rounded-md'>Continue</Link>

                </div>

            </div>


        </div>

    </div>
  )
}

export default page