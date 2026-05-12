import React from "react";
import YouTube, {YouTubeEvent} from "react-youtube";
import { IoPlay } from "react-icons/io5";
import { event } from "react-ga";

import { playTimes } from "../../constants";

import * as Styled from "./index.styled";


export function Adcheck() {
  const opts = {
    width: "0",
    height: "0",
  };

  const id = "wzLhAZn_JMk";

  // react-youtube doesn't export types for this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = React.useRef<any>(null);

  const currentPlayTime = 30000;

  const [play, setPlay] = React.useState<boolean>(false);

  const [currentTime, setCurrentTime] = React.useState<number>(0);

  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    setInterval(() => {
      playerRef.current?.internalPlayer
        .getCurrentTime()
        .then((time: number) => {
          setCurrentTime(time);
        });
    }, 250);
  }, []);

  React.useEffect(() => {
    if (play) {
      console.log("id:", playerRef.current.internalPlayer.getVideoEmbedCode());
      if (currentTime * 1000 >= currentPlayTime) {
        playerRef.current?.internalPlayer.pauseVideo();
        setPlay(false);
      } else {
        console.log("currentTime:", currentTime);
      }
    }
  }, [play, currentTime]);

  // don't call play video each time currentTime changes
  const togglePlayback = React.useCallback(() => {
    if (play) {
      setPlay(false);
    } else {
      playerRef.current?.internalPlayer.playVideo();
      setPlay(true);
      event({
        category: "AddCheck",
        action: "Play Taylor's message",
      });
    }
  }, []);

  const setReady = React.useCallback(async (event: YouTubeEvent) => {
    const videoId = await playerRef.current.internalPlayer.getVideoEmbedCode()
    console.log("setReady", videoId.toString().includes(id));
    setIsReady(true);
  }, []);

  return (
    <>
        <h4>Add check!</h4>
      <YouTube opts={opts} videoId={id} onReady={setReady} ref={playerRef} />
      {isReady ? (
        <>
          <IoPlay
            style={{ cursor: "pointer" }}
            size={40}
            color="#fff"
            onClick={togglePlayback}
          />
        </>
      ) : (
        <p>Loading player...</p>
      )}
    </>
  );
}
