import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Film, Ticket, Home } from 'lucide-react';
import HomePage from './pages/Home';
import MovieList from './components/MovieList';
import Booking from './pages/Booking';
import { useMovies } from './data/movies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => (
  <header className="header">
    <div className="container">
      <Link to="/" className="logo">
        <Film className="logo-icon" />
        <h1 className="logo-text">
          <span className="logo-primary">Cutie</span>
          <span className="logo-white">Cinema</span>
        </h1>
      </Link>
      <nav className="nav">
        <Link to="/" className="nav-link">
          <Home size={18} />
          <span>Головна</span>
        </Link>
        <Link to="/movies" className="nav-link">
          <Film size={18} />
          <span>Фільми</span>
        </Link>
        <Link to="/bookings" className="nav-link">
          <Ticket size={18} />
          <span>Мої бронювання</span>
        </Link>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <Link to="/" className="logo">
          <Film className="logo-icon" />
          <h3 className="logo-text">
            <span className="logo-primary">Cutie</span>
            <span className="logo-white">Cinema</span>
          </h3>
        </Link>
        <p className="footer-text">
          © {new Date().getFullYear()} CutieCinema. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const BookingsHistory = ({ movies }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      setBookings([]);
    }
    const handleStorageChange = () => {
      const updatedBookings = localStorage.getItem('bookings');
      if (updatedBookings) {
        setBookings(JSON.parse(updatedBookings));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="bookings-page">
      <div className="container">
        <h1 className="page-title">Мої бронювання</h1>
        <p className="page-subtitle">Переглядайте та керуйте вашими бронюваннями</p>
        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map(booking => {
              // Знаходимо фільм за movieId
              const movie = movies.find(m => m.id === booking.movieId);
              const movieTitle = movie ? movie.title : `Фільм #${booking.movieId}`;

              // Знаходимо сеанс за showtimeId
              const showtime = movie?.showtimes?.find(s => s.id === booking.showtimeId);
              const showtimeInfo = showtime ? `${showtime.time}, ${showtime.date}` : 'Невідомий сеанс';

              return (
                <div key={booking.id} className="booking-item">
                  <h3 className="booking-title">{movieTitle}</h3>
                  <p className="booking-info">ID бронювання: #{booking.id}</p>
                  <p className="booking-info">Сеанс: {showtimeInfo}</p>
                  <p className="booking-info">{booking.seats.length} місць - {booking.totalPrice} грн</p>
                  <p className="booking-info">Дата бронювання: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-bookings">
            <h3>Бронювань поки немає</h3>
            <Link to="/movies" className="btn btn-primary">Переглянути фільми</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const { movies } = useMovies();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  console.log('App: Movies data:', movies);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage movies={movies} />} />
            <Route path="/movies" element={<MovieList movies={movies} />} />
            <Route path="/bookings" element={<BookingsHistory movies={movies} />} />
            <Route path="/booking/:id" element={<Booking movies={movies} />} />
            <Route path="*" element={<Link to="/" replace>Переглянути фільми</Link>} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;