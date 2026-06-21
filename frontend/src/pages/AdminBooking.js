import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBooking.css";

function AdminBooking() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  // lấy danh sách booking
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // xoá booking
  const deleteBooking = async (id) => {

  const confirmDelete = window.confirm("Bạn có chắc muốn hủy booking này không?");

  if (!confirmDelete) {
    return;
  }

  try {

    await axios.delete(`http://localhost:5000/api/bookings/${id}`);

    setBookings(bookings.filter(b => b.id !== id));

    alert("Đã hủy booking thành công!");

  } catch (error) {
    console.error("Lỗi xóa booking:", error);
    alert("Không thể hủy booking!");
  }
};
  return (
    <div className="admin-container">

      <h2>📅 Quản lý booking</h2>

      {/* Thống kê */}
      <div className="booking-stats">

        <div className="stat-card">
          <h3>Tổng booking</h3>
          <p>{bookings.length}</p>
        </div>

        <div className="stat-card">
          <h3>Hôm nay</h3>
          <p>
            {bookings.filter(b =>
              new Date(b.checkin_date).toDateString() === new Date().toDateString()
            ).length}
          </p>
        </div>

        <div className="stat-card">
          <h3>Số khách</h3>
          <p>{new Set(bookings.map(b => b.email)).size}</p>
        </div>

      </div>

      {/* ô tìm kiếm */}
      <input
        type="text"
        placeholder="🔍 Tìm tên hoặc email..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Khách</th>
            <th>Email</th>
            <th>Phòng</th>
            <th>Ngày</th>
            <th>Khung giờ</th>
            <th>Hành động</th>
            <th>CCCD Trước</th>
            <th>CCCD Sau</th>
          </tr>
        </thead>

        <tbody>

          {bookings
            .filter(b =>
              b.customer?.toLowerCase().includes(search.toLowerCase()) ||
              b.email?.toLowerCase().includes(search.toLowerCase())
            )
            .map((booking) => (

              <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.customer}</td>
              <td>{booking.email}</td>
              <td>{booking.room}</td>

              <td>
                {new Date(booking.checkin_date).toLocaleDateString("vi-VN")}
              </td>
              
                <td className="slot-badge">
                {booking.time_slots}
                </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteBooking(booking.id)}
                >
                  Huỷ
                </button>
              </td>

              <td>
                {booking.cccd_front && (
                  <img
                    src={`http://localhost:5000/uploads/cccd/${booking.cccd_front}`}
                    width="60"
                    alt="cccd-front"
                  />
                )}
              </td>

              <td>
                {booking.cccd_back && (
                  <img
                    src={`http://localhost:5000/uploads/cccd/${booking.cccd_back}`}
                    width="60"
                    alt="cccd-back"
                  />
                )}
              </td>
            </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminBooking;