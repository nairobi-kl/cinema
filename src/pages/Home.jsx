import React from 'react';
import MovieList from '../components/MovieList';
import { moviesData } from '../data/movies';

const Home = () => <MovieList movies={moviesData} />;
export default Home;

