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

export function ResultFooter({
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
  const comebackText = "Remember to come back in {hoursToNextDay} hours!"
  if (didGuess) {
  
  }

  if (didGuess) {
    const copyResult = React.useCallback(() => {
      navigator.clipboard.writeText(scoreToEmoji(guesses));
    }, [guesses]);

    return (
      <>
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
  }
}
