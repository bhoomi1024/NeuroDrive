import React from "react";
import { FaStar } from "react-icons/fa";

const Card = (props) => {
  return (
    <div className="h-[245px] w-[210px] font-poppins hover:cursor-pointer transition duration-100 hover:scale-[0.95]">
      <div className="h-[60%] w-full ">
        <img
          src={props.src}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="flex flex-col p-2 gap-y-[2px]">
        <div className="flex justify-between">
          <span className="font-bold text-lg">{props.restaurant}</span>
          <span className="h-6 w-12 bg-green-600 text-white flex justify-center items-center space-x-1 rounded-lg">
            <span className="font-bold text-sm tracking-widest">
              {props.rating}
            </span>
            <FaStar size={12} color="#ffffff" />
          </span>
        </div>
        <span className="text-base font-bold">{props.name}</span>
        <span className="text-base font-medium ">{props.service}</span>
        <span className="text-base text-slate-600">{props.address}</span>
      </div>
    </div>
  );
};

export default Card;
