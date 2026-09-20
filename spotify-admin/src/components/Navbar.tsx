import React, { useContext } from "react";
import { AdminContext } from "../context/adminContext";

const Navbar = () => {
  const { logout } = useContext(AdminContext);
  return (
    <div className="navbar flex justify-between items-center w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg">
      <p>Admin Panel</p>
      <button
        className="py-3 px-5 bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.98] text-black font-bold text-sm rounded-full tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
        onClick={() => {
          logout();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
