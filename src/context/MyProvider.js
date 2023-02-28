import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
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
    if (filterName === '') {
      setFilterPlanets(planets);
    } else {
      const planetsFilterName = planets
        .filter((planet) => planet.name
          .includes((filterName)));
      setFilterPlanets(planetsFilterName);
      const filteredNameNConditions = planetsFilterName.filter((system) => {
        const filterResults = selectedFilters
          .map(({ planetData, comparison, number }) => {
            switch (comparison) {
            case 'Greater Than':
              return Number(system[planetData]) > Number(number);
            case 'Lesser Than':
              return Number(system[planetData]) < Number(number);
            case 'Equal':
              return Number(system[planetData]) === Number(number);
            default:
              return true;
            }
          });
        return filterResults.every((el) => el);
      });
      return filteredNameNConditions;
    }
  }, [planets, filterName, selectedFilters]);

  const context = {
    planets,
    filterPlanets,
    filterName,
    setFilterName,
    setFilterPlanets,
    setSelectedFilters,
    saveFilters,
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
