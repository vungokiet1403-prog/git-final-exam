import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RoomDetail.css";

function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  // LOAD TIME SLOTS TỪ API
  useEffect(() => {
  fetch("http://localhost:5000/api/bookings/time-slots")
    .then(res => res.json())
    .then(data => {
      console.log("Time slots:", data);
      setTimeSlots(data);
    })
    .catch(err => console.error("Lỗi load time slots:", err));
}, []);

  // LOAD SLOT ĐÃ ĐẶT
  useEffect(() => {
    fetch(`http://localhost:5000/api/bookings/booked/${id}`)
      .then(res => res.json())
      .then(data => setBookedSlots(data))
      .catch(err => console.log("Lỗi load booked:", err));
  }, [id]);

  const days = [
    { label: "T6 - 13/03", value: "2026-03-13" },
    { label: "T7 - 14/03", value: "2026-03-14" },
    { label: "CN - 15/03", value: "2026-03-15" },
    { label: "T2 - 16/03", value: "2026-03-16" },
    { label: "T3 - 17/03", value: "2026-03-17" },
    { label: "T4 - 18/03", value: "2026-03-18" },
    { label: "T5 - 19/03", value: "2026-03-19" }
  ];

  // KIỂM TRA SLOT ĐÃ ĐẶT
  const isBooked = (date, timeSlotId) => {
    return bookedSlots.some(
      slot =>
        slot.checkin_date?.slice(0, 10) === date &&
        slot.time_slot_id === timeSlotId
    );
  };

  const handleContinue = () => {
  if (!selected) {
    alert("Vui lòng chọn ngày và khung giờ");
    return;
  }

  const selectedSlot = timeSlots.find(s => s.id === selected.timeId);

  navigate("/booking", {
    state: {
      room_id: id,
      checkin_date: selected.day,
      timeSlotIds: [selected.timeId],
      total_amount: selectedSlot.base_price
    }
  });
};


  return (
    <div className="booking-page">
      <h2>Chọn ngày & khung giờ</h2>

      <div className="booking-wrapper">

        {/* CỘT NGÀY */}
        <div className="day-column">
          <div className="day-header">Ngày</div>
          {days.map((day, index) => (
            <div key={index} className="day-item">
              {day.label}
            </div>
          ))}
        </div>

        {/* BẢNG GIỜ */}
        <div className="time-table">

          <div className="time-header">
            {timeSlots.map(slot => (
              <div key={slot.id}>
                {slot.start_time?.slice(0,5)} - {slot.end_time?.slice(0,5)}
              </div>
            ))}
          </div>

          {days.map((day, dIndex) => (
            <div key={dIndex} className="time-row">
              {timeSlots.map(slot => {

                const booked = isBooked(day.value, slot.id);
                const isSelected =
                  selected?.day === day.value &&
                  selected?.timeId === slot.id;

                return (
                  <div
                    key={slot.id}
                    className={`time-cell 
                      ${booked ? "booked" : ""}
                      ${isSelected ? "selected" : ""}
                    `}
                    onClick={() => {
                      if (!booked) {
                        setSelected({
                          day: day.value,
                          timeId: slot.id
                        });
                      }
                    }}
                  />
                );
              })}
            </div>
          ))}

        </div>
      </div>

      <div className="legend">
        <span className="legend-box booked"></span> Đã đặt
        <span className="legend-box selected"></span> Đang chọn
        <span className="legend-box available"></span> Còn trống
      </div>

      <div className="continue-wrapper">
        <button className="continue-btn" onClick={handleContinue}>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default RoomDetail;
