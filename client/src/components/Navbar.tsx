import React, { useState } from "react";
import{ AiOutlineClose} from "react-icons/ai"
import {HiOutlineMenu}  from "react-icons/hi"
import { Navlinks } from "./constants";
const Navbar = () => {

    const [open, setOpen] = useState(false);
    
    return (
        <nav className="bg-white text-black">
            <div className="flex items-center font-medium justify-around p-4">
               <div className="z-50 p-0 md:w-auto w-full flex justify-between">
                <h2 className="text-[25px] mr-10">easylifecoop</h2>
                  <div className="text-3xl md:hidden">
                  { 
                      open ? <AiOutlineClose/> : <HiOutlineMenu/>
                   }
                 </div>
              </div>
              <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
                {Navlinks.map((link) => (
                    <li key={link.name}>
                    <a href="/" className="py-4 px-3 inline-block">
                    {link.name}
                   </a>
                </li>
                ))}
                
              
              </ul>
              {/* Mobile nav */}

              <ul
          className={`
        md:hidden bg-black z-10 fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >

         </ul>     
            </div>
        </nav>
      );
}
 
export default Navbar;