/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';


const PostCard = ({post}) => {
return (
    <div className='mb-4 mt-3 group relative w-[300px] sm:h-[320px] overflow-hidden rounded-lg sm:w-[290px] border border-indigo-400 hover:border-2 transition-all'>
        <Link to={`/post/${post.slug}`} className=''>
            <img src={post.image} 
            alt='post image'
            className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 '/>
        </Link>

        <div className='flex flex-col gap-2'>

            <p className='ml-3 text-lg font-semibold line-clamp-2'>{post.title}</p>
            <span className='ml-3 italic text-sm'>{post.category}</span>

            <Link to={`/post/${post.slug}`} className='hidden sm:block sm:z-10 sm:group-hover:bottom-0 absolute sm:bottom-[-200px] 
            sm:left-0 sm:right-0 sm:border sm:border-indigo-500 sm:text-indigo-400 sm:hover:bg-indigo-400 sm:hover:text-white
            sm:transition-all sm:duration-300 sm:text-center sm:py-2 sm:rounded-md sm:m-2'>
                Read Post
            </Link>
        </div>
    </div>
    )
}

export default PostCard
