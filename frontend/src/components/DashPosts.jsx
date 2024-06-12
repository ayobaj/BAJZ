import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Table, TableHead, TableBody, TableCell, TableRow, Modal, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashPosts = () => {

    const {currentUser} = useSelector((state) => state.user);

    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        
        const fetchPost = async () => {

            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);

                const data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser && currentUser.isAdmin) {
            fetchPost();
        }

    },[currentUser._id])


    const handleShowMore = async () => {
        
        const startIndex = userPosts.length;

        try{

            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)

            const data = await res.json();

            if(res.ok){
                setUserPosts((prev) => [...prev, ...data.posts])

                if(data.posts.length < 9){
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    };



    const handleDeletePost = async () => {

        setShowModal(false);

        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                
                toast.error("Failed to delete post!");

            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete ));

                toast.success('post deleted successfully')
            }

        } catch (error) {
            toast.error("An error occurred while deleting the post.");
        }
    };




    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
            {currentUser && currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">

                        <TableHead>
                            <Table.HeadCell> Date Updated </Table.HeadCell>
                            <Table.HeadCell> Post Image </Table.HeadCell>
                            <Table.HeadCell> Post Title </Table.HeadCell>
                            <Table.HeadCell> Category </Table.HeadCell>
                            <Table.HeadCell> Delete </Table.HeadCell>
                            <Table.HeadCell> Edit </Table.HeadCell>
                        </TableHead>

                        <TableBody>

                            {userPosts.map((post) => (

                                <TableRow key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>

                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-20 h-10 object-cover bg-gray-500"
                                            />
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        <Link className="font-medium dark:text-white" to={`/post/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </TableCell>

                                    <TableCell className="dark:text-white">{post.category}</TableCell>

                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setPostIdToDelete(post._id);
                                            }}
                                            className="font-medium text-red-500 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <Link className="text-indigo-500 hover:underline" to={`/update-post/${post._id}`}>
                                            Edit
                                        </Link>
                                    </TableCell>

                                </TableRow>
                            ))}

                        </TableBody>

                    </Table>

                    {
                        showMore && (<button onClick={handleShowMore}  className="w-full text-teal-500 self-center text-sm py-7 ">Show more</button>)
                    }

                </>
            ) : (
                <p>You have no posts yet!</p>
            )}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">

                <Modal.Header />

                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-12 w-14 text-slate-400 dark:text-gray-200 mt-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-slate-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeletePost}>
                                Yes, I'm Sure
                            </Button>
                            <Button onClick={() => setShowModal(false)} color="gray">
                                No, Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>

            <ToastContainer />

        </div>
    );
};

export default DashPosts;
