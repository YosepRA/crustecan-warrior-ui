/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/* Parse search params to plain object. */
const withSearchParams = (WrappedComponent) => (props) => {
  const [search, setSearch] = useState({ increment: 1 });
  const { search: searchLocation } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(searchLocation);
    const result = {};

    Array.from(searchParams.entries()).forEach(([key, value]) => {
      const numberValue = parseInt(value, 10);

      result[key] = Number.isNaN(numberValue) ? value : numberValue;
    });

    setSearch(result);
  }, [searchLocation]);

  const handleSearchChange = (searchObject) => {
    const searchParams = new URLSearchParams();

    Object.entries(searchObject).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    const searchString = searchParams.toString();

    navigate({ pathname: '', search: searchString });
  };

  return (
    <WrappedComponent
      {...props}
      search={search}
      handleSearchChange={handleSearchChange}
    />
  );
};

export default withSearchParams;
