import React from "react";

import { Song } from "../../types/song";
import { GuessType } from "../../types/guess";

import { YouTube } from "../YouTube";

import * as Styled from "./index.styled";
import { ResultFooter } from "../ResultFooter";

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

  const textForTry = ["Wow!", "Super!", "Congrats!", "Nice!"];

  const isMobile = typeof screen.orientation !== 'undefined';

  if (didGuess) {

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
        <ResultFooter didGuess={didGuess} guesses={guesses}/>
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
        <ResultFooter didGuess={didGuess} guesses={guesses}/>
      </>
    );
  }
}
