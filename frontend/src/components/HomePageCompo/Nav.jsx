import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiGreasyfork } from "react-icons/si";
import { FaTrashAlt } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Nav = () => {
  const [loggedIn,setLoggedIn] = useState(true);

  return (
    <div className="h-22 w-full fixed z-[50] bg-white top-0">
      <div className="p-5 flex justify-center shadow-md ">
        <nav className="flex justify-between w-full">
        <div className="flex justify-center items-center ml-12">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" /> {/* Logo image */}
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-blue-500">Neuro</span>
              <span className="text-lime-500">Drive</span>
            </h1>
          </div>

          <ul className="hidden md:flex gap-x-7 justify-center items-center font-poppins text-[17px] font-medium tracking-[0.01em]">
           
        
            <Link to="/">
              <li className="hover:cursor-pointer hover:scale-[0.975]">
                Home
              </li>
            </Link>

            <Link to="/UserLoginRegister">
              <li className="flex justify-center items-center gap-x-1 hover:cursor-pointer hover:scale-[0.975]">
                Solution
              </li>
            </Link>
             <Link to= "/About"> 
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              About
            </li>
            </Link>
           
            <Link to= "/Industry"> 
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Industries
            </li>
            </Link>
            <Link to= "/Game"> 
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Game
            </li>
            </Link>
            <Link to= "/ContactUS"> 
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Contact us
            </li>
            </Link>
 </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
