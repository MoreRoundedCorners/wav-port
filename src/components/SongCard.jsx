import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PlayPause from "./PlayPause";
import { genres, links, buttons } from "../assets/constants";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useState } from "react";
import {
  addSongToPlaylist,
  createPlaylist,
  deleteSong,
} from "../redux/features/playlist/playlistAction";
import ReactModal from "react-modal";
import PlaylistCard from "./PlaylistCard";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { closeModal, openModal } from "../redux/features/modal/modalSlice";

const SongCard = ({
  song,
  isPlaying,
  activeSong,
  deleteSong,
  i,
  data,
  playlistName,
}) => {
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const { playlists } = useSelector((state) => state.playlists);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Add selectedPlaylist state

  // Default values for local songs
  let coverArt = song.path;
  let title = song.title;
  let subtitle = song.artist;
  let songKey = song.id;

  // Check if song data is from Shazam API and not local
  if ("images" in song) {
    coverArt = song.images.coverart;
    title = song.title;
    subtitle = song.subtitle;
    songKey = song.key;
  }

  const openTheModal = () => {
    setModalIsOpen(true);
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    dispatch(closeModal());
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    let songData;

    // Check if song data is from Shazam API and not local
    if ("images" in song) {
      songData = song;
    } else {
      songData = {
        hub: {
          actions: [{}, { uri: song.path }],
        },
        images: {
          coverart: song.cover, // assuming song.cover holds the image path for local files
        },
        title: song.title,
        subtitle: song.artist,
      };
    }

    dispatch(setActiveSong({ song: songData, data, i }));
    dispatch(playPause(true));
  };

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // const handleAddSongToPlaylist = async () => {
  //   if (selectedPlaylist) {
  //     await dispatch(
  //       addSongToPlaylist({
  //         playlistId: selectedPlaylist._id,
  //         song: song?.id, // Use the 'song' object as the payload
  //       })
  //     );
  //     handleCloseModal();
  //     navigate("/playlists");
  //   } else {
  //     alert("Please select a playlist");
  //   }
  // };

  const handleCreatePlaylist = async () => {
    if (newPlaylistTitle) {
      const newPlaylist = {
        title: newPlaylistTitle,
        songs: [song],
      };
      await dispatch(createPlaylist(newPlaylist));
      handleCloseModal();
      navigate("/playlists");
    } else {
      alert("Please enter a title for the new playlist");
    }
  };

  // const handleDeleteSong = () => {
  //   dispatch(deleteSong(selectedPlaylist?._id, song._id));
  // };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer transition-transform duration-500 ease-out hover:scale-105">
      {/* ... rest of your existing code ... */}
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        {song.cover ? (
          <img
            alt="song_img"
            src={song.cover}
            className="w-full h-full object-cover"
          />
        ) : (
          <img alt="song_img" src={song.images?.coverart} />
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamId}`
                : "/top-artists"
            }
          >
            {song.subtitle || song.artist}
          </Link>
        </p>
        <div className="flex justify-between pt-4">
          {deleteSong &&
            playlistName !== "Iris" &&
            buttons
              .filter((button) => button.name === "trash")
              .map((button) => {
                const ButtonIcon = button.icon;
                return (
                  <button
                    key={button.name}
                    className="bg-black text-white rounded-md py-1 px-2 flex items-center transition animate-slideleft hover:bg-pink-700"
                    onClick={() => deleteSong(song)}
                  >
                    <ButtonIcon className="" />
                  </button>
                );
              })}
          {buttons
            .filter((button) => button.name === "add")
            .map((button) => {
              const ButtonIcon = button.icon;
              return (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  key={button.name}
                  className="bg-black text-white rounded-md py-1 px-2 flex items-center ml-auto transition animate-slideleft hover:bg-pink-400 hover:delay-100"
                  onClick={() => {
                    openTheModal();
                    modalIsOpen(true);
                  }}
                >
                  <ButtonIcon className="object-cover" />
                </motion.button>
              );
            })}
        </div>

        {/* {deleteSong && (
          <button onClick={deleteSong} className="">
            <FaTrash />
          </button>
        )} */}

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Add to Playlist"
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
            content: {
              color: "lightsteelblue",
              width: "50%",
              height: "50%",
              margin: "auto",
            },
          }}
        >
          <h2>Add to Playlist</h2>

          <div className="flex items-center">
            <input
              type="text"
              className="mr-2 p-1 border border-gray-300 rounded"
              placeholder="New Playlist Title"
              value={newPlaylistTitle}
              onChange={(e) => setNewPlaylistTitle(e.target.value)}
            />
            <button
              className="bg-pink-600 text-white px-2 py-1 rounded"
              onClick={handleCreatePlaylist}
            >
              Create Playlist
            </button>
          </div>

          <div>
            <h2 className="py-1">Select an existing playlist:</h2>
            {playlists
              .filter((playlist) => {
                return playlist.title !== "Iris";
              })
              .map((playlist) => (
                <div
                  key={playlist._id}
                  className={`bg-white/10 bg-opacity-60  px-2 py-1 rounded-full mr-2 mb-2 text-sm font-semibold cursor-pointer ${
                    selectedPlaylist?._id === playlist._id &&
                    " !important text-pink-600 "
                  }`}
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  {playlist.title}
                </div>
              ))}
          </div>

          <button
            className="bg-pink-600 text-white px-2 py-1 rounded"
            onClick={() => {
              if (selectedPlaylist) {
                dispatch(addSongToPlaylist(selectedPlaylist._id, song));
                console.log("selectedPlaylist onClick: ", selectedPlaylist);
                handleCloseModal();
                navigate("/playlists");
              } else {
                alert("Please select a playlist");
              }
            }}
          >
            Add To Playlist
          </button>

          <button onClick={handleCloseModal} className="pl-2 text-gray-500">
            Close Modal
          </button>
        </ReactModal>
      </div>
    </div>
  );
};

export default SongCard;
