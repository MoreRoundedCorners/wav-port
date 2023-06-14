import axios from "axios";

import {
  createPlaylistRequest,
  createPlaylistSuccess,
  createPlaylistFailure,
  deletePlaylistFailure,
  deletePlaylistSuccess,
  deletePlaylistRequest,
  deleteSongFromPlaylist,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  clearSongsToAdd,
  addSongToSongsToAdd,
  irisPlaylist,
} from "./playlistSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Async action creators
export const createPlaylist = (newPlaylist) => async (dispatch, getState) => {
  try {
    const {
      auth: { token, user },
    } = getState();

    newPlaylist.owner = user._id;

    // Ensure that newPlaylist.songs exists and it's an array
    if (!Array.isArray(newPlaylist.songs)) {
      newPlaylist.songs = [];
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `http://${process.env.REACT_APP_API_URL}/api/playlists`,
      newPlaylist,
      config
    );

    dispatch(createPlaylistSuccess(data));
    console.log("data from createPlaylist", data);
  } catch (error) {
    console.error(error);
  }
};

// create a thunk to create a custom playlist based off the answers from the modal
// export const createCustomPlaylist =
//   (newPlaylist) => async (dispatch, getState) => {
//     try {
//       const {
//         auth: { token, user },
//       } = getState();

//       newPlaylist.owner = user._id;

//       // process the responses
//       newPlaylist.songs = processResponses(newPlaylist.songs);
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       // ...

//       const { data } = await axios.post(
//         "http://localhost:5000/api/playlists",
//         newPlaylist,
//         config
//       );

//       dispatch(createPlaylistSuccess(data));
//       console.log("data from createPlaylist", data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

// create a thunk to delete a playlist
export const deletePlaylist = (playlistId) => async (dispatch, getState) => {
  try {
    dispatch(deletePlaylistRequest());

    const { auth } = getState();
    const token = auth.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      `http://localhost:5000/api/playlists/${playlistId}`,
      config
    );

    dispatch(deletePlaylistSuccess(playlistId));
    // After successfully deleting the playlist from the database:
    // dispatch(deletePlaylistFromStore(playlistId));
  } catch (error) {
    dispatch(deletePlaylistFailure(error.message));
  }
};

export const addSongToPlaylist =
  (playlistId, song) => async (dispatch, getState) => {
    try {
      await dispatch(addSongToSongsToAdd(song));

      if (playlistId) {
        dispatch(addSongRequest());

        const { auth } = getState();
        const token = auth.token;

        const response = await axios.post(
          `http://localhost:5000/api/playlists/${playlistId}/songs`,
          { song }, // <-- Wrap song in an object
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const addedSong = response.data; // <-- This should only be the added song
        console.log("addedSong", addedSong);

        dispatch(
          addSongSuccess({
            playlistId,
            song: addedSong,
          })
        );
      } else {
        alert("Please select a playlist");
      }
    } catch (error) {
      console.error(error);
    }
  };

export const createPlaylistWithSongs = createAsyncThunk(
  "playlists/createPlaylistWithSongs",
  async ({ title, description, user, songsToAdd }, { dispatch, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Create new playlist
      const playlistResponse = await axios.post(
        "http://localhost:5000/api/playlists",
        {
          title,
          description,
          user,
          songsToAdd, // Initialize the songs array with an empty array
        },
        config // Include the config object with the Authorization header
      );
      const newPlaylist = playlistResponse.data;

      // Assign the playlist's id to the newPlaylist object
      newPlaylist.id = newPlaylist._id;

      // Add songs to the playlist
      for (let song of songsToAdd) {
        const songParts = {
          title: song.title,
          artist: song.subtitle, // Assuming subtitle is the artist
          // add any other fields you need here
        };
        console.log("song parts from playlust action", songParts);
        const addSongResponse = await axios.post(
          `http://localhost:5000/api/playlists/${newPlaylist.id}/songs`,
          songParts,
          config // Include the config object with the Authorization header
        );
        const addedSong = addSongResponse.data;
        newPlaylist.songs.push(addedSong); // Push the added song to the songs array
      }

      // Clear songsToAdd
      dispatch(clearSongsToAdd());

      return newPlaylist; // Return the updated playlist
    } catch (error) {
      console.error(error);
    }
  }
);

export const addSongToPlaylistStart = (songData) => async (dispatch) => {
  try {
    // Dispatch an action to store the song data in the Redux store
    dispatch(addSongRequest(songData));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlaylists = () => async (dispatch, getState) => {
  const { auth } = getState();
  const token = auth.token;

  try {
    console.log("Fetching playlists, current state:", getState().playlists);

    const response = await axios.get(`http://localhost:5000/api/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = [...response.data, irisPlaylist];

    dispatch(fetchPlaylistsSuccess(responseData)); // use fetchPlaylistsSuccess here
  } catch (error) {
    console.error(error);
    dispatch(fetchPlaylistsFailure(error.message));
  }
};

// create action that deletes song from playlist
export const deleteSong = (playlistId, song) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      `http://localhost:5000/api/playlists/${playlistId}/songs/${song.key}`,
      config
    );

    dispatch(deleteSongFromPlaylist({ playlistId, song }));
  } catch (error) {
    console.error(error);
  }
};
