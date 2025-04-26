import React, { useState } from 'react'
import { useParams } from "react-router";
import './App.css'
import { useCharacters, useEpisodes } from './Hooks';
import LinkItem from './LinkItem';
import CharacterCard from './CharacterCard';
import Scroller from './Scroller';

export default function Episode() {
    const { id } = useParams();
    const { data: episodes } = useEpisodes([id!]);
    const charactersIds = episodes?.flatMap(episode => episode.characters.map(c => c.split('/').reverse()[0]));
    const {
        isLoading, data: characters, error, isFetching, status
    } = useCharacters(charactersIds || []);

    if (characters) {
        const caracterComponents = characters.map(character => {
            const { id, name, image } = character;
            return (
                <LinkItem key={id} route={`/character/${id}`}>
                    <CharacterCard id={id} name={name} image={image} />
                </LinkItem>
            );
        });
        return (
            <>
                <h2>Episode {episodes?.[0].episode} : {episodes?.[0].name}</h2>
                <p>Air date: {episodes?.[0].air_date}</p>
                <h2>Characters:</h2>
                <Scroller
                    items={caracterComponents}
                    estimateSize={140}
                />
            </>
        )
    }

    if (isLoading || isFetching || status === 'pending') return <span>'Loading...'</span>;
    if (error) return <span>Error: {error.message}</span>;

}