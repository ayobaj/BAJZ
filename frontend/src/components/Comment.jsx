import { useEffect, useState } from "react"
import PropTypes from "prop-types";
import moment from 'moment';
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";




const Comment = ({comment, onLike}) => {

    const [user, setUser] = useState({});

    const {currentUser} = useSelector((state) => state.user)


    useEffect(()=> {

        const getUser = async () => {
            try{

                const res = await fetch(`/api/user/${comment.userId}`)

                const data = await res.json(res)

                if (res.ok){
                    setUser(data)
                }

            }catch(error){
                console.log(error.message)
            }
        }

        getUser();

    }, [comment])


    return (
        <div className="flex p-4 border-b dark:border-gray-600">
            
            <div className="flex-shrink-0 mr-3">
                <img className="w-10 h-15 rounded-full object-cover bg-gray-200"
                    src={user.profilePicture} 
                    alt={user.username}/>
            </div>

            <div className="flex-1 ">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : 'anonymous'}</span>

                    <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
                </div>

                <p className="text-gray-500 pb-2">{comment.content}</p>

                <div className="flex gap-2 items-center pt-2  max-w-fit ">
                    <button type="button" onClick={()=> onLike(comment._id)} >
                        <FaHeart className= {`text-sm  text-gray-500 hover:text-indigo-400 ${currentUser && comment.likes.includes(currentUser._id) && 'text-indigo-400'}`}/>
                    </button>

                    <p className="text-gray-500 text-xs">

                        {
                            comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')
                        }

                    </p>
                </div>
            </div>

        </div>
    )
}

export default Comment



Comment.propTypes = {
    comment: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        numberOfLikes: PropTypes.number.isRequired,
        
    }).isRequired
};

