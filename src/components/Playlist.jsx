import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../redux/features/playlist/playlistAction";
import { useLocation, useNavigate } from "react-router-dom";
import { createPlaylistWithSongs } from "../redux/features/playlist/playlistAction";

function Playlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.auth.user);
  const songsToAdd = useSelector((state) => state.playlists.songsToAdd);
  const selectedSong = useSelector((state) => state.songs.selectedSong);

  useEffect(() => {
    if (songsToAdd.length > 0) {
      setTitle(songsToAdd[0].title + " Playlist");
      console.log("songsToAdd from playlist jsx: ", songsToAdd);
    }
  }, [songsToAdd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let songsToAddToPlaylist = songsToAdd;
    if (selectedSong) {
      songsToAddToPlaylist = [...songsToAddToPlaylist, selectedSong];
    }
    dispatch(
      createPlaylistWithSongs({
        title,
        description,
        songsToAdd: songsToAddToPlaylist,
        user: user._id,
      })
    );
    navigate("/playlists");
  };

  return (
    <div className="">
      <h1>Create a Playlist</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={songsToAdd.length === 0}>
          Create Playlist
        </button>
      </form>
    </div>
  );
}

export default Playlist;
