import React from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayPause from "../components/PlayPause";
import { Link, useNavigate } from "react-router-dom";

const TopArtists = (
  handlePlayPause,
  activeSong,
  song,
  handlePlayClick,
  handlePauseClick,
  isPlaying
) => {
  const navigate = useNavigate();
  const { data } = useGetTopChartsQuery();
  console.log("data from TopCharts.jsx: ", data);
  return (
    <div className="flex flex-col animate-slideright">
      {/* only show the first 10 songs from data, each song should be ranked from 1 to 10, the song data should be rendered using the Songcard.jsx component */}
      <header>
        <p className="text-white text-3xl mb-10">Top Artists</p>
      </header>
      {data?.slice(0, 10).map((song, i) => (
        <div
          className="flex flex-row items-center p-2 cursor-pointer"
          onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
        >
          <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
          <div className="flex flex-row justify-between items-center">
            <img
              className="w-20 h-20 rounded-lg"
              src={song?.images?.background}
              alt={song?.title}
            />
            <p className="text-white pl-6">{song.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopArtists;
