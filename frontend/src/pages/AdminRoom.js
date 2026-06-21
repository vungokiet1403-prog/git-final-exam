import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRoom.css";

function AdminRoom() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Lấy danh sách phòng
  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:5000/api/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Thêm phòng
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    await axios.post("http://localhost:5000/api/rooms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setPreview(null);

    fetchRooms();
  };

  // Xóa phòng
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/rooms/${id}`);
    fetchRooms();
  };

  return (
    <div className="admin-room-container">
      <h2>Quản lý phòng</h2>

      {/* FORM THÊM PHÒNG */}
      <form className="room-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên phòng"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
          required
        />

        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}

        <button type="submit">Thêm phòng</button>
      </form>

      {/* DANH SÁCH PHÒNG */}
      <div className="room-list">
        {rooms.map((room) => (
          <div className="room-card" key={room.id}>
            {room.image && (
              <img
                src={`http://localhost:5000/uploads/${room.image}`}
                alt={room.name}
              />
            )}
            <h3>{room.name}</h3>
            <p>{room.price} VND</p>
            <p>{room.description}</p>

            <button onClick={() => handleDelete(room.id)}>
              Xóa phòng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRoom;