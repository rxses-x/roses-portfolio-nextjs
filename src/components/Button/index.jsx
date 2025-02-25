import React from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";

const Button = ({ children, onClick, classes }) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-sm tablet:text-base m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 ${
        theme === "dark"
          ? "hover:bg-slate-600 text-white"
          : "hover:bg-slate-100"
      } hover:scale-105 active:scale-100  tablet:first:ml-0  ${
        data.showCursor && "cursor-none"
      } ${classes} link`}
    >
      {children}
    </button>
  );
};

export default Button;