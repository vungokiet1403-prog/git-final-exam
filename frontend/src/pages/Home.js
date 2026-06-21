import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogPage from "./BlogPage";
import Footer from "../components/Footer";
import RomanticCoupleBanner from "../components/RomanticCoupleBanner";

import defaultRoom from "../assets/noah.jpg";

import "./Home.css";

function Home() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Lỗi tải phòng:", err));
  }, []);

  return (
    <>
      {/* Banner Romantic */}
      <RomanticCoupleBanner />
      <>
      
      </>
      {/* Section danh sách phòng */}
      <motion.div
        className="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="title">Mời bạn chọn phòng giúp mình</h1>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.id}>
              <div
                className="room-card"
                onClick={() => navigate(`/room/${room.id}`)}
              >
                <div className="img-wrapper">
                  <div className="img-wrapper">
                 
                 
                    <img
                      src={
                        room.image
                          ? `http://localhost:5000/uploads/rooms/${room.image}`
                          : defaultRoom
                      }
                      alt={room.name}
                      className="room-img"
                    />
                  </div>

                  <div className="time-overlay">
                    <span>08:00 - 10:00</span>
                    <span>11:00 - 12:00</span>
                    <span>13:30 - 15:00</span>
                    <span>15:00 - 17:00</span>
                  </div>
                </div>

                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>
                    {room.price_day
                      ? room.price_day.toLocaleString()
                      : 0}{" "}
                    VNĐ
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      {/* 👇 Blog nằm dưới danh sách phòng */}
    <BlogPage />
    {/* Footer luôn nằm cuối */}
    <Footer />
    </>
      

  );
}

export default Home;
