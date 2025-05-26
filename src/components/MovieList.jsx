import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const allGenres = Array.from(new Set(movies.flatMap(movie => movie.genre))).sort();

  useEffect(() => {
    let result = [...movies];
    if (searchTerm) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedGenres.length > 0) {
      result = result.filter(movie =>
        selectedGenres.some(genre => movie.genre.includes(genre))
      );
    }
    setFilteredMovies(result);
  }, [movies, searchTerm, selectedGenres]);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
  };

  return (
    <div className="movie-list">
      <div className="filter-controls">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Пошук фільмів..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={18} />
            </button>
          )}
        </div>
        <button className="btn btn-secondary filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={18} />
          Фільтри
          {selectedGenres.length > 0 && (
            <span className="filter-count">{selectedGenres.length}</span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-header">
            <h3 className="filter-title">Фільтр за жанром</h3>
            {(searchTerm || selectedGenres.length > 0) && (
              <button className="clear-filters" onClick={clearFilters}>
                <X size={14} />
                Очистити
              </button>
            )}
          </div>
          <div className="genre-buttons">
            {allGenres.map(genre => (
              <button
                key={genre}
                className={`genre-button ${selectedGenres.includes(genre) ? 'active' : ''}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredMovies.length === 0 ? (
        <div className="no-results">
          <h3>Фільми не знайдено</h3>
          <p>Спробуйте змінити критерії пошуку</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;