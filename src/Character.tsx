import { useParams } from 'react-router';

import './App.css';
import CharacterCard from './CharacterCard';
import { useCharacters, useEpisodes } from './Hooks';
import LinkItem from './LinkItem';
import Scroller from './Scroller';

function Caracter() {
    const { id } = useParams();
    const { data: characters } = useCharacters([id!]);
    const episodeIds = characters?.flatMap((character) =>
        character.episode.map((c) => c.split('/').reverse()[0])
    );
    const {
        isLoading,
        data: episodes,
        error,
        isFetching,
        status,
    } = useEpisodes(episodeIds || []);

    if (episodes) {
        const elisodeComponents = episodes.map((episode) => {
            const { id, name, episode: code } = episode;

            return (
                <LinkItem key={id} route={`/episode/${id}`}>
                    <h2>
                        {code} | {name}
                    </h2>
                </LinkItem>
            );
        });

        return (
            <div>
                <CharacterCard
                    key={id}
                    id={characters?.[0].id || 0}
                    name={characters?.[0].name || ''}
                    image={characters?.[0].image || ''}
                />
                <h2>Episodes:</h2>
                <Scroller items={elisodeComponents} />
            </div>
        );
    }

    if (isLoading || isFetching || status === 'pending') {
        return <span>Loading...</span>;
    }
    if (error) {
        return <span>Error: {error.message}</span>;
    }
}

export default Caracter;
