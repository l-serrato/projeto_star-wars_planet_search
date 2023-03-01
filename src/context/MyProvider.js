import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FetchAPI from './FetchAPI';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    FetchAPI()
      .then((data) => {
        setPlanets(data);
      });
  }, []);

  useEffect(() => {
    const verifyFilterName = () => {
      const planetsFilteredByName = planets
        .filter((planet) => (planet.name).toLowerCase()
          .includes((inputName).toLowerCase()));
      setFilteredPlanets(planetsFilteredByName);
    };

    if (inputName) {
      verifyFilterName();
    } else {
      setFilteredPlanets(planets);
    }
  }, [planets, inputName]);

  const context = useMemo(() => ({
    filteredPlanets,
    filterByNumericValues,
    setInputName,
    setFilterByNumericValues,
    setFilteredPlanets,
  }), [
    filteredPlanets,
    filterByNumericValues,
  ]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
