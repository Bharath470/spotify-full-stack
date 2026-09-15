import { useContext, useEffect, useRef } from "react";
import DisplayHome from "./DisplayHome";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext.tsx";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isAlbum = location.pathname.includes("/album/");
  const albumId = isAlbum ? location.pathname.split("/").pop() : null;
  const bgColor = isAlbum
    ? albumsData.find((x) => x._id == albumId)?.bgColor
    : "#121212";
  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  });

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
