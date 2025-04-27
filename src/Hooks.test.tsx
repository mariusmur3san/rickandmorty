import fetchMock from 'jest-fetch-mock';
import { fetchAllEpisodes, fetchEpisodes } from './Hooks'
import { Episode } from './Types'

const mockEpispode1: Episode = {
    "id": 1,
    "name": "Pilot",
    "air_date": "December 2, 2013",
    "episode": "S01E01",
    "characters": [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
        "https://rickandmortyapi.com/api/character/35",
        "https://rickandmortyapi.com/api/character/38",
        "https://rickandmortyapi.com/api/character/62",
        "https://rickandmortyapi.com/api/character/92",
        "https://rickandmortyapi.com/api/character/127",
        "https://rickandmortyapi.com/api/character/144",
        "https://rickandmortyapi.com/api/character/158",
        "https://rickandmortyapi.com/api/character/175",
        "https://rickandmortyapi.com/api/character/179",
        "https://rickandmortyapi.com/api/character/181",
        "https://rickandmortyapi.com/api/character/239",
        "https://rickandmortyapi.com/api/character/249",
        "https://rickandmortyapi.com/api/character/271",
        "https://rickandmortyapi.com/api/character/338",
        "https://rickandmortyapi.com/api/character/394",
        "https://rickandmortyapi.com/api/character/395",
        "https://rickandmortyapi.com/api/character/435"
    ],
    "url": "https://rickandmortyapi.com/api/episode/1",
    "created": "2017-11-10T12:56:33.798Z"
}

const mockEpispode2 = {
    "id": 2,
    "name": "Lawnmower Dog",
    "air_date": "December 9, 2013",
    "episode": "S01E02",
    "characters": [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
        "https://rickandmortyapi.com/api/character/38",
        "https://rickandmortyapi.com/api/character/46",
        "https://rickandmortyapi.com/api/character/63",
        "https://rickandmortyapi.com/api/character/80",
        "https://rickandmortyapi.com/api/character/175",
        "https://rickandmortyapi.com/api/character/221",
        "https://rickandmortyapi.com/api/character/239",
        "https://rickandmortyapi.com/api/character/246",
        "https://rickandmortyapi.com/api/character/304",
        "https://rickandmortyapi.com/api/character/305",
        "https://rickandmortyapi.com/api/character/306",
        "https://rickandmortyapi.com/api/character/329",
        "https://rickandmortyapi.com/api/character/338",
        "https://rickandmortyapi.com/api/character/396",
        "https://rickandmortyapi.com/api/character/397",
        "https://rickandmortyapi.com/api/character/398",
        "https://rickandmortyapi.com/api/character/405"
    ],
    "url": "https://rickandmortyapi.com/api/episode/2",
    "created": "2017-11-10T12:56:33.916Z"
}

const filteredEpisodes = {
    "info": {
        "count": 4,
        "pages": 1,
        "next": null,
        "prev": null
    },
    "results": [
        {
            "id": 1,
            "name": "Pilot",
            "air_date": "December 2, 2013",
            "episode": "S01E01",
            "characters": [
                "https://rickandmortyapi.com/api/character/1",
                "https://rickandmortyapi.com/api/character/2",
                "https://rickandmortyapi.com/api/character/35",
                "https://rickandmortyapi.com/api/character/38",
                "https://rickandmortyapi.com/api/character/62",
                "https://rickandmortyapi.com/api/character/92",
                "https://rickandmortyapi.com/api/character/127",
                "https://rickandmortyapi.com/api/character/144",
                "https://rickandmortyapi.com/api/character/158",
                "https://rickandmortyapi.com/api/character/175",
                "https://rickandmortyapi.com/api/character/179",
                "https://rickandmortyapi.com/api/character/181",
                "https://rickandmortyapi.com/api/character/239",
                "https://rickandmortyapi.com/api/character/249",
                "https://rickandmortyapi.com/api/character/271",
                "https://rickandmortyapi.com/api/character/338",
                "https://rickandmortyapi.com/api/character/394",
                "https://rickandmortyapi.com/api/character/395",
                "https://rickandmortyapi.com/api/character/435"
            ],
            "url": "https://rickandmortyapi.com/api/episode/1",
            "created": "2017-11-10T12:56:33.798Z"
        },
        {
            "id": 24,
            "name": "Pickle Rick",
            "air_date": "August 6, 2017",
            "episode": "S03E03",
            "characters": [
                "https://rickandmortyapi.com/api/character/1",
                "https://rickandmortyapi.com/api/character/2",
                "https://rickandmortyapi.com/api/character/3",
                "https://rickandmortyapi.com/api/character/4",
                "https://rickandmortyapi.com/api/character/9",
                "https://rickandmortyapi.com/api/character/70",
                "https://rickandmortyapi.com/api/character/107",
                "https://rickandmortyapi.com/api/character/167",
                "https://rickandmortyapi.com/api/character/171",
                "https://rickandmortyapi.com/api/character/189",
                "https://rickandmortyapi.com/api/character/240",
                "https://rickandmortyapi.com/api/character/265",
                "https://rickandmortyapi.com/api/character/272",
                "https://rickandmortyapi.com/api/character/276",
                "https://rickandmortyapi.com/api/character/329"
            ],
            "url": "https://rickandmortyapi.com/api/episode/24",
            "created": "2017-11-10T12:56:36.206Z"
        },
        {
            "id": 26,
            "name": "The Whirly Dirly Conspiracy",
            "air_date": "August 20, 2017",
            "episode": "S03E05",
            "characters": [
                "https://rickandmortyapi.com/api/character/1",
                "https://rickandmortyapi.com/api/character/2",
                "https://rickandmortyapi.com/api/character/3",
                "https://rickandmortyapi.com/api/character/4",
                "https://rickandmortyapi.com/api/character/5",
                "https://rickandmortyapi.com/api/character/23",
                "https://rickandmortyapi.com/api/character/47",
                "https://rickandmortyapi.com/api/character/115",
                "https://rickandmortyapi.com/api/character/137",
                "https://rickandmortyapi.com/api/character/142",
                "https://rickandmortyapi.com/api/character/180",
                "https://rickandmortyapi.com/api/character/204",
                "https://rickandmortyapi.com/api/character/296",
                "https://rickandmortyapi.com/api/character/297",
                "https://rickandmortyapi.com/api/character/319",
                "https://rickandmortyapi.com/api/character/320",
                "https://rickandmortyapi.com/api/character/365",
                "https://rickandmortyapi.com/api/character/369",
                "https://rickandmortyapi.com/api/character/467",
                "https://rickandmortyapi.com/api/character/468",
                "https://rickandmortyapi.com/api/character/469"
            ],
            "url": "https://rickandmortyapi.com/api/episode/26",
            "created": "2017-11-10T12:56:36.413Z"
        },
        {
            "id": 39,
            "name": "The Vat of Acid Episode",
            "air_date": "May 17, 2020",
            "episode": "S04E08",
            "characters": [
                "https://rickandmortyapi.com/api/character/1",
                "https://rickandmortyapi.com/api/character/2",
                "https://rickandmortyapi.com/api/character/4",
                "https://rickandmortyapi.com/api/character/3",
                "https://rickandmortyapi.com/api/character/5",
                "https://rickandmortyapi.com/api/character/240",
                "https://rickandmortyapi.com/api/character/180",
                "https://rickandmortyapi.com/api/character/648",
                "https://rickandmortyapi.com/api/character/649",
                "https://rickandmortyapi.com/api/character/650",
                "https://rickandmortyapi.com/api/character/651",
                "https://rickandmortyapi.com/api/character/652",
                "https://rickandmortyapi.com/api/character/653",
                "https://rickandmortyapi.com/api/character/654",
                "https://rickandmortyapi.com/api/character/655",
                "https://rickandmortyapi.com/api/character/656",
                "https://rickandmortyapi.com/api/character/657",
                "https://rickandmortyapi.com/api/character/658",
                "https://rickandmortyapi.com/api/character/659",
                "https://rickandmortyapi.com/api/character/660",
                "https://rickandmortyapi.com/api/character/661"
            ],
            "url": "https://rickandmortyapi.com/api/episode/39",
            "created": "2020-08-06T05:51:07.419Z"
        }
    ]
}

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('Hooks', () => {
    describe('fetchEpisodes', () => {
        test('it fetches one episode', async () => {
            fetchMock.mockResponseOnce(JSON.stringify([mockEpispode1]));
            const result = await fetchEpisodes(['1']);
            expect(result).toEqual([mockEpispode1]);
        });

        test('it fetches multiple episodes', async () => {
            fetchMock.mockResponseOnce(JSON.stringify([mockEpispode1, mockEpispode2]));

            const result = await fetchEpisodes(['1']);
            expect(result).toEqual([mockEpispode1, mockEpispode2]);
        });
    });
    describe('fetchAllEpisodes', () => {
        test('filtered upon "Pi" serach value', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(filteredEpisodes));
            const result = await fetchAllEpisodes('Pi', 1);
            expect(result).toEqual({
                episodes: filteredEpisodes.results,
                nextPage: null
            })
        })
    })
})
