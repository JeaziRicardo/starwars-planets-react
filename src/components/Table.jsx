import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const tableHeader = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];
  const { filtered: { filter } } = useContext(Context);
  return (
    <main>
      <table>
        <thead>
          <tr>
            { tableHeader.map((header) => (
              <th key={ header }>
                { header }
              </th>
            )) }
          </tr>
        </thead>
        <tbody>
          { filter.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films }</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
