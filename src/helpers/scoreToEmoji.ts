import { GuessType } from "../types/guess";

export function scoreToEmoji(guesses: GuessType[]): string {
  const msInDay = 86400000;
  const startDate = new Date('4/15/2022');
  const todaysDate = new Date();
  const index = Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay) + 1 
  const emojis = {
    incorrect: "🟥",
    correct: "🟩",
    empty: "⬜",
    skip: "⬛️",
  };
  // const todaysDate = new Date();
  const prefix = `Taylor Swift Heardle - #${index} 🎧`;
  const url = `https://clon01.github.io/swifty-heardle/`;

  let scoreEmoji = "";

  guesses.forEach((guess: GuessType) => {
    if (guess.isCorrect === true) {
      scoreEmoji += emojis.correct;
    } else if (guess.skipped === true) {
      scoreEmoji += emojis.skip;
    } else if (guess.isCorrect === false) {
      scoreEmoji += emojis.incorrect;
    } else {
      scoreEmoji += emojis.empty;
    }
  });

  return `${prefix} \n${scoreEmoji} \n${url}`;
}
