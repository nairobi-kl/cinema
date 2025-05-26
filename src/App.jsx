// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import { moviesData } from './data/movies';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MovieList movies={moviesData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

