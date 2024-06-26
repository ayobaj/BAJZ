// import navpng from '../assets/nav.png'
import { FaRegRegistered } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";



const Footer = () => {
    return (
        <div className=' bg-slate-300 p-3 space-y-6 sm:pl-9'>

            <div className=' pt-5 flex relative items-center justify-center md:justify-start'>
                <p className=' font-bold md:text-[40px] text-[30px] text-indigo-500'>The Creative<br/> Blog Agency</p>
                <p><FaRegRegistered className="md:mb-[80px] mb-16 text-red-700"/></p>
            </div>
            
            <div className='space-x-1 flex justify-center md:justify-start'>

                <a rel="noopener noreferrer"  href="https://web.facebook.com/?_rdc=1&_rdr" target="_blank"  className="font-semibold text-lg text-indigo-500 hover:text-red-600">Facebook</a>

                <a rel="noopener noreferrer" href="https://twitter.com/?lang=en"target="_blank"  className="font-semibold text-lg text-indigo-500 hover:text-red-600">Twitter</a>

                <a rel="noopener noreferrer" href="https://www.instagram.com/"target="_blank"  className="font-semibold text-lg text-indigo-500 hover:text-red-600">Instagram</a>

                <a rel="noopener noreferrer" href="https://stackoverflow.com/" target="_blank" className="font-semibold text-lg text-indigo-500 hover:text-red-600">StackOverflow</a>


            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600">

                <span><FaRegCopyright/></span> <p> {new Date().getFullYear()} Bajz Blog Creative. All Rights Reserved.</p>

            </div>

            <div className=" pb-5 text-slate-600 font-bold flex md:flex justify-center md:justify-start gap-3">
                <p className=" hover:text-indigo-600">Term of Business</p>
                <p className=" hover:text-indigo-600">Privacy Policy</p>
            </div>



        </div>
    )
}

export default Footer
