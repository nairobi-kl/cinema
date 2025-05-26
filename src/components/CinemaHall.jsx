import React, { useState, useEffect } from 'react';

const CinemaHall = ({ onSelectSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    row: Math.floor(i / 10) + 1,
    number: (i % 10) + 1,
    status: i < 20 ? 'AVAILABLE' : 'BOOKED', 
    price: 100,
  }));

  const handleSeatSelect = (seat) => {
    console.log('CinemaHall: Seat clicked:', seat);
    if (seat.status !== 'AVAILABLE') {
      return;
    }

    const isSelected = selectedSeats.find(s => s.id === seat.id);

    const newSelectedSeats = isSelected
      ? selectedSeats.filter(s => s.id !== seat.id)
      : [...selectedSeats, seat];

    setSelectedSeats(newSelectedSeats);
    if (onSelectSeats) {
      onSelectSeats(newSelectedSeats);
    } else {
    }
  };

  useEffect(() => {
    console.log('CinemaHall: Selected seats updated:', selectedSeats);
  }, [selectedSeats]);

  useEffect(() => {
    console.log('CinemaHall: Initial seats:', seats);
  }, []);

  return (
    <div className="seat-selection">
      <h4 className="section-title">Оберіть місця</h4>
      <div className="seat-grid">
        {seats.map(seat => (
          <button
            key={seat.id}
            className={`seat ${selectedSeats.some(s => s.id === seat.id) ? 'selected' : seat.status === 'BOOKED' ? 'booked' : 'available'}`}
            onClick={() => handleSeatSelect(seat)}
            disabled={seat.status === 'BOOKED'}
          >
            {seat.number}
          </button>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <p className="selected-seats">
        </p>
      )}
    </div>
  );
};

export default CinemaHall;