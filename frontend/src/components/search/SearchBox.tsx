/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';

import { getUsersRouteWithSearchQuery } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IRecentSearches from '../../interfaces/IRecentSearches';
import IUser from '../../interfaces/IUser';
import ClearRecentSearchesButton from '../buttons/search/ClearRecentSearchesButton';
import LoadingSpinner from '../utils/LoadingSpinner';
import getParsedSearches from './getParsedSearches';
import SearchUserThumbnail from './SearchUserThumbnail';

const SearchBox = () => {
  const [recentSearches, setRecentSearches] = useState<IRecentSearches[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const { refetch, data } = useFetch(
    'search',
    getUsersRouteWithSearchQuery(search),
    recentSearches.length === 0,
    true
  );

  const handleOnChange = (searchQuery: string) => {
    setSearch((prev) => searchQuery);
    setLoading(true);

    setTimeout(() => {
      refetch();
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('storage', () => {
      setRecentSearches(getParsedSearches());
    });
    setRecentSearches(getParsedSearches());
  }, []);

  const users = data as IUser[];

  return (
    <>
      <Form.Group className="mb-3" style={{ minHeight: '20vh' }}>
        <Form.Control
          onChange={(e) => handleOnChange(e.target.value)}
          name="search"
          value={search}
          autoComplete="off"
          className="border"
          placeholder="Search"
        />
        <hr />
        <div className="d-flex justify-content-between">
          <p className="ms-3">Recent</p>
          <ClearRecentSearchesButton recentSearches={recentSearches} />
        </div>
        {recentSearches.length !== 0 && search === '' ? (
          recentSearches.map((user, index: number) => (
            <SearchUserThumbnail
              username={user.username}
              imageURL={user.imageURL}
              key={index}
              showRemoveSearchButton
            />
          ))
        ) : recentSearches.length === 0 && search === '' ? (
          <p className="text-center my-5">No recent searches.</p>
        ) : loading ? (
          <LoadingSpinner />
        ) : users === undefined || users.length === 0 ? (
          <p className="text-center mt-3">No results find.</p>
        ) : (
          users.map((user, index: number) => (
            <SearchUserThumbnail
              username={user.username}
              imageURL={user.imageURL}
              key={index}
              showRemoveSearchButton={false}
            />
          ))
        )}
      </Form.Group>
    </>
  );
};

export default SearchBox;
