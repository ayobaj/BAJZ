import { Link, useNavigate, useLocation } from "react-router-dom";
import image from "../assets/nav.png"
import {AiOutlineSearch} from "react-icons/ai";
import { RiMenu4Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {useSelector} from 'react-redux';
import {Avatar, Dropdown} from 'flowbite-react'
import { useDispatch } from "react-redux";
import { signoutUserSuccess } from "../Redux/user/userSlice";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const NavBar = () => {

  const [show, setShow] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const {currentUser} = useSelector(state => state.user)

  const navigate = useNavigate();

  const location = useLocation();


  const handleLinkClick = () => {
    setShow(false);
  }

  const dispatch = useDispatch();


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
            navigate('/sign-in');
            
        }

    } catch(error){
        const errMsg = error.message || 'Signout failed. Please try again later';
        toast.error(errMsg);
        console.error(errMsg);
    }
};

  // SEARCH BAR 
  
  useEffect(()=> {

    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get('searchTerm');

    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl); 
    }

  }, [location.search]);


  const handleSubmit = (e) => {

    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);

    urlParams.set('searchTerm', searchTerm);

    const searchQuery = urlParams.toString();
    
    navigate(`/search?${searchQuery}`)
  }




  return (
    <div className="">
      
      <nav className="flex items-center shadow-md justify-between md:mx-auto p-3">

        <div className="flex items-center">

          {show === false ? <RiMenu4Line onClick={()=>setShow(true)} className="cursor-pointer text-3xl md:hidden text-indigo-400 "/> :
          <IoCloseSharp onClick={()=>setShow(false)} className="cursor-pointer text-3xl md:hidden text-indigo-400"/>}

          {show && <div className="md:hidden text-white font-semibold text-xl md:static md:min-h-fit absolute md:w-auto bg-indigo-400 z-20 md:bg-white min-h-[50vh] left-0 top-[9.7%]  w-full flex items-center justify-center">
          <div className="flex items-center md:gap-[50px] md:flex-row flex-col gap-10">
            <Link to={'/'} onClick={handleLinkClick} className="hover:underline">
              Home
            </Link>

            <Link to={'/about'} onClick={handleLinkClick}className="hover:underline">
              About
            </Link>
          </div>
          </div> }

          <Link to='/' className="self-center text-sm 
            sm:text-xl font-semibold dark:text-white px-2 text-transparent bg-clip-text ">
            <img src={image} className="w-[35px] sm:w-[50px] rounded-lg"/>
          </Link>
        </div>

        {/* <div className="md:static md:min-h-fit absolute md:w-auto bg-indigo-400 md:bg-white min-h-[60vh] left-0 top-[-100%] w-full flex items-center justify-center">
          <div className="flex items-center md:gap-[50px] md:flex-row flex-col gap-10 font-semibold text-lg text-indigo-400">
            <Link to={'/'} className="hover:underline ">
              Home
            </Link>

            <Link to={'/about'} className="hover:underline">
              About
            </Link>

          </div>
        </div> */}
        
        <div className="space-x-3 flex item-center pr-3 ">

        <div className="md:static md:min-h-fit absolute md:w-auto bg-indigo-400 md:bg-white min-h-[60vh] left-0 top-[-100%] w-full flex items-center justify-center md:mr-[30px]">
          <div className="flex items-center md:gap-[50px] md:flex-row flex-col gap-10 font-semibold text-lg text-indigo-400">
            <Link to={'/'} className="hover:underline ">
              Home
            </Link>

            <Link to={'/about'} className="hover:underline">
              About
            </Link>

          </div>
        </div>
        
        
            <form onSubmit={handleSubmit} className="flex items-center">

              <div className=" md:flex relative">

                <input onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm} 
                className="border-2 p-2 pl-7 w-[90px] focus:outline-none shadow-md" placeholder="Search..."/>

                <AiOutlineSearch className="absolute text-xl text-indigo-400 top-3.5 left-1 "/>

              </div>
            </form>
          
          { currentUser ? (
            <Dropdown 
            className="z-20"
            arrowIcon={false}
            inline
            label={
              <Avatar alt = 'user avatar'
              img={currentUser.profilePicture} rounded/> 
            }>

              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>

              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>
                  Profile
                </Dropdown.Item>
              </Link>

              <Dropdown.Divider/>

              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>

            </Dropdown>
          ) : (
            <Link to='/sign-in' className="">
            <button className="btn">
              Sign in
            </button>
          </Link>
          )}
          


        </div>
        
      </nav>

      <ToastContainer/>
    </div>
  )
}

export default NavBar
