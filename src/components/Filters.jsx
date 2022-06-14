import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    filterByName: { setFilterName },
    filterByClick: { setFilterClick },
    filterByNumericValues: { filterNumeric, setFilterNumeric },
  } = useContext(Context);

  const handleNameFilter = ({ target }) => {
    const { value } = target;
    setFilterName(value.toLowerCase());
  };

  const handleChanges = ({ target }) => {
    const { id, value } = target;
    setFilterNumeric((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleClick = () => {
    setFilterClick((prevState) => ([...prevState, { ...filterNumeric }]));
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
    </section>
  );
}

export default Filters;
