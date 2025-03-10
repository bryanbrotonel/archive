import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { MediaType, SearchItemType } from '@/app/lib/types';
import SearchItem from './searchItem';
import { sortSearchResults, swrFetcher } from '@/app/lib/utils';
import { getYouTubeVideoId, isYouTubeUrl } from '@/app/lib/api/youtube';

interface SearchBarProps {
  onSubmit: (type: MediaType, id: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { onSubmit } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchItemType[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const { data: searchData, error: searchError } = useSWR(
    searchQuery ? `/api/spotify/search/${searchQuery}` : null,
    swrFetcher
  );

  // Debounce search input
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      let videoId: string | null = null;
      if (isYouTubeUrl(searchValue)) {
        videoId = getYouTubeVideoId(searchValue);
      }

      const isValidSearch = searchValue.trim().length > 2;

      if (videoId) {
        onSubmit(MediaType.Video, videoId);
        setSearchQuery('');
        setShowResults(false);
      } else if (isValidSearch) {
        setSearchQuery(searchValue);
      }
    }, 500);

    return () => clearTimeout(debouncedSearch);
  }, [onSubmit, searchValue]);

  // Simulate search results
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery, onSubmit]);

  useEffect(() => {
    if (searchData && searchQuery) {
      setShowResults(true);
      setSearchResults(sortSearchResults(searchData));
    }
  }, [searchData, searchQuery]);

  return (
    <div className='mb-2'>
      <div className='w-60 relative'>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='border border-gray-300 rounded-md p-2 pr-16 w-full text-black'
          placeholder='Search...'
          onFocus={() => {
            if (searchResults.length > 0) {
              setShowResults(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => setShowResults(false), 200); // Delay to allow click event on results
          }}
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue('');
              setSearchQuery('');
              setShowResults(false);
            }}
            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
          >
            Clear
          </button>
        )}
      </div>
      <div>
        {searchError && (
          <p className='mt-3 text-red-500'>
            Error fetching search results. Please try again later
          </p>
        )}
      </div>
      {showResults && (
        <div
          className={`absolute max-h-96 min-w-60 max-w-96 bg-white text-black border border-indigo-200 rounded-md p-2 overflow-y-scroll overflow-x-hidden`}
        >
          {searchResults.map((result: SearchItemType) => {
            if (!result) return null;

            return (
              <SearchItem
                key={result.id}
                type={result.type}
                title={result.title}
                subTitle={result.subTitle}
                imageUrl={result.imageUrl}
                onClick={() => {
                  onSubmit(result.type, result.id);
                  setSearchQuery('');
                  setShowResults(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
