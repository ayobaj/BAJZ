import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector} from 'react-redux';
import { signoutUserSuccess } from '../Redux/user/userSlice';



const DashSidebar = () => {

    const location = useLocation();

    const [tab, setTab ] = useState('');

    const dispatch = useDispatch();

    const {currentUser} = useSelector((state) => state.user);

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search)

        const tabFromUrl = urlParams.get('tab')

        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    },[location.search])


    const handleSignOut = async () => {

        try{
    
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            })
    
            const data = await res.json();
    
            if(!res.ok){
                const errMsg = data.message || 'Signout failed. Please try again later';
                toast.error(errMsg);
                console.error(errMsg);
            } else{
                dispatch(signoutUserSuccess());
                toast.success('Signed out successfully');
            }
    
        } catch(error){
            const errMsg = error.message || 'Signout failed. Please try again later';
            toast.error(errMsg);
            console.error(errMsg);
        }
    };

    return (
        <Sidebar className='w-full md:w-56'>
            
            <Sidebar.Items>

                
                <Sidebar.ItemGroup className='flex flex-col gap-1'>

                    
                    <Sidebar.Item as={Link}
                        to={'/dashboard?tab=profile'}
                        active={tab === 'profile'}
                        icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} 
                        labelColor='dark' >
                        Profile
                    </Sidebar.Item>

                    {currentUser.isAdmin && (

                        <Sidebar.Item as={Link}
                        to={'/dashboard?tab=posts'}
                        active={tab === 'posts'}
                        icon={HiDocumentText}>
                            Posts
                        </Sidebar.Item>
                    
                    )}


                    {currentUser.isAdmin && (

                    <Sidebar.Item as={Link}
                    to={'/dashboard?tab=users'}
                    active={tab === 'users'}
                    icon={HiOutlineUserGroup}>
                        Users
                    </Sidebar.Item>

                    )}

                    <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className = 'cursor-pointer' >
                        Sign Out
                    </Sidebar.Item>

                </Sidebar.ItemGroup>

            </Sidebar.Items>

            <ToastContainer/>

        </Sidebar>
    )
}

export default DashSidebar
