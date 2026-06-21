import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminFoods() {
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("food");

  const [search, setSearch] = useState("");

  // =========================
  // Lấy danh sách món
  // =========================
  const fetchFoods = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/products?search=${search}`
      );

      setFoods(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

  fetchFoods();

}, [search]);

useEffect(() => {

  fetchOrders();

}, []);

   // hàm lấy danh sách oder món 
const fetchOrders = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/food/orders"
    );

    setOrders(res.data);

  } catch (err) {

    console.log(err);

  }

};

  // =========================
  // Thêm hoặc cập nhật món
  // =========================
  const saveProduct = async () => {

    try {

      if (editingId) {

        await axios.put(`http://localhost:5000/api/products/${editingId}`, {
          name,
          price,
          image_url: image,
          category
        });

        alert("Cập nhật thành công");

      } else {

        await axios.post("http://localhost:5000/api/products", {
          name,
          price,
          image_url: image,
          category
        });

        alert("Thêm thành công");

      }

      setEditingId(null);

      setName("");
      setPrice("");
      setImage("");
      setCategory("food");

      fetchFoods();

    } catch (err) {

      console.log(err);
      alert("Lỗi khi lưu");

    }

  };

  // =========================
  // Chọn món để sửa
  // =========================
  const editProduct = (food) => {

    setName(food.name);
    setPrice(food.price);
    setImage(food.image_url);
    setCategory(food.category);
    setEditingId(food.id);

  };

  // =========================
  // Xóa món
  // =========================
  const deleteFood = async (id) => {

    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;

    try {

      await axios.delete(`http://localhost:5000/api/products/${id}`);

      alert("Đã xóa");

      fetchFoods();

    } catch (err) {

      console.log(err);
      alert("Xóa thất bại");

    }

  };

  // Hàm chuẩn bị món xong 
  const completeOrder = async (id) => {

  try {

    await axios.put(
      `http://localhost:5000/api/food/orders/${id}/status`
    );

    fetchOrders(); // load lại

  } catch (err) {

    console.log(err);

  }

};

  return (

    <div className="admin-container"> 
      <h2 style={{ marginTop: 40 }}>📋 Danh sách món khách đã đặt</h2>

<table className="admin-table">

  <thead>

    <tr>
      <th>Phòng</th>
      <th>Món</th>
      <th>Số lượng</th>
      <th>Giờ</th>
      <th>Trạng thái</th>
    </tr>

  </thead>

  <tbody>

{orders.length === 0 ? (

<tr>
<td colSpan="5" style={{ textAlign: "center" }}>
Chưa có đơn đồ ăn
</td>
</tr>

) : (

orders.map((order, index) => (

<tr key={order.order_id || index}>

<td>{order.room_name}</td>
<td>{order.food_name}</td>
<td>{order.quantity}</td>
<td>{order.order_time}</td>

<td>

{order.status === "pending" ? (
  <>
    <span style={{ color: "orange" }}>⏳ Chưa chuẩn bị</span>

    <br />

    <button
      onClick={() => completeOrder(order.order_id)}
      style={{
        marginTop: 5,
        background: "green",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer"
      }}
    >
      ✔ Đã chuẩn bị
    </button>
  </>
) : (
  <span style={{ color: "green" }}>✅ Đã xong</span>
)}

</td>

</tr>

))

)}

</tbody>

</table>

      <h2>🍔 Quản lý Đồ ăn & Nước uống</h2>

      {/* SEARCH */}

      <input
        className="search-input"
        placeholder="🔍 Tìm món..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}

      <div className="food-form">

        <input
          placeholder="Tên món"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Link ảnh"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">🍔 Đồ ăn</option>
          <option value="drink">🥤 Nước uống</option>
        </select>

        <button onClick={saveProduct}>
          {editingId ? "💾 Lưu" : "➕ Thêm"}
        </button>

      </div>

      {/* TABLE */}

      <table className="admin-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {Array.isArray(foods) && foods.map((food) => (

            <tr key={food.id}>

              <td>{food.id}</td>

              <td>

                <img
                src={`http://localhost:5000${food.image_url}`}
                  alt={food.name}
                  width="60"
               />

              </td>

              <td>{food.name}</td>

              <td>
                {Number(food.price).toLocaleString()} VND
              </td>

              <td>
                {food.category === "food"
                  ? "🍔 Đồ ăn"
                  : "🥤 Nước uống"}
              </td>

              <td>

                <button
                  onClick={() => editProduct(food)}
                  style={{ marginRight: 10 }}
                >
                  ✏️ Sửa
                </button>

                <button
                  onClick={() => deleteFood(food.id)}
                  style={{
                    background: "red",
                    color: "white"
                  }}
                >
                  🗑 Xóa
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminFoods;