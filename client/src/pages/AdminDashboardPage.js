import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const usersRes = await adminService.getUsers();
        setUsers(usersRes.data.data);
        const bookingsRes = await adminService.getBookings();
        setBookings(bookingsRes.data.data);
        const noticesRes = await adminService.getNotices();
        setNotices(noticesRes.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.error || 'Failed to load data. Please check if you are logged in as admin.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await adminService.createNotice({ title, content });
      const noticesRes = await adminService.getNotices();
      setNotices(noticesRes.data.data);
      setTitle('');
      setContent('');
      setSuccess('Notice created successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error creating notice:', err);
      setError(err.response?.data?.error || 'Failed to create notice');
    }
  };

  const onBookingUpdate = async (id, status) => {
    try {
      await adminService.updateBooking(id, { status });
      const bookingsRes = await adminService.getBookings();
      setBookings(bookingsRes.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" onClick={() => setError('')}>
            <span>&times;</span>
          </button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="close" onClick={() => setSuccess('')}>
            <span>&times;</span>
          </button>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header">Users</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Remaining Barrels</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user?.name || 'N/A'}</td>
                  <td>{user?.email || 'N/A'}</td>
                  <td>{user?.remainingBarrels ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">Bookings</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.user ? booking.user.name : 'Deleted User'}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => onBookingUpdate(booking._id, 'confirmed')}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => onBookingUpdate(booking._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">Notices</div>
        <div className="card-body">
          <form onSubmit={onNoticeSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Notice
            </button>
          </form>
          <hr />
          <ul className="list-group">
            {notices.map((notice) => (
              <li key={notice._id} className="list-group-item">
                <h5>{notice.title}</h5>
                <p>{notice.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
