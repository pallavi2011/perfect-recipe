import BlogCard from './blogcard';
import {blogs} from '../constants';

const Blog = () => {
  return (
    <section id="blog" className='px-16 mt-20 md:mt-20 md:px-20'>
          <span className='text-2xl md:text-3xl text-black font-medium'>Blog</span>
          <span className='flex justify-end items-end pr-20'><a href="/" className='text-primary text-lg font-medium hidden md:block'>View more</a></span>
            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-14 lg:gap-3 gap-5 max-w-6xl mx-auto'>
            {blogs.map(blog => <BlogCard key={blog.id} blog={blog}/>)}
            </div>
          
    </section>
  )
}

export default Blog