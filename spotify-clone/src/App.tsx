import { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import Login from "./pages/Login";
import { PlayerContext } from "./context/PlayerContext";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const { token } = useContext(AuthContext);
  return !token ? (
    <Login />
  ) : (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      <audio ref={audioRef} src={track ? track.file : ""} preload="auto" />
    </div>
  );
};

export default App;
