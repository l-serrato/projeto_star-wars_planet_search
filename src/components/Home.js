import React from 'react';
import Header from './Header';
import Table from './Table';
import MyFilters from './MyFilters';

function Home() {
  return (
    <div>
      <Header />
      <MyFilters />
      <Table />
    </div>
  );
}

export default Home;
