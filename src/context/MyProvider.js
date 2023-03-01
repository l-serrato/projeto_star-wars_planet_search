import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState(planets);
  const [filterName, setFilterName] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((data) => data.json())
      .then((response) => {
        const dataResults = response.results;
        setPlanets(dataResults);
      });
  }, []);

  const saveFilters = (info) => {
    setSelectedFilters((state) => {
      if (state.length) {
        return [...state, info];
      }
      return [info];
    });
  };

  useEffect(() => {
    const planetsFilterName = planets
      .filter((planet) => planet.name
        .includes((filterName)));
    setFilterPlanets(planetsFilterName);
  }, [planets, filterName]);

  useEffect(() => {
    const filteredNameNConditions = () => selectedFilters
      .forEach(({ planetData, comparison, number }) => {
        setFilterPlanets(
          (newFilterPlanets) => newFilterPlanets.filter((system) => {
            switch (comparison) {
            case 'maior que':
              return Number(system[planetData]) > Number(number);
            case 'menor que':
              return Number(system[planetData]) < Number(number);
            case 'igual a':
              return Number(system[planetData]) === Number(number);
            default:
              return true;
            }
          }),
        );
      });
    filteredNameNConditions();
  }, [filterName, selectedFilters]);

  const context = {
    planets,
    filterPlanets,
    filterName,
    setFilterName,
    setFilterPlanets,
    setSelectedFilters,
    saveFilters,
    selectedFilters,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
