import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  const { id } = useParams();

  return (
    <div className="booking-page">
      <div className="container">
        <h1>Бронювання фільму ID: {id}</h1>
        <CinemaHall />
      </div>
    </div>
  );
};

export default Booking;