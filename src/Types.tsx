import { RefObject } from "react";

export type Episode = {
    id: number;
    name: string;
    episode: string;
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