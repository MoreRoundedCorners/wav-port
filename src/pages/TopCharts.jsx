import React from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayPause from "../components/PlayPause";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice"; //
import { SongCard } from "../components";

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="loading Top Songs..." />;

  if (error) return <Error title="error loading Top Songs..." />;

  return (
    <div className="flex flex-col animate-slideright">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
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
  );
};

export default TopCharts;
