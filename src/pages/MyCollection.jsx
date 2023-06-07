import React from "react";
import { useSelector } from "react-redux";
import { SongCard } from "../components";
import songsArr from "../components/utils/songsArr";

const AroundYou = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return (
    <div className="">
      <h1 className="font-bold text-3xl text-left text-white my-6">
        My Collection
      </h1>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songsArr.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            i={index}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songsArr}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
