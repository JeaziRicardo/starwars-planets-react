import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from '../services/API';

function Provider({ children }) {
  const ONE_LESS = -1;
  const [data, setData] = useState([]);
  const [name, setFilterName] = useState('');
  const [filter, setFilter] = useState([]);
  const [filterClick, setFilterClick] = useState([]);
  const [orderClick, setOrderClick] = useState({});
  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
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
    orderFilter: {
      order,
      setOrder,
    },
    orderByClick: {
      orderClick,
      setOrderClick,
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

    const orderName = filterName.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return ONE_LESS;
      }
      return 0;
    });

    const filterOrder = orderName.sort((a, b) => {
      if (b[orderClick.column] === 'unknown') return ONE_LESS;
      switch (orderClick.sort) {
      case 'ASC':
        return +(a[orderClick.column]) - +(b[orderClick.column]);
      case 'DESC':
        return +(b[orderClick.column]) - +(a[orderClick.column]);
      default:
        return 0;
      }
    });

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
    }), filterOrder);

    setFilter(filterCondition);
  }, [data, name, filterClick, orderClick, ONE_LESS]);

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
