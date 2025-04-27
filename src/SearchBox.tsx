import { useState } from 'react';

import type { SearchProps } from './Types';

export default function SearchBox({ onSearchHanlder }: SearchProps) {
  const [text, setText] = useState('');
  const onSearch = (value: string) => {
    setText(value);
    onSearchHanlder(value);
  };

  return (
    <input
      value={text}
      onChange={(e) => onSearch(e.currentTarget.value)}
      placeholder="Type to search"
    />
  );
}
