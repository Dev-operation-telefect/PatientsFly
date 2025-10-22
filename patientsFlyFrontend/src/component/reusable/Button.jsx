import React from "react";

const Button = ({ name, color }) => {
  return (
    <div
      className={`h-10 w-fit  px-8 rounded-3xl py-2  text-sm font-regular flex justify-center items-center duration-300 hover:cursor-pointer hover:bg-[#c40522]
        ${color === "red" ? "bg-[#E40A2A] text-white" : "bg-white"}`}
    >
      {name}
    </div>
  );
};

export default Button;
