/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);

  // Determine the source of the audio.
  let src;
  if (activeSong?.path) {
    // If the activeSong has a path property, it's a local file.
    src = activeSong.path;
  } else if (activeSong?.hub?.actions[1]?.uri) {
    // Otherwise, it's a song from the API.
    src = activeSong?.hub?.actions[1]?.uri;
  }

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={src}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
