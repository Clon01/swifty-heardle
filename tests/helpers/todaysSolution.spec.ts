import {describe, it, vi} from "vitest";
import {expect} from "vitest";
import {Song} from "../../src/types/song";
import {todaysSolution} from "../../src/helpers";
import {solutionForDate} from "../../src/helpers/todaysSolution";

type daySolution = [number, Song]

const pseudoRandomSolutions: daySolution[] = [
    [0, {  "artist": "Taylor Swift",
        "name": "All Of The Girls You Loved Before",
        "youtubeId": "HO-31CVnLes",}],
    [10, {"artist": "Taylor Swift",
        "name": "Come In With The Rain (Taylor's Version)",
        "youtubeId": "ePjcjLRHPOo",}],
    [100, {"artist": "Taylor Swift",
        "name": "The Very First Night (Taylor's Version) (From The Vault)",
        "youtubeId": "rVuyi-dPMIc",}],
];

describe("todaySolution", () => {
    it.each(pseudoRandomSolutions)("should return the correct solution for a given date", (day, expectedSolution) => {
        // Mock Date to return the start date
        let mockDate = new Date('4/15/2022');
        mockDate.setDate(mockDate.getDate() + day);

        const solution: Song = solutionForDate(mockDate);

       expect(solution).toStrictEqual(expectedSolution);
    });
})