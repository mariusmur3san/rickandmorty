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

  const allRows = data ? data.pages.flatMap((d) => d.episodes) : []
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems()
  ])

  const debouncedSearch = debounce(
    textValue => setSearchText(textValue),
    { wait: 500 }
  );

  return (
    <>
      <SearchBox onSearchHanlder={(text) => debouncedSearch(text)} />
      <div>
        {status === 'pending'
          ? <p>Loading...</p>
          : status === 'error'
            ? <span>Error: {error.message}</span>
            : <div
              ref={parentRef}
              className="List"
              style={{
                height: `400px`,
                width: `100%`,
                overflow: 'auto',
              }}
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const isLoaderRow = virtualRow.index > allRows.length - 1;
                  const episode = allRows[virtualRow.index];

                  return (
                    <div
                      key={virtualRow.index}

                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {isLoaderRow
                        ? hasNextPage
                          ? 'Loading more...'
                          : 'Nothing more to load'
                        : <LinkItem route={`/episode/${episode.id}`}>
                          {virtualRow.index + 1}. {episode.name}
                        </LinkItem>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
        }
        <div>
          {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
        </div>
      </div>
    </>
  )
}

export default App
