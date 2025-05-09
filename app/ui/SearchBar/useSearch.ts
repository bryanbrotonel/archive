import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getYouTubeVideoId, isYouTubeUrl } from '@/app/lib/api/youtube';
import { sortSearchResults, swrFetcher } from '@/app/lib/utils';
import { MediaType, SearchItemType } from '@/app/lib/types';

export function useSearch(onSubmit: (type: MediaType, id: string) => void) {
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
      const videoId: string | null = isYouTubeUrl(searchValue)
        ? getYouTubeVideoId(searchValue)
        : null;

      if (videoId) {
        onSubmit(MediaType.Video, videoId);
        setSearchQuery('');
        setShowResults(false);
      } else if (searchValue.trim().length > 2) {
        setSearchQuery(searchValue);
      } else {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(debouncedSearch);
  }, [onSubmit, searchValue]);

  useEffect(() => {
    if (searchData) {
      setSearchResults(sortSearchResults(searchData));
      setShowResults(true);
    }
  }, [searchData]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
    showResults,
    setShowResults,
    searchError,
  };
}