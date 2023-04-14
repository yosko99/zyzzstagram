/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

import { getUsersRouteWithSearchQuery } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IUser from '../../interfaces/IUser';
import UserThumbnail from '../user/UserThumbnail';
import LoadingSpinner from '../utils/LoadingSpinner';

const SearchBox = () => {
  const recentSearches = localStorage.getItem('recentSearches');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const { refetch, data } = useFetch(
    'search',
    getUsersRouteWithSearchQuery(search),
    true,
    true
  );

  const handleOnChange = (searchQuery: string) => {
    setSearch((prev) => searchQuery);
    setLoading(true);
    refetch();

    setTimeout(() => {
      refetch();
      setLoading(false);
    }, 1000);
  };

  const users = data as IUser[];

  return (
    <>
      <Form.Group className="mb-3" style={{ minHeight: '20vh' }}>
        <Form.Control
          onChange={(e) => handleOnChange(e.target.value)}
          name="search"
          value={search}
          className="border"
          placeholder="Search"
        />
        <hr />
        <div className="d-flex justify-content-between">
          <p className="ms-3">Recent</p>
          {recentSearches !== null && recentSearches.length !== 0 && (
            <p className="text-info me-3" role="button">
              Clear all
            </p>
          )}
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : users === undefined || users.length === 0 ? (
          <p className="text-center mt-3">No results find.</p>
        ) : (
          users.map((user, index: number) => (
            <UserThumbnail user={user} key={index} />
          ))
        )}
      </Form.Group>
    </>
  );
};

export default SearchBox;
