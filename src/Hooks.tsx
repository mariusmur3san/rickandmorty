import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type { Character, Episode, Episodes } from './Types';

const staleTime = 1000 * 60 * 5;

export async function fetchAllEpisodes(
    name: string,
    page = 1
): Promise<{ episodes: Array<Episode>; nextPage: number | null }> {
    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/episode/?page=${page}&name=${name}`
        );

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const {
            results,
            info: { next },
        }: Episodes = await response.json();

        return {
            episodes: results,
            nextPage: next ? page + 1 : null,
        };
    } catch (e) {
        console.error(e);

        return { episodes: [], nextPage: null };
    }
}

export function useAllEpisodes(name: string) {
    return useInfiniteQuery({
        queryKey: ['episodes', name],
        queryFn: (ctx) => fetchAllEpisodes(name, ctx.pageParam),
        getNextPageParam: (lastGroup) => lastGroup.nextPage,
        initialPageParam: 1,
        staleTime,
    });
}

export async function fetchEpisodes(ids: string[] = []): Promise<Episode[]> {
    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/episode/${ids}`
        );

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const ret = await response.json();

        return ret?.length ? ret : [ret];
    } catch (e) {
        console.error(e);

        return [];
    }
}

export function useEpisodes(ids: string[]) {
    return useQuery({
        queryKey: ['episodes', ids],
        queryFn: () => fetchEpisodes(ids),
        staleTime,
        enabled: !!ids.length,
    });
}

export async function fetchCharacters(
    ids: string[] = []
): Promise<Character[]> {
    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/${ids}`
        );

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const ret = await response.json();

        return ret?.length ? ret : [ret];
    } catch (e) {
        console.error(e);

        return [];
    }
}

export function useCharacters(ids: string[]) {
    return useQuery({
        queryKey: ['characters', ids],
        queryFn: () => fetchCharacters(ids),
        enabled: !!ids.length,
        staleTime,
    });
}

export async function fetchImage(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (e) {
        console.error(e);
        return '';
    }
}

export function useImage(url: string) {
    return useQuery({
        queryKey: ['img', url],
        queryFn: () => fetchImage(url),
        staleTime,
    });
}
