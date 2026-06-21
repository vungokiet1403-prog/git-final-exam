import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FoodSelection.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart = [], total = 0, roomNumber = "" } = location.state || {};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="food-container">
      <h2>Thanh toán đồ ăn</h2>

      <p><b>Phòng:</b> {roomNumber}</p>

      <div className="cart-section">
        <h3>Đơn hàng của bạn</h3>

        {cart.length === 0 ? (
          <p>Không có món nào.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>{item.quantity} x {item.price}đ</span>
            </div>
          ))
        )}

        <h3>Tổng tiền: {total}đ</h3>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Quét QR để thanh toán</h3>

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT_FOOD"
          alt="QR Payment"
        />
      </div>

      <button
        onClick={handleBack}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Quay lại
      </button>
    </div>
  );
}

export default Payment;