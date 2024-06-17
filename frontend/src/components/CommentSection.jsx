import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {Alert} from 'flowbite-react';
import Comment from "./Comment";






const CommentSection = ({postId}) => {

    const {currentUser} = useSelector((state) => state.user)

    const [comment, setComment] = useState('');

    const [comments, setComments] = useState([]);

    const [commentError, setCommentError] = useState(null);




    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const res = await fetch('/api/comment/create', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({content:comment, postId, userId:currentUser._id})
            });


            const data = await res.json();

            if(res.ok){
                setComment('')
                setCommentError(null)
                setComments([data, ...comments])
            }

        }catch(error){
            setCommentError(error.message)
        }

    }



    useEffect(()=> {

        const getComments = async () => {
            try{

                const res = await fetch(`/api/comment/getPostComment/${postId}`);

                if(res.ok){
                    const data = await res.json();
                    setComments(data);
                }

            }catch(error){
                console.log(error)
            }
        }
        getComments();
    }, [postId])

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ?  (

                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>signed in as:</p>
                    <img src={currentUser.profilePicture} alt="" className=" h-5 w-5 object-cover rounded-full" />
                    <Link to={'/dashboard?tab=profile'} className="text-xs text-indigo-400 hover:underline">
                        @{currentUser.username}
                    </Link>
                </div>

            ) : (<div className="text-sm text-red-700 my-5 flex gap-1 ">
                    Sign in to comment!
                    <Link className="text-indigo-400 hover:underline" to={'/sign-in'}>Sign in</Link>
                </div>)}


                {currentUser && (
                    <form onSubmit={handleSubmit} className="border border-gray-300 rounded-md p-3">
                        <textarea className=" w-full rounded-lg focus:outline-none border border-gray-300"  placeholder="Add a comment..."
                        rows='3'
                        maxLength='200'
                        onChange={(e)=> setComment(e.target.value)} 
                        value={comment}/>

                        <div className="flex justify-between items-center mt-5"> 
                            <p className="text-gray-500 text-xs">{200 - comment.length} characters remaining</p>
                            <button className=" p-3 border border-indigo-400 text-indigo-400 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-indigo-400 hover:text-white"> Submit </button> 
                        </div>

                        {commentError && (
                            <Alert color='failure' className='mt-5'>
                            {commentError}
                            </Alert>)}
                    </form>
                )}

                {comments.length === 0 ?
                    (<div className="text-sm my-5">
                        No comments yet!
                    </div>)
                    
                    :(<>
                    
                        <div className="flex items-center my-5 text-sm gap-1">
                            <p>Comments</p>

                            <div className="border border-gray-400 px-2 rounded-sm"><p>{comments.length}</p></div>
                        </div>

                        {
                        comments.map((comment) => (<Comment key={comment._id} comment = {comment}/>)) 
                        }
                    
                    </>)
                }
        </div>
    )
}

export default CommentSection







CommentSection.propTypes = {
    postId: PropTypes.string.isRequired
}
