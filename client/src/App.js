import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import GroCheri from './components/GroCheri';

function App() {
  return (
    <div className="App">
      <h1 className="title">The API Special 101</h1>
      <Routes>
        <Route path='gro-cheri' element={<GroCheri />} />
      </Routes>
    </div>
  );
}

export default App;
