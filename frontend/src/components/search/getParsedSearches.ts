import IRecentSearches from '../../interfaces/IRecentSearches';

const getParsedSearches = (): IRecentSearches[] => {
  const storedSearches = localStorage.getItem('recentSearches');
  const parsedSearches: IRecentSearches[] = storedSearches
    ? JSON.parse(storedSearches)
    : [];

  return parsedSearches;
};

export default getParsedSearches;
