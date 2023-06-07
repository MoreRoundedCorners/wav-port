import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle
      onClick={handlePause}
      size={35}
      className="text-gray-300 text-4xl cursor-pointer"
    />
  ) : (
    <FaPlayCircle
      size={35}
      onClick={handlePlay}
      className="text-gray-300 text-4xl cursor-pointer"
    />
  );

export default PlayPause;
