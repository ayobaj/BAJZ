import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";


const PostPage = () => {

    const { postSlug } = useParams();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [post, setPost] = useState(null);


    useEffect(() => {
        
        const fetchPost = async () => {

            try{

                setLoading(true);

                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);

                const data = await res.json();

                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }

                if (res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }

            }catch(error){
                setError(true);
                setLoading(false);
            }

        }


        fetchPost();


    }, [postSlug])


    if(loading) return <div className="flex justify-center items-center min-h-screen">

        <Spinner size='xl'/>

    </div>



    return (
        <main className="flex flex-col p-3 max-w-6xl mx-auto min-h-screen">
            
            <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>

            <Link className="self-center mt-5" to={`/search?category=${post && post.category}`}>
                <button className="btn rounded-lg flex">{post && post.category}</button>
            </Link>

            <img src={post && post.image} alt='post image' className="mt-10 p-3 max-h-[600px] w-full object-cover"/>

            <div className="flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">

                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>

                <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>

            </div>

            <div className="post-content p-3 max-w-2xl mx-auto w-full" dangerouslySetInnerHTML={{__html: post && post.content}}>

            </div>

            <CommentSection postId={post._id}/>

        </main>
    )
}

export default PostPage
