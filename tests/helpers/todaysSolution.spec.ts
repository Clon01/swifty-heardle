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
        "name": "coney island ft. The National",
        "youtubeId": "c_p_TBaHvos",}],
    [100, {"artist": "Taylor Swift",
        "name": "I Think He Knows",
        "youtubeId": "2d1wKn-oJnA",}],
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