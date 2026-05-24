import { writeFile} from "fs/promises";
import { songs } from "../constants";
import { legacySongs} from "../constants/songs/legacy_songs";
import {Song} from "../types/song";
import {solutionForDay} from "./todaysSolution";

export const solutionStore = (startDay:number, songs: Song[]) => {
    const songsWithId = songs.reduce((acc, song, index) => {
        acc[String(index + startDay + 1)] = song
        return acc;
    }, {} as Record<string,Song>)
    writeFile("solutions.json", JSON.stringify(songsWithId))
        .then(() => { console.log("Solutions saved to file.")})
        .catch((err) => {console.error(err.message)});
}

export const solutionShuffle = () => songs.sort(() => Math.random() - 0.5);

export const solutionGenerator = () => {
    const startDay = 1501;
    solutionStore(startDay, solutionShuffle());
}

export const legacySolutionGenerator = () => {
    let legacySolutions: Song[] = [];
    for (let i = 1449; i <= 1501; i++) {
        legacySolutions.push(solutionForDay(i, songs));
    }
    solutionStore(1448, legacySolutions);
}

export const superLegacySolutionGenerator = () => {
    let legacySolutions: Song[] = [];
    for (let i = 1; i <= 1448; i++) {
        legacySolutions.push(solutionForDay(i, legacySongs));
    }
    solutionStore(0, legacySolutions);
}