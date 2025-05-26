import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpeg'; 

const Home = ({ movies }) => {
  return (
    <div className="home-page">
      <div className="container">
        <h1 className="page-title">Ласкаво просимо до першого дівочого кінотеатру!</h1>
        <p className="page-subtitle">Переглядайте фільми, що доступні у прокаті та бронюйте квитки</p>
        <img src={logo} alt="PinkCinema Logo" className="home-logo" />
      </div>
    </div>
  );
};

export default Home;