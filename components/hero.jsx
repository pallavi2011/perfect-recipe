const Hero = () => {
    return (
      <section id="home" className='w-full flex flex-col min-h-screen px-8 md:px-10 lg:px-14'>
        <div className='absolute top-0 right-0'>
            <img src={"/images/header-bg.png"} className='w-64 h-64 md:w-[500px] md:h-[450px] lg:w-[700px] lg:h-[550px]'/>
           
        </div>
        <div className='relative justify-between items-center flex flex-col md:flex md:flex-row pt-40 md:pt-26 lg:px-6 md:px-0 '>
          <div className='flex flex-col w-full justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start md:w-2/5 px-0 py-5 gap-y-5'>
          <h1> 
              <span className='font-bold font-roboto text-black text-3xl md:text-4xl lg:text-5xl  whitespace-nowrap md:whitespace-nowrap relative z-10'>
              Your Daily Dish
              </span>
              <br/>
             <span className='font-bold font-roboto text-black text-3xl md:text-4xl lg:text-5xl  whitespace-nowrap md:whitespace-nowrap'>A <span className="text-primary">Food</span> Journey</span>
             </h1>
             <p className='text-gray-2 text-sm md:text-base lg:text-lg font-normal w-full '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae enim pharetra, venenatis nunc eget, finibus est. Proin velit </p>
             <button className='flex w-3/4 md:w-2/5 bg-primary text-white rounded-lg px-3 py-1.5 justify-center font-medium'>Sign Up</button>
             <span className='text-gray-2 text-sm font-medium hidden sm:block'>Do you have account? <a href='/sign-in' className='text-primary'>Log in </a></span>
          </div>
  
          <div className='md:flex md:justify-around md:absolute md:-right-20 lg:right-9 max-md:hidden'>
            {/* <img src={'/images/header-img.png'} className='lg:w-3/4 lg:h-3/4 md:w-2/3 md:h-2/3'/> */}
                    <img 
        src={'/images/header-img.png'} 
        className='w-full h-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg' 
        alt="Header Image"
        />
                    
            <div className='flex flex-col absolute bottom-16 -left-6 bg-white px-1 py-1.5 rounded-lg justify-center items-center'>
            <img src={"/images/pic.png"} className='w-12 h-12 rounded-full absolute -top-5 left-5'/>
                <span className='text-[10px]'>Sara Johnson</span>
                <div className='flex'>
                <img src={"/icons/star.png"} className='w-3 h-3'/>
                <img src={"/icons/star.png"}  className='w-3 h-3'/>
                <img src={"/icons/star.png"}  className='w-3 h-3'/>
                <img src={"/icons/star.png"} className='w-3 h-3'/>
                <img src={"/icons/star.png"}  className='w-3 h-3'/>
                </div>
                <p className='text-[8px] break-words'>Wow, this recipe is a flavor explosion in my mouth! very delicious.</p>
               
                
  
            </div>
          </div>
            
        </div>
  
        
       
      </section>
    )
  }

export default Hero