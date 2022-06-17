import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    filterByName: { setFilterName },
    filterByClick: { setFilterClick },
    filterByNumericValues: { filterNumeric, setFilterNumeric },
  } = useContext(Context);

  const [optionsColumn, setOptionsColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water',
  ]);

  const handleNameFilter = ({ target }) => {
    const { value } = target;
    setFilterName(value.toLowerCase());
  };

  const handleChanges = ({ target }) => {
    const { id, value } = target;
    setFilterNumeric((prevState) => ({ ...prevState, [id]: value }));
  };

  const removeOption = () => {
    const { column } = filterNumeric;
    const newOptionsColumn = optionsColumn.filter((option) => option !== column);
    setOptionsColumn(newOptionsColumn);
  };

  const handleClick = () => {
    setFilterClick((prevState) => ([...prevState, { ...filterNumeric }]));
    removeOption();
  };

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleNameFilter }
      />
      <label htmlFor="column">
        Column
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          onChange={ handleChanges }
        >
          { optionsColumn.map((options) => (
            <option key={ options } value={ options }>{ options }</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison">
        Operator
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          onChange={ handleChanges }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          id="value"
          onChange={ handleChanges }
          value={ filterNumeric.value }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <label htmlFor="column-sort">
        Sort
        <select
          data-testid="column-sort"
          name="column"
          id="column-sort"
        >
          { optionsColumn.map((options) => (
            <option key={ options } value={ options }>{ options }</option>
          )) }
        </select>
      </label>
      <label htmlFor="input-asc">
        Upward
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          id="input-asc"
          value="ASC"
        />
      </label>
      <label htmlFor="input-desc">
        Downward
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          id="input-desc"
          value="DESC"
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
      >
        Sort
      </button>
    </section>
  );
}

export default Filters;
