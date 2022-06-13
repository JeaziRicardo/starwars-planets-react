import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from '../services/API';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setFilterName] = useState([]);
  const [filter, setFilter] = useState([]);

  const PLANETS_DATA = {
    allDatas: {
      data,
    },
    filterByName: {
      name,
      setFilterName,
    },
    filtered: {
      filter,
      setFilter,
    },
  };

  const getDataAPI = async () => {
    const datas = await fetchAPI();
    setData(datas);
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  useEffect(() => {
    const filterName = data.filter((planet) => planet.name
      .toLowerCase().includes(name));
    setFilter(filterName);
  }, [data, name]);

  return (
    <Context.Provider value={ PLANETS_DATA }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
