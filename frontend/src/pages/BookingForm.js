import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./BookingForm.css";


function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [roomId, setRoomId] = useState("");
  const [checkinDate, setCheckinDate] = useState("");

  const [cccdFront, setCccdFront] = useState(null);
  const [cccdBack, setCccdBack] = useState(null);

  // Lấy state an toàn
  const state = location.state || {};
  

  // Destructure có default value (KHÔNG gây warning)
  const {
    room_id = "",
    checkin_date = "",
    timeSlotIds = []
  } = state;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [timeSlots, setTimeSlots] = useState([]);

  // Nếu không có dữ liệu thì quay về trang chủ
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  // Load time slots
  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/time-slots")
      .then(res => res.json())
      .then(data => setTimeSlots(data))
      .catch(err => console.error("Lỗi load time slots:", err));
  }, []);
  // hàm chọn ảnh cccd 
  const handleFrontImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    setCccdFront(file);
  }
};

const handleBackImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    setCccdBack(file);
  }
};
  // Tính tổng tiền (không bị warning)
  const totalAmount = useMemo(() => {
    if (!timeSlotIds.length || !timeSlots.length) return 0;

    return timeSlots
      .filter(slot => timeSlotIds.includes(slot.id))
      .reduce((sum, slot) => sum + Number(slot.base_price || 0), 0);
  }, [timeSlots, timeSlotIds]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
   
  
 const handlePayment = async () => {

  if (!form.name || !form.phone || !form.email) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  const formData = new FormData();

  formData.append("customer", form.name);
  formData.append("email", form.email);
  formData.append("phone", form.phone);
  formData.append("room_id", room_id);
  formData.append("checkin_date", checkin_date);
  formData.append("total_amount", totalAmount);

  timeSlotIds.forEach(id => {
  formData.append("timeSlotIds", id);
});

  if (cccdFront) formData.append("cccd_front", cccdFront);
  if (cccdBack) formData.append("cccd_back", cccdBack);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/bookings",
      formData
    );

    navigate("/payment", {
      state: {
        bookingId: response.data.bookingId,
        totalAmount,
        email: form.email
      }
    });

  } catch (error) {
    console.error("Booking error:", error.response?.data);
    alert("Lỗi tạo booking");
  }
};

  // Nếu không có state thì không render
  if (!location.state) return null;

  return (
    <div className="booking-page">
      {/* ==== SECTION 2: TIỆN NGHI ==== */}
  <div className="amenities-section">
    <h2>Tiện nghi trong phòng</h2>

    <div className="amenities-grid">
      <div>🎲 Boardgame</div>
      <div>🪑 Ghế đọc sách</div>
      <div>📽 Máy chiếu</div>
      <div>📺 Netflix chính chủ</div>
      <div>🛏 Giường lớn</div>
      <div>🪞 Gương toàn thân</div>
      <div>📶 Wifi tốc độ cao</div>
      <div>🚿 Máy nước nóng</div>
    </div>
  </div>

  {/* ==== SECTION 1: 2 CỘT ==== */}
  <div className="booking-container">

    {/* LEFT */}
    <div className="booking-left">
      <h1>Phòng - Basic</h1>
      <p className="room-desc">
        Phong cách tối giản, tinh tế với đầy đủ tiện nghi,
        đáp ứng mọi nhu cầu nghỉ ngơi riêng tư.
      </p>

      <div className="highlight-item">
        <h3>🌿 Nhỏ gọn - Ấm cúng - Riêng tư</h3>
        <p>
          Không gian nhỏ gọn nhưng đầy đủ tiện nghi,
          mang lại cảm giác thư giãn và riêng tư tuyệt đối.
        </p>
      </div>
      
      <div className="highlight-item">
        <h3>❤️ Ghế tình yêu – Điểm nhấn riêng tư đầy tinh tế</h3>
        <p>
          Thiết kế tinh tế giúp bạn thư giãn và tạo nên những khoảnh khắc
          gần gũi, riêng tư hơn cùng người thương.
        </p>
      </div>

        <div className="highlight-item">
        <h3>🎬 Giải trí với máy chiếu mini</h3>
        <p>
          Xem Netflix, YouTube ngay trong phòng với máy chiếu siêu nét,
          biến không gian thành rạp phim mini riêng.
        </p>
      </div>

        <div className="highlight-item">
        <h3>🚿 WC riêng & máy nước nóng đầy đủ tiện nghi</h3>
        <p>
          Phòng có WC riêng sạch sẽ, hiện đại, cùng máy nước nóng để bạn luôn cảm thấy thoải mái dù sáng sớm hay tối muộn.
          Tất cả được chuẩn bị sẵn, để bạn chỉ cần xách vali lên và tận hưởng.
        </p>
      </div>
         
        
    </div>
      

    {/* RIGHT */}
    <div className="booking-right">
  <h2>Thông tin Đặt phòng</h2>

  {/* THÔNG TIN CƠ BẢN */}
  <div className="form-group">
    <label>Họ và tên</label>
    <input
  type="text"
  name="name"
  value={form.name}
  onChange={handleChange}
  placeholder="Nhập họ và tên người đặt phòng"
/>
  </div>

  <div className="form-group">
    <label>Số điện thoại</label>
    <input
  type="text"
  name="phone"
  value={form.phone}
  onChange={handleChange}
  placeholder="Nhập số điện thoại liên hệ"
/>
  </div>

  <div className="form-group">
    <label>Email</label>
    <input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Nhập email để nhận xác nhận đặt phòng"
/>
  </div>


            {/* CCCD / HỘ CHIẾU */}
            <div className="cccd-upload">

            <label className="upload-box">
            <input
            type="file"
            accept="image/*"
            onChange={handleFrontImage}
            hidden
            />
            📄 Tải ảnh mặt trước
            </label>

            <label className="upload-box">
            <input
            type="file"
            accept="image/*"
            onChange={handleBackImage}
            hidden
            />
            📄 Tải ảnh mặt sau
            </label>

            </div>
            {cccdFront && (
              <img
                src={URL.createObjectURL(cccdFront)}
                alt="CCCD Front"
                className="preview-image"
              />
            )}

            {cccdBack && (
              <img
                src={URL.createObjectURL(cccdBack)}
                alt="CCCD Back"
                className="preview-image"
              />
            )}

  {/* GHI CHÚ */}
  <div className="form-group">
    <label>Ghi chú cho Home</label>
    <textarea
      placeholder="Ví dụ: Trang trí sinh nhật, nhận phòng sớm, yêu cầu đặc biệt..."
    />
  </div>

  {/* XÁC NHẬN ĐỘ TUỔI */}
  <div className="confirm-age">
    <input type="checkbox" />
    <span>
      Tôi xác nhận tất cả khách lưu trú đủ 18 tuổi trở lên.
      Trường hợp có trẻ em đi cùng, phải có người giám hộ hợp pháp đi kèm.
    </span>
  </div>

  {/* NÚT THANH TOÁN */}
  <button 
  className="booking-button"
  onClick={handlePayment}
>
  Thanh toán & đặt phòng
</button>
</div>

  </div>
  
    </div>

  );
}

export default BookingForm;
