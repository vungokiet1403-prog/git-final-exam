import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function FoodPayment() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return <h2 style={{textAlign:"center"}}>Không có dữ liệu thanh toán</h2>;
  }

  const { roomNumber, orderDate, orderTime, items, total } = data;

  const handleConfirmPayment = async () => {

    try {

      await axios.post("http://localhost:5000/api/food/order", {
        room_name: roomNumber,
        order_date: orderDate,
        order_time: orderTime,
        items: items,
        total_price: total
      });

      alert("Thanh toán thành công!");

      navigate("/");

    } catch (error) {

      console.error(error);
      alert("Lỗi thanh toán!");

    }

  };

  return (

    <div style={{textAlign:"center", padding:"40px"}}>

      <h2>Quét QR để thanh toán</h2>

      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=BapHomestay-${total}`}
        alt="QR Payment"
      />

      <h3>Tổng tiền: {total.toLocaleString()} VND</h3>

      <h3>Phòng: {roomNumber}</h3>

      <p>Ngày: {orderDate}</p>
      <p>Giờ: {orderTime}</p>

      <h3>Món đã chọn</h3>

      {items.map((item, index) => (

        <p key={index}>
          {item.name} x {item.quantity}
        </p>

      ))}

      <br/>

      <button
        onClick={handleConfirmPayment}
        style={{
          padding:"12px 30px",
          background:"#ff4d6d",
          color:"white",
          border:"none",
          borderRadius:"8px",
          cursor:"pointer",
          fontSize:"16px"
        }}
      >
        Tôi đã thanh toán
      </button>

      <br/><br/>

      <button
        onClick={()=>navigate(-1)}
        style={{
          padding:"10px 20px",
          background:"#ccc",
          border:"none",
          borderRadius:"8px",
          cursor:"pointer"
        }}
      >
        Quay lại
      </button>

    </div>

  );
}

export default FoodPayment;