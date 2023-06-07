import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { useDispatch, useSelector } from "react-redux";
import { SongCard } from "../components";
import {
  addSongToPlaylist,
  fetchPlaylists,
  deleteSong,
} from "../redux/features/playlist/playlistAction";
import { useNavigate } from "react-router-dom";

export const Playlists = ({ user, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeSong } = useSelector((state) => state.player.activeSong);
  const { playlists } = useSelector((state) => state.playlists); // get playlists from redux store

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  console.log("playlists from playlists.jsx: ", playlists);

  useEffect(() => {
    if (
      selectedPlaylist &&
      !playlists.find((pl) => pl._id === selectedPlaylist._id)
    ) {
      setSelectedPlaylist(null);
    }
  }, [playlists, selectedPlaylist]);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    console.log("playlist from handlePlaylistClick: ", playlist);
    if (selectedPlaylist?._id === playlist._id) {
      setSelectedPlaylist(null);
    }
  };

  const handleDeleteSong = (playlistId, song) => {
    dispatch(deleteSong(playlistId, song));
  };

  return (
    <div className="text-white">
      {user ? (
        <>
          <header className="text-center">
            <p className="text-3xl pb-6">{user.name}'s playlists</p>
          </header>
          <div className="flex flex-row flex-wrap justify-center gap-8">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                handlePlaylistClick={handlePlaylistClick}
                selectedPlaylist={selectedPlaylist}
                setSelectedPlaylist={setSelectedPlaylist}
                activeSong={activeSong} // Pass the activeSong prop
              />
            ))}

            {selectedPlaylist && selectedPlaylist.songs && (
              <div>
                <h2 className="text-xl text-center p-2 mb-2">
                  Songs from {selectedPlaylist.title}
                </h2>
                <p>{selectedPlaylist.description}</p>
                <div className="flex flex-wrap justify-center bg-gradient-to-t from-transparent to-[#523286]  rounded-md animate-slowfade py-6 ">
                  {selectedPlaylist.songs.map((song, index) =>
                    song ? (
                      <div className="p-4">
                        <SongCard
                          playlistName={selectedPlaylist.title}
                          song={song}
                          deleteSong={() => {
                            handleDeleteSong(selectedPlaylist._id, song);
                            navigate("/discover");
                          }}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="mt-60 text-3xl animate-slideright">Log in to View</h1>
        </div>
      )}
    </div>
  );
};
