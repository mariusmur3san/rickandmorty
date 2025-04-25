import React from 'react'
import { useParams } from "react-router";
import './App.css'
import { useCharacters, useEpisodes } from './Hooks';
import LinkItem from './LinkItem';
import CharacterCard from './CharacterCard';

function Caracter() {
    let { id } = useParams();
    const { data: characters } = useCharacters([id!]);
    const episodeIds = characters?.flatMap(character => character.episode.map(c => c.split('/').reverse()[0]));
    const { isLoading, data: episodes, error, isFetching, status } = useEpisodes(episodeIds || []);

    if (episodes) {
        return (
            <>
                <CharacterCard
                    id={characters?.[0].id}
                    name={characters?.[0].name}
                    image={characters?.[0].image}
                />
                <h2>Playing in episodes:</h2>
                <div>
                    {episodes.map(episode => {
                        const { id, name } = episode;
                        return (
                            <LinkItem key={id} route={`/episode/${episode.id}`}>
                                <p>{episode.name}</p>
                            </LinkItem>
                        );
                    })}
                </div >
            </>
        )
    }

    if (isLoading || isFetching || status === 'pending') return <span>'Loading...'</span>;
    if (error) return <span>Error: {error.message}</span>;
}

export default Caracter
