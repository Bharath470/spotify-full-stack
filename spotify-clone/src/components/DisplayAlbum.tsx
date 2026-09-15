import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets.ts";
import { PlayerContext } from "../context/PlayerContext";

type Album = {
  _id: string;
  name: string;
  image: string;
  desc: string;
  bgColor: string;
};

const DisplayAlbum = () => {
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);
  const [albumData, setAlbumData] = useState<Album | null>(null);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const album = albumsData.find((item) => item._id === id);

    if (album) {
      setAlbumData(album);
    }
  }, [albumsData, id]);
  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={albumData.image} alt="" className="w-48 rounded" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              src={assets.spotify_logo}
              alt=""
              className="w-5 inline-block"
            />
            <b>Spotify </b>• 1232,123 likes • <b> 50 Songs </b>
            about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3  sm:grid-cols-4  mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} alt="" className="m-auto w-4" />
      </div>
      <hr />
      {songsData
        .filter((item) => item.album === albumData.name)
        .map((song, index) => (
          <div
            onClick={() => playWithId(song._id)}
            key={index}
            className="grid grid-cols-3  sm:grid-cols-4  mt-10 mb-4 pl-2 text-[#a7a7a7]"
          >
            <p className="text-white">
              <b className="mr-4">{index + 1}</b>
              <img src={song.image} alt="" className="w-10 inline-block mr-4" />
              {song.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="hidden sm:block text-[15px]">5 days ago</p>
            <p className="text-[15px] text-center">{song.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
