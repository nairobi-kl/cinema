export const getBookings = () => {
  const storedBookings = localStorage.getItem('bookings');
  return storedBookings ? JSON.parse(storedBookings) : [];
};

export const getBookingsByMovieId = (movieId) => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.movieId === parseInt(movieId));
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  booking.id = Date.now(); 
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  console.log('BookingService: Saved bookings:', bookings);
  return booking;
};