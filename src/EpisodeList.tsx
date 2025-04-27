import { useState } from 'react';

import './App.css';
import { useAllEpisodes } from './Hooks';
import LinkItem from './LinkItem';
import Scroller from './Scroller';
import SearchBox from './SearchBox';

import { debounce } from '@tanstack/pacer';

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = debounce((textValue) => setSearchText(textValue), {
    wait: 500,
  });
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAllEpisodes(searchText);

  const episodeList = data
    ? data.pages.flatMap((d) =>
        d.episodes.map((episode) => {
          const { id, name, episode: code } = episode;

          return (
            <LinkItem key={id} route={`/episode/${id}`}>
              <h2>
                {code} | {name}
              </h2>
            </LinkItem>
          );
        })
      )
    : [];

  return (
    <>
      <SearchBox onSearchHanlder={(text) => debouncedSearch(text)} />
      <br />
      <br />
      <div>
        {status === 'pending' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <Scroller
            items={episodeList}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
        <div>
          {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
        </div>
      </div>
    </>
  );
}

export default App;
