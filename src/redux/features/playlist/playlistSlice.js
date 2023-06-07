import { createSlice } from "@reduxjs/toolkit";
import songsArr from "../../../components/utils/songsArr";

export const irisPlaylist = {
  _id: "iris",
  title: "Iris",
  images: ["/public/myMusic/cover/cover2.jpg"],
  songs: songsArr,
  isEditable: false,
};

const initialState = {
  playlists: [irisPlaylist],
  loading: false,
  error: null,
  songsToAdd: [],
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    createPlaylistRequest: (state) => {
      state.loading = true;
    },
    createPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.playlists.push(action.payload);
    },
    addSongRequest: (state, action) => {
      // This reducer should store the song data in the Redux state
      state.firstSong = action.payload;
      state.songsToAdd.push(action.payload);
    },

    // makePlaylist: (state, action) => {
    //   const newPlaylist = action.payload;
    //   newPlaylist.owner = state.auth.user.id;
    //   state.playlists.push(newPlaylist);
    // },
    createPlaylistFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // addSongRequest: (state) => {
    //   state.loading = true;
    // },
    addSongSuccess: (state, action) => {
      state.loading = false;
      // Find the corresponding playlist and add the song
      const playlist = state.playlists.find(
        (playlist) => playlist._id === action.payload.playlistId
      );
      if (playlist) {
        playlist.songs.push(action.payload.song);
      }
    },

    addSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchPlaylistsRequest: (state) => {
      state.loading = true;
    },
    fetchPlaylistsSuccess: (state, action) => {
      state.loading = false;
      state.playlists = action.payload;
    },
    fetchPlaylistsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSongToSongsToAdd: (state, action) => {
      state.songsToAdd.push(action.payload);
    },
    clearSongsToAdd: (state) => {
      state.songsToAdd = [];
    },
    deletePlaylistRequest: (state) => {
      state.loading = true;
    },
    deletePlaylistSuccess: (state, action) => {
      state.loading = false;
      const playlistId = action.payload;
      state.playlists = state.playlists.filter(
        (playlist) => playlist._id !== playlistId
      );
    },

    deletePlaylistFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // create a reducer to delete song from playlist
    deleteSongFromPlaylist: (state, action) => {
      const { playlistId, song } = action.payload;
      console.log("action payload from playlist slice: ", action.payload);

      const playlistIndex = state.playlists.findIndex(
        (playlist) => playlist._id === playlistId
      );

      if (playlistIndex !== -1) {
        state.playlists[playlistIndex].songs = state.playlists[
          playlistIndex
        ].songs.filter((s) => s.key !== song.key);
      }
    },
  },
});

export const {
  addSongToSongsToAdd,
  clearSongsToAdd,
  createPlaylistRequest,
  createPlaylistSuccess,
  createPlaylistFailure,
  deleteSongFromPlaylist,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  deletePlaylistRequest,
  deletePlaylistSuccess,
  deletePlaylistFailure,
} = playlistsSlice.actions;
export default playlistsSlice.reducer;
