import React from 'react'
import {brands} from '../constants'
const Brands = () => {
  return (
    <section className='px-16 md:px-20 mt-16 md:mt-28'>
        <div className='flex flex-wrap justify-between items-center gap-x-5 md:px-28'>
            {brands.map((brand) => (
                <img src={brand.img} key={brand.id} className='w-16 h-10 mb-10' />
            ))}

        </div>
    </section>
  )
}

export default Brands