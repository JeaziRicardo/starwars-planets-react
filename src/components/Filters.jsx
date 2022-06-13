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
    </section>
  );
}

export default Filters;
