import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ScrollerProps } from "./Types";
import { useCallback, useEffect, useRef } from "react";


export default function Scroller(props: ScrollerProps) {
    const {
        items, estimateSize = 50, hasNextPage, isFetchingNextPage, fetchNextPage,
    } = props
    const parentRef = useRef<HTMLDivElement>(null)
    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? items.length + 1 : items.length,
        getItemKey: useCallback(
            (index: number) => items[index]?.key ?? index, [items]
        ),
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
        overscan: 5,
    })

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

        if (!lastItem) {
            return
        }

        if (
            lastItem.index >= items.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage?.()
        }
    }, [
        hasNextPage,
        fetchNextPage,
        items.length,
        isFetchingNextPage,
        rowVirtualizer.getVirtualItems()
    ])

    return (
        <div
            ref={parentRef}
            className="scroller"
            style={{
                height: `500px`,
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
                    const isLoaderRow = virtualRow.index > items.length - 1;
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
                                : items[virtualRow.index]
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}