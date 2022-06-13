import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filterByName: { setFilterName } } = useContext(Context);

  const handleChanges = ({ target }) => {
    const { value } = target;
    setFilterName(value.toLowerCase());
  };

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChanges }
      />
      <label htmlFor="column">
        Colunm
        <select
          data-testid="column-filter"
          name="column"
          id="column"
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Operator
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
        >
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          type="number"
          name="value-filter"
          id="value-filter"
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
    </section>
  );
}

export default Filters;
