import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from '../services/API';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const PLANETS_DATA = {
    data,
    setData,
  };

  const getDataAPI = async () => {
    const datas = await fetchAPI();
    setData(datas);
  };

  useEffect(() => {
    getDataAPI();
  }, []);

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
