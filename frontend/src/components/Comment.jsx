import { useEffect, useState } from "react"
import PropTypes from "prop-types";
import moment from 'moment';
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";




const Comment = ({comment, onLike, onEdit, onDelete}) => {

    const [user, setUser] = useState({});

    const [isEditing, setIsEditing] = useState(false);

    const {currentUser} = useSelector((state) => state.user)

    const [editedContent, setEditedContent] = useState(comment.content)

    const handleEdit = () => {

        setIsEditing(true);

        setEditedContent(comment.content);

    } 


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

    const handleSave = async () => {

        try{

            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    content: editedContent
                })
            });

            const data = res.json();

            if(res.ok){
                setIsEditing(false);
                onEdit(comment, editedContent);
            }

        }catch(error){
            console.log(error)
        }
    }


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

                {isEditing ?
                
                    (<>
                
                    <textarea 
                    
                        className="mb-2 rounded-lg w-full"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}

                    />

                    <div className="flex justify-end gap-2">

                        <button type="button" className="p-2 text-gray-500 hover:bg-indigo-400 border-2 text-sm rounded-lg hover:text-white"
                            onClick={handleSave} >
                            Save
                        </button>

                        <button type="button" className="p-3 text-white  hover:bg-indigo-500 hover:text-white text-sm bg-indigo-400 rounded-lg "
                            onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>

                    </div>
                
                    </>) : 
                
                        (<>
                    
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

                                {
                                    currentUser && (currentUser._id === comment.userId ||
                                    currentUser.isAdmin) &&
                                    
                                    (
                                        <>
                                            <button onClick={handleEdit} className="text-gray-400 text-xs hover:text-blue-500" type="button">
                                                Edit
                                            </button>

                                            <button onClick={ ()=> onDelete(comment._id)} className="text-gray-400 text-xs hover:text-red-500" type="button">
                                            Delete
                                            </button>
                                        </>
                                    )

                                }

                            </div>

                        </>)}


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
        // _id: PropTypes.string.isRequired,
        numberOfLikes: PropTypes.number.isRequired,
        
    }).isRequired
};

