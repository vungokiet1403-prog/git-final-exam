import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/PaymentPage.css";


function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingId, totalAmount } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [qrCheckin, setQrCheckin] = useState(null);

  // 🔹 Nếu không có bookingId thì quay về home
  useEffect(() => {
    if (!bookingId) {
      navigate("/");
    }
  }, [bookingId, navigate]);

  if (!bookingId) return null;

  // 🔹 QR thanh toán giả lập (VietQR fake)
  const paymentQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PAY_BOOKING_${bookingId}_AMOUNT_${totalAmount}`;

  const handleConfirmPayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/bookings/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          booking_id: bookingId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Thanh toán thất bại");
        setLoading(false);
        return;
      }

      alert("Thanh toán thành công 🎉 Email hướng dẫn check-in đã được gửi!");

      // Backend trả về QR check-in
      setQrCheckin(data.qr);

    } catch (error) {
      console.error(error);
      alert("Lỗi server");
    }

    setLoading(false);
  };
   
  return (
    
  <div className="payment-page">

    <div className="payment-card">

      <h2>Thanh toán đơn đặt phòng</h2>

      <div className="payment-info">
        Mã booking: <span>{bookingId}</span>
      </div>

      <div className="price">
        Số tiền: {totalAmount} đ
      </div>

      <p>Quét QR để thanh toán</p>

      <div className="qr-box">
        <img src={paymentQrUrl} alt="QR Payment"/>
      </div>

      <div className="payment-buttons">

        <button
          className="btn btn-success"
          onClick={handleConfirmPayment}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Tôi đã thanh toán"}
        </button>

        <button
          className="btn btn-food"
          onClick={() => navigate("/food")}
        >
          🍱 Mua thêm đồ ăn
        </button>

        <button
          className="btn btn-back"
          onClick={() => navigate(-1)}
        >
          ← Quay lại
        </button>

      </div>

    </div>

  </div>
);
  
}

export default PaymentPage;