import { useEffect, useState } from "react"
import PropTypes from "prop-types";
import moment from 'moment'



const Comment = ({comment}) => {

    const [user, setUser] = useState({});


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
    }).isRequired
};

