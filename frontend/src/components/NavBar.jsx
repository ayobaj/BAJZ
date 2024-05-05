import { Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import image from "../assets/nav.png"
import {AiOutlineSearch} from "react-icons/ai";
import {FaMoon} from 'react-icons/fa';


const NavBar = () => {
  return (
    <div>
      <Navbar className="border-b-2 ">

        <Link to='/' className="self-center text-sm 
          sm:text-xl font-semibold dark:text-white px-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ">
          <img src={image} className="w-[35px] sm:w-[50px] rounded-lg "/>
        </Link>

        
        <div className="space-x-5 flex item-center">

        
            <form className="flex items-center">
              <button className="w-12 flex items-center text-indigo-500 text-2xl md:hidden">
                <AiOutlineSearch/>
              </button>

              <TextInput type="text" 
              rightIcon={AiOutlineSearch}
              placeholder="Search..." 
              className="hidden md:inline focus:outline-none"/>
            </form>
          

          <button className="hidden sm:inline"> 
            <FaMoon/>
          </button>

          <Link to='/sign-in' className="">
            <button className="btn">
              Sign in
            </button>
          </Link>

        </div>
        
      </Navbar>
    </div>
  )
}

export default NavBar
