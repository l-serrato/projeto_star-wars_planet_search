import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((data) => data.json())
      .then((response) => {
        const dataResults = response.results;
        setPlanets(dataResults);
      });
  }, []);

  useEffect(() => {
    if (filterName === '') {
      setFilterPlanets(planets);
    } else {
      const planetsFilterName = planets
        .filter((planet) => planet.name
          .includes((filterName)));
      setFilterPlanets(planetsFilterName);
    }
  }, [planets, filterName]);

  const context = {
    planets,
    filterPlanets,
    filterName,
    setFilterName,
    setFilterPlanets,
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
