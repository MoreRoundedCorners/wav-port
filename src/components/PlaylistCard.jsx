import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deletePlaylist } from "../redux/features/playlist/playlistAction";
import { FaTrash } from "react-icons/fa";

const PlaylistCard = ({
  playlist,
  handlePlaylistClick,
  selectedPlaylist,
  setSelectedPlaylist,
}) => {
  const dispatch = useDispatch();
  const { activeSong } = useSelector((state) => state.player);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDeletePlaylist = (playlistId) => {
    dispatch(deletePlaylist(playlistId));
    setSelectedPlaylist(null);
    // navigate back to discover page once user deletes playlist
    // navigate("/discover");
    console.log("playlist deleted: ", playlistId);
  };

  return (
    playlist && (
      <div
        className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer h-[325px] transition-transform duration-500 ease-out hover:scale-105"
        onClick={() => handlePlaylistClick(playlist)} // Add onClick event here
      >
        <div className="relative w-full h-56">
          {playlist._id === "iris" ? (
            <img
              alt="playlist_img"
              src={playlist.images[0]}
              className="h-full w-full object-cover"
            />
          ) : (
            <img alt="playlist_img" src={playlist.songs[0]?.images?.coverart} />
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate text-center">
            {playlist.title}
          </p>
          <p className="text-sm truncate text-gray-300 mt-1">
            {playlist.description}
          </p>
          {user && playlist.title !== "Iris" && (
            <button
              onClick={() => handleDeletePlaylist(playlist._id)}
              className="flex items-center justify-center mt-2 text-white bg-red-600 hover:bg-red-700 w-10 rounded-lg px-2 py-1"
            >
              <FaTrash />
            </button>
          )}
        </div>

        {/* create a button that deletes playlist */}
      </div>
    )
  );
};

export default PlaylistCard;
