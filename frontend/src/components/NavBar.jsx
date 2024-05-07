import { Link, useLocation } from "react-router-dom";
import image from "../assets/nav.png"
import {AiOutlineSearch} from "react-icons/ai";
import { RiMenu4Line } from "react-icons/ri";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";



const NavBar = () => {

  const [show, setShow] = useState(false);

  const path = useLocation.pathname;

  const handleLinkClick = () => {
    setShow(false);
  }

  return (
    <div className="">
      <nav className="md:border-b-2 flex items-center justify-between md:mx-auto p-3">

        <div className="flex items-center">

          {show === false ? <RiMenu4Line onClick={()=>setShow(true)} className="cursor-pointer text-3xl md:hidden text-indigo-400 "/> :
          <IoCloseSharp onClick={()=>setShow(false)} className="cursor-pointer text-3xl md:hidden text-indigo-400"/>}

          {show && <div className="md:hidden text-white font-semibold text-xl md:static md:min-h-fit absolute md:w-auto bg-indigo-400 md:bg-white min-h-[50vh] left-0 top-[9.7%] w-full flex items-center justify-center">
          <div className="flex items-center md:gap-[50px] md:flex-row flex-col gap-10">
            <Link to={'/'} onClick={handleLinkClick} className="hover:underline">
              Home
            </Link>

            <Link to={'/about'} onClick={handleLinkClick}className="hover:underline">
              About
            </Link>

            <Link to={'/projects'} onClick={handleLinkClick}className="hover:underline">
              Projects 
            </Link>
          </div>
          </div> }

          <Link to='/' className="self-center text-sm 
            sm:text-xl font-semibold dark:text-white px-2 text-transparent bg-clip-text ">
            <img src={image} className="w-[35px] sm:w-[50px] rounded-lg"/>
          </Link>
        </div>

        <div className="md:static md:min-h-fit absolute md:w-auto bg-indigo-400 md:bg-white min-h-[60vh] left-0 top-[-100%] w-full flex items-center justify-center">
          <div className="flex items-center md:gap-[50px] md:flex-row flex-col gap-10 font-semibold text-lg text-indigo-400">
            <Link to={'/'} className="hover:underline ">
              Home
            </Link>

            <Link to={'/about'} className="hover:underline">
              About
            </Link>

            <Link to={'/projects'} className="hover:underline">
              Projects 
            </Link>
          </div>
        </div>
        
        <div className="space-x-3 flex item-center">

        
            <form className="flex items-center">
              <button className="w-12 flex items-center text-indigo-500 text-2xl md:hidden">
                <AiOutlineSearch/>
              </button>

              <div className="hidden md:flex relative">
                <input className="border-2 p-2 pl-7 focus:outline-none border-indigo-400" placeholder="Search..."/>
                <AiOutlineSearch className="absolute text-xl text-indigo-400 top-3.5 left-1 "/>
              </div>
            </form>
          

          <Link to='/sign-in' className="">
            <button className="btn">
              Sign in
            </button>
          </Link>


        </div>
        
      </nav>
    </div>
  )
}

export default NavBar
