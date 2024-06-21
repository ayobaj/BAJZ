import { useState, useEffect } from "react";
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table} from 'flowbite-react';


const DashboardComp = () => {

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);

    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);

    const { currentUser } = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const res = await fetch('/api/user/getusers?limit=5')
                const data = await res.json()
                if(res.ok){
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            }catch(error){
                console.log(error.messsage)
            }
        }

        const fetchPosts = async () => {
            try{
                const res = await fetch('/api/post/getposts?limit=5');
                const data = await res.json();
                if(res.ok){
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            }catch(error){
                console.log(error.messsage)
            }
        }

        const fetchComments = async () => {
            try{
                const res = await fetch('/api/comment/getcomments?limit=5');
                const data = await res.json();

                if(res.ok){
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            }catch(error){
                console.log(error.messsage)
            }
        }

        if(currentUser.isAdmin){
            fetchUsers()
            fetchPosts()
            fetchComments()
        }

    }, [currentUser])

return (
<div className="p-3 md:mx-auto">

    {/* users, comment and post data */}
    <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 w-full md:w-72 rounded-md shadow-md">

            <div className="flex justify-between items-center">
                <div className="">
                    <h3 className="text-gray-500 text-md ">TOTAL USERS</h3>
                    <p className="text-2xl">{totalUsers}</p>
                </div>
                <HiOutlineUserGroup className="bg-pink-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
            </div>

            <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                    <HiArrowNarrowUp/>
                    {lastMonthUsers}
                </span>
                <div className="text-gray-500">LAST MONTH</div>
            </div>

        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 w-full md:w-72 rounded-md shadow-md">

            <div className="flex justify-between items-center">
                <div className="">
                    <h3 className="text-gray-500 text-md ">TOTAL COMMENTS</h3>
                    <p className="text-2xl">{totalComments}</p>
                </div>
                <HiAnnotation className="bg-purple-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
            </div>

            <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                    <HiArrowNarrowUp/>
                    {lastMonthComments}
                </span>
                <div className="text-gray-500">LAST MONTH</div>
            </div>

        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 w-full md:w-72 rounded-md shadow-md">

            <div className="flex justify-between items-center">
                <div className="">
                    <h3 className="text-gray-500 text-md ">TOTAL POSTS</h3>
                    <p className="text-2xl">{totalPosts}</p>
                </div>
                <HiDocumentText className="bg-gray-500 text-white rounded-full text-5xl p-3 shadow-lg"/>
            </div>

            <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                    <HiArrowNarrowUp/>
                    {lastMonthPosts}
                </span>
                <div className="text-gray-500">LAST MONTH</div>
            </div>

        </div>
    </div>

    {/* // For the tables */}

    <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 ">

            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-3">RECENT USERS</h1>
                <button className="utn">
                    <Link to={'/dashboard?tab=users'}>VIEW ALL</Link>
                </button>
            </div>

            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>PROFILE PICTURE</Table.HeadCell>
                    <Table.HeadCell>USERNAME</Table.HeadCell>
                </Table.Head>

                {users.map((user) => (
                    <Table.Body key={user._id}>

                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                            <Table.Cell>
                                <img src={user.profilePicture} alt="user image" className="w-10 h-10 object-cover rounded-full bg-gray-500"/>
                            </Table.Cell>

                            <Table.Cell>
                                {user.username}
                            </Table.Cell>

                        </Table.Row>
                        
                    </Table.Body>
                ))}
            </Table>

        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 ">

            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-3">RECENT COMMENTS</h1>
                <button className="ptn">
                    <Link to={'/dashboard?tab=comments'}>VIEW ALL</Link>
                </button>
            </div>

            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>COMMENTS</Table.HeadCell>
                    <Table.HeadCell>LIKES</Table.HeadCell>
                </Table.Head>

                {comments.map((comment) => (
                    <Table.Body key={comment._id}>

                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                            <Table.Cell className="w-56">
                                <p className="line-clamp-2">{comment.content}</p>
                            </Table.Cell>

                            <Table.Cell>
                                {comment.numberOfLikes}
                            </Table.Cell>

                        </Table.Row>

                    </Table.Body>
                ))}
            </Table>

        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 ">

            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-3">RECENT POST</h1>
                <button className="gtn ">
                    <Link to={'/dashboard?tab=posts'}>VIEW ALL</Link>
                </button>
            </div>

            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>POST</Table.HeadCell>
                    <Table.HeadCell>POST TITLE</Table.HeadCell>
                    <Table.HeadCell>CATEGORY</Table.HeadCell>
                </Table.Head>

                {posts.map((post) => (
                    <Table.Body key={post._id}>

                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                            <Table.Cell>
                                <img src={post.image} alt="post image" className="w-14 h-10 rounded-md bg-gray-500"/>
                            </Table.Cell>

                            <Table.Cell className="w-56">
                                {post.title}
                            </Table.Cell>

                            <Table.Cell className="">
                                {post.category}
                            </Table.Cell>

                        </Table.Row>

                    </Table.Body>
                ))}
            </Table>

        </div>

    </div>

</div>
)
}

export default DashboardComp
