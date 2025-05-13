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
        <div className='absolute max-h-96 w-80 bg-white text-black border border-indigo-200 rounded-md shadow-lg overflow-hidden z-10'>
          <div className='flex p-2 justify-between items-center border-b border-gray-200'>
            <span className='text-sm text-gray-500'>Search Results</span>
            <button
              className='text-gray-500 hover:text-gray-700'
              onClick={() => setShowResults(false)}
              aria-label='Close search results'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='overflow-y-auto max-h-80'>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
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
              ))
            ) : (
              <div className='p-4 text-center text-gray-500'>
                No results found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
