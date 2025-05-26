import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="poster-image"
        />
        <div className="rating-badge">
          <Star className="star-icon" fill="white" stroke="white" />
          {movie.rating.toFixed(1)}
        </div>
      </div>

      <div className="card-content">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-info">
          <Clock className="icon" />
          <span>{Math.floor(movie.duration / 60)}г {movie.duration % 60}хв</span>
          <span className="separator">|</span>
          <Calendar className="icon" />
          <span>{new Date(movie.releaseDate).toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}</span>
        </div>
        <div className="genres">
          {movie.genre.map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
        <p className="description">{movie.description}</p>

        <div className="showtimes">
          <h4 className="section-title">Сеанси</h4>
          <div className="showtime-buttons">
            {movie.showtimes.map(showtime => (
              <button
                key={showtime.id}
                onClick={() => handleShowtimeSelect(showtime)}
                className={`showtime-button ${selectedShowtime && selectedShowtime.id === showtime.id ? 'active' : ''}`}
              >
                {showtime.time} (Зал {showtime.hall})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;