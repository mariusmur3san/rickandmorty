export type Episode = {
    id: number;
    name: string;
    air_date: string;
    characters: string[];
}

export type Episodes = {
    info: {
        pages: number;
        next: string;
    };
    results: Episode[];
}

export type Character = {
    id: number;
    name: string;
    image: string;
    episode: string[];
}