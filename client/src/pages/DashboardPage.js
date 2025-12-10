import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import bookingService from '../services/bookingService';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isExtra, setIsExtra] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getMyBookings();
        setBookings(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookings();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookingService.createBooking({ paymentMethod, isExtra });
      const res = await bookingService.getMyBookings();
      setBookings(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Welcome, {user && user.name}</h1>
      <p>Remaining Barrels: {user && user.remainingBarrels}</p>

      <div className="card">
        <div className="card-header">Book a Cylinder</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                name="paymentMethod"
                className="form-control"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Paytm QR">Paytm QR</option>
              </select>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="isExtra"
                className="form-check-input"
                checked={isExtra}
                onChange={(e) => setIsExtra(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isExtra">
                Request Extra Cylinder
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Book Now
            </button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">My Bookings</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                  <td>{booking.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
