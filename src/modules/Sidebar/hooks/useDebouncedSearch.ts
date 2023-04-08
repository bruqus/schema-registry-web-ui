import { useState } from 'react';
import { useDebounce } from 'react-use';

const useDebouncedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 200, [searchTerm]);

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
    const value = typeof event === 'string' ? event : event.target.value;
    setSearchTerm(value);
  };

  const filterItems = (items: string[]) =>
    items.filter((item) => item.toLowerCase().includes(debouncedSearchTerm));

  return {
    searchTerm,
    updateSearchTerm,
    filterItems,
  };
};

export default useDebouncedSearch;
