import React from 'react';

import RemoveSearchButton from '../buttons/search/RemoveSearchButton';
import UserThumbnail from '../user/UserThumbnail';
import getParsedSearches from './getParsedSearches';

interface Props {
  username: string;
  imageURL: string;
  showRemoveSearchButton: boolean;
}

const SearchUserThumbnail = ({
  imageURL,
  username,
  showRemoveSearchButton
}: Props) => {
  const addRecentSearch = (username: string, imageURL: string) => {
    const recentSearch = { username, imageURL };
    const parsedSearches = getParsedSearches();

    const duplicateIndex = parsedSearches.findIndex(
      (search) => search.username === username
    );

    if (duplicateIndex !== -1) {
      parsedSearches.splice(duplicateIndex, 1);
    }

    const updatedSearches = [recentSearch, ...parsedSearches];
    const limitedSearches = updatedSearches.slice(0, 9);
    localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <UserThumbnail
      onClick={() => addRecentSearch(username, imageURL)}
      imageURL={imageURL}
      username={username}
      sideElement={
        showRemoveSearchButton && <RemoveSearchButton username={username} />
      }
    />
  );
};

export default SearchUserThumbnail;
