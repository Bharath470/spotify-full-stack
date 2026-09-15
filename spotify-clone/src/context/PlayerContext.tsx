import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

type TimeType = {
  currentTime: {
    second: number;
    minute: number;
  };
  totalTime: {
    second: number;
    minute: number;
  };
};

type Album = {
  _id: string;
  name: string;
  image: string;
  desc: string;
  bgColor: string;
};

type Song = {
  _id: string;
  name: string;
  desc: string;
  file: string;
  image: string;
  album: string;
  duration: string;
};

type PlayerContextType = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  seekBg: React.RefObject<HTMLDivElement | null>;
  seekBar: React.RefObject<HTMLHRElement | null>;
  track: Song;
  setTrack: React.Dispatch<React.SetStateAction<Song>>;
  playStatus: boolean;
  setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
  time: TimeType;
  setTime: React.Dispatch<React.SetStateAction<TimeType>>;
  play: () => void;
  pause: () => void;
  playWithId: (id: string) => void;
  previous: () => void;
  next: () => void;
  seekSong: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  songsData: Song[];
  albumsData: Album[];
};

export const PlayerContext = createContext<PlayerContextType>(
  {} as PlayerContextType,
);

const PlayerContextProvider = (props: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBg = useRef<HTMLDivElement>(null);
  const seekBar = useRef<HTMLHRElement>(null);

  const urlPOST = "http://localhost:4000";

  const [songsData, setSongsData] = useState<Song[]>([]);
  const [albumsData, setAlbumsData] = useState<Album[]>([]);

  const [track, setTrack] = useState(songsData[2]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // const playWithId = async (id: number) => {
  //   await setTrack(songsData[id]);
  //   if (audioRef.current) {
  //     await audioRef.current.play();
  //   }
  //   setPlayStatus(true);
  // };

  const playWithId = async (id: string) => {
    const song = await songsData.find((song) => song._id === id);

    if (!song) return;

    setTrack(song);

    if (audioRef.current) {
      audioRef.current.src = song.file;
      await audioRef.current.play();
    }

    setPlayStatus(true);
  };

  // const previous = async () => {
  //   if (track.id > 0) {
  //     await setTrack(songsData[track.id - 1]);
  //     await audioRef.current?.play();
  //     setPlayStatus(true);
  //   }
  // };

  const previous = async () => {
    const currentIndex = await songsData.findIndex(
      (song) => song._id === track._id,
    );

    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      setPlayStatus(true);
    }
  };

  // const next = async () => {
  //   if (track.id < songsData.length - 1) {
  //     await setTrack(songsData[track.id + 1]);
  //     await audioRef.current?.play();
  //     setPlayStatus(true);
  //   }
  // };

  const next = async () => {
    const currentIndex = await songsData.findIndex(
      (song) => song._id === track._id,
    );

    if (currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      setPlayStatus(true);
    }
  };

  const seekSong = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (seekBg.current && audioRef.current) {
      const seekWidth = seekBg.current.clientWidth;
      const clickX = e.nativeEvent.offsetX;
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (clickX / seekWidth) * duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${urlPOST}/api/song/list`);
      if (response.data.success) {
        setSongsData(response.data.songs);
        setTrack(response.data.songs[0]);
      } else {
      }
    } catch (error) {}
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${urlPOST}/api/album/list`);
      if (response.data.success) {
        setAlbumsData(response.data.albums);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.ontimeupdate = () => {
        const current = audio.currentTime;
        const duration = audio.duration || 0;

        // Update seek bar width dynamically
        if (seekBar.current) {
          seekBar.current.style.width = `${Math.floor((current / duration) * 100)}%`;
        }

        setTime({
          currentTime: {
            second: Math.floor(current % 60),
            minute: Math.floor(current / 60),
          },
          totalTime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60),
          },
        });
      };
    }, 1000);

    return () => clearTimeout(timer);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
