import { songs } from "../constants";
import { Song } from "../types/song";

// const epochMs = new Date(2022, 3, 10).valueOf();
// const now = Date.now();
// const index = Math.floor((now - epochMs) / msInDay);

const msInDay = 86400000;
const startDate = new Date('4/15/2022');
const todaysDate = new Date();
const index = Math.floor(Math.abs(Math.sin(Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay))*(10**3)));


export const todaysSolution = songs[index % songs.length];


export function solutionForDate(date: Date): Song {
    const index = Math.floor(Math.abs(Math.sin(Math.floor((date.getTime() - startDate.getTime()) / msInDay)) * (10 ** 3)));
    return songs[index % songs.length];
}