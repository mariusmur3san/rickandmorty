import React, { useEffect, useRef, useState } from 'react'
import {
  useInfiniteQuery,
} from '@tanstack/react-query'
import './App.css'
import { fetchAllEpisodes, useAllEpisodes, useEpisodes } from './Hooks'
import { useVirtualizer } from '@tanstack/react-virtual';
import LinkItem from './LinkItem';
import SearchBox from './SearchBox';
import { debounce } from '@tanstack/pacer';
import Scroller from './Scroller';

function App() {
  const [searchText, setSearchText] = useState('');
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAllEpisodes(searchText);

  const allRows = data
    ? data.pages.flatMap((d) => d.episodes.map(episode => {
      const { id, name, episode: code } = episode;
      return (
        <LinkItem key={id} route={`/episode/${id}`}>
          <h2>{code} | {name}</h2>
        </LinkItem>
      );
    }))
    : [];

  const debouncedSearch = debounce(
    textValue => setSearchText(textValue),
    { wait: 500 }
  );

  return (
    <>
      <SearchBox onSearchHanlder={(text) => debouncedSearch(text)} />
      <br />
      <br />
      <div>
        {status === 'pending'
          ? <p>Loading...</p>
          : status === 'error'
            ? <span>Error: {error.message}</span>
            : <Scroller
              items={allRows}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
        }
        <div>
          {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
        </div>
      </div>
    </>
  )
}

export default App
