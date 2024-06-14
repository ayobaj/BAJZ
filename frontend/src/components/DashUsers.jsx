import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Table, TableHead, TableBody, TableCell, TableRow, Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaCheck, FaTimes} from 'react-icons/fa';



const DashUsers = () => {

    const {currentUser} = useSelector((state) => state.user);

    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        
        const fetchUsers = async () => {

            try {
                const res = await fetch(`/api/user/getusers`);

                const data = await res.json();

                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser && currentUser.isAdmin) {
            fetchUsers();
        }

    },[currentUser._id]);


    const handleShowMore = async () => {
        
        const startIndex = users.length;

        try{

            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)

            const data = await res.json();

            if(res.ok){

                setUsers((prev) => [...prev, ...data.users]);

                if(data.users.length < 9){
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    };



const handleDeleteUser = async () => {

    try{

        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        if(res.ok){
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
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
            {currentUser && currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">

                        <TableHead>
                            <Table.HeadCell> Date Created </Table.HeadCell>
                            <Table.HeadCell> User Image </Table.HeadCell>
                            <Table.HeadCell> Username </Table.HeadCell>
                            <Table.HeadCell> Email </Table.HeadCell>
                            <Table.HeadCell> Admin </Table.HeadCell>
                            <Table.HeadCell> Delete </Table.HeadCell>
                        </TableHead>

                        <TableBody>

                            {users.map((user) => (

                                <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>

                                    <TableCell>
                                        
                                            <img
                                                src={user.profilePicture}
                                                alt={user.username}
                                                className="w-10 h-10 object-cover rounded-full bg-gray-500"
                                            />
                                        
                                    </TableCell>

                                    <TableCell> {user.username} </TableCell>

                                    <TableCell className="dark:text-white"> {user.email} </TableCell>

                                    <TableCell className="dark:text-white"> {user.isAdmin ? (<FaCheck className='text-green-600'/>) : (<FaTimes className='text-red-500'/>)} </TableCell>

                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setUserIdToDelete(user._id);
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
                <p>You have no users yet!</p>
            )}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">

                <Modal.Header />

                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-12 w-14 text-slate-400 dark:text-gray-200 mt-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-slate-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers;
