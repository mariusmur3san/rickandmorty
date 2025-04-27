export interface Episode {
    id: number;
    name: string;
    episode: string;
    air_date: string;
    characters: string[];
    url: string;
    created: string;
}

export interface Episodes {
    info: {
        pages: number;
        next: string;
    };
    results: Episode[];
}

export interface Character {
    id: number;
    name: string;
    image: string;
    episode: string[];
}

export interface SearchProps {
    onSearchHanlder: (text: string) => void;
}

export interface ScrollerProps {
    items: React.ReactElement[];
    estimateSize?: number;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => {};
}
