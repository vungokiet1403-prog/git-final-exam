import React from "react";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-container">

      {/* Thông tin liên hệ */}
      <div className="contact-info">
        <h2>Hỗ trợ đặt chỗ vui lòng nhắn tin đến Zalo hoặc Facebook (24/7)</h2>

        <p><strong>Zalo:</strong> 0971558192</p>
        <p><strong>Facebook:</strong> Ngô Kiệt</p>

        <h3>Tìm chúng tôi trên bản đồ</h3>
      </div>

      {/* Google Map */}
      <div className="map-wrapper">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m30!1m12!1m3!1d7069.628087435258!2d105.7451313362712!3d10.023089342827308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m15!3e0!4m3!3m2!1d10.027008!2d105.7488896!4m3!3m2!1d10.0200961!2d105.7457216!4m5!1s0x31a08ba6b07962d1%3A0x3afe940d2e951d7b!2zS2h1IHTDoWkgxJHhu4tuaCBjxrAgQW4gQsOsbmgsIDU0IMSQxrDhu51uZyBT4buRIDQsIGtodSB0w6FpIMSR4buLbmggY8awLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoSwgVmnhu4d0IE5hbQ!3m2!1d10.019832!2d105.74580739999999!5e0!3m2!1svi!2s!4v1772619728702!5m2!1svi!2s"
    width="100%"
    height="500"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Map"
  ></iframe>
</div>

    </div>
  );
}

export default ContactPage;