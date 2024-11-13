import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white font-poppins">
      <hr class="h-px bg-gray-200 border-0" />
      <div className="w-full h-64 hidden md:grid p-10 lg:grid-cols-4 bg-neutral-950 font-poppins text-white">
        <div className="px-16 space-y-5 tracking-[0.01em]">
          <span className="font-extrabold">About</span>
          <ul className="space-y-2 ">
            <li className="hover:cursor-pointer">Our team</li>
            <li className="hover:cursor-pointer">Features</li>
            <li className="hover:cursor-pointer">FAQs</li>
          </ul>
        </div>
        <div className="px-12 space-y-5 tracking-[0.01em]">
          <span className="font-extrabold">Support</span>
          <ul className="space-y-2 ">
            <li className="hover:cursor-pointer">Help & Support</li>
            <li className="hover:cursor-pointer">Feedback</li>
            <li className="hover:cursor-pointer">Partner with us</li>
            <li className="hover:cursor-pointer">Policy</li>
          </ul>
        </div>
        <div className="px-12 space-y-5 tracking-[0.01em]">
          <span className="font-extrabold">Get in touch</span>
          <ul className="space-y-2">
            <li>(+123) 456 789</li>
            <li className="hover:cursor-pointer">xyz@gmail.com</li>
          </ul>
        </div>
        <div className="bg-lime-200 h-48 w-[332px] -ml-14 mr-5 rounded-md font-poppins space-y-3 shadow-inner ">
          <div className="mt-4 ml-6 text-lg font-extrabold tracking-[0.01em] text-neutral-950">
            Subscribe
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2 ml-5 rounded-md">
            <input className="bg-white w-60 size-9 rounded-sm pl-2" type="email" placeholder="Email" /> 
            <button type="submit" className="bg-black size-9 flex justify-center items-center rounded-sm">
              <FaArrowRight size={16} />
            </button>
          </div>
          <p className="mx-6 my-10 text-neutral-950">
          Subscribe for predictive maintenance alerts and fleet savings!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
