import React from 'react';

function Table() {
  const tableHeader = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created'];
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
      </table>
    </main>
  );
}

export default Table;
