import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

export default function Table() {
  const {
    filterPlanets,
    setFilterName,
    saveFilters,
    selectedFilters } = useContext(MyContext);
  const [planetData, setPlanetData] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState('');
  const handleClick = () => {
    const info = {
      planetData,
      comparison,
      number,
    };
    saveFilters(info);
  };
  function refreshPage() {
    window.location.reload();
  }
  return (
    <section>
      <header>
        <label>
          Search Planet:
          <input
            type="text"
            data-testid="name-filter"
            onChange={ ({ target: { value } }) => setFilterName(value) }
          />
        </label>
        <label htmlFor="planetData">
          Planet Data:
          <select
            data-testid="column-filter"
            name="planetData"
            id="planetData"
            value={ planetData }
            onChange={ (e) => setPlanetData(e.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            name="number"
            id="number"
            type="number"
            data-testid="value-filter"
            value={ number }
            onChange={ (e) => setNumber(e.target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filter

        </button>
        {selectedFilters.map((filter, index) => (
          <div key={ index }>
            <span>
              {filter.planetData}
              {' '}
              {filter.comparison}
              {' '}
              {filter.number}
              {' '}
              <button>X</button>
            </span>
          </div>
        ))}
        <button
          data-testid="button-remove-filters"
          onClick={ refreshPage }
        >
          Remover todas as filtragens

        </button>
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanets?.map((planet, index1) => (
            <tr key={ index1 }>
              <td>
                { planet.name }
              </td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>
                {planet.films.map((url, index2) => (
                  <span key={ index2 }>
                    <a href={ url }>{ url }</a>
                  </span>
                ))}
              </td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>
                <a href={ planet.url }>{ planet.url }</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
