import React from 'react'
import { useParams } from "react-router";
import './App.css'
import { useCharacters, useEpisodes } from './Hooks';
import LinkItem from './LinkItem';

function Episode() {
    const { id } = useParams();
    const { data: episodes } = useEpisodes([id!]);
    const charactersIds = episodes?.flatMap(episode => episode.characters.map(c => c.split('/').reverse()[0]));
    const { isLoading, data, error, isFetching, status } = useCharacters(charactersIds || []);

    if (data) {
        return (
            <>
                <h1>Episode # {episodes?.[0].id}: {episodes?.[0].name}</h1>
                <h4>Air date: {episodes?.[0].air_date}</h4>
                <h2>Casting:</h2>
                <ul>
                    {data.map(character => {
                        const { id, name, image } = character;
                        return (
                            <LinkItem key={id} route={`/character/${character.id}`}>
                                {character.name}
                                <img src={character.image} />
                            </LinkItem>
                        );
                    })}
                </ul>
            </>
        )
    }

    if (isLoading || isFetching || status === 'pending') return <span>'Loading...'</span>;
    if (error) return <span>Error: {error.message}</span>;

}

export default Episode
