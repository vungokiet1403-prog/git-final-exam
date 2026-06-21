import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";


function AdminDashboard() {

  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [stats, setStats] = useState({
  totalRooms: 0,
  totalBookings: 0,
  revenue: 0
});

  // lấy thống kê
  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  // lấy danh sách phòng
  const fetchRooms = async () => {
  const res = await axios.get("http://localhost:5000/api/rooms");
  setRooms(res.data);

  setStats(prev => ({
    ...prev,
    totalRooms: res.data.length
  }));
};

  useEffect(() => {
    fetchRooms();
  }, []);

  // thêm phòng
  const handleAdd = async () => {
  if (!name || !price) {
    alert("Vui lòng nhập tên phòng và giá");
    return;
  }

  await axios.post("http://localhost:5000/api/rooms", {
    name,
    price_day: price,
    description
  });

  setName("");
  setPrice("");
  setDescription("");
  fetchRooms();
};
  // Upload ảnh 
  // Upload ảnh
  // ảnh 
  const handleUploadImage = async (e, roomId) => {

  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {

    await axios.put(
      `http://localhost:5000/api/rooms/${roomId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Upload ảnh thành công");

    fetchRooms();

  } catch (err) {
    console.error(err);
    alert("Upload ảnh thất bại");
  }

};
  // xóa phòng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);
      fetchRooms();
    }
  };
  
  
  return (
  <>
    <AdminSidebar />

    <div
      className="admin-container"
      style={{ marginLeft: "280px" }}
    >

    <h1>🏡 Nhà Bắp</h1>
    <p>Quản lý Homestay thông minh</p>

      {/* Thống kê */}
      <div className="stats-container">

        <div className="stat-box">
        <h3>📊 Tổng số phòng</h3>
        <p>{rooms.length}</p>
      </div>

      <div className="stat-box">
        <h3>📅 Tổng booking</h3>
        <p>{stats.totalBookings || 0}</p>
      </div>

      <div className="stat-box">
        <h3>💰 Doanh thu</h3>
        <p>
      {Number(stats.revenue || 0).toLocaleString()} VND
        </p>
      </div>
      <div className="stat-box">
      <h3>👥 Khách hàng</h3>
      <p>{stats.totalCustomers || 0}</p>
      </div>

      </div>

      {/* Thêm phòng */}
      <div className="add-room-box">

        <h2>➕ Thêm phòng mới</h2>

        <div className="form-add">

          <input
            placeholder="Tên phòng"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Giá phòng"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            placeholder="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleAdd}>Thêm phòng</button>

           <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            />

        </div>
      </div>

      {/* Bảng quản lý phòng */}
      <div className="room-table">

        <h2>🛏 Danh sách phòng</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên phòng</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Ảnh</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{Number(room.price_day).toLocaleString()} VND</td>
                <td>{room.description}</td>
                <td>
                  {room.image && (
                    <img
                      className="room-thumb"
                      src={`http://localhost:5000/uploads/${room.image}`}
                      alt={room.name}
                    />
                  )}
                </td>
                <td>
                <button
                 className="delete-btn"
                  onClick={() => handleDelete(room.id)}
                      >
                      Xóa
                 </button>

                <input
                  type="file"
                   onChange={(e) => handleUploadImage(e, room.id)}
                 />
                </td>                
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
    </>
  );
  
}


export default AdminDashboard;