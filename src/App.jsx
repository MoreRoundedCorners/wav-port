import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  Searchbar,
  Sidebar,
  MusicPlayer,
  TopPlay,
  SongCard,
} from "./components";
import {
  ArtistDetails,
  TopArtists,
  MyCollection,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";

import { Playlists } from "./pages/Playlists";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import useAuth from "./auth/useAuth";
import { useEffect } from "react";
import Playlist from "./components/Playlist";
import Contact from "./pages/Contact";
import FrontPage from "./pages/FrontPage";

// import PlaylistCard from "./components/PlaylistCard";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const { modalIsOpen } = useSelector((state) => state.modal);

  const { initializeAuth, user, logout, login, token } = useAuth();
  const location = useLocation();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className={`${modalIsOpen ? "blur-2xl" : "flex relative"}`}>
      {location.pathname !== "/" && <Sidebar onLogout={logout} />}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-black to-[#921286]">
        {location.pathname !== "/" && <Searchbar />}
        <div
          className={`${
            location.pathname === "/"
              ? ""
              : "px-6 h-[calc(100vh-72px)] overflow-y-scroll"
          } hide-scrollbar flex xl:flex-row flex-col-reverse`}
        >
          <div
            className={`${
              location.pathname === "/" ? "" : ""
            } flex-1 h-fit pb-40`}
          >
            <Routes>
              <Route path="/" element={<FrontPage user={user} />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route
                path="/playlists"
                element={<Playlists user={user} token={token} />}
              />
              <Route path="/MyCollection" element={<MyCollection />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route
                path="login"
                element={<Login user={user} login={login} />}
              />
              <Route path="register" element={<Register user={user} />} />
              <Route path="/discover" element={<Discover user={user} />} />
            </Routes>
          </div>

          {location.pathname !== "/" && (
            <div className="xl:sticky relative top-0 h-fit">
              <TopPlay />
            </div>
          )}
        </div>
      </div>

      {activeSong?.title && location.pathname !== "/" && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
