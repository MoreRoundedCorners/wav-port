import React, { useState } from "react";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useNavigate } from "react-router-dom";

const Discover = ({ modalIsOpen, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  const openModal = () => {
    setIsTestModalOpen(true);
    if (!user) {
      navigate("/login");
    }
  };

  const closeModal = () => {
    setIsTestModalOpen(false);
  };

  if (isFetching) return <Loader title={`loading ${genreListId}...`} />;
  if (error) return <Error title="error loading songs..." />;

  return (
    <section className="flex flex-col ">
      <div>
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <h2 className="font-bold text-3xl text-left text-white">
            Discover {genreListId || "POP"}
          </h2>
          <select
            onChange={(e) => {
              dispatch(selectGenreListId(e.target.value));
            }}
            value={genreListId || "pop"}
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
            name=""
            id=""
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
          {data?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discover;
