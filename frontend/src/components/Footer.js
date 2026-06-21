import "./Footer.css";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">
        <h2>Trải nghiệm của bạn tại <span>Bắp Homestay</span> rất quan trọng với chúng tôi</h2>
        <p>
          Chia sẻ suy nghĩ của bạn để chúng tôi có thể tạo ra trải nghiệm tốt hơn cho bạn lần sau
        </p>

        <button className="feedback-btn">
          Chia sẻ suy nghĩ của bạn
        </button>
      </div>

      <div className="footer-line"></div>

      <div className="footer-container">

        <div className="footer-col">
          <h3>CHÍNH SÁCH</h3>
          <ul>
            <li>Chính sách bảo mật thông tin</li>
            <li>Nội quy và quy định</li>
            <li>Hình thức thanh toán</li>
            <li>Hướng dẫn sử dụng</li>
            <li>Hướng dẫn tự Check in</li>
            <li>Câu hỏi thường gặp</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>THEO DÕI CHÚNG TÔI QUA</h3>

          <div className="social-icons">
            <FaFacebookF />
            <FaTiktok />
            <FaInstagram />
          </div>
        </div>

        <div className="footer-col">
          <h3>LIÊN HỆ</h3>

          <p>Số 1 đường 31 khu tái định cư Hoàng Quốc Việt</p>
          <p>Zalo: 0971558211</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;