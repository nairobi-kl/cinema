import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CinemaHall from '../components/CinemaHall';
import { saveBooking, getBookingsByMovieId } from '../services/BookingService';

const Booking = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('Booking: movies prop:', movies);
    console.log('Booking: id from params:', id);
    console.log('Booking: movie found:', movie);
    if (!movie) {
      console.log('Booking: No movie found, redirecting to /movies');
      navigate('/movies');
    } else {
      console.log('Booking: Movie data:', movie);
      console.log('Booking: Showtimes:', movie.showtimes);
    }
  }, [movie, navigate, movies, id]);

  useEffect(() => {
    console.log('Booking: selectedShowtime updated:', selectedShowtime);
  }, [selectedShowtime]);

  useEffect(() => {
    console.log('Booking: selectedSeats updated:', selectedSeats);
  }, [selectedSeats]);

  const handleShowtimeSelect = (showtime) => {
    console.log('Booking: Showtime selected (before update):', showtime);
    if (!showtime || !showtime.id) {
      console.error('Booking: Invalid showtime:', showtime);
      return;
    }
    setSelectedShowtime(showtime);
  };

  const handleSelectSeats = (seats) => {
    console.log('Booking: Received seats:', seats);
    if (!Array.isArray(seats)) {
      console.error('Booking: Received seats is not an array:', seats);
      return;
    }
    console.log('Booking: Setting selectedSeats:', seats);
    setSelectedSeats(seats);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Ім’я обов’язкове';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обов’язковий';
    else if (!/^\+?\d{10,12}$/.test(formData.phone)) newErrors.phone = 'Невірний формат телефону';
    if (!formData.email.trim()) newErrors.email = 'Email обов’язковий';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Невірний формат email';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Потрібно погодитися з умовами';
    setErrors(newErrors);
    console.log('Booking: Form validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking: handleSubmit called');
    console.log('Booking: selectedShowtime:', selectedShowtime);
    console.log('Booking: selectedSeats:', selectedSeats);
    if (validateForm() && selectedShowtime && selectedSeats.length > 0) {
      const booking = {
        movieId: movie.id,
        showtimeId: selectedShowtime.id,
        seats: selectedSeats.map(s => s.id),
        totalPrice: selectedSeats.reduce((sum, s) => sum + s.price, 0) + 10,
        bookingDate: new Date().toISOString(),
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
      };
      console.log('Booking: Saving booking:', booking);
      saveBooking(booking); // Оновлений saveBooking працює з localStorage
      toast.success('Бронювання успішне!');
      setFormData({ fullName: '', phone: '', email: '', agreeTerms: false });
      setSelectedSeats([]);
      setSelectedShowtime(null);
      console.log('Booking: Navigating to /bookings/' + movie.id);
      navigate('/bookings/' + movie.id);
    } else {
      console.log('Booking: Validation failed or missing data');
      toast.error('Будь ласка, заповніть усі поля та виберіть місця');
    }
  };

  if (!movie) return null;

  return (
    <div className="booking-page">
      <div className="container">
        <h1 className="page-title">Бронювання: {movie.title}</h1>
        <div className="showtimes">
          <h4 className="section-title">Сеанси</h4>
          <div className="showtime-buttons">
            {movie.showtimes && movie.showtimes.length > 0 ? (
              movie.showtimes.map(showtime => (
                <button
                  key={showtime.id}
                  onClick={() => handleShowtimeSelect(showtime)}
                  className={`showtime-button ${selectedShowtime?.id === showtime.id ? 'active' : ''}`}
                >
                  {showtime.time} (Зал {showtime.hall})
                </button>
              ))
            ) : (
              <p>Сеанси відсутні</p>
            )}
          </div>
        </div>
        {selectedShowtime ? (
          <CinemaHall onSelectSeats={handleSelectSeats} />
        ) : (
          <p>Будь ласка, виберіть сеанс</p>
        )}
        {selectedSeats.length > 0 ? (
          <form onSubmit={handleSubmit} className="booking-form">
            <h4 className="section-title">Деталі бронювання</h4>
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Ім’я</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span>Погоджуюсь із умовами</span>
              </label>
              {errors.agreeTerms && <p className="error-message">{errors.agreeTerms}</p>}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Завершити бронювання</button>
            </div>
          </form>
        ) : (
          selectedShowtime && <p>Виберіть місця, щоб продовжити</p>
        )}
      </div>
    </div>
  );
};

export default Booking;