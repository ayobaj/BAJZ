import {Link} from 'react-router-dom';
import { FaArrowDown, FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try{

                const res = await fetch('/api/post/getPosts');
                const data = await res.json();
                setPosts(data.posts);

            }catch(error){
                console.log(error.message)
            }
        }

        fetchPosts();
    }, []);


return (
    <div className=''>

        <div className="flex flex-col gap-5 p-12  sm:p-28 max-w-6xl h-[500px] justify-between lg:min-h-screen">

            <div className='space-y-2'>
                <h1 className="text-5xl font-bold lg:text-7xl text-slate-600">BAJZ BLOG</h1>

                <p className="text-gray-500 text-sm sm:text-sm">
                Read our latest articles and posts on technology, 
                fashion, and entertainment.
                </p>
            </div>

            <div className='flex justify-end lg:ml-[1100px]'>
                    <button className='btn p-4 flex'><FaArrowDown className='text-xl'/></button>
            </div>

        </div>


        <div className='flex justify-end items-center pr-12'>
            <Link to='/search'>
                <button className='update flex items-center justify-between gap-4 w-[200px] h-[50px] sm:w-[200px]'>ALL
                    <span><FaArrowRightLong className='text-2xl'/></span>
                </button>
            </Link>
        </div>

        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>

            {posts && posts.length > 0 && (

                <div>

                    <div className='flex flex-wrap gap-4 justify-center items-center'>
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post}/>
                        ))}
                    </div>

                </div>
            )}

        </div>


    </div>
)
}

export default Home
