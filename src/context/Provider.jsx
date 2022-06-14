import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from '../services/API';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setFilterName] = useState('');
  const [filter, setFilter] = useState([]);
  const [filterClick, setFilterClick] = useState([]);
  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const PLANETS_DATA = {
    allDatas: {
      data,
    },
    filterByName: {
      name,
      setFilterName,
    },
    filterByNumericValues: {
      filterNumeric,
      setFilterNumeric,
    },
    filterByClick: {
      filterClick,
      setFilterClick,
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

    const filterCondition = filterClick.reduce((acc, filters) => acc.filter((datas) => {
      switch (filters.comparison) {
      case 'maior que':
        return +(datas[filters.column]) > +(filters.value);
      case 'menor que':
        return +(datas[filters.column]) < +(filters.value);
      case 'igual a':
        return +(datas[filters.column]) === +(filters.value);
      default:
        return undefined;
      }
    }), filterName);

    setFilter(filterCondition);
  }, [data, name, filterClick]);

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
