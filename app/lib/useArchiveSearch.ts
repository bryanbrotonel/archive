import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { swrFetcher, swrMiddleware } from '@/app/lib/utils';
import { Entity, MediaType } from '@/app/lib/types';

const SEARCH_DEBOUNCE_MS = 500;

export function useArchiveSearch(type: MediaType) {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Entity[]>([]);
  const [page, setPage] = useState(1);
  const [showResults, setShowResults] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.trim()) {
        setSearchQuery(searchValue);
        setPage(1); // Reset page on new search
        setSearchResults([]);
      } else {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const shouldFetch = !!searchQuery;
  const {
    data: searchData,
    error: searchError,
    isValidating,
  } = useSWR(
    shouldFetch
      ? `/api/database/getItems?type=${type}&query=${encodeURIComponent(
          searchQuery
        )}&page=${page}`
      : null,
    swrFetcher,
    { use: [swrMiddleware] }
  );

  useEffect(() => {
    if (searchData) {
      setSearchResults((prev) =>
        page === 1 ? searchData.data : [...prev, ...searchData.data]
      );
      setShowResults(true);
    }
  }, [searchData, page]);

  const loadMore = useCallback(() => {
    if (
      searchData &&
      searchResults.length < searchData.total &&
      !isValidating
    ) {
      setPage((prev) => prev + 1);
    }
  }, [searchData, searchResults.length, isValidating]);

  const clearResults = () => {
    setSearchValue('');
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    setPage(1);
  };

  return {
    searchValue,
    setSearchValue,
    searchResults,
    showResults,
    setShowResults,
    searchError,
    loadMore,
    isLoading: isValidating,
    clearResults,
  };
}
