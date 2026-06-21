import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ChooseFoodPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const menu = [
    { id: 1, name: "🍳 Bữa sáng", price: 50000 },
    { id: 2, name: "🍜 Mì xào hải sản", price: 80000 },
    { id: 3, name: "🍚 Cơm chiên", price: 60000 },
    { id: 4, name: "🥤 Nước ngọt", price: 20000 },
    { id: 5, name: "🍺 Bia", price: 30000 },
    { id: 6, name: "☕ Cà phê", price: 25000 }
  ];

  // ✅ CART CHUẨN OBJECT
  const [cart, setCart] = useState({});

  // ➕ Tăng số lượng
  const increase = (item) => {
    setCart((prev) => {
      const currentQty = prev[item.id]?.quantity || 0;

      return {
        ...prev,
        [item.id]: {
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: currentQty + 1
        }
      };
    });
  };

  // ➖ Giảm số lượng
  const decrease = (item) => {
    setCart((prev) => {
      const currentQty = prev[item.id]?.quantity || 0;

      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }

      return {
        ...prev,
        [item.id]: {
          ...prev[item.id],
          quantity: currentQty - 1
        }
      };
    });
  };

  // 💰 Tính tổng tiền
  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🚀 Chuyển sang trang Payment
  const handleFoodPayment = () => {
    if (Object.keys(cart).length === 0) {
      alert("Bạn chưa chọn món nào!");
      return;
    }

    navigate("/payment", {
      state: {
        bookingId,
        cart
      }
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Chọn đồ ăn trước khi check-in</h2>
      <p><strong>Mã booking:</strong> {bookingId}</p>

      <div style={{ marginTop: "30px" }}>
        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px"
            }}
          >
            <div>
              <h4>{item.name}</h4>
              <p>{item.price.toLocaleString()} đ</p>
            </div>

            <div>
              <button onClick={() => decrease(item)}>-</button>
              <span style={{ margin: "0 10px" }}>
                {cart[item.id]?.quantity || 0}
              </span>
              <button onClick={() => increase(item)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "30px" }}>
        Tổng tiền: {total.toLocaleString()} VND
      </h3>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleFoodPayment}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4d6d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Thanh toán
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ⬅ Quay lại
        </button>
      </div>
    </div>
  );
}

export default ChooseFoodPage;