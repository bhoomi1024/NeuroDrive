import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Engine = () => {
  return (
    <><div className="h-22 w-full fixed z-[50] bg-white top-0">
    <div className="p-5 flex justify-center shadow-md">
      <nav className="flex justify-between w-full">
        <div className="flex justify-center items-center ml-12">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" />
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-blue-500">Neuro</span>
              <span className="text-lime-500">Drive</span>
            </h1>
          </Link>
        </div>

        <ul className="hidden md:flex gap-x-7 justify-center items-center font-poppins text-[17px] font-medium tracking-[0.01em]">
          <Link to="/Engine">
            <li className="flex justify-center items-center gap-x-1 hover:cursor-pointer hover:scale-[0.975]">
              Engine Diagnostics
            </li>
          </Link>
          <Link to="/Fule">
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Fuel Efficiency Tracking
            </li>
          </Link>
          <Link to="/Battery">
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Battery Diagnostics
            </li>
          </Link>
          <Link to="/Aidiy">
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              DriveShield
            </li>
          </Link>
          <Link to="/Weather">
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Weather 
            </li>
          </Link>
          <Link to="/">
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Logout
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  </div>

    <iframe 
className="absolute top-[88px] left-0 w-full h-[calc(100vh-88px)]"  // This ensures iframe height is the remaining space after the navbar
src="http://localhost:8501"
title="Fuel Efficiency Tracking"
frameBorder="0"
scrolling="yes" // Allow scrolling if content exceeds height
/>

  </>
   );
  }

export default Engine;
