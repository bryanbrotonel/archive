import React from 'react';
import { useSearch } from './useSearch';
import SearchItem from './searchItem';
import { MediaType } from '@/app/lib/types';

interface SearchBarProps {
  onSubmit: (type: MediaType, id: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const {
    searchValue,
    setSearchValue,
    searchResults,
    showResults,
    setShowResults,
    searchError,
  } = useSearch(onSubmit);

  return (
    <div className='mb-2'>
      <div className='w-60 relative'>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='border border-gray-300 rounded-md p-2 pr-16 w-full text-black dark:text-white'
          placeholder='Search...'
          onFocus={() => {
            if (searchResults.length > 0) {
              setShowResults(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => setShowResults(false), 100); // Delay to allow click event on results
          }}
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue('');
              setShowResults(false);
            }}
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
          >
            Clear
          </button>
        )}
      </div>
      {searchError && (
        <p className='mt-3 text-red-500'>
          Error fetching search results. Please try again later.
        </p>
      )}
      {showResults && (
        <div className='absolute max-h-96 min-w-60 max-w-96 bg-white text-black border border-indigo-200 rounded-md p-2 overflow-y-scroll overflow-x-hidden'>
          {searchResults.map((result) => (
            <SearchItem
              key={result.id}
              type={result.type}
              title={result.title}
              subTitle={result.subTitle}
              imageUrl={result.imageUrl}
              onClick={() => {
                onSubmit(result.type, result.id);
                setShowResults(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}