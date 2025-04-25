
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { Character, Episode, Episodes } from "./Types";

const staleTime = 0; //1000 * 60 * 5;

export async function fetchAllEpisodes(
    page: number = 1,
): Promise<{ episodes: Array<Episode>; nextPage: number | null }> {
    const response = await fetch(
        `https://rickandmortyapi.com/api/episode/?page=${page}`
    );
    const { results, info: { next } }: Episodes = await response.json();

    return {
        episodes: results,
        nextPage: next ? page + 1 : null
    }
}

export function useAllEpisodes() {
    return useInfiniteQuery({
        queryKey: ['episodes'],
        queryFn: (ctx) => fetchAllEpisodes(ctx.pageParam),
        getNextPageParam: (lastGroup) => lastGroup.nextPage,
        initialPageParam: 1,
        staleTime,
    })
}

export async function fetchEpisodes(
    ids: string[] = []
): Promise<Episode[]> {
    const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${ids}`
    );
    const ret = await response.json();
    return (
        ret?.length ? ret : [ret]
    );
}

export function useEpisodes(ids: string[]) {
    return useQuery({
        queryKey: ['episodes', ids],
        queryFn: () => fetchEpisodes(ids),
        staleTime,
        enabled: !!ids?.length
    });
}

export async function fetchCharacters(
    ids: string[] = []
): Promise<Character[]> {
    const response = await fetch(
        `https://rickandmortyapi.com/api/character/${ids}`
    );
    const ret = await response.json();
    return (
        ret?.length ? ret : [ret]
    );
}

export function useCharacters(ids: string[]) {
    return useQuery({
        queryKey: ['characters', ids],
        queryFn: () => fetchCharacters(ids),
        enabled: !!ids?.length,
        staleTime,
    });
}