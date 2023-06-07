import { useParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

export const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const [activeSong, isPlaying] = useSelector((state) => [
    state.player.activeSong,
    state.player.isPlaying,
  ]);

  const {
    data: songData,
    isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });

  console.log("songId from songDeatils: ", songid);
  console.log("songData from songDeatils: ", songData);
  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10 ">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5 ">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-white text-lg">
                {line}
              </p>
            ))
          ) : (
            <p className="text-white text-lg">
              Sorry, we don't have the lyrics for this song yet.
            </p>
          )}
        </div>
      </div>
      <RelatedSongs />
    </div>
  );
};

export default SongDetails;
