import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { urlPOST } from "../App";
import { toast } from "react-toastify";
import { AdminContext } from "../context/adminContext";

interface Song {
  _id: string;
  name: string;
  image: string;
  album: string;
  duration: string;
}

const ListSong = () => {
  const [data, setData] = useState<Song[]>([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${urlPOST}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const removeSong = async (id: string) => {
    try {
      const { token } = useContext(AdminContext);
      const response = await axios.post(
        `${urlPOST}/api/song/remove/`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p
                onClick={() => removeSong(item._id)}
                className="cursor-pointer"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListSong;
