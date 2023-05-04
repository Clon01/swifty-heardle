import React from "react";

import { Song } from "../../types/song";
import { GuessType } from "../../types/guess";
import { scoreToEmoji } from "../../helpers";
import { RWebShare } from "react-web-share";
import { IoShareSocialOutline } from "react-icons/io5";

import { Button } from "../Button";
import { YouTube } from "../YouTube";

import * as Styled from "./index.styled";

interface Props {
  didGuess: boolean;
  currentTry: number;
  todaysSolution: Song;
  guesses: GuessType[];
}

export function Result({
  didGuess,
  todaysSolution,
  guesses,
  currentTry,
}: Props) {
  const hoursToNextDay = Math.floor(
    (new Date(new Date().setHours(24, 0, 0, 0)).getTime() -
      new Date().getTime()) /
      1000 /
      60 /
      60
  );

  const textForTry = ["Wow!", "Super!", "Congrats!", "Nice!"];

  const isMobile = typeof screen.orientation === 'undefined'

  if (didGuess) {
    const copyResult = React.useCallback(() => {
      navigator.clipboard.writeText(scoreToEmoji(guesses));
    }, [guesses]);

    return (
      <>
        <Styled.ResultTitle>{textForTry[currentTry - 1]}</Styled.ResultTitle>
        <Styled.SongTitle>
          Todays song is {todaysSolution.artist} - {todaysSolution.name}
        </Styled.SongTitle>
        <Styled.Tries>
          You guessed it in {currentTry} {currentTry === 1 ? "try" : "tries"}
        </Styled.Tries>
        <YouTube id={todaysSolution.youtubeId} />
        {!isMobile && (
          <Button onClick={copyResult} variant="green">
            Copy results
          </Button>
        )}
        {isMobile && (
          <RWebShare
            data={{
              text: scoreToEmoji(guesses),
              url: "https://swifty-heardle.glitch.me",
              title: "Taylor Swift Heardle",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button variant="green">
              Share <IoShareSocialOutline />
            </Button>
          </RWebShare>
        )}
        <Styled.TimeToNext>
          Remember to come back in {hoursToNextDay} hours!
        </Styled.TimeToNext>
      </>
    );
  } else {
    return (
      <>
        <Styled.ResultTitle>Unfortunately, thats wrong</Styled.ResultTitle>
        <Styled.SongTitle>
          Todays song is {todaysSolution.artist} - {todaysSolution.name}
        </Styled.SongTitle>
        <YouTube id={todaysSolution.youtubeId} />
        <Styled.TimeToNext>
          Try again in {hoursToNextDay} hours
        </Styled.TimeToNext>
      </>
    );
  }
}
