import React from 'react';

import { GrClose } from 'react-icons/gr';

import getParsedSearches from '../../search/getParsedSearches';

interface Props {
  username: string;
}

const RemoveSearchButton = ({ username }: Props) => {
  const handleRemoveSearch = () => {
    const searchIndex = getParsedSearches().findIndex(
      (search) => search.username === username
    );

    const updatedRecentSearches = getParsedSearches();
    updatedRecentSearches.splice(searchIndex, 1);

    localStorage.setItem(
      'recentSearches',
      JSON.stringify(updatedRecentSearches)
    );

    window.dispatchEvent(new Event('storage'));
  };

  return <GrClose role="button" onClick={handleRemoveSearch} />;
};

export default RemoveSearchButton;
