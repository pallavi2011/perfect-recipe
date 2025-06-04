import { FcGoogle } from "react-icons/fc";


const SignUp = () => {
    return (
      <>
      
      <section className='shadow-md border-[0.3px] border-gray-5 justify-center place-items-center mt-32 md:mx-20 bg-white'>
      <div className='flex flex-row w-full bg-white overflow-hidden'>
          <img src={"/images/signup.png"} className='md:w-[22rem] lg:w-[30rem] md:h-min-h-screen hidden md:block'/>
          <div className='flex flex-col px-5 w-full lg:w-1/2'>
              <h4 className='text-black text-xl md:text-2xl font-medium text-center md:text-left'>
                Want to join our Family
              </h4>
  
              <form className='flex flex-col gap-y-3 border-[0.5px] border-gray-3 rounded-md mt-3 w-full p-5'>
                {/* Full Name Input */}
                <div className='relative w-full'>
                  <input
                    className='text-gray-3 text-xs md:text-base w-full h-[2.5rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black'
                    placeholder='Enter your full name'
                  />
                  <img src={"/icons/profile.png"} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' alt="Profile Icon" />
                </div>
  
                {/* Email Input */}
                <div className='relative w-full'>
                  <input
                    type="email"
                    className='text-gray-3 text-xs md:text-base w-full h-[2.5rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black'
                    placeholder='Enter your email'
                  />
                  <img src={"/icons/message.png"} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' alt="Message Icon" />
                </div>
  
                {/* Password Input */}
                <div className='relative w-full'>
                  <input
                    type="password"
                    className='text-gray-3 text-xs md:text-base w-full h-[2.5rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black'
                    placeholder='Enter your password'
                  />
                  <img src={"/icons/lock.png"} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' alt="Lock Icon" />
                </div>
  
                {/* Confirm Password Input */}
                <div className='relative w-full'>
                  <input
                    type="password"
                    className='text-gray-3 text-xs md:text-base w-full h-[2.5rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black'
                    placeholder='Repeat your password'
                  />
                  <img src={"/icons/lock.png"} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' alt="Lock Icon" />
                </div>
              </form>
          {/* <div className='flex flex-col px-5 w-full lg:w-1/2 '>
              <h4 className='text-black text-xl md:text-2xl font-medium'>Want to join our Family</h4>
  
              <form className='flex flex-col gap-y-3 border-[0.5px] border-gray-3 rounded-md mt-3 w-full box-border px-'>
                  <div className='relative w-full p-[1.5px]'>
                              <input className='text-gray-3 text-xs md:text-base w-full h-[2rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black box-border' placeholder='Enter your full name'/>
                              <img src={profile} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' />
                            </div>
                            <div className='relative w-full p-[1.5px]'>
                              <input type="email" className='text-gray-3 text-xs md:text-base w-full h-[2rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black' placeholder='Enter your email'/>
                              <img src={message} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' />
                            </div>
                            <div className='relative w-full p-[1.5px]'>
                              <input type="password" className='text-gray-3 text-xs md:text-base w-full h-[2rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black' placeholder='Enter your password'/>
                              <img src={lock} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' />
                            </div>
                            <div className='relative w-full p-[1.5px]'>
                              <input type="password" className='text-gray-3 text-xs md:text-base w-full font-normal h-[2rem] bg-white outline-none pl-12 focus:border-b-2 focus:border-primary focus:text-black' placeholder='Repeat your password'/>
                              <img src={lock} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-3' />
                            </div>
                 
              </form> */}
              <div className='flex items-center mt-3'>
                <input type="checkbox" id="terms" className='form-checkbox h-4 w-4  border-primary checked:bg-primary
                checked:border-primary' />
                <label htmlFor="terms" className='ml-2 text-gray-3 text-xs'>I agree to the terms & policy</label>
              </div>
              <button className='bg-primary text-white text-xs md:text-base w-[10rem] h-[2rem] rounded-md mt-3'>Sign Up</button>
  
              <div className='flex flex-col gap-y-3 mt-5'>
                  <span className='text-xs text-gray-2'>Or you can join with</span>
                  <div className='flex gap-x-2'>
                  <button className='bg-white text-gray-2 text-xs md:text-base  h-[2rem] rounded-md mt-3 flex p-2 items-center justify-center border border-gray-300 font-normal w-full text-nowrap'>
                  <FcGoogle className='mr-2 ml-3' /> Sign in with Google
                </button>
                <button className='bg-white text-gray-2 text-xs md:text-base  h-[2rem] rounded-md mt-3 flex items-center justify-center border p-2 border-gray-300 font-normal w-full text-nowrap'>
                  <FcGoogle className='mr-2 ml-3' /> Sign in with Facebook
                </button>
                </div>
                  <span className='text-xs text-gray-2'>Already have an account? <span className='text-primary '>Log in</span></span>
  
                  
              </div>
  
              <a href="/home" className='flex justify-end items-end mt-16'>
                  <div className='flex items-center'>
                  <img src={"/images/logo.png"} width={14} height={14}/>
                  <h4 className='text-black leading-normal text-base font-medium'>Perfect<span className='text-primary'>Recipe</span></h4>    
                  </div>
                  
                  </a>
  
          </div>
  
  
                 
      </div>
      </section>
     
      
      </>
    )
  }
  
  export default SignUp