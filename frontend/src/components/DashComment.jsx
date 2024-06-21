import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Table, TableHead, TableBody, TableCell, TableRow, Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const DashComment = () => {

    const {currentUser} = useSelector((state) => state.user);

    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    useEffect(() => {
        
        const fetchComments = async () => {

            try {
                const res = await fetch(`/api/comment/getcomments`);

                const data = await res.json();

                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser.isAdmin) {
            fetchComments();
        }

    },[currentUser._id]);


    const handleShowMore = async () => {
        
        const startIndex = comments.length;

        try{

            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)

            const data = await res.json();

            if(res.ok){

                setComments((prev) => [...prev, ...data.comments]);

                if(data.comments.length < 9){
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    };



const handleDeleteComment = async () => {

    try{

        const res = await fetch(`/api/comment/delete/${commentIdToDelete}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        if(res.ok){
            setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
            setShowModal(false);
        }else{
            toast.error(data.message);
        }

    }catch(error){
        console.error(error)
    }


}



    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
            {currentUser && currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">

                        <TableHead>
                            <Table.HeadCell> Date Updated </Table.HeadCell>
                            <Table.HeadCell> Comment Content </Table.HeadCell>
                            <Table.HeadCell> Number of lkes </Table.HeadCell>
                            <Table.HeadCell> Post Id </Table.HeadCell>
                            <Table.HeadCell> username </Table.HeadCell>
                            <Table.HeadCell> Delete </Table.HeadCell>
                        </TableHead>

                        <TableBody>

                            {comments.map((comment) => (

                                <TableRow key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <TableCell>{new Date(comment.UpdatedAt).toLocaleDateString()}</TableCell>

                                    <TableCell> {comment.content} </TableCell>

                                    <TableCell className="dark:text-white"> {comment.numberOfLikes} </TableCell>

                                    <TableCell className="dark:text-white"> {comment.username} </TableCell>

                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setCommentIdToDelete(comment._id);
                                            }}
                                            className="font-medium text-red-500 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
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
                <p>You have no comments yet</p>
            )}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">

                <Modal.Header />

                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-12 w-14 text-slate-400 dark:text-gray-200 mt-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-slate-500 dark:text-gray-400">Are you sure you want to delete this comment?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteComment}>
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

export default DashComment;
