import React from 'react';

import IRecentSearches from '../../../interfaces/IRecentSearches';

interface Props {
  recentSearches: IRecentSearches[];
}

const ClearRecentSearchesButton = ({ recentSearches }: Props) => {
  const handleClearSearches = () => {
    localStorage.removeItem('recentSearches');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      {recentSearches !== null && recentSearches.length !== 0 && (
        <p
          className="text-info me-3"
          onClick={handleClearSearches}
          role="button"
        >
          Clear all
        </p>
      )}
    </>
  );
};

export default ClearRecentSearchesButton;
