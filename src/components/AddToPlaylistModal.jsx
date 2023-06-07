import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addSongToPlaylist,
  createPlaylist,
} from "../redux/features/playlist/playlistAction";

function AddToPlaylistModal({ isOpen, toggleModal, song }) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");

  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.playlists);

  const addToPlaylist = (playlistId) => {
    dispatch(addSongToPlaylist(playlistId, song));
    toggleModal();
  };

  const createNewPlaylist = () => {
    const newPlaylist = {
      title: newPlaylistName || "New Playlist",
      description: newPlaylistDescription,
      songs: [song],
    };
    dispatch(createPlaylist(newPlaylist));
    toggleModal();
  };

  if (!isOpen) return <></>;

  return (
    <div className="modal">
      <div className="modal-content ">
        <h2>Add Song to Playlist</h2>
        <input
          type="text"
          placeholder="New Playlist Name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Playlist Description"
          value={newPlaylistDescription}
          onChange={(e) => setNewPlaylistDescription(e.target.value)}
        />
        <button onClick={createNewPlaylist}>Create New Playlist</button>
        <h3>Existing Playlists</h3>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {playlist.title}
              <button onClick={() => addToPlaylist(playlist.id)}>
                Add to Playlist
              </button>
            </li>
          ))}
        </ul>
        <button onClick={toggleModal}>Close</button>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;
