import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import playerReducer from "./features/playerSlice";
import { shazamCoreApi } from "./services/shazamCore";
import playlistReducer from "./features/playlist/playlistSlice";
import modalSlice from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    auth: authReducer,
    playlists: playlistReducer,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
