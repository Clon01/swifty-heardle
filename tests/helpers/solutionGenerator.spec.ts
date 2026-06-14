import {describe, it, vi} from "vitest";
import {writeFile} from "fs/promises"
import * as constants from "../../src/constants/songs";
import {Song} from "../../src/types/song";
import {expect} from "vitest";

import {legacySolutionGenerator, solutionShuffle, solutionStore} from "../../src/helpers/solutionGenerator";

const songs: Song[] = [

    {
        "artist": "Taylor Swift",
        "name": "Tim McGraw",
        "youtubeId": "GkD20ajVxnY"
    },
    {
        "artist": "Taylor Swift",
        "name": "Picture To Burn",
        "youtubeId": "yCMqcFAigRg"
    },
    {
        "artist": "Taylor Swift",
        "name": "Teardrops On My Guitar",
        "youtubeId": "xKCek6_dB0M"
    },
    {
        "artist": "Taylor Swift",
        "name": "Should've Said No",
        "youtubeId": "v9bxXO9fj98"
    },
    {
        "artist": "Taylor Swift",
        "name": "Our Song",
        "youtubeId": "Jb2stN7kH28"
    }
];
const indexedSongs = {

    '1501': {
        "artist":
            "Taylor Swift",
        "name":
            "Tim McGraw",
        "youtubeId":
            "GkD20ajVxnY"
    }
    ,
    '1502': {
        "artist":
            "Taylor Swift",
        "name":
            "Picture To Burn",
        "youtubeId":
            "yCMqcFAigRg"
    }
    ,
    '1503': {
        "artist":
            "Taylor Swift",
        "name":
            "Teardrops On My Guitar",
        "youtubeId":
            "xKCek6_dB0M"
    }
    ,
    '1504': {
        "artist":
            "Taylor Swift",
        "name":
            "Should've Said No",
        "youtubeId":
            "v9bxXO9fj98"
    }
    ,
    '1505': {
        "artist":
            "Taylor Swift",
        "name":
            "Our Song",
        "youtubeId":
            "Jb2stN7kH28"
    }
};

vi.mock("fs/promises");
vi.spyOn(constants, 'songs', 'get').mockReturnValue(songs);

describe("solutionStore", () => {
    it("should create a json file with indexed songs", () => {
        vi.mocked(writeFile).mockResolvedValue(undefined);
        const startDay = 1500;
        solutionStore(startDay, songs);

        expect(writeFile).toHaveBeenCalledWith(
            expect.stringContaining("1523-1763.json"),
            expect.stringContaining(JSON.stringify(indexedSongs))
        );
    })
})

describe("solutionRandomizer", () => {
        it("should return all the original items", () => {
            const shuffled = solutionShuffle()
            expect(shuffled).toHaveLength(songs.length);
            expect(shuffled.sort()).toEqual(songs.sort());
        })
        it("Should return different order in multiple shuffles", () => {
            const orderings = new Set<string>()
            for (let i = 0; i < 5; i++) {
                const shuffled = solutionShuffle()
                orderings.add(JSON.stringify(shuffled))
            }
            expect(orderings.size).toBeGreaterThan(1);
        })
        it("Shoudl distibute songs evenly", () => {
            const positions: Record<string, Record<number, number>> = {
                "Tim McGraw" : {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
                "Picture To Burn" : {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
                "Teardrops On My Guitar" : {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
                "Should've Said No" : {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
                "Our Song" : {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
            }
            const iterations = 1000;
            for(let i = 0; i < iterations; i++) {
                const shuffled = solutionShuffle();
                shuffled.forEach((song, index) => {
                    positions[song.name][index]++;
                });
            }

            Object.values(positions).forEach(songPositions => {
                Object.values(songPositions).forEach(count => {
                    expect(count).toBeGreaterThan(160);
                    expect(count).toBeLessThan(240);
                });
            });
        })
});
