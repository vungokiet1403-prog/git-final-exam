import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import "./RomanticBanner.css";

export default function RomanticCoupleBanner() {
  const slides = [
    {
      title: "Không Gian Riêng Cho Hai Người",
      subtitle: "Lãng mạn – Ấm áp – Tinh tế",
      description:
        "Tận hưởng khoảnh khắc ngọt ngào với phòng chiếu phim riêng, bồn tắm thư giãn và ánh đèn dịu nhẹ.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1974&auto=format&fit=crop",
         
    },
    {
      title: "Tự Check-in 24/7",
      subtitle: "Riêng tư tuyệt đối",
      description:
        "Thanh toán online – Nhận checkin qua email – Mở cửa chỉ trong 5 giây.",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
    },
    {
      title: "Ưu Đãi Theo Giờ",
      subtitle: "Linh hoạt cho mọi kế hoạch",
      description:
        "Combo 2h, nơi lý tưởng nghỉ ngơi – lựa chọn phù hợp cho buổi hẹn hò hoàn hảo.",
      image:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <div className="romantic-banner">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={true}   
        loop
        className="banner-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="banner-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="banner-overlay"></div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="banner-content"
              >
                <div className="banner-card">
                  <div className="banner-tag">Bắp Romantic Space</div>

                  <h2>{slide.title}</h2>
                  <h3>{slide.subtitle}</h3>
                  <p>{slide.description}</p>

                  <button className="banner-btn">
                    Đặt Phòng Ngay
                  </button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}